from registration.forms import RegistrationFormUniqueEmail
from django import forms


class TuftsEmail(RegistrationFormUniqueEmail):
    def clean_email(self):
        data = super(TuftsEmail, self).clean_email()

        if data.split('@')[1].lower() != 'tufts.edu':
            raise forms.ValidationError("Only logins from @tufts.edu email addresses are allowed.")
        return data



