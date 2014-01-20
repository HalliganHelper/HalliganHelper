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
from django.db.models import Q
from HalliganAvailability import settings



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
def getHelp(request):
    if request.method == 'POST':
        form = RequestForm(request.POST)
        if form.is_valid():
            rq = form.save(commit=False)
            stu, create = Student.objects.get_or_create(usr=request.user)
            rq.student = stu
            rq.save()
            return HttpResponseRedirect(reverse('taSystem'))
    else:
        form = RequestForm()

    data = {'form': form}
    return render(request, 'getHelp.html', data)

@login_required()
def listRequests(request):
    try:
        stu = Student.objects.get(usr=request.user)
        rqs = stu.request_set.order_by('-whenAsked')
    except Student.DoesNotExist:
        rqs = None
        #return render_to_response('listRequests.html')

    #rqs = Request.objects.filter(student=stu).order_by('-whenAsked')
    data = {'requests': rqs}
    return render(request, 'listRequests.html', data)


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
        print e
        e.timeOut()

    allReqs = Request.objects.filter(whenAsked__gte=before).order_by('whenAsked')
    courses = Course.objects.all().order_by('Number')

    requestData = []

    for course in courses:
        reqs = allReqs.filter(course=course).filter(timedOut=False).filter(solved=False)
        insert = (course, reqs)
        requestData.append(insert)

    isTA = TA.objects.filter(usr=request.user).count() > 0

    responseData = {
        'requestData': requestData,
        'isTA': isTA
    }

    return render(request, 'taSystem.html', responseData)


@require_POST
@login_required()
def resolveRequest(request):
    id = request.POST.get('requestID', None)
    student = Student.objects.get(usr=request.user)
    try:
        ta = TA.objects.get(usr=request.user)
    except TA.DoesNotExist:
        ta = None
    if not id:
        #TODO: add error message
        return HttpResponse(status=400)
    try:
        id = int(id)
    except ValueError:
        #TODO: add error message
        return HttpResponse(status=400)

    req = get_object_or_404(Request, pk=id)

    if req.student.pk != student.pk and not ta:
        return HttpResponse(status=401)

    req.solved = True
    req.whenSolved = _now()
    req.timedOut = False
    req.save()

    return HttpResponse(status=200)


