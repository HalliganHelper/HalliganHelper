from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
import datetime
import pytz
from HalliganAvailability import settings


class Student(models.Model):
    usr = models.OneToOneField(User)

    def __str__(self):
        return self.usr.first_name + ' ' + self.usr.last_name

admin.site.register(Student)


class Course(models.Model):
    Name = models.CharField(max_length=100)
    Number = models.IntegerField()
    Professor = models.CharField(max_length=50)
    students = models.ForeignKey(Student, blank=True, null=True)

    def __str__(self):
        return str(self.Number) + ": " + self.Name

admin.site.register(Course)


class TA(models.Model):
    usr = models.OneToOneField(User)
    course = models.ManyToManyField(Course)

admin.site.register(TA)


class Request(models.Model):
    course = models.ForeignKey(Course)
    student = models.ForeignKey(Student)
    question = models.CharField(max_length=51)
    whenAsked = models.DateTimeField()
    whereLocated = models.CharField(max_length=50)
    solved = models.BooleanField(default=False)
    whenSolved = models.DateTimeField(blank=True, null=True)
    timedOut = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        est = pytz.timezone('US/Eastern')
        if self.pk is None:
            self.whenAsked = datetime.datetime.now(est)
        super(Request, self).save(*args, **kwargs)

    def timeOut(self):
        self.timedOut = True
        self.save()

    def resolutionTime(self):
        if not self.whenSolved:
            return None
        return self.whenSolved - self.whenAsked

    def __str__(self):
        return self.student.usr.first_name + " - Comp " + str(self.course.Number)

admin.site.register(Request)


class OfficeHours(models.Model):
    MON, TUE, WED, THU, FRI, SAT, SUN = 0, 1, 2, 3, 4, 5, 6
    DAY_OF_WEEK_CHOICES = (
        (SUN, 'Sunday'),
        (MON, 'Monday'),
        (TUE, 'Tuesday'),
        (THU, 'Thursday'),
        (FRI, 'Friday'),
        (SAT, 'Saturday')
    )


    ta = models.ManyToManyField(TA)
    startTime = models.TimeField()
    endTime = models.TimeField()
    dayOfWeek = models.PositiveSmallIntegerField(choices=DAY_OF_WEEK_CHOICES,
                                                 default=MON)

    def is_today(self):
        now = datetime.datetime.now(pytz.timezone(settings.TIME_ZONE))
        return self.dayOfWeek == now.weekday()

admin.site.register(OfficeHours)