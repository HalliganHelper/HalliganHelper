__author__ = 'tyler'
from django.core.management.base import BaseCommand
import urllib2
import csv
import StringIO
import datetime
from HalliganComputerAvailability.models import Lab
from django.core.cache import cache


class Command(BaseCommand):
    args = 'none'
    help = 'Add semesters labs from Bruce Molay\'s online log'

    def handle(self, *args, **options):
        cache.delete('HOMEPAGE')
        StartDate = raw_input("Enter Start Date of Labs in format dd/mm/yyyy: ")
        StartDate = StartDate.split('/')

        StartDate = datetime.date(int(StartDate[2]),
                                  int(StartDate[1]),
                                  int(StartDate[0]))
        EndDate = raw_input("Enter End Date of Labs in format dd/mm/yyyy: ")
        EndDate = EndDate.split('/')
        EndDate = datetime.date(int(EndDate[2]),
                                int(EndDate[1]),
                                int(EndDate[0]))

        OldLabs = Lab.objects.filter(start_date=StartDate, end_date=EndDate)
        OldLabs.delete()

        url = 'http://www.cs.tufts.edu/~molay/labs/times.cgi'
        infile = urllib2.urlopen(url).read()
        infile = StringIO.StringIO(infile)

        r = list(csv.reader(infile, delimiter='\t'))

        for row in r:
            date = row[0]
            date = date.split(' ')
            RmNum = date[0]
            DayOfWeek = date[1]
            times = date[2].split('-')
            StartTime = times[0]
            EndTime = times[1]
            course = row[2]
            course = course.split('|')[0]

            StartHour = int(StartTime.split(':')[0])
            EndHour = int(EndTime.split(':')[0])
            if StartHour < 8:
                StartHour += 12
                EndHour += 12
            if StartHour == 12:
                EndHour += 12

            StartTimeElement = datetime.time(StartHour,
                                             int(StartTime.split(':')[1]))
            EndTimeElement = datetime.time(EndHour,
                                           int(EndTime.split(':')[1]))

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

            l = Lab(room_number=RmNum, course_name=course,
                    start_time=StartTimeElement, end_time=EndTimeElement,
                    start_date=StartDate, end_date=EndDate,
                    day_of_week=DayToInt(DayOfWeek))
            l.save()
