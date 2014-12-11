from django.contrib.auth.models import User
from django.utils.html import escape, strip_tags
# from tastypie import fields
from tastypie.http import HttpBadRequest, HttpUnauthorized
import dateutil
import pytz
import logging
import datetime
from HalliganAvailability import settings
from tastypie.utils import trailing_slash
from django.conf.urls import url
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import MultiAuthentication, SessionAuthentication
from tastypie.resources import ModelResource, ALL_WITH_RELATIONS
from .authorization import NoEditAuthorization
from .models import Course, TA, OfficeHour
from .models import Request, Student
from HalliganAvailability.authentication import OAuth20Authentication
# from .tasks import cancel_hours
logger = logging.getLogger('api')


def _now():
    now = datetime.datetime.now(pytz.timezone(settings.TIME_ZONE))
    return now


class CommonMeta(object):
    authorization = DjangoAuthorization()
    authentication = MultiAuthentication(OAuth20Authentication(),
                                         SessionAuthentication())
    limit = 0


class CourseResource(ModelResource):
    class Meta(CommonMeta):
        queryset = Course.objects.all()
        authorization = NoEditAuthorization()
        filtering = {
            'Name': ['exact', 'iexact', 'startswith', ],
            'Number': ['exact', 'lte', 'lt', 'gte', 'gt', ],
            'Professor': ['exact', 'iexact', 'startswith', ],
        }
        fields = ['Name', 'Number', 'Professor', 'students']
        allowed_methods = ['get']

class TAResource(ModelResource):
    class Meta(CommonMeta):
        authorization = NoEditAuthorization()
        queryset = TA.objects.active()
        # queryset = TA.objects.all()
        fields = ['headshot']
        allowed_methods = ['get']

    def dehydrate(self, bundle):
        bundle.data['full_name'] = bundle.request.user.get_full_name()
        return bundle

class OfficeHourResource(ModelResource):
    class Meta:
        queryset = OfficeHour.objects.all()

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()

class RequestResource(ModelResource):
    class Meta:
        queryset = Request.objects.all()
