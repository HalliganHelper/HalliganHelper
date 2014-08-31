__author__ = 'tyler'
from django.conf.urls import patterns, include, url
from views import TuftsRegistrationView

urlpatterns = patterns('HalliganTAAvailability.views',
    url(r'^accounts/register/$', TuftsRegistrationView.as_view()),
    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^taSystem$', 'onlineQueue', name='taSystem'),
    url(r'^users$', 'profile', name='userProfile'),
    url(r'^users/gethelp$', 'getHelp', name='getHelp'),
    url(r'^users/listRequests', 'listRequests', name='listRequests'),
    url(r'^users/resolveRequest', 'resolveRequest', name='resolveRequest'),
    url(r'^add_hours', 'go_on_duty', name='go_on_duty'),
    url(r'^cancel_hours', 'cancel_hours', name='cancel_hours'),
    url(r'^socket\.io', 'socketio', name='socketio'),
    url(r'^login_or_register', 'login_or_register', name='login_or_register'),
)
