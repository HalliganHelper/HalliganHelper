__author__ = 'tyler'
from django.core.management.base import BaseCommand, CommandError
from HalliganTAAvailability.models import Course
from django.db import IntegrityError



class Command(BaseCommand):
    args = 'none'
    help = 'Add semesters labs from Bruce Molays online log'

    def handle(self, *args, **options):
        courseNum = 0
        courseName, profName = '', ''
        while True:
            try:
                courseNum = int(raw_input('Enter the course number: '))
                break
            except ValueError:
                print('That was not a number!')

        while True:
            courseName = raw_input('Enter the course name: ')
            if courseName != '':
                break

        while True:
            profName = raw_input('Enter the professor\'s name: ')
            if profName != '':
                break

        try:
            Course(Name=courseName, Number=courseNum, Professor=profName).save()
        except IntegrityError:
            print("Sorry, something went wrong. Please try again. ")