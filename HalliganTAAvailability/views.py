import datetime
import logging
import pytz
import requests
import json

from django.conf import settings
from django.contrib.models import User
from datetime import timedelta
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.forms import AuthenticationForm
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
from django.core.mail import send_mail
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from registration.backends.default.views import RegistrationView
from registration.signals import user_registered, user_activated
from socketio import socketio_manage
from socketio.namespace import BaseNamespace

from .forms import TuftsEmail, RequestForm, OfficeHourForm, CancelHoursForm
from .forms import TAPhotoChangeForm, ForgotUsernameForm
from models import Student, Request, TA, Course, OfficeHour


logger = logging.getLogger(__name__)
socket_logger = logging.getLogger('sockets')
deprecated_views_logger = logging.getLogger('deprecated_views')


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
    if user.is_authenticated():
        try:
            return user.ta.active
        except TA.DoesNotExist:
            return False
    else:
        return False


class TuftsRegistrationView(RegistrationView):
    form_class = TuftsEmail


def courseList(request):
    return render_to_response('courseList.html')


def forgot_username(request):
    if request.method == 'POST':
        form = ForgotUsernameForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            try:
                u = User.objects.get(email=email)
                #TODO: Send the email
            except User.DoesNotExist:
                # This means that the email does not exist
                pass
#TODO: Create this view
            return HttpResponseRedirect(reverse('sent_username'))
    else:
        form = ForgotUsernameForm()

    #TODO: Create this template
    return render(request, 'registration/forgot_email.html', {'form': form})



@login_required
def getHelp(request, course=None):
    """ DEPRECATED """
    deprecated_views_logger.debug('getHelp')
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
                'name': escape('{0} {1}'.format(stu.usr.first_name.title(),
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
                'problem': rq.question,
                'location': rq.whereLocated,
                'name': '{0} {1}'.format(stu.usr.first_name.title(),
                                         stu.usr.last_name[0].upper()),
                'when': rq.whenAsked.strftime('%I:%M %p'),
                'type': 'notify'
            }

            def course_test(conn_id, conn, msg):
                if conn['user'].is_authenticated():
                    try:
                        ta = conn['user'].ta
                        if ta in [o.ta for o in OfficeHour.objects.on_duty()]:
                            nums = [c.Number for c in ta.course.all()]
                            if msg['course'] in nums:
                                return True
                    except TA.DoesNotExist:
                        pass
                return False

            QueueNamespace.emit_to_test(d, course_test)
            return HttpResponseRedirect(reverse('taSystem'))
    else:
        form = RequestForm()

    data = {'form': form}
    return render(request, 'getHelp.html', data)


@login_required()
def listRequests(request):
    """ DEPRECATED """
    deprecated_views_logger.debug('listRequests')

    try:
        stu = Student.objects.get(usr__id=request.user.id)
        rqs = stu.request_set.order_by('-whenAsked')
    except Student.DoesNotExist:
        rqs = None

    return render(request, 'listRequests.html', {'requests': rqs})


@login_required()
def profile(request):
    """ DEPRECATED """
    deprecated_views_logger.debug('PROFILE')

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
    before = datetime.datetime.now(tz) - datetime.timedelta(hours=5)

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
    """ DEPRECATED """
    deprecated_views_logger.debug('RESOLVE REQUEST')

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
    try:
        return user.ta.active
    except Exception:
        return False


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
        if oh_form.is_valid():
            my_tz = pytz.timezone(settings.TIME_ZONE)
            new_hours = oh_form.save(commit=False)
            new_hours.end_time = new_hours.end_time.astimezone(my_tz)
            new_hours.ta = user.ta
            new_hours.start_time = _now()
            new_hours.save()
            return HttpResponseRedirect(reverse('taSystem'))

        elif ca_form.is_valid() and cancel:
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


def login_or_register(request):
    if request.method == 'POST':
        register_form = TuftsEmail(request.POST)
        login_form = AuthenticationForm(request.POST)
    else:
        register_form = TuftsEmail()
        login_form = AuthenticationForm()
    template_vars = {
        'register': register_form,
        'login': login_form
    }
    return render(request,
                  'HalliganTAAvailability/login_or_register.html',
                  template_vars)


@login_required()
@user_passes_test(is_ta)
def update_photo(request):
    if request.method == 'POST':
        image_form = TAPhotoChangeForm(request.POST, request.FILES)
        if image_form.is_valid():
            ta = TA.objects.get(pk=request.user.ta.pk)
            if ta.has_updated_headshot:
                ta.headshot.delete()
            else:
                ta.has_updated_headshot = True
            ta.headshot = image_form.cleaned_data['image']
            ta.save()
            return HttpResponseRedirect(reverse('ModularHomePage'))
    else:
        image_form = TAPhotoChangeForm()

    template_params = {'form': image_form}
    return render(request,
                  'HalliganTAAvailability/update_photo.html',
                  template_params)

############################################################################
#             Socketio Stuff
############################################################################


class QueueNamespace(BaseNamespace):
    _connections = {}

    def recv_connect(self, *args, **kwargs):
        self._connections[id(self)] = {
            'socket': self,
            'user': self.request.user,
            'request': self.request
        }
        return super(QueueNamespace, self).recv_connect(*args, **kwargs)

    def disconnect(self, *args, **kwargs):
        del self._connections[id(self)]
        socket_logger.debug("Deleting socket with ID {}".format(id(self)))
        super(QueueNamespace, self).disconnect(*args, **kwargs)

    @staticmethod
    def emit(msg, json=True):
        for connection_id, connection in QueueNamespace._connections.items():
            msg['ta'] = ta_test(connection['user'])
            connection['socket'].send(msg, json)

    @staticmethod
    def emit_to_ta(msg, json=True):
        for connection_id, connection in QueueNamespace._connections.items():
            if ta_test(connection['user']):
                connection['socket'].send(msg, json)

    @staticmethod
    def emit_to_test(msg, test, json=True):
        """
            test is a function that will receive two parameters:
                connection_id - the id of the socket connectoin
                connection - a dictionary that has two keys:
                    socket - the socket object itself
                    user - the user object. This is the real point of this
                    msg - the same message passed to emit_to_test
            test is expected to return True or False
        """
        for connection_id, connection in QueueNamespace._connections.items():
            if test(connection_id, connection, msg):
                connection['socket'].send(msg, json)

    @staticmethod
    def emit_checkout_request(course_num, rq_id, json_parse=True):
        msg = {
            'type': 'checkout',
            'id': rq_id,
            'course_num': course_num,
        }
        for connection_id, connection in QueueNamespace._connections.items():
            connection['socket'].send(msg, json_parse)

    @staticmethod
    def send_ta_update(course_number, office_hour_id, json_parse=True):
        from api import OfficeHourResource
        br = OfficeHourResource()

        msg = {
            'type': 'add_oh',
            'course_number': course_number,
        }

        for _, connection in QueueNamespace._connections.items():
            o = OfficeHour.objects.get(id=office_hour_id)
            resource = br.build_bundle(obj=o, request=connection['request'])
            data = br.full_dehydrate(resource)
            srl = br.serialize(None, data, 'application/json')
            msg['resource'] = json.loads(srl)
            connection['socket'].send(msg, json_parse)

    @staticmethod
    def notify_request(request_id, course_number, change_type):
        from api import RequestResource

        resource = RequestResource()

        message = {
            'type': change_type,
            'course': course_number
        }

        request = Request.objects.get(pk=request_id)

        QueueNamespace.send_message(resource, request, message)


    @staticmethod
    def notify_office_hour(office_hour_id, course_number, change_type):
        from api import OfficeHourResource

        resource = OfficeHourResource()

        message = {
            'type': change_type,
            'course': course_number
        }

        office_hour = OfficeHour.objects.get(pk=office_hour_id)

        QueueNamespace.send_message(resource, office_hour, message)


    @staticmethod
    def send_message(br, item, message):
        for _, connection in QueueNamespace._connections.items():
            resource = br.build_bundle(obj=item, request=connection['request'])
            dehydrated_data = br.full_dehydrate(resource)
            serialized_data = br.serialize(None,
                                           dehydrated_data,
                                           'application/json')
            message['data'] = json.loads(serialized_data)
            connection['socket'].send(message, True)



class AnnouncementNamespace(BaseNamespace):

    _connections = {}

    def recv_connect(self, *args, **kwargs):
        self._connections[id(self)] = {
            'socket': self,
            'user': self.request.user,
        }
        return super(AnnouncementNamespace, self).recv_connect(*args, **kwargs)

    def disconnect(self, *args, **kwargs):
        del self._connections[id(self)]
        super(AnnouncementNamespace, self).disconnect(*args, **kwargs)

    @staticmethod
    def send_request_update(course_num, json=True):
        num_requests = Request.objects.still_open()
        num_requests = num_requests.filter(course__Number=course_num).count()
        msg = {
            'type': 'request_update',
            'course_number': course_num,
            'num_requests': num_requests
        }
        for _, connection in AnnouncementNamespace._connections.items():
            connection['socket'].send(msg, json)

    @staticmethod
    def cancel_office_hours(hour_id, class_number, json_parse=True):
        msg = {
            'type': 'cancel_hours',
            'course_number': class_number,
            'office_hour_id': hour_id
        }
        for _, connection in AnnouncementNamespace._connections.items():
            connection['socket'].send(msg, json_parse)

    @staticmethod
    def notify_ta(user_name, course_number, json_parse=True):
        msg = {
            'type': 'notifyta',
            'name': user_name
        }

        for _, connection in AnnouncementNamespace._connections.items():
            print 'Notifying {}'.format(connection['user'].get_full_name())
            # If the connectoin isn't a ta, then bail out
            try:
                ta = connection['user'].ta
            except TA.DoesNotExist:
                continue

            course_office_hours = OfficeHour.objects.on_duty_for_course(course_number)

            active_for_course = ta.course.filter(Number=course_number).exists()
            on_duty = course_office_hours.filter(ta__pk=ta.pk).exists()
            if ta.active and active_for_course and on_duty:
                connection['socket'].send(msg, json_parse)

    @staticmethod
    def notify_user(which_user, ta_name, json_parse=True):
        msg = {
            'type': 'notifystudent',
            'name': ta_name
        }

        logger.debug("NOTIFY USER")
        for _, connection in AnnouncementNamespace._connections.items():
            logger.debug("Looking for user {} with user {}".format(connection['user'].pk, which_user))
            if connection['user'].pk == which_user:
                logger.debug("SENDING NOTIFICATION")
                connection['socket'].send(msg, json_parse)


def socketio(request):
    try:
        socketio_manage(request.environ, {
            '/taqueue': QueueNamespace,
            '/announcements': AnnouncementNamespace
        }, request=request)
    except:
        logger.error("Exception while handling sockets")

    return HttpResponse()
