__author__ = 'tyler'
from django.conf.urls import patterns, include, url
from HalliganTAAvailability.forms import TuftsEmail
from views import TuftsRegistrationView




urlpatterns = patterns('',
    url(r'^accounts/register/$', TuftsRegistrationView.as_view()),
#    url(r'^accounts/login/$', 'HalliganTAAvailability.views.login', name='login'),
    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^taSystem$', 'HalliganTAAvailability.views.onlineQueue', name='taSystem'),
    url(r'^users$', 'HalliganTAAvailability.views.profile', name='userProfile'),
    url(r'^users/gethelp', 'HalliganTAAvailability.views.getHelp', name='getHelp'),
    url(r'^users/listRequests', 'HalliganTAAvailability.views.listRequests', name='listRequests'),

    #url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),

)
