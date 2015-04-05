# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import HalliganTAAvailability.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Name', models.CharField(help_text=b'The name of the course', max_length=100)),
                ('Number', models.IntegerField(help_text=b'The identifying course number')),
                ('Professor', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OfficeHour',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('start_time', models.DateTimeField(help_text=b'When the TA went on duty')),
                ('end_time', models.DateTimeField(help_text=b'When the TA goes off duty')),
                ('location', models.CharField(help_text=b'The home base of the TA', max_length=255)),
                ('course', models.ForeignKey(help_text=b'The course this OfficeHour is associated with', to='HalliganTAAvailability.Course')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question', models.CharField(help_text=b'The question associated with the request', max_length=51, validators=[HalliganTAAvailability.models.not_empty_string])),
                ('whereLocated', models.CharField(help_text=b'Where the user is located', max_length=50, validators=[HalliganTAAvailability.models.not_empty_string])),
                ('whenAsked', models.DateTimeField(help_text=b'When the request was made')),
                ('cancelled', models.BooleanField(default=False, help_text=b'Did the student cancel the request?')),
                ('emailed', models.BooleanField(default=False, help_text=b'Not really sure why I included this')),
                ('solved', models.BooleanField(default=False, help_text=b'Has the request been resolved?')),
                ('whenSolved', models.DateTimeField(help_text=b'When the request was resolved', null=True, blank=True)),
                ('checked_out', models.BooleanField(default=False, help_text=b'Has a TA started working on the request?')),
                ('timedOut', models.BooleanField(default=False, help_text=b'Has the request timed out?')),
                ('course', models.ForeignKey(help_text=b'The course the request is for', to='HalliganTAAvailability.Course')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('usr', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TA',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('active', models.BooleanField(default=True, help_text=b'Whether or not the TA is currently active')),
                ('headshot', models.ImageField(default=b'headshots/None/ming.jpg', help_text=b'A headshot to help students identify TAs', upload_to=b'headshots')),
                ('has_updated_headshot', models.BooleanField(default=False, help_text=b'Whether or not the TA has updated their headshot')),
                ('course', models.ManyToManyField(help_text=b'The courses a TA is registered to TA for', to='HalliganTAAvailability.Course')),
                ('usr', models.OneToOneField(to=settings.AUTH_USER_MODEL, help_text=b'The user the TA is associated with.')),
            ],
            options={
                'verbose_name': "Teacher's Assistant",
                'verbose_name_plural': "Teacher's Assistants",
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='request',
            name='student',
            field=models.ForeignKey(help_text=b'The student who made the request', to='HalliganTAAvailability.Student'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='request',
            name='who_solved',
            field=models.ForeignKey(blank=True, to='HalliganTAAvailability.TA', help_text=b'The TA who resolved the request', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='officehour',
            name='ta',
            field=models.ForeignKey(help_text=b'The TA on duty', to='HalliganTAAvailability.TA'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='course',
            name='students',
            field=models.ForeignKey(blank=True, to='HalliganTAAvailability.Student', help_text=b'A list of students enrolled in the course', null=True),
            preserve_default=True,
        ),
    ]
