from django.conf.urls import patterns, include, url

from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter

from .views import (SchoolView, CourseViewSet, RequestViewSet,
                    TAViewSet, OfficeHourViewSet, UserViewSet)

v3_school_router = DefaultRouter()
v3_user_router = DefaultRouter()

v3_user_router.register(r'user', UserViewSet)
v3_school_router.register(r'courses', CourseViewSet)

course_router = NestedSimpleRouter(v3_school_router,
                                   r'courses',
                                   lookup='course')
course_router.register(r'requests', RequestViewSet)
course_router.register(r'tas', TAViewSet, base_name='ta')
course_router.register(r'officehours', OfficeHourViewSet)


urls = patterns('',
                url(r'^v3/', include(v3_user_router.urls,
                                     namespace='v3')),
                url(r'^v3/school/$', SchoolView.as_view()),
                url(r'^v3/school/', include(v3_school_router.urls,
                                            namespace='v3')),
                url(r'^v3/school/', include(course_router.urls,
                                            namespace='v3')),
                )
