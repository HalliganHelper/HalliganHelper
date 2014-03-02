from tastypie import fields
from tastypie.resources import ModelResource
from HalliganComputerAvailability.models import RoomInfo, CourseUsageInfo

class RoomInfoResource(ModelResource):
    cuis = fields.ToManyField('HalliganComputerAvailability.api.CourseUsageInfoResource', 'cuis', full=True)

    class Meta:
        queryset = RoomInfo.objects.all()
        resource_name = 'roominfo'
        fields = ['lab', 'numReporting', 'num_available', 'num_unavailable',
                  'num_error', 'updateTime']
        allowed_methods = ['get']
        limit = 100

    def obj_get_list(self, bundle, **kwargs):
        full_query = RoomInfo.objects.all()
        if 'room' in bundle.request.GET:
            param = bundle.request.GET['room']
            full_query = full_query.filter(lab=param)
   
        return full_query.order_by('updateTime')

class CourseUsageInfoResource(ModelResource):
    room = fields.ToOneField(RoomInfoResource, 'room')
    class Meta:
        queryset = CourseUsageInfo.objects.all()

