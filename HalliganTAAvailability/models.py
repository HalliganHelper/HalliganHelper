from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
import datetime
import pytz
# Create your models here.


class Student(models.Model):
    usr = models.OneToOneField(User)

    def __str__(self):
        return self.usr.first_name + ' ' + self.usr.last_name

admin.site.register(Student)

class TA(models.Model):
    usr = models.OneToOneField(User)
    officeHours = models.TextField()

admin.site.register(TA)


class Course(models.Model):
    Name = models.CharField(max_length=100)
    Number = models.IntegerField()
    Professor = models.CharField(max_length=50)
    tas = models.ForeignKey(TA, blank=True, null=True)
    students = models.ForeignKey(Student, blank=True, null=True)

    def __str__(self):
        return str(self.Number) + ": " + self.Name

admin.site.register(Course)


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
        self.whenAsked = datetime.datetime.now(est)
        super(Request, self).save(*args, **kwargs)

    def timeOut(self):
        self.timedOut = True

    def __str__(self):
        return self.student.usr.first_name + " - Comp " + str(self.course.Number)


admin.site.register(Request)
