import logging
import json
from datetime import timedelta
from collections import defaultdict

from django.contrib.auth import logout
from django.conf import settings
from django.core.files.uploadedfile import UploadedFile
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import views, viewsets, mixins, status
from rest_framework.exceptions import NotFound, NotAuthenticated, ParseError
from rest_framework.response import Response
from rest_framework.decorators import list_route, parser_classes
from rest_framework.parsers import FileUploadParser

from registration.models import RegistrationProfile

from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage

from ..models import (School, Course, Request,
                      Student, OfficeHour, CustomUser)

from .serializers import (SchoolSerializer, CourseSerializer,
                          RequestSerializer, RequestorSerializer,
                          OfficeHourSerializer, UserSerializer,
                          RegistrationSerializer, LoginSerializer)

from .permissions import RequestPermission, OwnSchoolPermission

logger = logging.getLogger(__name__)
redis_broadcast_publisher = RedisPublisher(facility='ta', broadcast=True)


class CreateModelWithRequestMixin(mixins.CreateModelMixin):

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create_with_request(serializer, request)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)

    def perform_create_with_request(self, serializer, request):
        serializer.save()


class SchoolView(views.APIView):
    """Information about the current user's school."""
    serializer_class = SchoolSerializer
    queryset = School.objects.none()

    def get(self, request):
        school = request.user.student.school
        return Response(SchoolSerializer(school).data)

    def get_queryset(self):
        return School.objects.filter(student=self.request.user.student)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """Information about a course"""
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

    def get_queryset(self):
        qs = super(CourseViewSet, self).get_queryset()

        user_school = self.request.user.student.school
        return qs.filter(school=user_school)


class RequestViewSet(CreateModelWithRequestMixin,
                     mixins.UpdateModelMixin,
                     viewsets.ReadOnlyModelViewSet):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()
    permission_classes = (OwnSchoolPermission, RequestPermission,)

    def get_serializer_context(self):
        context = super(RequestViewSet, self).get_serializer_context()
        context.update({
            'request': self.request
        })
        return context

    def perform_create_with_request(self, serializer, request):
        course = request.data['course']
        requestor = self.request.user.student
        serializer.save(course=course, requestor=requestor)

    def get_queryset(self):
        when_asked_cutoff = timezone.now() - timedelta(hours=Request.EXPIRE_IN_HOURS)
        queryset = super(RequestViewSet, self).get_queryset()
        queryset = queryset.filter(cancelled=False,
                                   solved=False,
                                   when_asked__gte=when_asked_cutoff)
        queryset.order_by('-when_asked')
        return queryset

    def list(self, request, course_pk=None):
        queryset = self.get_queryset().filter(course=course_pk)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, course_pk=None):
        help_request = get_object_or_404(self.get_queryset(),
                                         pk=pk,
                                         course=course_pk)

        serializer = self.get_serializer(help_request)
        return Response(serializer.data)

    def create(self, request, course_pk=None):
        course = get_object_or_404(Course, pk=course_pk)
        request.data['course'] = course

        created = super(RequestViewSet, self).create(request, course_pk)

        redis_data = {
            'type': 'request_created',
            'data': {
                'course': course.pk,
                'id': created.data['id']
            }
        }
        logger.debug('Sending websocket packet: %s', redis_data)
        packet = RedisMessage(json.dumps(redis_data))
        redis_broadcast_publisher.publish_message(packet)

        return created

    def update(self, *args, **kwargs):
        updated = super(RequestViewSet, self).update(*args, **kwargs)

        course_pk = kwargs.get('course_pk')
        try:
            course_pk = int(course_pk)
        except (ValueError, TypeError):
            logger.exception('Could not get course_pk on request update')
            raise ParseError

        packet_type = 'request_updated'
        if updated.data['cancelled'] or updated.data['solved']:
            packet_type = 'request_removed'

        redis_data = {
            'type': packet_type,
            'data': {
                'course': course_pk,
                'id': updated.data['id']
            }
        }
        logger.debug('Sending websocket packet: %s', redis_data)
        packet = RedisMessage(json.dumps(redis_data))
        redis_broadcast_publisher.publish_message(packet)

        return updated


class OfficeHourViewSet(CreateModelWithRequestMixin,
                        mixins.UpdateModelMixin,
                        viewsets.ReadOnlyModelViewSet):
    serializer_class = OfficeHourSerializer
    queryset = OfficeHour.objects.all()
    permission_classes = (OwnSchoolPermission,)

    def get_queryset(self):
        queryset = super(OfficeHourViewSet, self).get_queryset()
        return queryset.filter(end_time__gte=timezone.now())

    def perform_create_with_request(self, serializer, request):
        course = request.data['course']
        ta = request.user.student
        serializer.save(course=course, ta=ta)

    def list(self, request, course_pk=None):
        queryset = self.get_queryset().filter(course=course_pk)
        serializer = OfficeHourSerializer(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, pk=None, course_pk=None):
        office_hour = get_object_or_404(self.get_queryset(),
                                        pk=pk,
                                        course=course_pk)
        serializer = OfficeHourSerializer(office_hour)

        return Response(serializer.data)

    def create(self, request, course_pk=None):
        school = request.user.student.school

        course = get_object_or_404(Course, pk=course_pk, school=school)
        request.data['course'] = course
        return super(OfficeHourViewSet, self).create(request, course_pk)


class TAViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RequestorSerializer
    queryset = Student.objects.none()
    permission_classes = (OwnSchoolPermission,)

    def list(self, request, course_pk=None):
        queryset = Course.objects.get(pk=course_pk).tas.filter(ta__active=True)
        queryset = queryset.order_by('ta__active',
                                     'user__last_name',
                                     'user__first_name')

        serializer = RequestorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, course_pk=None):
        queryset = Course.objects.get(pk=course_pk).tas.filter(ta__active=True)
        ta = get_object_or_404(queryset, pk=pk)

        serializer = RequestorSerializer(ta)
        return Response(serializer.data)


class UserViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.none()
    SEND_ACTIVATION_EMAIL = getattr(settings, 'SEND_ACTIVATION_EMAIL', True)

    def list(self, request):
        user = request.user
        if not user.is_authenticated() or not user.is_active:
            raise NotAuthenticated
        logger.debug(user)
        return Response(UserSerializer(user).data)

    def get_queryset(self):
        return CustomUser.objects.none()

    @list_route(methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data,
                                     context={'request': request})

        serializer.is_valid(raise_exception=True)

        return Response(UserSerializer(request.user).data)

    @list_route(methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({}, status=200)

    @list_route(methods=['post'])
    def upload_photo(self, request):
        photo = request.data.get('photo')

        if photo is None:
            raise ParseError

        if not isinstance(photo, UploadedFile):
            logger.warning('Attempt to upload a non-file: %s user:%s',
                           photo, request.user.pk)
            raise ParseError

        request.user.student.headshot = photo
        request.user.student.save()
        return Response(UserSerializer(request.user).data)

    @list_route(methods=['post'])
    def register(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = dict(serializer.data)
        password = serializer.data.pop('password')
        del user_data['password_confirm']

        user = CustomUser(**user_data)
        user.set_password(password)
        user.is_active = False
        user.save()

        RegistrationProfile.objects.create_inactive_user(
            new_user=user,
            site=get_current_site(request),
            send_email=self.SEND_ACTIVATION_EMAIL,
            request=request
        )

        return Response({})
