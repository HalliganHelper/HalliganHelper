from django.test import TestCase
from django.db import IntegrityError
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.utils.timezone import now
import datetime as dt
from .models import RoomInfo, Server, Computer, CourseUsageInfo, ServerInfo
from HalliganTAAvailability.models import Student, Course, Request

from test_api import *


class TestComputer(TestCase):
    def setUp(self):
        Computer.objects.create(number='116a', room_number=116,
                                status='OFF', used_for='comp11')
        Computer.objects.create(number='116b', room_number=116,
                                status='INUSE', used_for='comp11')
        Computer.objects.create(number='116c', room_number=116,
                                status='AVAILABLE', used_for='comp11')
        Computer.objects.create(number='116d', room_number=116,
                                status='ERROR', used_for='comp11')

    def test_unique_numbers(self):
        """
        Should not be able to create another instance with the same
        machine number
        """
        with self.assertRaises(IntegrityError):
            Computer.objects.create(number='116a', room_number=116,
                                    status='OFF', used_for='comp11')

    def test_last_updated(self):
        """
        Test that machines keep track of when they were last updated
        """
        c = Computer.objects.get(number='116a')
        last_time = c.last_update
        c.save()
        new_time = c.last_update
        self.assertLess(last_time, new_time)

    def test_string_repr(self):
        c = Computer.objects.get(number='116a')
        self.assertEqual(str(c.number), str(c))
        self.assertEqual(str(c.number), repr(c))


class TestRoomInfo(TestCase):
    def setUp(self):
        RoomInfo.objects.create(lab='116a', num_reporting=5,
                                num_available=10, num_unavailable=20,
                                num_error=3)

    def test_save_proper(self):
        room_one = RoomInfo.objects.get(lab='116a')
        self.assertEqual(room_one.num_reporting, 5)
        self.assertEqual(room_one.num_available, 10)
        self.assertEqual(room_one.num_unavailable, 20)
        self.assertEqual(room_one.num_error, 3)

    def test_updated_time(self):
        room_one = RoomInfo.objects.get(lab='116a')
        old_saved_time = room_one.last_updated
        room_one.save()
        new_saved_time = room_one.last_updated
        self.assertLess(old_saved_time, new_saved_time)

    def test_str_repr(self):
        room_one = RoomInfo.objects.get(lab='116a')
        format_str = '{5}: {0} has {1} machine(s) reporting: '
        format_str += '{2} available {3} unavailable and {4} broken'

        msg = format_str.format('116a', 5, 10, 20, 3, room_one.last_updated)

        self.assertEqual(msg, str(room_one))


class TestCUI(TestCase):
    def setUp(self):
        r = RoomInfo.objects.create(lab='116a', num_reporting=5,
                                    num_available=10, num_unavailable=20,
                                    num_error=3)
        CourseUsageInfo.objects.create(room=r, course='comp11', num_machines=10)
        CourseUsageInfo.objects.create(room=r, num_machines=10)

    def test_course_names(self):
        """
        CUIs saved without a course should default to 'other'
        """
        c11 = CourseUsageInfo.objects.get(pk=1)
        other = CourseUsageInfo.objects.get(pk=2)
        self.assertEqual(c11.course, 'comp11')
        self.assertEqual(other.course, 'other')

    def test_str_repr(self):
        """
        Test that the string and representation methods do what we think
        """
        c11 = CourseUsageInfo.objects.get(pk=3)
        format_str = '{0} has {1} machine(s) in room {2}'
        msg = format_str.format(c11.course, c11.num_machines, c11.room.lab)
        self.assertEqual(msg, str(c11))
        self.assertEqual(msg, repr(c11))


class TestServer(TestCase):
    def setUp(self):
        Server.objects.create(name='test_server', num_users=20, status='OFF')
        Server.objects.create(name='on_server', num_users=20, status='ON')
        Server.objects.create(name='error_server', num_users=20, status='ERROR')

    def test_save_proper(self):
        """
        Make sure that servers are saved as expected.
        Check the status short name and display name
        """
        server = Server.objects.get(name='test_server')
        self.assertEqual(server.name, 'test_server')
        self.assertEqual(server.num_users, 20)
        self.assertEqual(server.status, 'OFF')
        self.assertEqual(server.get_status_display(), 'Off')
        server = Server.objects.get(name='on_server')
        self.assertEqual(server.name, 'on_server')
        self.assertEqual(server.num_users, 20)
        self.assertEqual(server.status, 'ON')
        self.assertEqual(server.get_status_display(), 'On')
        server = Server.objects.get(name='error_server')
        self.assertEqual(server.name, 'error_server')
        self.assertEqual(server.num_users, 20)
        self.assertEqual(server.status, 'ERROR')
        self.assertEqual(server.get_status_display(), 'Error')

    def test_no_duplicate_name(self):
        with self.assertRaises(IntegrityError):
            Server.objects.create(name='test_server',
                                  num_users=20, status='OFF')


class TestServerInfo(TestCase):
    def setUp(self):
        ServerInfo.objects.create(name='dummy_server',
                                  num_users=20)

    def test_save(self):
        """
        Test that the save actually succeeds
        """
        s = ServerInfo.objects.get(name='dummy_server')
        self.assertEqual(s.name, 'dummy_server')
        self.assertEqual(s.num_users, 20)
        self.assertNotEqual(s.last_updated, None)

    def test_auto_time_update(self):
        """
        Test to make sure that a server's last_updated member is auto-updated
        at a save
        """
        s = ServerInfo.objects.get(name='dummy_server')
        last_updated = s.last_updated
        s.save()
        now_updated = s.last_updated
        self.assertLess(last_updated, now_updated)


class TestLab(TestCase):
    def setUp(self):
        _now = now()
        hour_ago = _now - dt.timedelta(hours=1)
        hour_from_now = _now + dt.timedelta(hours=1)
        two_hour_from_now = _now + dt.timedelta(hours=2)
        Lab.objects.create(course_name='In Session Lab',
                           room_number=116,
                           start_time=hour_ago.time(),
                           start_date=hour_ago.date(),
                           end_time=hour_from_now.time(),
                           end_date=hour_from_now.date(),
                           day_of_week=_now.weekday())

        Lab.objects.create(course_name='Coming Up Lab',
                           room_number=116,
                           start_time=hour_from_now.time(),
                           start_date=hour_from_now.date(),
                           end_time=two_hour_from_now.time(),
                           end_date=two_hour_from_now.date(),
                           day_of_week=hour_from_now.weekday())

    def BROKEN_test_in_session(self):
        lab = Lab.objects.get(course_name='In Session Lab')
        self.assertTrue(lab.is_lab_in_session())

    def BROKEN_test_coming_up(self):
        lab = Lab.objects.get(course_name='Coming Up Lab')
        self.assertTrue(lab.is_lab_coming_up(within_hours=1))


class TestHomePage(TestCase):
    fixtures = ['courses.json', 'computers.json']

    def setUp(self):
        self.user = User.objects.create_user(username='john', password='pass',
                                             first_name='john', last_name='doe')
        self.student = Student.objects.create(usr=self.user)
        self.client.login(username='john', password='pass')

        Request.objects.create(course=Course.objects.all()[0],
                               student=self.student,
                               question='Some Question',
                               whenAsked=now(),
                               whereLocated='Some Place')

    def _get_home_page(self):
        return self.client.get(reverse('ModularHomePage'))

    def test_home_page_redirects_when_not_logged_in(self):
        self.client.logout()
        response = self._get_home_page()
        self.assertEqual(response.status_code, 302)

    def test_home_page_exists_when_logged_in(self):
        response = self._get_home_page()
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'logged_in.html')

    def test_home_page_has_rooms(self):
        response = self._get_home_page()
        self.assertNotEqual(response.context['rooms'], [])

    def test_home_page_has_sorted_rooms(self):
        response = self._get_home_page()
        rooms = response.context['rooms']
        self.assertSequenceEqual(rooms, sorted(rooms), str)

    def test_home_page_has_courses(self):
        response = self._get_home_page()
        self.assertNotEqual(response.context['courses'], [])

    def test_home_page_has_sorted_courses(self):
        response = self._get_home_page()
        courses = response.context['courses']
        sorted_courses = sorted(courses, key=lambda k: k['num'])
        self.assertSequenceEqual(courses, sorted_courses)
