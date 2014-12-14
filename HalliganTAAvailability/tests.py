"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from django.contrib.auth.models import User
from .models import TA

from test_api import *

class TestTA(TestCase):
    fixtures = ['courses.json']
    def setUp(self):
        self.username = 'john'
        self.password = 'pass'
        self.course = Course.objects.create(Name='Test Course',
                                            Number=1,
                                            Professor='John Doe')
        self.user = User.objects.create_user(self.username,
                                             'test@test.com',
                                             self.password)
        self.other_user = User.objects.create_user('jim',
                                                   'test@test.com',
                                                   self.password)
        self.active_ta = TA.objects.create(usr=self.user)
        self.nonactive_ta = TA.objects.create(usr=self.other_user,
                                              active=False)

    def test_ta_created(self):
        ta = TA.objects.get(usr=self.user)
        self.assertEqual(ta.pk, self.active_ta.pk)
        self.assertEqual(ta.usr.pk, self.active_ta.usr.pk)
        self.assertEqual(str(ta.headshot), str(self.active_ta.headshot))

    def test_active_holds_active(self):
        active_ta_ids = TA.objects.active().values_list('pk', flat=True)
        self.assertIn(self.active_ta.pk, active_ta_ids)
        self.assertNotIn(self.nonactive_ta.pk, active_ta_ids)

    def test_deactivating_ta(self):
        active_ta_ids = TA.objects.active().values_list('pk', flat=True)
        self.assertIn(self.active_ta.pk, active_ta_ids)

        self.active_ta.active = False
        self.active_ta.save()

        active_ta_ids = TA.objects.active().values_list('pk', flat=True)
        self.assertNotIn(self.active_ta.pk, active_ta_ids)

        self.active_ta.active = True
        self.active_ta.save()

    def test_course_association(self):
        all_courses = Course.objects.all()
        self.active_ta.course = all_courses
        self.active_ta.save()
        self.assertEqual(self.active_ta.course.count(),
                         Course.objects.all().count())
