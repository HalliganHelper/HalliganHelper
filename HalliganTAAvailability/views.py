from registration.backends.default.views import RegistrationView
from forms import TuftsEmail
from django.contrib.auth.admin import User

class TuftsRegistrationView(RegistrationView):
    form_class = TuftsEmail

#    def register(self, request, **cleaned_data):
