import logging
import requests
import json

from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.forms import AuthenticationForm
from django.core.mail import EmailMultiAlternatives
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from django.shortcuts import HttpResponseRedirect
from django.template import Context
from django.template.loader import get_template
from registration.backends.default.views import RegistrationView
from registration.signals import user_registered, user_activated

from .forms import TAPhotoChangeForm, ForgotUsernameForm
from .models import Student, Request, TA, Course, OfficeHour
from .custom_user_forms import EmailUserCreationForm, EmailAuthenticationForm


logger = logging.getLogger(__name__)


def notify(user, courses, adding_ta=True):
    subject = 'TA Activation'
    from_email = 'halliganhelper@tylerlubeck.com'
    to_email = user.email
    if adding_ta:
        plaintext = get_template('tas/ta_activation.txt')
        htmly = get_template('tas/ta_activation.html')
    else:
        plaintext = get_template('tas/remove_ta.txt')
        htmly = get_template('tas/remove_ta.html')

    d = Context({'user': user, 'courses': courses})
    text_content = plaintext.render(d)
    html_content = htmly.render(d)

    msg = EmailMultiAlternatives(subject, text_content,
                                 from_email, [to_email])
    msg.attach_alternative(html_content, 'text/html')
    msg.send()


def check_ta(user):
    # Because apparently having an '@' in the email gives a 403 back from Tufts
    email = user.email.replace('@', ':')
    logger.info('Checking if TA: user_id=%s email=%s', user.pk, email)
    url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
    r = requests.get(url.format(email))
    logger.info('Checking if TA: user_id=%s status=%s courses=%s',
                user.pk, r.status_code, r.text)
    is_ta = r.text.strip() != 'NONE'
    if is_ta:
        course_nums = r.text.strip().split(' ')
        courses = Course.objects.filter(number__in=course_nums)

        logger.debug('Added TA user_id', user.pk)
        ta, created = TA.objects.get_or_create(user=user)
        ta.active = True
        ta.course = courses
        ta.save()
        notify(user, courses, adding_ta=True)
    else:
        if TA.objects.filter(user__email=email).exists():
            ta = TA.objects.get(user__email=email)
            ta.active = False
            ta.courses = []
            ta.save()
            notify(user, None, adding_ta=False)


def user_confirmed(sender, user, request, **kwargs):
    check_ta(user)
    logger.info('Confirmed user: user_id=%s', user.pk)


def user_created(sender, user, request, **kwargs):
    form = EmailUserCreationForm(request.POST)
    stu, created = Student.objects.get_or_create(user=user)
    stu.save()
    user.first_name = form.data['first_name']
    user.last_name = form.data['last_name']
    user.save()
    logger.info('Created a user: user_id=%s', user.pk)

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
    form_class = EmailUserCreationForm


def send_forgotten_username_email(user):
    logger.info('Sending forgotten username email. user_id=%s', user.pk)
    subject = 'Forgotten HalliganHelper Username'
    from_email = 'halliganhelper@tylerlubeck.com'
    to_email = user.email
    plaintext = get_template('registration/forgotten_username_email.txt')
    htmly = get_template('registration/forgotten_username_email.html')

    d = Context({'user': user})
    text_content = plaintext.render(d)
    html_content = htmly.render(d)

    msg = EmailMultiAlternatives(subject, text_content,
                                 from_email, [to_email])
    msg.attach_alternative(html_content, 'text/html')
    msg.send()


def forgot_username(request):
    logger.info('Starting forgotten username view. user_id=%s',
                request.user.pk)
    if request.method == 'POST':
        form = ForgotUsernameForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            try:
                user = User.objects.get(email=email)
                send_forgotten_username_email(user)
            except User.DoesNotExist:
                # This means that the email does not exist
                pass
            return HttpResponseRedirect(reverse('sent_username'))
    else:
        form = ForgotUsernameForm()

    return render(request,
                  'registration/forgot_username_form.html',
                  {'form': form})


def sent_username(request):
    return render(request,
                  'registration/forgot_username_complete.html',
                  {})


def is_ta(user):
    try:
        return user.ta.active
    except TA.DoesNotExist:
        return False


def login_or_register(request):
    if request.method == 'POST':
        register_form = EmailUserCreationForm(request.POST)
        login_form = EmailAuthenticationForm(request.POST)
    else:
        register_form = EmailUserCreationForm()
        login_form = EmailAuthenticationForm()
    template_vars = {
        'register': register_form,
        'login': login_form
    }
    return render(request,
                  'tas/login_or_register.html',
                  template_vars)


@login_required()
@user_passes_test(is_ta)
def update_photo(request):
    logger.info('Update a photo for user. user_id=%s', request.user.pk)
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
                  'tas/update_photo.html',
                  template_params)
