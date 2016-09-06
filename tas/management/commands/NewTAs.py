__author__ = 'tyler'
import smtplib
import time
from django.core.management.base import BaseCommand, CommandError
from tas.models import Course, Student, TA
import requests
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context

# Don't mess with anyone from other schools
SCHOOL = 'Tufts University'


class Command(BaseCommand):
    args = 'none'
    help = 'Update TAs from Bruce Molays list of TA emails'

    def notify(self, user, courses=None, adding_ta=True):
        subject = 'Halligan Helper TA status'
        from_email = 'noreply@halliganhelper.com'
        to_email = user.email
        if adding_ta:
            plaintext = get_template('tas/ta_activation.txt')
            htmly = get_template('tas/ta_activation.html')
        else:
            plaintext = get_template('tas/remove_ta.txt')
            htmly = get_template('tas/remove_ta.txt')

        d = Context({'user': user, 'courses': courses})
        text_content = plaintext.render(d)
        html_content = htmly.render(d)

        msg = EmailMultiAlternatives(subject, text_content,
                                     from_email, [to_email])
        msg.attach_alternative(html_content, 'text/html')
        print("Sending email: %s" % text_content)

        while True:
            try:
                msg.send()
                break
            except smtplib.SMTPDataError as e:
                if e.args[0] == 550:
                    print("Exceeded mail rate limit, sleeping for a minute")
                    time.sleep(60)


    def handle(self, *args, **options):

        students = Student.objects.filter(school__name=SCHOOL)

        for student in students:
            user = student.user
            print("Checking {0}: {1}".format(user.get_full_name(), user))
            email = user.email.replace('@', ':')
            url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
            r = requests.get(url.format(email))

            courses = []
            if r.text.strip() != 'NONE':
                for course_name in r.text.strip().split(' '):
                    number = ''
                    postfix = ''
                    for index, char in enumerate(course_name):
                        try:
                            int(char)
                            number += char
                        except ValueError:
                            postfix = course_name[index:]
                            break

                    if not number:
                        print("Malformed course name %s" % course_name)
                        continue

                    try:
                        courses.append(Course.objects.get(number=int(number),
                                                          postfix=postfix,
                                                          school__name=SCHOOL))
                    except Course.DoesNotExist:
                        print("Don't know about course %s" % course_name)

            old_course_list = map(str, student.ta_jobs.all())
            new_course_list = map(str, courses)
            print("{0}: {1} -> {2}".format(user.get_full_name(),
                                           old_course_list,
                                           new_course_list))

            TA.objects.filter(student=student).update(active=False)
            for course in courses:
                try:
                    ta_job = TA.objects.get(student=student,
                                            course=course)

                    ta_job.active = True
                    ta_job.save()
                except TA.DoesNotExist:
                    ta_job = TA.objects.create(student=student,
                                               course=course,
                                               active=True)

            # Don't notify students who aren't and weren't a TA.
            if old_course_list or new_course_list:
                self.notify(user, courses, len(courses) > 0)
