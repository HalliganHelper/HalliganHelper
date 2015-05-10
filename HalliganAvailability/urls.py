from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from tastypie.api import Api
from django.conf import settings
from django.conf.urls.static import static

from manifesto.views import ManifestView

# Computer Availability api
from computers.api import CourseUsageInfoResource
from computers.api import LabResource, ComputerResource
from computers.api import ServerResource, RoomInfoResource

# TA Availability api
from HalliganTAAvailability.api import CourseResource, OfficeHourResource
from HalliganTAAvailability.api import TAResource, RequestResource

v1_api = Api(api_name='v2')

# Computer Availability api
v1_api.register(CourseUsageInfoResource())
v1_api.register(RoomInfoResource())
v1_api.register(LabResource())
v1_api.register(ComputerResource())
v1_api.register(ServerResource())

# TA Availability api
v1_api.register(CourseResource())
v1_api.register(OfficeHourResource())
v1_api.register(TAResource())
# v1_api.register(UserResource())
v1_api.register(RequestResource())


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       # Uncomment the admin/doc line below to enable admin documentation:
                       # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api/', include(v1_api.urls)),
                       url(r'^oauth2/', include('provider.oauth2.urls', namespace='oauth2')),
                       url(r'^api/', include('computers.urls')),
                       url(r'^', include('HalliganTAAvailability.urls')),
                       url(r'^$', 'computers.views.ModularHomePage', name='ModularHomePage'),
#                        url(r'^manifest\.appcache$', ManifestView.as_view(), name='cache_manifest'),
                       )

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
