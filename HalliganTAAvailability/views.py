from django.shortcuts import render, render_to_response, HttpResponseRedirect
from registration.backends.default.views import RegistrationView
from forms import TuftsEmail, RequestForm, TARegister
from models import Student, Request, TA, Course
from django.contrib.auth.admin import User
from forms import LoginForm
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from registration.signals import user_registered

from forms import TuftsEmail
import pytz, datetime
from HalliganAvailability import settings

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
            return HttpResponseRedirect('/users/listRequests')
    else:
        form = RequestForm()

    data = {'form': form}
    return render(request, 'getHelp.html', data)

@login_required()
def listRequests(request):
    try:
        stu = Student.objects.get(usr=request.user)
    except Student.DoesNotExist:
        print 'fail'
        return render_to_response('listRequests.html')

    rqs = Request.objects.filter(student=stu)
    data = {'requests': rqs}
    print data['requests']
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


def onlineQueue(request):
    tz = pytz.timezone(settings.TIME_ZONE)
    before = datetime.datetime.now(tz) - datetime.timedelta(hours=3)
    
    allReqs = Request.objects.filter(whenAsked__gte=before).order_by('-whenAsked')
    courses = Course.objects.all().order_by('Number')

    requestData = []

    for course in courses:
        insert = (course, allReqs.filter(course=course))
        requestData.append(insert)

    isTA = TA.objects.filter(usr=request.user).count() > 0

    responseData = {
        'requestData': requestData,
        'isTA': isTA
    }

    return render(request, 'taSystem.html', responseData)
