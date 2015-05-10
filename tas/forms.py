from registration.forms import RegistrationFormUniqueEmail
from django import forms
from models import Request, Course, OfficeHour
from imagekit import ImageSpec, register
from imagekit.processors import ResizeToFit
from imagekit.forms import ProcessedImageField
from django.utils.translation import ugettext_lazy as _


class TuftsEmail(RegistrationFormUniqueEmail):

    first_name = forms.CharField()
    last_name = forms.CharField()

    def clean_email(self):
        data = super(TuftsEmail, self).clean_email()
        domain = data.split('@')[1].lower()
        # TODO: Make this be 'if not in'
        if domain != 'tufts.edu' and domain != 'cs.tufts.edu':
            msg = 'Only @tufts.edu email addresses are allowed.'
            raise forms.ValidationError(msg)
        return data


class LoginForm(forms.Form):
    username = forms.CharField(max_length=30,
                               label=_("Username"))
    password = forms.CharField(widget=forms.PasswordInput,
                               label=_("Password"))


class RequestForm(forms.ModelForm):
    course = forms.ModelChoiceField(queryset=Course.objects.order_by('Number'))

    class Meta:
        model = Request
        fields = ['question', 'whereLocated', 'course']

    def __init__(self, *args, **kwargs):
        super(RequestForm, self).__init__(*args, **kwargs)


class ResolveForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ResolveForm, self).__init_(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        if instance and instance.pk:
            self.fields['course'].widget.attrs['readonly'] = True
            self.fields['question'].widget.attrs['readonly'] = True
            self.fields['whenSolved'].widget.attrs['readonly'] = True

    class Meta:
        model = Request
        fields = ['course', 'question', 'whenSolved']


class SuggestionForm(forms.Form):
    suggestion = forms.CharField(widget=forms.Textarea)
    name = forms.CharField()
    email = forms.CharField(required=False)


class TARegister(forms.Form):
    password = forms.CharField()
    classes = forms.ModelMultipleChoiceField(queryset=Course.objects.all())


class OfficeHourForm(forms.ModelForm):
    class Meta:
        model = OfficeHour
        fields = ['end_time', 'course', 'location']


class CancelHoursForm(forms.Form):
    confirm = forms.BooleanField(required=False)


class HeadShot(ImageSpec):
    processors = [ResizeToFit(100, 100)]
    format = 'JPEG'
    options = {'quality': 60}

register.generator('tas:Headshot', HeadShot)


class TAPhotoChangeForm(forms.Form):
    image = ProcessedImageField(spec_id='tas:Headshot')

class ForgotUsernameForm(forms.Form):
    email = forms.EmailField()

