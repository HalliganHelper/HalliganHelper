from registration.forms import RegistrationFormUniqueEmail
from django import forms
from models import Request, Student, Course
import datetime
import pytz
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.utils.translation import ugettext_lazy as _


#class RegisteredUserAuthentication(AuthenticationForm):
        #super(RegisteredUserAuthentication, self).__init__(*args, **kwargs)



class TuftsEmail(RegistrationFormUniqueEmail):

    first_name = forms.CharField()
    last_name = forms.CharField()

    def clean_email(self):
        data = super(TuftsEmail, self).clean_email()
        domain = data.split('@')[1].lower()
        #TODO: Make this be 'if not in'
        if domain != 'tufts.edu' and domain != 'cs.tufts.edu':
            raise forms.ValidationError("Only @tufts.edu email addresses are allowed.")
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
        fields = ['question', 'whereLocated', 'course' ]

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

    #def send(self):


class TARegister(forms.Form):
    password = forms.CharField()
    classes = forms.ModelMultipleChoiceField(queryset=Course.objects.all())







