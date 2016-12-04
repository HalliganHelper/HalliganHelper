import mock
import pytest


@pytest.fixture
def not_my_school():
    from tas.models import School
    from tas.custom_user import CustomUser
    admin = CustomUser.objects.create_user(email='asd@asd.com')

    school = School.objects.create(name='Test School',
                                   administrator=admin,
                                   max_course_count=5)

    return school


class TestOwnSchoolPermission:

    def test_is_own_school(self, test_school, test_user):
        from tas.api.permissions import OwnSchoolPermission
        permission = OwnSchoolPermission()

        permission._is_own_school(test_user.student, test_school)

    def test_is_not_own_school(self, test_user, not_my_school):
        from tas.api.permissions import OwnSchoolPermission

        permission = OwnSchoolPermission()

        permission._is_own_school(test_user.student, not_my_school)

    def test_not_has_permission_no_course_pk(self):
        from tas.api.permissions import OwnSchoolPermission
        view = mock.Mock()
        view.kwargs = {}

        permission = OwnSchoolPermission()
        assert not permission.has_permission(mock.Mock(), view)

    @mock.patch('tas.api.permissions.Course')
    def test_not_has_permission_no_course_found(self, Course):
        from tas.api.permissions import OwnSchoolPermission
        Course.DoesNotExist = Exception
        Course.objects.get.side_effect = Course.DoesNotExist

        view = mock.Mock()
        view.kwargs = {
            'course_pk': 11,
        }

        permission = OwnSchoolPermission()
        assert not permission.has_permission(mock.Mock(), view)

    @mock.patch('tas.api.permissions.Course')
    def test_has_permission_success(self, Course, test_user):
        from tas.api.permissions import OwnSchoolPermission

        course = mock.Mock()
        course.school = test_user.student.school
        request = mock.Mock()
        request.user = test_user
        view = mock.Mock()
        view.kwargs = {
            'course_pk': 11,
        }

        Course.objects.get.return_value = course

        permission = OwnSchoolPermission()

        assert permission.has_permission(request, view)

    def test_has_object_permission_with_request_my_school(self,
                                                          test_user,
                                                          test_school):
        from tas.models import Request
        from tas.api.permissions import OwnSchoolPermission

        obj = mock.Mock(spec=Request)
        obj.requestor.school = test_school
        request = mock.Mock()
        request.user = test_user

        permission = OwnSchoolPermission()

        assert permission.has_object_permission(request, mock.Mock(), obj)

    def test_has_object_permission_with_request_not_my_school(self,
                                                              test_user,
                                                              not_my_school):
        from tas.models import Request
        from tas.api.permissions import OwnSchoolPermission

        obj = mock.Mock(spec=Request)
        obj.requestor.school = not_my_school
        request = mock.Mock()
        request.user = test_user

        permission = OwnSchoolPermission()

        assert not permission.has_object_permission(request, mock.Mock(), obj)

    def test_has_object_permission_with_officehour_my_school(self,
                                                             test_user,
                                                             test_school):
        from tas.models import OfficeHour
        from tas.api.permissions import OwnSchoolPermission

        obj = mock.Mock(spec=OfficeHour)
        obj.ta.school = test_school
        request = mock.Mock()
        request.user = test_user

        permission = OwnSchoolPermission()

        assert permission.has_object_permission(request, mock.Mock(), obj)

    def test_has_object_permission_with_officehour_not_my_school(self,
                                                                 test_user,
                                                                 not_my_school):
        from tas.models import OfficeHour
        from tas.api.permissions import OwnSchoolPermission

        obj = mock.Mock(spec=OfficeHour)
        obj.ta.school = not_my_school
        request = mock.Mock()
        request.user = test_user

        permission = OwnSchoolPermission()

        assert not permission.has_object_permission(request, mock.Mock(), obj)

    def test_has_object_permission_with_student_my_school(self,
                                                          test_user,
                                                          test_school):
        from tas.models import Student
        from tas.api.permissions import OwnSchoolPermission

        obj = mock.Mock(spec=Student)
        obj.school = test_school
        request = mock.Mock()
        request.user = test_user

        permission = OwnSchoolPermission()

        assert permission.has_object_permission(request, mock.Mock(), obj)

    def test_has_object_permission_with_student_not_my_school(self,
                                                              test_user,
                                                              not_my_school):
        from tas.models import Student
        from tas.api.permissions import OwnSchoolPermission

        obj = mock.Mock(spec=Student)
        obj.school = not_my_school
        request = mock.Mock()
        request.user = test_user

        permission = OwnSchoolPermission()

        assert not permission.has_object_permission(request, mock.Mock(), obj)

    def test_has_object_permission_not_registered_object(self):
        from tas.models import (
            SchoolEmailDomain,
            Course,
            TA,
        )
        from tas.api.permissions import OwnSchoolPermission

        permission = OwnSchoolPermission()

        for model in [SchoolEmailDomain, Course, TA]:
            obj = mock.Mock(spec=model)

            assert not permission.has_object_permission(mock.Mock(),
                                                        mock.Mock(),
                                                        obj)


class TestRequestPermission:

    def test_student_can_not_solve(self, test_user, test_course):
        from tas.models import Request
        from tas.api.permissions import RequestPermission

        permission = RequestPermission()

        obj = mock.Mock(spec=Request)
        obj.solved = False
        obj.course = test_course

        mock_request = mock.Mock()
        mock_request.user = test_user
        mock_request.data = {
            'solved': True,
        }

        assert not permission.has_object_permission(mock_request,
                                                    mock.Mock(),
                                                    obj)

    def test_ta_can_solve(self, test_user_ta, test_course):
        from tas.models import Request
        from tas.api.permissions import RequestPermission

        permission = RequestPermission()

        obj = mock.Mock(spec=Request)
        obj.solved = False
        obj.course = test_course

        mock_request = mock.Mock()
        mock_request.user = test_user_ta
        mock_request.data = {
            'solved': True,
        }

        assert permission.has_object_permission(mock_request,
                                                mock.Mock(),
                                                obj)

    def test_ta_can_not_cancel(self, test_user_ta, test_user, test_course):
        from tas.models import Request
        from tas.api.permissions import RequestPermission

        permission = RequestPermission()

        obj = mock.Mock(spec=Request)
        obj.cancelled = False
        obj.course = test_course
        obj.requestor = test_user

        mock_request = mock.Mock()
        mock_request.user = test_user_ta
        mock_request.data = {
            'cancelled': True,
        }

        assert not permission.has_object_permission(mock_request,
                                                    mock.Mock(),
                                                    obj)

    def test_student_can_cancel(self, test_user, test_course):
        from tas.models import Request
        from tas.api.permissions import RequestPermission

        permission = RequestPermission()

        obj = mock.Mock(spec=Request)
        obj.cancelled = False
        obj.course = test_course

        mock_request = mock.Mock()
        mock_request.user = test_user
        mock_request.data = {
            'cancelled': True,
        }

        assert not permission.has_object_permission(mock_request,
                                                    mock.Mock(),
                                                    obj)


class TestOfficeHourPermission:
    pass
