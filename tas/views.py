import logging

from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.shortcuts import HttpResponseRedirect
from registration.backends.default.views import RegistrationView
from registration.signals import user_registered, user_activated

from .utils import check_ta
from .forms import TAPhotoChangeForm
from .models import Student, TA
from .custom_user_forms import EmailUserCreationForm, EmailAuthenticationForm


logger = logging.getLogger(__name__)


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


class TuftsRegistrationView(RegistrationView):
    form_class = EmailUserCreationForm


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
