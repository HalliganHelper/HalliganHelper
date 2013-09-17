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

    def is_lab_in_session(self):
        CurrTime = datetime.now().time()
        CurrDate = datetime.now().date()
        CurrDay = datetime.now().weekday()
        #print "CUrrentDay", CurrDay
        #print "LAB DAY", self.DayOfWeek
        #print "CURRTIME", CurrTime, "CURRDATE", CurrDate, "CURRDAY", CurrDay
        #print "STARTTIME", self.StartTime, "ENDTIME", self.EndTime, "DAYOFWEEK", self.DayOfWeek
        if(self.StartDate < CurrDate < self.EndDate
           and self.StartTime < CurrTime < self.EndTime
           and self.DayOfWeek == CurrDay):
            return True

        return False

    def is_lab_coming_up(self):
        """
         Returns whether the lab occurs within an hour
        """

        CurrTime = datetime.now().time()
        CurrDate = datetime.now().date()
        CurrDay = datetime.now().weekday()
        StartTime = self.StartTime
        delta = dt.timedelta(hours=3)

        ModdedStartTime = (datetime.combine(dt.date(1, 1, 1), self.StartTime) - delta).time()
        print "LAB: ", self.ClassName, ", DAY: ", self.DayOfWeek, ",ORIGINAL: ,", self.StartTime, ", MODDED: ", ModdedStartTime, ", CURR:", CurrTime
        if(self.StartDate < CurrDate < self.EndDate
            and self.DayOfWeek == CurrDay
            and self.EndTime > CurrTime > ModdedStartTime
            and not self.is_lab_in_session()):

                print "COMING LAB"

                return True

        return False

admin.site.register(Lab)






