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
        filtering = {
            'ComputerNumber': ['exact', ],
            'RoomNumber': ['exact', ],
            'Status': ['exact', 'iexact', ],
            'used_for': ['exact', 'iexact'],
        }
        resource_name = 'computer'
        fields = ['ComputerNumber', 'RoomNumber', 'Status', 'used_for',
                  'LastUpdate']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class RoomInfoResource(ModelResource):
    cuis = fields.ToManyField(
        'HalliganComputerAvailability.api.CourseUsageInfoResource',
        'cuis', full=True
        )

    class Meta:
        queryset = RoomInfo.objects.all().order_by('-updateTime')
        filtering = {
            'lab': ['exact', ],
        }
        resource_name = 'roominfo'
        fields = ['lab', 'numReporting', 'num_available', 'num_unavailable',
                  'num_error', 'updateTime']
        allowed_methods = ['get']
        limit = 100
        authorization = DjangoAuthorization()


class CourseUsageInfoResource(ModelResource):
    room = fields.ToOneField(RoomInfoResource, 'room')

    class Meta:
        queryset = CourseUsageInfo.objects.all()
        authorization = DjangoAuthorization()


class ServerResource(ModelResource):

    class Meta:
        queryset = Server.objects.all()
        filtering = {
            'ComputerName': ['exact', 'iexact'],
            'NumUsers': ['exact', ],
            'Status': ['exact', 'iexact', ],
        }
        resource_name = 'server'
        fields = ['ComputerName', 'NumUsers', 'Status', 'LastUpdated']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class LabResource(ModelResource):

    class Meta:
        queryset = Lab.objects.all()
        filtering = {
            'RoomNumber': ['exact', ],
            'ClassName': ['exact', ],
            'StartDate': ['lt', 'lte', 'gt', 'gte', ],
            'EndDate': ['lt', 'lte', 'gt', 'gte', ],
            'StartTime': ['lt', 'lte', 'gt', 'gte', ],
            'EndTime': ['lt', 'lte', 'gt', 'gte', ],
            # 'in_session': ['exact', ],
            # 'coming_up': ['exact', ],
        }

        resource_name = 'lab'
        fields = ['ClassName', 'RoomNumber', 'StartTime', 'EndTime',
                  'StartDate', 'EndDate', 'DayOfWeek', 'is_lab_in_session']
        allowed_methods = ['get']
        authorization = DjangoAuthorization()
