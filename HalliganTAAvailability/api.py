from tastypie import fields
from tastypie.resources import ModelResource
# from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication
# from tastypie.authentication import MultiAuthentication
from tastypie.authorization import DjangoAuthorization
from .models import Student, Course, TA, Request, OfficeHour


class CourseResource(ModelResource):
    tas = fields.ToManyField('HalliganTAAvailability.api.TAResource',
                             'ta_set',
                             full=True)

    class Meta:
        queryset = Course.objects.all()
        filtering = {
            'Name': ['exact', 'iexact', ],
            'Number': ['exact', 'lte', 'lt', 'gte', 'gt', ],
            'Professor': ['exact', 'iexact', ],
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
