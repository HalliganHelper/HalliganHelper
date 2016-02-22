import logging

from ..models import TA, Course, Request, OfficeHour, Student
from rest_framework import permissions

logger = logging.getLogger(__name__)


class OwnSchoolPermission(permissions.IsAuthenticated):

    def _is_own_school(self, student, school):
        return student.school == school

    def has_permission(self, request, view):
        course_pk = view.kwargs.get('course_pk', None)
        if course_pk is None:
            return False
        try:
            course = Course.objects.get(pk=course_pk)
        except Course.DoesNotExist:
            return False

        return self._is_own_school(request.user.student, course.school)

    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Request):
            return self._is_own_school(request.user.student,
                                       obj.requestor.school)
        elif isinstance(obj, OfficeHour):
            return self._is_own_school(request.user.student,
                                       obj.ta.school)
        elif isinstance(obj, Student):
            return self._is_own_school(request.user.student,
                                       obj.school)
        else:
            logger.error('Tried to check school permission for '
                         'unknown object: %s',
                         obj.__class__)
            return False


class RequestPermission(permissions.IsAuthenticated):

    def has_object_permission(self, request, view, obj):
        can_edit = super(RequestPermission, self).has_object_permission(request,
                                                                        view,
                                                                        obj)
        requesting_student = getattr(request.user, 'student', None)
        if not can_edit or requesting_student is None:
            return can_edit

        if ('cancelled' in request.data
                and request.data['cancelled'] != obj.cancelled):
            can_edit = can_edit and requesting_student == obj.requestor

        if 'solved' in request.data and request.data['solved'] != obj.solved:
            is_ta = TA.objects.filter(student=requesting_student,
                                      course=obj.course,
                                      active=True).exists()
            can_edit = can_edit and is_ta

        return can_edit


class OfficeHourPermission(permissions.IsAuthenticated):

    def has_permission(self, request, view):
        course_pk = view.kwargs.get('course_pk', None)
        if course_pk is None:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        try:
            course = Course.objects.get(pk=course_pk)
        except Course.DoesNotExist:
            return False

        ta = TA.objects.filter(course=course, student=request.user.student)

        return ta.exists()


    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        else:
            return request.user.student == obj.ta
