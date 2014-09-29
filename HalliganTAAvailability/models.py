from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
import datetime
import pytz
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from HalliganAvailability import settings


def _now():
    now = datetime.datetime.now(pytz.timezone(settings.TIME_ZONE))
    return now


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
    active = models.BooleanField(default=True)
    headshot = ProcessedImageField(upload_to='headshots',
                                   processors=ResizeToFit(100,100),
                                   format='JPEG',
                                   options={'quality': 60},
                                   default='headshots/None/ming.jpg')

    def __str__(self):
        return "{0}: {1}".format(self.usr, self.usr.get_full_name())

admin.site.register(TA)


class RequestDisplayManager(models.Manager):
    def not_resolved(self):
        qs = super(RequestDisplayManager, self).get_query_set()
        return qs.filter(cancelled=False, solved=False)

    def still_open(self):
        three_hours = datetime.timedelta(hours=5)
        now = _now()
        now -= three_hours
        return self.get_query_set().filter(whenAsked__gte=now)


class Request(models.Model):
    course = models.ForeignKey(Course)
    student = models.ForeignKey(Student)
    question = models.CharField(max_length=51)
    whenAsked = models.DateTimeField()
    whereLocated = models.CharField(max_length=50)
    solved = models.BooleanField(default=False)
    whenSolved = models.DateTimeField(blank=True, null=True)
    timedOut = models.BooleanField(default=False)
    emailed = models.BooleanField(default=False)
    who_solved = models.ForeignKey(TA, null=True, blank=True)
    checked_out = models.BooleanField(default=False)
    cancelled = models.BooleanField(default=False, blank=True)

    objects = RequestDisplayManager()

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
        return '{0} - Comp {1}'.format(self.student.usr.first_name,
                                       self.course.Number)

admin.site.register(Request)


class OfficeHourManager(models.Manager):
    def on_duty(self):
        now = _now()
        qs = self.get_query_set()
        return qs.filter(start_time__lte=now).filter(end_time__gte=now)


class OfficeHour(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    course = models.ForeignKey(Course)
    ta = models.ForeignKey(TA)
    location = models.CharField(max_length=255)
    objects = OfficeHourManager()


admin.site.register(OfficeHour)
