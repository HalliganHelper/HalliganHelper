from django.db import models
from datetime import datetime
import datetime as dt
from django.contrib import admin
import pytz
from django.conf import settings


def _now():
    tz = pytz.timezone(settings.TIME_ZONE)
    now = dt.datetime.now(tz=tz)
    return now


class Computer(models.Model):
    OFF = 'OFF'
    INUSE = 'INUSE'
    AVAILABLE = 'AVAILABLE'
    ERROR = 'ERROR'

    CHOICES = [OFF, INUSE, AVAILABLE, ERROR]

    STATUS_CHOICES = (
        (OFF, 'Off'),
        (INUSE, 'In Use'),
        (AVAILABLE, 'Available'),
        (ERROR, 'Error')
    )
    number = models.CharField(max_length=7,
                              primary_key=True)
    room_number = models.IntegerField()
    status = models.CharField(max_length=9,
                              choices=STATUS_CHOICES,
                              default=AVAILABLE)
    used_for = models.CharField(max_length=40, blank=True)
    last_update = models.DateTimeField(auto_now=True)

    # TODO: Foreign Key to computers in TA System?

    def __str__(self):
        return str(self.number)

    def __repr__(self):
        return self.__str__()

admin.site.register(Computer)


class RoomInfo(models.Model):
    lab = models.CharField(max_length=10)
    num_reporting = models.IntegerField()
    num_available = models.IntegerField()
    num_unavailable = models.IntegerField()
    num_error = models.IntegerField()

    last_updated = models.DateTimeField()

    def save(self, *args, **kwargs):
        self.last_updated = _now()
        return super(RoomInfo, self).save(*args, **kwargs)

    def __str__(self):
        format_str = '{5}: {0} has {1} machine(s) reporting: '
        format_str += '{2} available {3} unavailable and {4} broken'
        return format_str.format(self.lab, self.num_reporting,
                                 self.num_available,
                                 self.num_unavailable,
                                 self.num_error, self.last_updated)
admin.site.register(RoomInfo)


class CourseUsageInfo(models.Model):
    room = models.ForeignKey(RoomInfo, related_name='cuis')
    course = models.CharField(max_length=20)
    num_machines = models.IntegerField()

    def save(self, *args, **kwargs):
        if self.course is None:
            self.course = 'Other'
        return super(CourseUsageInfo, self).save(*args, **kwargs)

    def __str__(self):
        format_str = '{0} has {1} machine(s) in room {2}'
        return format_str.format(self.course, self.num_machines,
                                 self.room.lab)

admin.site.register(CourseUsageInfo)

class Server(models.Model):
    OFF = 'OFF'
    ON = 'ON'
    ERROR = 'ERROR'

    CHOICES = [OFF, ON, ERROR]

    STATUS_CHOICES = (
        (OFF, 'Off'),
        (ON, 'On'),
        (ERROR, 'Error')
    )

    name = models.CharField(max_length=20,
                            primary_key=True)
    num_users = models.IntegerField()

    status = models.CharField(max_length=40,
                              choices=STATUS_CHOICES,
                              default=ON)

    last_updated = models.DateTimeField(auto_now=True)

admin.site.register(Server)


class ServerInfo(models.Model):
    name = models.CharField(max_length=20)
    last_updated = models.DateTimeField(auto_now=True)
    num_users = models.IntegerField()


class Lab(models.Model):
    course_name = models.CharField(max_length=30)
    room_number = models.IntegerField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    start_date = models.DateField()
    end_date = models.DateField()
    day_of_week = models.IntegerField(max_length=1)

    def for_response(self):
        response = {
            'course_name': self.course_name,
            'room_number': self.room_number,
            'start_time': self.start_time.strftime('%I:%M %p'),
            'end_time': self.end_time.strftime('%I:%M %p'),
            'day_of_week': self.day_of_week_name(),
            'InSession': self.is_lab_in_session(),
            'ComingUp': self.is_lab_coming_up(),
            'DayOfWeek_AsNum': self.day_of_week
        }
        return response

    def day_of_week_name(self, short_name=False):
        def long(x):
            return {
                0: 'Monday',
                1: 'Tuesday',
                2: 'Wednesday',
                3: 'Thursday',
                4: 'Friday',
                5: 'Saturday',
                6: 'Sunday'
            }[x]

        if short_name:
            return long(self.day_of_week)[0:3]
        else:
            return long(self.day_of_week)

    def is_lab_in_session(self):
        """
        Returns whether a lab is currently in session
        """
        CurrTime = datetime.now().time()
        CurrDate = datetime.now().date()
        CurrDay = datetime.now().weekday()

        if(self.start_date < CurrDate < self.end_date
           and self.start_time < CurrTime < self.end_time
           and self.day_of_week == CurrDay):
            return True

        return False

    def is_lab_coming_up(self):
        """
         Returns whether the lab occurs within the next 3 hours
        """

        CurrTime = datetime.now().time()
        CurrDate = datetime.now().date()
        CurrDay = datetime.now().weekday()
        delta = dt.timedelta(hours=3)
        start_time = dt.date(10, 10, 10)
        combined = datetime.combine(start_time, self.start_time)

        ModdedStartTime = (combined - delta).time()

        if(self.start_date < CurrDate < self.end_date
            and self.day_of_week == CurrDay
            and self.end_time > CurrTime > ModdedStartTime
                and not self.is_lab_in_session()):

            return True

        return False

admin.site.register(Lab)
