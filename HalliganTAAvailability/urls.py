__author__ = 'tyler'
from django.conf.urls import patterns, include, url


urlpatterns = patterns('HalliganTAAvailability.views',

)

urlpatterns += patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
)