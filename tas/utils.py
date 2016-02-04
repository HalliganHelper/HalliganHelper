import logging
import requests

from django.template import Context
from django.template.loader import get_template
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.mail import EmailMultiAlternatives
from django.db.models import Q


logger = logging.getLogger(__name__)


def notify(user, courses):
    subject = 'TA Status'
    from_email = 'halliganhelper@tylerlubeck.com'
    to_email = user.email

    if courses:
        plaintext = get_template('tas/ta_activation.txt')
        htmly = get_template('tas/ta_activation.html')
    else:
        plaintext = get_template('tas/remove_ta.txt')
        htmly = get_template('tas/remove_ta.html')

    d = Context({'user': user, 'courses': courses})
    text_content = plaintext.render(d)
    html_content = htmly.render(d)

    msg = EmailMultiAlternatives(subject, text_content,
                                 from_email, [to_email])
    msg.attach_alternative(html_content, 'text/html')
    msg.send()


def _split_course_string(course_string):
    course_num = ''
    course_postfix = ''

    count = 0
    for char, indx in enumerate(course_string):
        if not char.isdigit():
            break

        course_num += char
        count += 1

    course_num = int(course_num)
    course_postfix = course_string[count:]

    return course_num, course_postfix


def _confirm_a_ta(user, course_strings):
    from tas.models import Course, TA
    # Split the course strings from '150IDS 11' to
    # [(150, 'IDS'), (11, '')]
    course_tuples = [
        _split_course_string(course_string)
        for course_string in course_strings.split(' ')
    ]

    # Create query objects. Basically means create a bunch of objects that
    # say "number=number AND postfix=postfix"
    #
    # zip is dope:
    # http://stackoverflow.com/questions/19339/a-transpose-unzip-function-in-python-inverse-of-zip
    #
    # Q objects:
    # https://docs.djangoproject.com/es/1.9/topics/db/queries/#complex-lookups-with-q-objects
    q_objects = [
        Q(number=number) & Q(postfix=postfix)
        for number, postfix in zip(*course_tuples)
    ]

    # OR all of the created Q objects together
    # (number=11 AND postfix='') OR (number=150 AND postfix='IDS')
    course_query = q_objects[0]
    for q_object in q_objects[1:]:
        course_query |= q_object

    # Run the query to get the courses
    courses = Course.objects.filter(course_query)

    student = user.student
    for course in courses:
        ta_job = TA.objects.get_or_create(student, course)
        ta_job.active = True
        ta_job.save()

    # Get any existing TA jobs that we didn't just add and set them inactive
    remove_jobs = TA.objects\
        .filter(student=student).exclude(course__in=course)
    remove_jobs.update(active=False)

    notify(user, courses)


def check_ta(user):
    from tas.models import Course, TA
    try:
        # Because apparently having an '@' in the email gives a 403 back from Tufts
        email = user.email.replace('@', ':')
        url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
        r = requests.get(url.format(email))
        r.raise_for_status()
        course_strings = r.text.strip()
    except:
        logger.exception('Failed to get TA status for %s', user.email)
        return False

    try:
        if course_strings != 'NONE':
            _confirm_a_ta(user, course_strings)

        else:
            remove_jobs = TA.objects.filter(student=user.student, active=True)
            if remove_jobs.exists():
                remove_jobs.update(active=False)
                courses = [job.course for job in remove_jobs.all()]
                notify(user, courses)
    except:
        logger.exception('Failed to check TA status for %s. Courses: %s',
                         user.email, course_strings)
        return False

    return True


def get_school_admin_group_name(school_name):
    return '{} Admins'.format(school_name)


def get_administrators_for_school(school):
    group_name = get_school_admin_group_name(school.name)
    user_model = get_user_model()
    group_admins = Group.objects\
        .prefetch_related('user_set').get(name=group_name).user_set.all()
    return group_admins | user_model.objects.filter(pk=school.administrator.pk)
