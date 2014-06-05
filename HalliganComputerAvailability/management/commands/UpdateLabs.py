__author__ = 'tyler'
from django.core.management.base import BaseCommand, CommandError
import urllib2, csv, StringIO, datetime
from HalliganComputerAvailability.models import Lab
from django.core.cache import cache



class Command(BaseCommand):
    args = 'none'
    help = 'Add semesters labs from Bruce Molay\'s online log'

    def handle(self, *args, **options):
        cache.delete('HOMEPAGE')
        StartDate = raw_input("Enter Start Date of Labs in format dd/mm/yyyy: ")
        StartDate = StartDate.split('/')

        StartDate = datetime.date(int(StartDate[2]), int(StartDate[1]), int(StartDate[0]))
        EndDate = raw_input("Enter End Date of Labs in format dd/mm/yyyy: ")
        EndDate = EndDate.split('/')
        EndDate = datetime.date(int(EndDate[2]), int(EndDate[1]), int(EndDate[0]))

        OldLabs = Lab.objects.filter(StartDate=StartDate, EndDate=EndDate)
        OldLabs.delete()

        infile = urllib2.urlopen('http://www.cs.tufts.edu/~molay/labs/times.cgi').read()
        infile = StringIO.StringIO(infile)

        r = list(csv.reader(infile, delimiter='\t'))

        for row in r:
            #print row
            date = row[0]
            date = date.split(' ')
            #print date
            RmNum = date[0]
            DayOfWeek = date[1]
            times = date[2].split('-')
            StartTime = times[0]
            EndTime = times[1]
            prof = row[1]
            course = row[2]
            course = course.split('|')[0]

            #print RmNum, day_of_week, start_time, end_time, prof, course

            StartHour = int(StartTime.split(':')[0])
            EndHour = int(EndTime.split(':')[0])
            if StartHour < 8:
                StartHour += 12
                EndHour += 12
            if StartHour == 12:
                EndHour += 12

            StartTimeElement = datetime.time(StartHour, int(StartTime.split(':')[1]))
            EndTimeElement = datetime.time(EndHour, int(EndTime.split(':')[1]))

            def DayToInt(x):
                return {
                    'Mon': 0,
                    'Tue': 1,
                    'Wed': 2,
                    'Thu': 3,
                    'Fri': 4,
                    'Sat': 5,
                    'Sun': 6,
                }.get(x, 0)

            l = Lab(RoomNumber=RmNum, ClassName=course, StartTime=StartTimeElement, EndTime=EndTimeElement,
                    StartDate=StartDate, EndDate=EndDate, DayOfWeek=DayToInt(DayOfWeek))
            l.save()

            # class Lab(models.Model):
#     course_name = models.CharField(max_length=10)
#     room_number = models.IntegerField()
#     start_time = models.TimeField()
#     end_time = models.TimeField()
#     start_date = models.DateField()
#     end_date = models.DateField()
#     day_of_week = models.IntegerField(max_length=1)
