__author__ = 'tyler'
from django.conf.urls import patterns, url

urlpatterns = patterns('HalliganComputerAvailability.views',
                       url(r'^updateServer/(?P<MchID>.+)/(?P<NewStatus>.+)/(?P<num_users>\d+)',
                           'UpdateServer',
                           name='UpdateServer'),
                       )
