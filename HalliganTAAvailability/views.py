from django.shortcuts import render, render_to_response, HttpResponseRedirect
from registration.backends.default.views import RegistrationView
from forms import TuftsEmail, RequestForm
from models import Student, Request, TA
from django.contrib.auth.admin import User
from forms import LoginForm
from django.contrib import auth
from registration.signals import user_registered
from forms import TuftsEmail


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


def login(request):
    username = password = ''
    errors = False
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            usr = None
            try:
                usr = User.objects.get(username=username)
            except User.DoesNotExist:
                try:
                    usr = User.objects.get(email=username)
                except User.DoesNotExist:
                    pass

            if usr is not None:
                user = auth.authenticate(username=usr.username, password=password)
                if user is not None:
                    auth.login(request, user)
                    return HttpResponseRedirect('/')
            errors = True
    else:
        form = LoginForm()

    data = {'form': form, 'errors': errors}

    return render(request, 'registration/login.html', data)




def courseList(request):
    return render_to_response('courseList.html')


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


def profile(request):
    usr = User.objects.get(email=request.user.email)
    student = Student.objects.get(usr=usr)

    try:
        rqs = Request.objects.filter(student=student)
        ta = TA.objects.get(usr=usr)
    except Request.DoesNotExist:
        rqs = None
    except TA.DoesNotExist:
        ta = None

    data = {'student': student, 'rqs': rqs, 'ta': ta}
    return render(request, 'profile.html', data)


def taSystem(request):
    r = Request.objects.all()
    data = {'req': r}
    return render(request, 'taSystem.html', data)