__author__ = 'tyler'
from django.core.management.base import BaseCommand, CommandError
import urllib2, csv, StringIO, datetime
from HalliganComputerAvailability.models import Lab



class Command(BaseCommand):
    args = 'none'
    help = 'Add semesters labs from Bruce Molays online log'

    def handle(self, *args, **options):
        StartDate = raw_input("Enter Start Date of Labs in format dd/mm/yyyy: ")
        StartDate = StartDate.split('/')
        print StartDate
        StartDate = datetime.date(int(StartDate[2]), int(StartDate[1]), int(StartDate[0]))
        EndDate = raw_input("Enter End Date of Labs in format dd/mm/yyyy: ")
        EndDate = EndDate.split('/')
        EndDate = datetime.date(int(EndDate[2]), int(EndDate[1]), int(EndDate[0]))


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

            #print RmNum, DayOfWeek, StartTime, EndTime, prof, course

            StartHour = int(StartTime.split(':')[0])
            EndHour = int(EndTime.split(':')[0])
            if StartHour < 8:
                StartHour += 12
                EndHour += 12

            StartTimeElement = datetime.time(StartHour, int(StartTime.split(':')[1]))
            EndTimeElement = datetime.time(EndHour, int(EndTime.split(':')[1]))
            #print StartTimeElement, EndTimeElement
            #print StartDate, EndDate

            def DayToInt(x):
                return {
                    'Sun': 0,
                    'Mon': 1,
                    'Tue': 2,
                    'Wed': 3,
                    'Thu': 4,
                    'Fri': 5,
                    'Sat': 6
                }.get(x, 0)
            print RmNum, course, StartTimeElement, EndTimeElement, StartDate, EndDate, DayToInt(DayOfWeek)
            l = Lab(RoomNumber=RmNum, ClassName=course, StartTime=StartTimeElement, EndTime=EndTimeElement,
                    StartDate=StartDate, EndDate=EndDate, DayOfWeek=DayToInt(DayOfWeek))
            l.save()

            # class Lab(models.Model):
#     ClassName = models.CharField(max_length=10)
#     RoomNumber = models.IntegerField()
#     StartTime = models.TimeField()
#     EndTime = models.TimeField()
#     StartDate = models.DateField()
#     EndDate = models.DateField()
#     DayOfWeek = models.IntegerField(max_length=1)