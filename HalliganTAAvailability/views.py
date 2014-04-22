import datetime
import logging
import pytz
import requests

from HalliganAvailability import settings
from datetime import timedelta
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.mail import EmailMultiAlternatives
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from django.shortcuts import HttpResponseRedirect, get_object_or_404
from django.template import Context
from django.template.loader import get_template
from django.utils.html import escape
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from registration.backends.default.views import RegistrationView
from registration.signals import user_registered, user_activated
from socketio import socketio_manage
from socketio.namespace import BaseNamespace

from forms import TuftsEmail, RequestForm, OfficeHourForm, CancelHoursForm
from models import Student, Request, TA, Course, OfficeHour


logger = logging.getLogger(__name__)
socket_logger = logging.getLogger('sockets')


def _now():
    tz = pytz.timezone(settings.TIME_ZONE)
    now = datetime.datetime.now(tz)
    return now


def notify(user, courses, adding_ta=True):
    subject = 'TA Activation'
    from_email = 'halliganhelper@tylerlubeck.com'
    to_email = user.email
    if adding_ta:
        plaintext = get_template('ta_activation.txt')
        htmly = get_template('ta_activation.html')
    else:
        plaintext = get_template('remove_ta.txt')
        htmly = get_template('remove_ta.html')

    d = Context({'user': user, 'courses': courses})
    text_content = plaintext.render(d)
    html_content = htmly.render(d)

    msg = EmailMultiAlternatives(subject, text_content,
                                 from_email, [to_email])
    msg.attach_alternative(html_content, 'text/html')
    msg.send()


def check_ta(user):
    email = user.email
    url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
    r = requests.get(url.format(email))
    is_ta = r.text.strip() != 'NONE'
    logger.debug(r.text)
    if is_ta:
        course_nums = r.text.strip().split(' ')
        courses = Course.objects.filter(Number__in=course_nums)

        logger.debug("{0} has been added as a ta".format(user))
        ta, created = TA.objects.get_or_create(usr=user)
        ta.active = True
        ta.course = courses
        ta.save()
        notify(user, courses, adding_ta=True)
    else:
        if TA.objects.filter(usr__email=email).exists():
            ta = TA.objects.get(usr__email=email)
            ta.active = False
            ta.courses = []
            ta.save()
            notify(user, None, adding_ta=False)


def user_confirmed(sender, user, request, **kwargs):
    check_ta(user)
    logger.debug("User {0} confirmed".format(user))


def user_created(sender, user, request, **kwargs):
    form = TuftsEmail(request.POST)
    stu, created = Student.objects.get_or_create(usr=user)
    stu.save()
    user.first_name = form.data['first_name']
    user.last_name = form.data['last_name']
    user.save()
    logger.debug("User {0} created".format(user))

user_registered.connect(user_created)
user_activated.connect(user_confirmed)


def ta_test(user):
    try:
        user.ta
        return True
    except TA.DoesNotExist:
        return False


class TuftsRegistrationView(RegistrationView):
    form_class = TuftsEmail


def courseList(request):
    return render_to_response('courseList.html')


@login_required
def getHelp(request, course=None):
    if request.method == 'POST':
        form = RequestForm(request.POST)
        if form.is_valid():
            rq = form.save(commit=False)
            usr_id = request.user.id
            stu, create = Student.objects.get_or_create(usr__id=usr_id)
            rq.student = stu
            rq.emailed = False
            rq.save()
            d = {
                'pk': rq.pk,
                'name': escape('{0} {1}'.format(stu.usr.first_name,
                                                stu.usr.last_name[0].upper())),
                'location': escape(rq.whereLocated),
                'problem': escape(rq.question),
                'when': rq.whenAsked.strftime('%m/%d %I:%M %p'),
                'course': rq.course.Number,
                'type': 'add'
            }
            QueueNamespace.emit(d, json=True)
            d = {
                'course': rq.course.Number,
                'type': 'notify'
            }
            QueueNamespace.emit_to_ta(d)
            return HttpResponseRedirect(reverse('taSystem'))
    else:
        form = RequestForm()

    data = {'form': form}
    return render(request, 'getHelp.html', data)


@login_required()
def listRequests(request):
    try:
        stu = Student.objects.get(usr__id=request.user.id)
        rqs = stu.request_set.order_by('-whenAsked')
    except Student.DoesNotExist:
        rqs = None

    return render(request, 'listRequests.html', {'requests': rqs})


@login_required()
def profile(request):
    user = request.user
    data = {}
    try:
        ta = TA.objects.get(usr__pk=user.pk)
        data['is_ta'] = True
    except TA.DoesNotExist:
        ta = None
        data['is_ta'] = False

    page = request.GET.get('page', None)
    if ta:
        resolved_requests = ta.request_set.all().order_by('-whenSolved')
        paginator = Paginator(resolved_requests, 20)
        try:
            resolved = paginator.page(page)
        except PageNotAnInteger:
            resolved = paginator.page(1)
        except EmptyPage:
            resolved = paginator.page(paginator.num_pages)
        data['resolved'] = resolved

    return render(request, 'profile.html', data)


@ensure_csrf_cookie
def onlineQueue(request):
    tz = pytz.timezone(settings.TIME_ZONE)
    before = datetime.datetime.now(tz) - datetime.timedelta(hours=3)

    expiredReqs = Request.objects.filter(whenAsked__lt=before)
    expiredReqs = expiredReqs.filter(Q(timedOut=False))
    for e in expiredReqs:
        e.timeOut()

    allReqs = Request.objects.filter(whenAsked__gte=before)
    allReqs = allReqs.order_by('whenAsked')
    courses = Course.objects.all().order_by('Number')
    ohs = OfficeHour.objects.on_duty()
    requestData = []

    for course in courses:
        reqs = allReqs.filter(course=course)
        reqs = reqs.filter(timedOut=False).filter(solved=False)
        course_hours = ohs.filter(course=course)
        insert = (course, reqs, course_hours)
        requestData.append(insert)

    is_ta = TA.objects.filter(usr__id=request.user.id).exists()

    responseData = {
        'requestData': requestData,
        'is_ta': is_ta
    }

    return render(request, 'taSystem.html', responseData)


@require_POST
@login_required()
def resolveRequest(request):
    rq_id = request.POST.get('requestID', None)
    student = Student.objects.get(usr__id=request.user.id)
    try:
        ta = TA.objects.get(usr__id=request.user.id)
    except TA.DoesNotExist:
        ta = None
    if not rq_id:
        # TODO: add error message
        return HttpResponse(status=400)
    try:
        rq_id = int(rq_id)
    except ValueError:
        # TODO: add error message
        return HttpResponse(status=400)

    req = get_object_or_404(Request, pk=rq_id)
    is_the_student = req.student.pk == student.pk

    if not is_the_student and not ta:
        return HttpResponse(status=401)

    if ta and not is_the_student:
        req.who_solved = ta
    req.solved = True
    req.whenSolved = _now()
    req.timedOut = False
    req.checked_out = False
    req.save()
    QueueNamespace.emit({'type': 'resolve',
                         'rq': rq_id,
                         'course': req.course.Number},
                        json=True)
    return HttpResponse(status=200)


def is_ta(user):
    return TA.objects.filter(usr=user).exists()


@login_required()
@user_passes_test(is_ta)
def go_on_duty(request):
    user = request.user

    ta = user.ta
    if ta and OfficeHour.objects.on_duty().filter(ta=ta):
        cancel = True
    else:
        cancel = False

    if request.method == 'POST':
        ca_form = CancelHoursForm(request.POST, prefix='ca_form')
        oh_form = OfficeHourForm(request.POST, prefix='oh_form')
        logger.debug('POSTED')
        if oh_form.is_valid():
            logger.debug('OH FORM VALID')
            my_tz = pytz.timezone(settings.TIME_ZONE)
            new_hours = oh_form.save(commit=False)
            new_hours.end_time = new_hours.end_time.astimezone(my_tz)
            new_hours.ta = user.ta
            new_hours.start_time = _now()
            new_hours.save()
            logger.debug(new_hours)
            return HttpResponseRedirect(reverse('taSystem'))

        elif ca_form.is_valid() and cancel:
            logger.debug('CA FORM VALID')
            logger.debug(ca_form.cleaned_data)
            if ca_form.cleaned_data['confirm']:
                try:
                    oh = OfficeHour.objects.on_duty().filter(ta=user.ta)[0]
                    oh.end_time = _now() - timedelta(minutes=1)
                    oh.save()
                    return HttpResponseRedirect(reverse('go_on_duty'))
                except OfficeHour.DoesNotExist:
                    logger.debug('No Office hours exist')
                    pass
            else:
                return HttpResponseRedirect(reverse('taSystem'))
    else:
        logger.debug('NOT POSTED')
        oh_form = OfficeHourForm(prefix='oh_form')
        ca_form = CancelHoursForm(prefix='ca_form')
    return render(request, 'go_on_duty.html', {'oh_form': oh_form,
                                               'ca_form': ca_form,
                                               'cancel': cancel})


@login_required()
@user_passes_test(is_ta)
def cancel_hours(request):
    user = request.user
    if request.method == "POST":
        form = CancelHoursForm(request.POST)
        if form.is_valid():
            if form.cleaned_data['confirm']:
                oh = OfficeHour.objects.on_duty().filter(ta=user.ta)[0]
                oh.end_time = _now() - timedelta(minutes=1)
                oh.save()
                return HttpResponseRedirect(reverse('go_on_duty'))
            else:
                return HttpResponseRedirect(reverse('taSystem'))
    else:
        form = CancelHoursForm()

    return render(request, 'cancel_hours.html', {'form': form})


@login_required
@user_passes_test(ta_test)
@require_POST
def take_request(request):
    pk = request.POST.get('pk', None)
    if pk:
        try:
            rq = Request.objects.get(pk=pk)
            rq.checked_out = True
            rq.save()
            data = {}
            data['pk'] = rq.pk
            data['type'] = 'check_out'
            data['ta'] = request.user.get_full_name()
            data['checked_out'] = rq.checked_out
            data['course'] = rq.course.Number

            QueueNamespace.emit(data, json=True)
            return HttpResponse(200)
        except:
            pass
    return HttpResponse(404)


############################################################################
#             Socketio Stuff
############################################################################

class QueueNamespace(BaseNamespace):
    _connections = {}

    def recv_connect(self, *args, **kwargs):
        self._connections[id(self)] = {
            'socket': self,
            'user': self.request.user
        }
        return super(QueueNamespace, self).recv_connect(*args, **kwargs)

    def disconnect(self, *args, **kwargs):
        del self._connections[id(self)]
        socket_logger.debug("Deleting socket with ID {}".format(id(self)))
        super(QueueNamespace, self).disconnect(*args, **kwargs)

    def on_remove(self, packet):
        logger.debug(packet)
        self.send({'message': 'Goodbye!'}, json=True)

    @staticmethod
    def emit(msg, json=True):
        for connection_id, connection in QueueNamespace._connections.items():
            logger.debug(connection_id)
            logger.debug(connection)
            output_string = "Sending {0} to {1} with id {2}"
            logger.debug(output_string.format(msg,
                                              connection,
                                              connection_id)
                         )
            msg['ta'] = ta_test(connection['user'])
            connection['socket'].send(msg, json)

    @staticmethod
    def emit_to_ta(msg, json=True):
        for connection_id, connection in QueueNamespace._connections.items():
            if ta_test(connection['user']):
                connection['socket'].send(msg, json)


def socketio(request):
    try:
        socketio_manage(request.environ, {'/taqueue': QueueNamespace, },
                        request=request)
    except:
        logger.error("Exception while handling sockets")

    return HttpResponse()
