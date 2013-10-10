from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from HalliganComputerAvailability import urls as ComputerURLS
from HalliganTAAvailability import urls as TAURLS

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'HalliganAvailability.views.home', name='home'),
    # url(r'^HalliganAvailability/', include('HalliganAvailability.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    #url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('HalliganComputerAvailability.urls')),
    url(r'^ta/', include('HalliganTAAvailability.urls')),
    #url(r'^$', 'HalliganComputerAvailability.views.HomePage'),
    url(r'^$', 'HalliganComputerAvailability.views.ModularHomePage', name='ModularHomePage'),
    url(r'^grid$', 'HalliganComputerAvailability.views.GridPage', name='GridPage'),
)

urlpatterns += staticfiles_urlpatterns()
