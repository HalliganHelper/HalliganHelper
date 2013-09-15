from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
# Create your models here.


class Course(models.Model):
    Name = models.CharField(max_length=10)
    Number = models.CharField(max_length=20)
    Professor = models.CharField(max_length=50)

admin.site.register(Course)


class Profile(models.Model):
    NeedsHelp = models.BooleanField()
    BaseUser = models.ForeignKey(User, primary_key=True)
    NeedHelpWith = models.ForeignKey(Course)

admin.site.register(Profile)


class TA(models.Model):
    Classes = models.ManyToManyField(Course, related_name='AllClasses')
    CurrentClass = models.ManyToManyField(Course, related_name='CurrentClass')
    Date = models.DateField(auto_now=True)
    StartTime = models.TimeField(auto_now=True)
    EndTime = models.TimeField(auto_now=True)
    HomeBaseRoom = models.CharField(max_length=30)
    Data = models.ForeignKey(Profile, primary_key=True)

admin.site.register(TA)
