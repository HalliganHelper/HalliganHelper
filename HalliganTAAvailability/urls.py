__author__ = 'tyler'
from django.conf.urls import patterns, include, url
from HalliganTAAvailability.forms import TuftsEmail
from views import TuftsRegistrationView




urlpatterns = patterns('',
    url(r'^accounts/register/$', TuftsRegistrationView.as_view()),
    url(r'^accounts/', include('registration.backends.default.urls')),
    #url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),

)