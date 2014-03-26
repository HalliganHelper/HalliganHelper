from tastypie import fields
from tastypie.resources import ModelResource
from HalliganComputerAvailability.models import RoomInfo, CourseUsageInfo

class RoomInfoResource(ModelResource):
    cuis = fields.ToManyField('HalliganComputerAvailability.api.CourseUsageInfoResource', 'cuis', full=True)

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


class CourseUsageInfoResource(ModelResource):
    room = fields.ToOneField(RoomInfoResource, 'room')
    class Meta:
        queryset = CourseUsageInfo.objects.all()

