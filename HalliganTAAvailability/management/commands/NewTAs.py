__author__ = 'tyler'
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from HalliganTAAvailability.models import Course, TA
from django.db import IntegrityError



class Command(BaseCommand):
    args = 'none'
    help = 'Update TAs from Bruce Molays list of TA emails'

    def handle(self, *args, **options):
        users = User.objects.all()

        for user in users:
            print("Checking {0}".format(user.get_full_name()))
            email = user.email
            is_ta = True #Send request to Bruce with email, this is response
            if is_ta:
                ta, created = TA.objects.get_or_create(usr=user)
                ta.active = True
                ta.save()
            else:
                if TA.objects.filter(usr__email=email).exists():
                    ta = TA.objects.get(usr__email=email)
                    ta.active = False
                    ta.save()
            #Email TA based on activated or removed as TA

