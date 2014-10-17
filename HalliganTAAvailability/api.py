from django.contrib.auth.models import User
from django.utils.html import escape, strip_tags
from tastypie import fields
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
        fields = ['active', 'headshot']
        resource_name = 'ta'
        allowed_methods = ['get']
        authorization = DjangoAuthorization()


class OfficeHourResource(ModelResource):
    ta = fields.ForeignKey(TAResource, 'ta', full=True)
    course = fields.ForeignKey(CourseResource, 'course', full=True)

    class Meta(CommonMeta):
        queryset = OfficeHour.objects.all()
        resource_name = 'officehour'
        fields = ['start_time', 'end_time', 'course', 'ta', 'location', 'id']
        allowed_methods = ['get', 'post', 'put']
        filtering = {
            'start_time': ['exact', 'lt', 'lte', 'gt', 'gte', ],
            'end_time': ['exact', 'lt', 'lte', 'gt', 'gte', ],
            'course': ALL_WITH_RELATIONS,
        }

    def get_object_list(self, request):
        now = _now()

        return super(OfficeHourResource, self)\
            .get_object_list(request)\
            .filter(start_time__lte=now)\
            .filter(end_time__gte=now)

    def alter_list_data_to_serialize(self, request, data):
        try:
            data['meta']['ta'] = request.user.ta.active
        except Exception:
            data['meta']['ta'] = False
        return data

    def dehydrate(self, bundle):
        return bundle

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/go_on_duty%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('go_on_duty'), name="go_on_duty"),
        ]

    def go_on_duty(self, request, **kwargs):
        try:
            if not request.user.ta.active:
                return self.create_response(request, {
                    'success': False,
                }, HttpUnauthorized)

        except TA.DoesNotExist:
            return self.create_response(request, {
                'success': False,
            }, HttpUnauthorized)

        data = self.deserialize(request,
                                request.raw_post_data,
                                format=request.META.get('CONTENT_TYPE',
                                                        'application/json'))
        location = data.get('location', None)
        end_time = data.get('end_time', None)
        course_num = data.get('course_num', None)

        if location is None or end_time is None or course_num is None:
            return self.create_response(request, {
                'success': False,
                'reason': 'MISSING'
            }, HttpBadRequest)
        try:
            tz = pytz.timezone(settings.TIME_ZONE)
            end_time = dateutil.parser.parse(end_time)
            end_time.astimezone(tz)
        except Exception:
            return self.create_response(request, {
                'success': False,
            }, HttpBadRequest)

        try:
            course = Course.objects.get(Number=course_num)
        except Course.DoesNotExist:
            return self.create_response(request, {
                'success': False,
            }, HttpBadRequest)
        oh = OfficeHour(start_time=_now(), end_time=end_time,
                        course=course, ta=request.user.ta,
                        location=location)
        oh.save()
        response = self.create_response(request, {
            'success': True,
            })

        # cancel_hours.apply_async(args=[oh.pk, course.Number], countdown=2)
        from .views import QueueNamespace
        QueueNamespace.send_ta_update(oh.course.Number, oh.pk)
        # cancel_hours.apply_async(oh.pk, eta=end_time)
        return response


class UserResource(ModelResource):
    class Meta(CommonMeta):
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ['email', 'first_name', 'last_name', 'date_joined']

    def authorized_read_list(self, object_list, bundle):
        return object_list.filter(pk=bundle.request.user.pk)


class GeneralUserResource(ModelResource):
    class Meta(CommonMeta):
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ['first_name', 'last_name', 'id']
        allowed_methods = ['get']


class StudentResource(ModelResource):
    usr = fields.OneToOneField(GeneralUserResource, 'usr', full=True)

    class Meta(CommonMeta):
        queryset = Student.objects.all()
        resource_name = 'student'
        fields = ['usr']
        allowed_methods = ['get']


class RequestResource(ModelResource):
    student = fields.ForeignKey(StudentResource, 'student', full=True)
    course = fields.ForeignKey(CourseResource, 'course', full=True)

    class Meta(CommonMeta):
        queryset = Request.objects.still_open()
        resource_name = 'request'
        fields = ['question', 'whenAsked', 'whereLocated', 'id', 'checked_out']
        allowed_methods = ['get', 'post', 'put']
        filtering = {
            'course': ALL_WITH_RELATIONS
        }

    def dehydrate(self, bundle):
        is_superuser = bundle.request.user.is_superuser
        is_this_user = bundle.data['student'].data['usr'].data['id']
        is_this_user = is_this_user == bundle.request.user.pk

        try:
            is_ta = bundle.request.user.ta is not None
        except Exception:
            is_ta = False

        if is_this_user:
            bundle.data['allow_edit'] = True
        else:
            bundle.data['allow_edit'] = False

        if is_this_user or is_superuser or is_ta:
            bundle.data['allow_resolve'] = True
        else:
            bundle.data['allow_resolve'] = False

        return bundle

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/make_request%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('make_request'), name="make_request"),
            url(r"^(?P<resource_name>%s)/resolve_request%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('resolve_request'), name="resolve_request"),
            url(r"^(?P<resource_name>%s)/update_request%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('update_request'), name="update_request"),
            url(r"^(?P<resource_name>%s)/cancel_request%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('cancel_request'), name="cancel_request"),
            url(r"^(?P<resource_name>%s)/checkout_request%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('checkout_request'), name="checkout_request"),
        ]

    def make_request(self, request, **kwargs):
        data = self.deserialize(request,
                                request.raw_post_data,
                                format=request.META.get('CONTENT_TYPE',
                                                        'application/json'))
        question = data.get('question', None)
        whereLocated = data.get('whereLocated', None)
        courseNum = data.get('course', None)
        question = escape(strip_tags(question))
        whereLocated = escape(strip_tags(whereLocated))
        courseNum = escape(strip_tags(courseNum))

        if len(question) == 0 or len(whereLocated) == 0 or courseNum == -1:
            return self.create_response(request, {
                'success': False,
                'reason': 'MISSING',
                'missing_question': len(question) == 0,
                'missing_location': len(whereLocated) == 0
            }, HttpBadRequest)

        if question and whereLocated and courseNum:
            try:
                user = request.user
                course = Course.objects.get(Number=courseNum)
                rq = Request(course=course, question=question,
                             whenAsked=_now(),
                             whereLocated=whereLocated,
                             student=user.student)
                rq.save()
                from .views import QueueNamespace, AnnouncementNamespace
                AnnouncementNamespace.send_request_update(rq.course.Number)
                AnnouncementNamespace.notify_ta(user.get_full_name(),
                                                rq.course.Number)
                QueueNamespace.emit_single_request(request, rq.id)
                return self.create_response(request, {
                    'success': True
                })
            except Exception:
                return self.create_response(request, {
                    'success': False,
                    'reason': 'Creation failed'
                }, HttpBadRequest)

        return self.create_response(request, {
            'success': False,
            'reason': 'MISSING',  # Keep the same
            'missing_question': question is None,
            'missing_location': whereLocated is None
        }, HttpBadRequest)

    def resolve_request(self, request, **kwargs):
        data = self.deserialize(request,
                                request.raw_post_data,
                                format=request.META.get('CONTENT_TYPE',
                                                        'application/json'))
        request_id = data.get('id', None)

        if request_id is None:
            return self.create_response(request, {
                'success': False,
                'reason': 'MISSING'
            }, HttpBadRequest)

        try:
            this_rq = Request.objects.get(pk=request_id)
            this_rq.whenSolved = _now()
            this_rq.solved = True
            try:
                ta_solver = request.user.ta.active
            except TA.DoesNotExist:
                return self.create_response(request, {
                    'success': False,
                }, HttpUnauthorized)
                ta_solver = None
            this_rq.who_solved = ta_solver
            this_rq.whenSolved = _now()
            this_rq.solved = True
            this_rq.save()
            from .views import QueueNamespace, AnnouncementNamespace
            AnnouncementNamespace.send_request_update(this_rq.course.Number)
            QueueNamespace.emit_cancel_request(this_rq.id)
            return self.create_response(request, {
                'success': True,
            })
        except Request.DoesNotExist:
            return self.create_response(request, {
                'success': False,
                'reason': 'BAD'
            }, HttpBadRequest)
        return self.create_response(request, {
            'success': False
        }, HttpBadRequest)

    def update_request(self, request, **kwargs):
        data = self.deserialize(request,
                                request.raw_post_data,
                                format=request.META.get('CONTENT_TYPE',
                                                        'application/json'))
        request_id = data.get('id', None)
        new_location = data.get('whereLocated', None)
        new_question = data.get('question', None)

        if request_id is None or new_location is None or new_question is None:
            return self.create_response(request, {
                'success': False,
                'reason': 'MISSING'
            }, HttpBadRequest)

        try:
            this_rq = Request.objects.get(pk=request_id)
            this_rq.whereLocated = new_location
            this_rq.question = new_question
            this_rq.save()

            from .views import QueueNamespace
            QueueNamespace.emit_update_request(this_rq.id,
                                               this_rq.question,
                                               this_rq.whereLocated)

            return self.create_response(request, {
                'success': True
            })

        except Request.DoesNotExist:
            return self.create_response(request, {
                'success': False,
                'reason': 'BAD'
            }, HttpBadRequest)

        return self.create_response(request, {
            'success': False
        }, HttpBadRequest)

    def cancel_request(self, request, **kwargs):
        data = self.deserialize(request,
                                request.raw_post_data,
                                format=request.META.get('CONTENT_TYPE',
                                                        'application/json'))
        request_id = data.get('id', None)
        if request_id is None:
            return self.create_response(request, {
                'success': False,
                'reason': 'MISSING'
            }, HttpBadRequest)

        try:
            this_rq = Request.objects.get(pk=request_id)
            if this_rq.student.usr.pk != request.user.pk:
                return self.create_response(request, {
                    'success': False
                }, HttpUnauthorized)
            this_rq.cancelled = True
            this_rq.save()
            from .views import QueueNamespace, AnnouncementNamespace
            AnnouncementNamespace.send_request_update(this_rq.course.Number)
            QueueNamespace.emit_cancel_request(this_rq.id)
            return self.create_response(request, {
                'success': True
            })

        except Request.DoesNotExist:
            return self.create_response(request, {
                'success': False,
                'reason': 'BAD'
            }, HttpBadRequest)

        return self.create_response(request, {
            'success': False
        }, HttpBadRequest)

    def checkout_request(self, request, **kwargs):
        data = self.deserialize(request,
                                request.raw_post_data,
                                format=request.META.get('CONTENT_TYPE',
                                                        'application/json'))
        request_id = data.get('id', None)
        if request_id is None:
            return self.create_response(request, {
                'success': False,
                'reason': 'MISSING'
            }, HttpBadRequest)

        try:
            this_rq = Request.objects.get(pk=request_id)

            try:
                is_ta = request.user.ta.active
            except TA.DoesNotExist:
                is_ta = False
            if not is_ta:
                return self.create_response(request, {
                    'success': False,
                    'reason': 'Not a TA'
                }, HttpUnauthorized)
            this_rq.checked_out = True
            this_rq.save()
            from .views import QueueNamespace, AnnouncementNamespace
            QueueNamespace.emit_checkout_request(this_rq.course.Number,
                                                 this_rq.id)
            AnnouncementNamespace.notify_user(this_rq.student.usr.pk,
                                              request.user.get_full_name())
            return self.create_response(request, {
                'success': True
            })

        except Request.DoesNotExist:
            return self.create_response(request, {
                'success': False,
                'reason': 'BAD'
            }, HttpBadRequest)

        return self.create_response(request, {
            'success': False
        }, HttpBadRequest)
