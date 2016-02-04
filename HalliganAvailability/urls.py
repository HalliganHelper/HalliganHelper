from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from tas import api as tas_api

admin.autodiscover()

urlpatterns = patterns('',
                       # Uncomment the admin/doc line below to enable admin documentation:
                       # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
                       url(r'^accounts/',
                           include('registration.backends.default.urls')
                           ),
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', 'computers.views.ModularHomePage', name='ModularHomePage'),
                       url('^api/', include(tas_api.urls)),
                       )

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
