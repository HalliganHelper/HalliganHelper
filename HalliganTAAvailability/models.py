from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.exceptions import ValidationError
import datetime
import pytz
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from imagekit.admin import AdminThumbnail
from HalliganAvailability import settings


def not_empty_string(value):
    print len(value)
    if len(value) == 0:
        raise ValidationError("No value for field")

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


class TAAdmin(admin.ModelAdmin):
    def list_courses(obj):
        courses = map(str, obj.course.all().values_list('Number', flat=True))
        return ', '.join(courses)

    list_courses.short_description = 'Courses'

    list_display = ['__str__', 'active', list_courses, 'headshot']
    headshot = AdminThumbnail(image_field='headshot')


class TAManager(models.Manager):
    def active(self):
        qs = super(TAManager, self).get_query_set()
        return qs.filter(active=True)


class TA(models.Model):
    class Meta:
        verbose_name = "Teacher's Assistant"
        verbose_name_plural = "Teacher's Assistants"
    default_image = 'headshots/None/ming.jpg'
    usr = models.OneToOneField(User)
    course = models.ManyToManyField(Course)
    active = models.BooleanField(default=True)
    headshot = models.ImageField(upload_to='headshots',
                                 default=default_image)
    has_updated_headshot = models.BooleanField(default=False)

    objects = TAManager()

    def __str__(self):
        return self.usr.get_full_name()

    def __repr__(self):
        return self.__str__()

admin.site.register(TA, TAAdmin)


class RequestDisplayManager(models.Manager):
    def not_resolved(self):
        qs = super(RequestDisplayManager, self).get_query_set()
        return qs.filter(cancelled=False, solved=False)

    def still_open(self):
        three_hours = datetime.timedelta(hours=5)
        return self.get_query_set().filter(whenAsked__gte=now() - three_hours,
                                           cancelled=False,
                                           solved=False)


class Request(models.Model):
    course = models.ForeignKey(Course)
    student = models.ForeignKey(Student)

    question = models.CharField(max_length=51,
                                validators=[not_empty_string])
    whenAsked = models.DateTimeField()
    whereLocated = models.CharField(max_length=50,
                                    validators=[not_empty_string])
    cancelled = models.BooleanField(default=False, blank=True)
    emailed = models.BooleanField(default=False)

    solved = models.BooleanField(default=False)
    whenSolved = models.DateTimeField(blank=True, null=True)
    who_solved = models.ForeignKey(TA, null=True, blank=True)
    checked_out = models.BooleanField(default=False)

    timedOut = models.BooleanField(default=False)
    objects = RequestDisplayManager()

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.whenAsked = now()
        return super(Request, self).save(*args, **kwargs)

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
        qs = self.get_query_set()
        return qs.filter(start_time__lte=now()).filter(end_time__gte=now())


class OfficeHour(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    course = models.ForeignKey(Course)
    ta = models.ForeignKey(TA)
    location = models.CharField(max_length=255)
    objects = OfficeHourManager()


admin.site.register(OfficeHour)
