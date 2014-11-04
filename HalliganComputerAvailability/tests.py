"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from .models import RoomInfo, Server


class SimpleTest(TestCase):
    def test_basic_addition(self):
        """
        Tests that 1 + 1 always equals 2.
        """
        self.assertEqual(1 + 1, 2)


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

    def test_save_proper(self):
        server = Server.objects.get(name='test_server')
        self.assertEqual(server.name, 'test_server')
        self.assertEqual(server.num_users, 20)
        self.assertEqual(server.status, 'OFF')
