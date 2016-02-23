import mock
import pytest
import requests_mock

import json


class TestInvalidCourseStringError:

    def test_string(self):
        from tas.utils import InvalidCourseStringError
        err = InvalidCourseStringError('asd')

        assert str(err) == 'Course Strings must contain a number. You gave asd'


@mock.patch('tas.utils.EmailMultiAlternatives')
class TestNotify:

    def test_no_courses(self, multi_alternatives, test_user, test_school):
        from tas.utils import notify
        from tas.models import Course

        msg = mock.Mock()
        multi_alternatives.return_value = msg

        notify(test_user, Course.objects.none())

        assert msg.attach_alternative.called
        assert msg.send.called

    def test_with_courses(self, multi_alternatives, test_user, test_school):
        from tas.utils import notify
        from tas.models import Course

        Course.objects.get_or_create(school=test_school,
                                     number=101,
                                     department='no_courses_dep',
                                     name='No Courses Course (it makes sense)')

        msg = mock.Mock()
        multi_alternatives.return_value = msg

        notify(test_user, Course.objects.all())

        assert msg.attach_alternative.called
        assert msg.send.called


# Mocking the notify function so we don't send emails wile testing
@mock.patch('tas.utils.notify', lambda x, y: None)
class TestConfirmATA:
    pass


# Mocking the notify function so we don't send emails wile testing
@mock.patch('tas.utils.notify', lambda x, y: None)
@pytest.mark.django_db
class TestCheckTA:

    def test_http_exception(self):
        from tas.utils import check_ta
        user = mock.Mock()
        user.email = 'test_email@test.com'

        with requests_mock.Mocker() as m:
            m.get(requests_mock.ANY, status_code=404)
            assert not check_ta(user)

    def test_no_ta_jobs_for_user(self, test_user, test_school):
        from tas.utils import check_ta
        from tas.models import TA, Course
        c = Course.objects.create(name='no_jobs_course',
                                  school=test_school,
                                  department='no_jobs_dep',
                                  number=11)

        TA.objects.create(student=test_user.student,
                          course=c,
                          active=True)

        with requests_mock.Mocker() as m:
            m.get(requests_mock.ANY, text='NONE')
            is_ta = check_ta(test_user)

        curr_jobs = TA.objects.filter(student=test_user.student, active=True)
        assert not is_ta
        assert not curr_jobs.exists()

    def test_different_ta_jobs_for_user(self, test_user, test_school):
        from tas.utils import check_ta
        from tas.models import TA, Course
        old_course = Course.objects.create(name='old ta course',
                                           school=test_school,
                                           department='test dep',
                                           number=11)

        new_course = Course.objects.create(name='new ta course',
                                           school=test_school,
                                           department='no_jobs_dep',
                                           number=15)

        TA.objects.create(student=test_user.student,
                          course=old_course,
                          active=True)

        with requests_mock.Mocker() as m:
            m.get(requests_mock.ANY, text='15')
            is_ta = check_ta(test_user)

        curr_jobs = TA.objects.filter(student=test_user.student, active=True)

        assert is_ta
        assert curr_jobs.count() == 1
        assert curr_jobs.first().course.pk == new_course.pk

    def test_new_ta_jobs_for_user(self, test_user, test_school):
        from tas.utils import check_ta
        from tas.models import TA, Course

        new_course = Course.objects.create(name='new ta course',
                                           school=test_school,
                                           department='no_jobs_dep',
                                           number=15)

        TA.objects.filter(student=test_user.student).delete()

        with requests_mock.Mocker() as m:
            m.get(requests_mock.ANY, text='15')
            is_ta = check_ta(test_user)

        curr_jobs = TA.objects.filter(student=test_user.student, active=True)

        assert is_ta
        assert curr_jobs.count() == 1
        assert curr_jobs.first().course.pk == new_course.pk

    @mock.patch('tas.utils._confirm_a_ta', side_effect=Exception)
    def test_problem_mailing_ta(self, test_user):
        from tas.utils import check_ta

        with requests_mock.Mocker() as m:
            m.get(requests_mock.ANY, text='11')
            is_ta = check_ta(test_user)

        assert not is_ta


class TestSchoolAdministratorTools:
    def test_get_administrators_for_school_no_extra_admins(self, test_school):
        from tas.utils import get_administrators_for_school

        assert get_administrators_for_school(test_school).count() == 1

    def test_get_administrators_for_school_with_extra_admins(self,
                                                             test_school,
                                                             test_user):
        from django.contrib.auth.models import Group
        from tas.utils import get_administrators_for_school
        from tas.utils import get_school_admin_group_name

        group_name = get_school_admin_group_name(test_school.name)
        group = Group.objects.get(name=group_name)
        test_user.groups.add(group)

        assert get_administrators_for_school(test_school).count() == 2

    def test_school_admin_group_name(self):
        from tas.utils import get_school_admin_group_name
        assert get_school_admin_group_name('Test School') == 'Test School Admins'


class TestSplitCourseString:

    def test_all_numbers(self):
        from tas.utils import _split_course_string

        num, postfix = _split_course_string('12345')
        assert num == 12345
        assert postfix == ''

    def test_all_characters(self):
        from tas.utils import _split_course_string
        from tas.utils import InvalidCourseStringError

        with pytest.raises(InvalidCourseStringError):
            num, postfix = _split_course_string('abcdefgh')

    def test_mix_characters_numbers(self):
        from tas.utils import _split_course_string

        num, postfix = _split_course_string('11A7B12')
        assert num == 11
        assert postfix == 'A7B12'

    def test_valid_course_string(self):
        from tas.utils import _split_course_string

        num, postfix = _split_course_string('150IDS')

        assert num == 150
        assert postfix == 'IDS'


class TestPublishMessage:
    @mock.patch('tas.utils.redis_broadcast_publisher')
    def test_no_publisher(self, publisher):
        from tas.utils import publish_message
        publish_message('message_type')
        assert publisher.publish_message.called

    def test_no_data_packet(self):
        from tas.utils import publish_message
        publisher = mock.Mock()
        publish_message('message_type', publisher=publisher)

        assert publisher.publish_message.called

        msg = publisher.publish_message.call_args[0][0]
        msg = json.loads(msg)

        assert 'type' in msg
        assert msg['type'] == 'message_type'

        assert 'data' not in msg

    def test_with_data_packet(self):
        from tas.utils import publish_message
        publisher = mock.Mock()

        publish_message('message_type',
                        data='this is data',
                        publisher=publisher)

        assert publisher.publish_message.called

        msg = publisher.publish_message.call_args[0][0]
        msg = json.loads(msg)

        assert 'type' in msg
        assert msg['type'] == 'message_type'

        assert 'data' in msg
        assert msg['data'] == 'this is data'
