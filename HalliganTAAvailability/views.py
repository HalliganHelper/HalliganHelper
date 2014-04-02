from django.shortcuts import render, render_to_response, HttpResponseRedirect
from registration.backends.default.views import RegistrationView
from forms import TuftsEmail, RequestForm, TARegister
from models import Student, Request, TA, Course
from django.contrib.auth.admin import User
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from registration.signals import user_registered
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import get_object_or_404
from django.core.urlresolvers import reverse
import pytz, datetime
import logging
from django.db.models import Q
from HalliganAvailability import settings
from socketio.namespace import BaseNamespace
from socketio import socketio_manage

logger = logging.getLogger(__name__)
socket_logger = logging.getLogger('sockets')
def _now():
    tz = pytz.timezone(settings.TIME_ZONE)
    now = datetime.datetime.now(tz)
    return now


def user_created(sender, user, request, **kwargs):
    form = TuftsEmail(request.POST)
    stu, created = Student.objects.get_or_create(usr=user)
    stu.save()
    user.first_name=form.data['first_name']
    user.last_name=form.data['last_name']
    user.save()

user_registered.connect(user_created)


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
            stu, create = Student.objects.get_or_create(usr__id=request.user.id)
            rq.student = stu
            rq.emailed = False
            rq.save()
            d = {
                'pk': rq.pk,
                'name': '{0} {1}'.format(stu.usr.first_name, stu.usr.last_name[0].upper()),
                'location': rq.whereLocated,
                'problem': rq.question,
                'when': rq.whenAsked.strftime('%m/%d %I:%M %p'),
                'course': rq.course.Number,
                'type': 'add'
            }
            QueueNamespace.emit(d, json=True)
            return HttpResponseRedirect(reverse('taSystem'))
    else:
        course = 1
        c = Course.objects.get(pk=course)
        logger.debug(c.pk)
        if course is not None and False:
            form = RequestForm(initial={'course': c, 
            'question': 'Hello my name is'})
            logger.debug("IN PLACE")
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
    usr = User.objects.get(email=request.user.email)
    student = Student.objects.get(usr=usr)

    taForm = TARegister()

    try:
        rqs = Request.objects.filter(student=student)
        ta = TA.objects.get(usr=usr)
    except Request.DoesNotExist:
        rqs = None
    except TA.DoesNotExist:
        ta = None

    data = {'student': student, 'rqs': rqs, 'ta': ta, 'taForm': taForm}
    return render(request, 'profile.html', data)


@ensure_csrf_cookie
def onlineQueue(request):
    tz = pytz.timezone(settings.TIME_ZONE)
    before = datetime.datetime.now(tz) - datetime.timedelta(hours=3)

    expiredReqs = Request.objects.filter(whenAsked__lt=before).filter(Q(timedOut=False))
    for e in expiredReqs:
        e.timeOut()

    allReqs = Request.objects.filter(whenAsked__gte=before).order_by('whenAsked')
    courses = Course.objects.all().order_by('Number')

    requestData = []

    for course in courses:
        reqs = allReqs.filter(course=course).filter(timedOut=False).filter(solved=False)
        insert = (course, reqs)
        requestData.append(insert)

    isTA = TA.objects.filter(usr__id=request.user.id).exists()

    responseData = {
        'requestData': requestData,
        'isTA': isTA
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
        #TODO: add error message
        return HttpResponse(status=400)
    try:
        rq_id = int(rq_id)
    except ValueError:
        #TODO: add error message
        return HttpResponse(status=400)

    req = get_object_or_404(Request, pk=rq_id)

    if req.student.pk != student.pk and not ta:
        return HttpResponse(status=401)

    req.solved = True
    req.whenSolved = _now()
    req.timedOut = False
    req.save()
    QueueNamespace.emit({'type': 'resolve', 'rq': rq_id}, json=True)
    return HttpResponse(status=200)

############################################################################
##             Socketio Stuff
############################################################################

class QueueNamespace(BaseNamespace):
    _connections = {}
    
    def initialize(self, *args, **kwargs):
        self._connections[id(self)] = self
        socket_logger.debug("Adding socket with ID {}".format(id(self)))
        super(QueueNamespace, self).initialize(*args, **kwargs)
        
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
            logger.debug("Sending {0} to {1} with id {2}".format(msg, connection, connection_id))
            connection.send(msg, json)
   
    
def socketio(request):
    try:
        socketio_manage(request.environ, 
                        {
                            '/taqueue': QueueNamespace,
                        }, 
                        request=request
        )
    except:
        logger.error("Exception while handling sockets")

    return HttpResponse()

