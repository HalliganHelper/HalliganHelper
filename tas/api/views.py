import logging

from django.contrib.auth import authenticate, logout, login
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import views, viewsets, mixins, status
from rest_framework.exceptions import NotFound, NotAuthenticated, ParseError
from rest_framework.response import Response
from rest_framework.decorators import list_route

from ..models import (School, Course, Request,
                      Student, OfficeHour, CustomUser)

from .serializers import (SchoolSerializer, CourseSerializer,
                          RequestSerializer, RequestorSerializer,
                          OfficeHourSerializer, UserSerializer)

logger = logging.getLogger(__name__)


def raise_if_not_own_school(school, course_pk):
    course = get_object_or_404(Course, pk=course_pk)
    if course.school != school:
        raise NotFound


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

    def perform_create_with_request(self, serializer, request):
        course = request.data['course']
        requestor = self.request.user.student
        serializer.save(course=course, requestor=requestor)

    def get_queryset(self):
        queryset = super(RequestViewSet, self).get_queryset()
        queryset = queryset.filter(cancelled=False,
                                   solved=False,
                                   expired=False)
        return queryset

    def list(self, request, course_pk=None):
        raise_if_not_own_school(request.user.student.school, course_pk)

        queryset = self.get_queryset().filter(course=course_pk)

        serializer = RequestSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, course_pk=None):
        help_request = get_object_or_404(self.get_queryset(),
                                         pk=pk,
                                         course=course_pk)

        raise_if_not_own_school(request.user.student.school, course_pk)

        serializer = RequestSerializer(help_request)
        return Response(serializer.data)

    def create(self, request, course_pk=None):
        raise_if_not_own_school(request.user.student.school, course_pk)

        course = get_object_or_404(Course, pk=course_pk)
        request.data['course'] = course

        return super(RequestViewSet, self).create(request, course_pk)


class OfficeHourViewSet(CreateModelWithRequestMixin,
                        mixins.UpdateModelMixin,
                        viewsets.ReadOnlyModelViewSet):
    serializer_class = OfficeHourSerializer
    queryset = OfficeHour.objects.all()

    def get_queryset(self):
        queryset = super(OfficeHourViewSet, self).get_queryset()
        return queryset.filter(end_time__gte=timezone.now())

    def perform_create_with_request(self, serializer, request):
        course = request.data['course']
        ta = request.user.student
        serializer.save(course=course, ta=ta)

    def list(self, request, course_pk=None):
        raise_if_not_own_school(request.user.student.school, course_pk)

        queryset = self.get_queryset().filter(course=course_pk)
        serializer = OfficeHourSerializer(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, pk=None, course_pk=None):
        raise_if_not_own_school(request.user.student.school, course_pk)

        office_hour = get_object_or_404(self.get_queryset(),
                                        pk=pk,
                                        course=course_pk)
        serializer = OfficeHourSerializer(office_hour)

        return Response(serializer.data)

    def create(self, request, course_pk=None):
        school = request.user.student.school
        raise_if_not_own_school(school, course_pk)

        course = get_object_or_404(Course, pk=course_pk, school=school)
        request.data['course'] = course
        return super(OfficeHourViewSet, self).create(request, course_pk)


class TAViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RequestorSerializer
    queryset = Student.objects.all()

    def list(self, request, course_pk=None):
        raise_if_not_own_school(request.user.student.school, course_pk)

        queryset = Course.objects.get(pk=course_pk).tas.filter(ta__active=True)

        serializer = RequestorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, course_pk=None):
        raise_if_not_own_school(request.user.student.school, course_pk)

        queryset = Course.objects.get(pk=course_pk).tas.filter(ta__active=True)
        ta = get_object_or_404(queryset, pk=pk)

        serializer = RequestorSerializer(ta)
        return Response(serializer.data)


class UserViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.none()

    def list(self, request):
        user = request.user
        if not user.is_authenticated() or not user.is_active:
            raise NotAuthenticated
        return Response(UserSerializer(user).data)

    def get_queryset(self):
        return CustomUser.objects.none()

    @list_route(methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            raise ParseError

        user = authenticate(email=email, password=password)
        if user is None or not user.is_active:
            raise NotAuthenticated

        login(request, user)

        return Response(UserSerializer(user).data)

    @list_route(methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({}, status=200)
