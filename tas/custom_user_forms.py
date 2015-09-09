from django.contrib.auth.forms import (UserCreationForm,
                                       UserChangeForm,
                                       AuthenticationForm)
from django import forms
from .custom_user import CustomUser
from django.conf import settings


class CustomUserCreationForm(UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        del self.fields['username']

    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name',)


class EmailUserCreationForm(CustomUserCreationForm):

    def __init__(self, *args, **kwargs):
        super(EmailUserCreationForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget = forms.TextInput(attrs={'type': 'email'})

    def clean_email(self):
        allowed_domains = getattr(settings, 'ALLOWED_REGISTRATION_DOMAINS')
        email = self.cleaned_data['email']
        domain = email.split('@')[1].lower()
        if domain not in allowed_domains:
            msg = 'Emails must belong to one of the following domains: {{{}}}'
            raise forms.ValidationError(msg.format(','.join(allowed_domains)))
        return email


class EmailAuthenticationForm(AuthenticationForm):

    def __init__(self, *args, **kwargs):
        super(EmailAuthenticationForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget = forms.TextInput(attrs={'type': 'email'})


class CustomUserChangeForm(UserChangeForm):

    def __init__(self, *args, **kwargs):
        super(CustomUserChangeForm, self).__init__(*args, **kwargs)
        del self.fields['username']

    class Meta:
        model = CustomUser
