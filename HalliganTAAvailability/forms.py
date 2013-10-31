from registration.forms import RegistrationFormUniqueEmail
from django import forms
from models import Request, Student, Course
import datetime
import pytz
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class TuftsEmail(RegistrationFormUniqueEmail):

    first_name = forms.CharField()
    last_name = forms.CharField()

    def clean_email(self):
        data = super(TuftsEmail, self).clean_email()

        if data.split('@')[1].lower() != 'tufts.edu':
            raise forms.ValidationError("Only @tufts.edu email addresses are allowed.")
        return data


class LoginForm(forms.Form):
    username = forms.CharField(max_length=30,
                               label=_("Username"))
    password = forms.CharField(widget=forms.PasswordInput,
                                label=_("Password"))


class RequestForm(forms.ModelForm):
    class Meta:
        model = Request
        fields = ['question', 'whereLocated', 'course' ]

    def __init__(self, *args, **kwargs):
        est = pytz.timezone('US/Eastern')
        self.whenAsked = datetime.datetime.now(est)
        super(RequestForm, self).__init__(*args, **kwargs)


class SuggestionForm(forms.Form):
    suggestion = forms.CharField(widget=forms.Textarea)
    name = forms.CharField()
    email = forms.CharField(required=False)

    #def send(self):


class TARegister(forms.Form):
    password = forms.CharField()
    classes = forms.ModelMultipleChoiceField(queryset=Course.objects.all())







