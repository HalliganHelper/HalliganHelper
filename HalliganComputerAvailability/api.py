from tastypie import fields
from tastypie.resources import ModelResource
# from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication
# from tastypie.authentication import MultiAuthentication
from tastypie.authorization import DjangoAuthorization
from HalliganComputerAvailability.models import RoomInfo, CourseUsageInfo
from HalliganComputerAvailability.models import Lab, Computer, Server


class ComputerResource(ModelResource):

    class Meta:
        queryset = Computer.objects.all()
        limit = 0
        filtering = {
            'number': ['exact', ],
            'room_number': ['exact', ],
            'status': ['exact', 'iexact', ],
            'used_for': ['exact', 'iexact'],
        }
        resource_name = 'computer'
        fields = ['number', 'room_number', 'status', 'used_for',
                  'last_update']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class RoomInfoResource(ModelResource):
    cuis = fields.ToManyField(
        'HalliganComputerAvailability.api.CourseUsageInfoResource',
        'cuis', full=True
        )

    class Meta:
        queryset = RoomInfo.objects.all().order_by('-last_updated')
        filtering = {
            'lab': ['exact', ],
        }
        resource_name = 'roominfo'
        fields = ['lab', 'num_reporting', 'num_available', 'num_unavailable',
                  'num_error', 'last_updated']
        allowed_methods = ['get']
        limit = 100
        authorization = DjangoAuthorization()


class CourseUsageInfoResource(ModelResource):
    room = fields.ToOneField(RoomInfoResource, 'room')

    class Meta:
        queryset = CourseUsageInfo.objects.all()
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class ServerResource(ModelResource):

    class Meta:
        queryset = Server.objects.all()
        filtering = {
            'name': ['exact', 'iexact'],
            'num_users': ['exact', ],
            'status': ['exact', 'iexact', ],
        }
        resource_name = 'server'
        fields = ['name', 'num_users', 'status', 'last_updated']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class LabResource(ModelResource):

    day_of_week_str = fields.CharField(attribute='day_of_week_name')
    in_session = fields.BooleanField(attribute='is_lab_in_session')
    coming_up = fields.BooleanField(attribute='is_lab_coming_up')

    class Meta:
        queryset = Lab.objects.all().order_by('day_of_week', 'start_time')
        allowed_methods = ['get']
        filtering = {
            'room_number': ['exact', ],
            'course_name': ['exact', ],
            'start_date': ['lt', 'lte', 'gt', 'gte', ],
            'end_date': ['lt', 'lte', 'gt', 'gte', ],
            'start_time': ['lt', 'lte', 'gt', 'gte', ],
            'end_time': ['lt', 'lte', 'gt', 'gte', ],
            # 'in_session': ['exact', ],
            # 'coming_up': ['exact', ],
        }

        resource_name = 'lab'
        fields = ['course_name', 'room_number', 'start_time', 'end_time',
                  'start_date', 'end_date', 'day_of_week', 'is_lab_in_session']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()
