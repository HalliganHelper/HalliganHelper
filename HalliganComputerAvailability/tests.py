from django.test import TestCase
from django.db import IntegrityError
import pytz
import datetime as dt
from django.conf import settings
from .models import RoomInfo, Server, Computer
from .models import _now


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


class TestNow(TestCase):
    def test_now_func(self):
        """
        Test that the _now function creates a time for the given timezone.
        Allow for a 1 minute delta.
        """
        tz = pytz.timezone(settings.TIME_ZONE)
        now = dt.datetime.now(tz=tz)
        self.assertAlmostEqual(now, _now(), delta=dt.timedelta(minutes=1))


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
