from django.db import models
from datetime import datetime
import datetime as dt
from datetime import timedelta
from django.contrib import admin

# Create your models here.

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
    ComputerNumber = models.CharField(max_length=7,
                                      primary_key=True)#Primary Key
    RoomNumber = models.IntegerField()
    Status = models.CharField(max_length=9,
                              choices=STATUS_CHOICES,
                              default=AVAILABLE)
    LastUpdate = models.DateTimeField(auto_now=True)

admin.site.register(Computer)


class RoomInfo(models.Model):
    lab = models.CharField(max_length=10)
    numReporting = models.IntegerField()
    avgCpu = models.FloatField()
    updateTime = models.DateTimeField(auto_now=True)

admin.site.register(RoomInfo)


class ComputerInfo(models.Model):
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

    RoomNumber = models.IntegerField()
    ComputerNumber = models.CharField(max_length=7)
    Updated = models.DateTimeField(auto_now=True)
    ComputerStatus = models.CharField(max_length=10,
                                      choices=STATUS_CHOICES,
                                      default=AVAILABLE)


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
    ComputerName = models.CharField(max_length=20,
                                    primary_key=True)
    NumUsers = models.IntegerField()

    Status = models.CharField(max_length=40,
                              choices=STATUS_CHOICES,
                              default=ON)

    LastUpdated = models.DateTimeField(auto_now=True)

admin.site.register(Server)


class ServerInfo(models.Model):
    ComputerName = models.CharField(max_length=20)
    Updated = models.DateTimeField(auto_now=True)
    NumUsers = models.IntegerField()


class Lab(models.Model):
    ClassName = models.CharField(max_length=30)
    RoomNumber = models.IntegerField()
    StartTime = models.TimeField()
    EndTime = models.TimeField()
    StartDate = models.DateField()
    EndDate = models.DateField()
    DayOfWeek = models.IntegerField(max_length=1)

    def for_response(self):
        response = {
            'ClassName': self.ClassName,
            'RoomNumber': self.RoomNumber,
            'StartTime': self.StartTime.strftime('%I:%M %p'),
            'EndTime': self.EndTime.strftime('%I:%M %p'),
            'DayOfWeek': self.day_of_week(),
            'InSession': self.is_lab_in_session(),
            'ComingUp': self.is_lab_coming_up(),
            'DayOfWeek_AsNum': self.DayOfWeek
        }
        return response

    def day_of_week(self, short_name=False):
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
            return long(self.DayOfWeek)[0:3]
        else:
            return long(self.DayOfWeek)

    def is_lab_in_session(self):
        """
        Returns whether a lab is currently in session
        """
        CurrTime = datetime.now().time()
        CurrDate = datetime.now().date()
        CurrDay = datetime.now().weekday()

        if(self.StartDate < CurrDate < self.EndDate
           and self.StartTime < CurrTime < self.EndTime
           and self.DayOfWeek == CurrDay):
            return True

        return False

    def is_lab_coming_up(self):
        """
         Returns whether the lab occurs within the next 3 hours
        """

        CurrTime = datetime.now().time()
        CurrDate = datetime.now().date()
        CurrDay = datetime.now().weekday()
        StartTime = self.StartTime
        delta = dt.timedelta(hours=3)

        ModdedStartTime = (datetime.combine(dt.date(10, 10, 10), self.StartTime) - delta).time()

        if(self.StartDate < CurrDate < self.EndDate
            and self.DayOfWeek == CurrDay
            and self.EndTime > CurrTime > ModdedStartTime
            and not self.is_lab_in_session()):

                return True

        return False

admin.site.register(Lab)






