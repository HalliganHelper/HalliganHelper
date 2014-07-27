from django.contrib.auth.models import User
from tastypie import fields
# from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication
# from tastypie.authentication import MultiAuthentication
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import MultiAuthentication, SessionAuthentication
from tastypie.resources import ModelResource
from .models import Course, TA, OfficeHour
# from .models import Request, Student
from HalliganAvailability.authentication import OAuth20Authentication
import logging
logger = logging.getLogger('api')


class CommonMeta:
    authorization = DjangoAuthorization()
    authentication = MultiAuthentication(OAuth20Authentication(),
                                         SessionAuthentication())


class CourseResource(ModelResource):
    tas = fields.ToManyField('HalliganTAAvailability.api.TAResource',
                             'ta_set',
                             full=True)

    class Meta:
        queryset = Course.objects.all()
        filtering = {
            'Name': ['exact', 'iexact', 'startswith', ],
            'Number': ['exact', 'lte', 'lt', 'gte', 'gt', ],
            'Professor': ['exact', 'iexact', 'startswith', ],
        }
        resource_name = 'course'
        fields = ['Name', 'Number', 'Professor', 'students']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class TAResource(ModelResource):
    course = fields.ToManyField(CourseResource, 'course')

    def dehydrate(self, bundle):
        bundle.data['name'] = bundle.obj.usr.get_full_name()
        return bundle

    class Meta:
        queryset = TA.objects.all()
        filtering = {
            'active': ['exact', ],
        }
        fields = ['active']
        resource_name = 'ta'
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class OfficeHourResource(ModelResource):
    ta = fields.ForeignKey(TAResource, 'ta', full=True)

    class Meta:
        queryset = OfficeHour.objects.all()
        filtering = {
            'start_time': ['exact', 'lt', 'lte', 'gt', 'gte', ],
            'end_time': ['exact', 'lt', 'lte', 'gt', 'gte', ],
        }
        resource_name = 'officehour'
        fields = ['start_time', 'end_time', 'course', 'ta', 'location']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class UserResource(ModelResource):
    class Meta(CommonMeta):
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ['email', 'first_name', 'last_name', 'date_joined']

    def authorized_read_list(self, object_list, bundle):
        return object_list.filter(pk=bundle.request.user.pk)
