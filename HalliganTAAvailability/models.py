from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
import datetime
import pytz
# Create your models here.


class Student(models.Model):
    usr = models.OneToOneField(User)

admin.site.register(Student)

class TA(models.Model):
    usr = models.OneToOneField(User)
    officeHours = models.TextField()

admin.site.register(TA)

class Course(models.Model):
    Name = models.CharField(max_length=10)
    Professor = models.CharField(max_length=50)
    tas = models.ForeignKey(TA, blank=True, null=True)
    students = models.ForeignKey(Student, blank=True, null=True)

admin.site.register(Course)


class Request(models.Model):
    course = models.ForeignKey(Course)
    student = models.ForeignKey(Student)
    question = models.TextField()
    whenAsked = models.DateTimeField()

    def save(self, *args, **kwargs):
        est = pytz.timezone('US/Eastern')
        self.whenAsked = datetime.datetime.now(est)
        super(Request, self).save(*args, **kwargs)


admin.site.register(Request)