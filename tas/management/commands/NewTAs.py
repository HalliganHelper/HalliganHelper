__author__ = 'tyler'
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from tas.models import Course, TA
from django.db import IntegrityError
import requests
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context


class Command(BaseCommand):
    args = 'none'
    help = 'Update TAs from Bruce Molays list of TA emails'

    def notify(self, user, courses=None, adding_ta=True):
        subject = 'Halligan Helper TA status'
        from_email = 'halliganhelper@tylerlubeck.com'
        to_email = user.email
        if adding_ta:
            plaintext = get_template('ta_activation.txt')
            htmly = get_template('ta_activation.html')
        else:
            plaintext = get_template('remove_ta.txt')
            htmly = get_template('remove_ta.txt')

        d = Context({'user': user, 'courses': courses})
        text_content = plaintext.render(d)
        html_content = htmly.render(d)

        msg = EmailMultiAlternatives(subject, text_content,
                                     from_email, [to_email])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()

    def handle(self, *args, **options):
        users = User.objects.all()

        for user in users:
            print("Checking {0}: {1}".format(user.get_full_name(), user))
            email = user.email
            url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
            r = requests.get(url.format(email))
            is_ta = r.text.strip() != 'NONE'
            if is_ta:
                course_nums = r.text.strip().split(' ')
                courses = Course.objects.filter(number__in=course_nums)
                print("{0} is a TA for {1}".format(user.get_full_name(),
                                                   map(str, courses)))
                ta, created = TA.objects.get_or_create(user=user)
                ta.active = True
                ta.course = courses
                ta.save()
                self.notify(user, courses)
            else:
                if TA.objects.filter(user__email=email).exists():
                    ta = TA.objects.get(user__email=email)
                    ta.active = False
                    ta.courses = []
                    ta.save()
                    self.notify(user, None, False)
            #Email TA based on activated or removed as TA

