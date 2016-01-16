# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-19 05:39
from __future__ import unicode_literals

from django.db import migrations


def make_tufts_school(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    School = apps.get_model('tas', 'School')
    User = apps.get_model('tas', 'CustomUser')
    SchoolEmailDomain = apps.get_model('tas', 'SchoolEmailDomain')

    tufts, _ = School.objects.get_or_create(name='Tufts University',
                                            administrator_email='tyler@tylerlubeck.com',
                                            max_course_count=20)
    SchoolEmailDomain.objects.get_or_create(domain='tufts.edu',
                                            school=tufts)
    SchoolEmailDomain.objects.get_or_create(domain='cs.tufts.edu',
                                            school=tufts)

    Group.objects.get_or_create(name='Tufts University Admins')
    user, created = User.objects.get_or_create(email='tyler@tylerlubeck.com',
                                               first_name='Tyler',
                                               last_name='Lubeck')



def remove_old_model_instances(apps, schema_editor):
    Course = apps.get_model('tas', 'Course')
    TA = apps.get_model('tas', 'TA')
    Request = apps.get_model('tas', 'Request')
    OfficeHour = apps.get_model('tas', 'OfficeHour')

    Course.objects.all().delete()
    TA.objects.all().delete()
    OfficeHour.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('tas', '0003_make_tufts_models'),
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(make_tufts_school,
                             migrations.RunPython.noop),
        migrations.RunPython(remove_old_model_instances,
                             migrations.RunPython.noop),
    ]