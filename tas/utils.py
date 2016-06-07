import logging
import requests
import json

from django.template import Context
from django.template.loader import get_template
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.db.models import Q
from channels import Group as ChannelsGroup

logger = logging.getLogger(__name__)


class InvalidCourseStringError(ValueError):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        msg = 'Course Strings must contain a number. You gave {}'
        return msg.format(self.value)


def notify(user, courses):
    subject = 'TA Status'

    if courses:
        plaintext = get_template('tas/ta_activation.txt')
        htmly = get_template('tas/ta_activation.html')
    else:
        plaintext = get_template('tas/remove_ta.txt')
        htmly = get_template('tas/remove_ta.html')

    d = Context({'user': user, 'courses': courses})
    text_content = plaintext.render(d)
    html_content = htmly.render(d)

    user.email_user(subject, text_content, html_message=html_content)


def _confirm_a_ta(user, course_strings):
    from tas.models import Course, TA

    # Create query objects. Basically means create a bunch of objects that
    # say "number=number AND postfix=postfix"
    #
    # Q objects:
    # https://docs.djangoproject.com/es/1.9/topics/db/queries/#complex-lookups-with-q-objects
    #
    # OR all of the created Q objects together
    # (number=11 AND postfix='') OR (number=150 AND postfix='IDS')
    course_query = Q()
    for course_string in course_strings.split(' '):
        number, postfix = _split_course_string(course_string)
        q_obj = Q(number=number) & Q(postfix=postfix)
        course_query |= q_obj

    # Run the query to get the courses
    courses = Course.objects.filter(course_query)

    student = user.student
    for course in courses:
        ta_job, _ = TA.objects.get_or_create(student=student, course=course)
        ta_job.active = True
        ta_job.save()

    # Get any existing TA jobs that we didn't just add and set them inactive
    remove_jobs = TA.objects\
        .filter(student=student).exclude(course__in=courses)
    remove_jobs.update(active=False)

    notify(user, courses)


def check_ta(user):
    from tas.models import TA
    try:
        # Because apparently having an '@' in the email gives a 403 back from Tufts
        email = user.email.replace('@', ':')
        url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
        r = requests.get(url.format(email))
        r.raise_for_status()
        course_strings = r.text.strip()
        logger.info('Checked TA status for user. user="%s" status="%s"',
                    user.email, course_strings)
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

            return False
    except Exception:
        # intentionally catch everything. If it failed, log and continue
        logger.exception('Failed to set status for %s. Courses: %s',
                         user.email, course_strings)
        return False

    return True


def get_administrators_for_school(school):
    group_name = get_school_admin_group_name(school.name)
    user_model = get_user_model()
    group_admins = Group.objects\
        .prefetch_related('user_set').get(name=group_name).user_set.all()
    return group_admins | user_model.objects.filter(pk=school.administrator.pk)


def get_school_admin_group_name(school_name):
    return '{} Admins'.format(school_name)


def _split_course_string(course_string):
    """ Split the course string in to a course number and a course postfix
    Expects all strings to be in the format numpostfix. For instance,
    '50CP' and '150IDS' are valid. The postfix is allowed to be empty: '11' is
    a valid course string. The number, however, must be present: 'IDS' is not
    a valid course string. Only the first numbers are parsed as the course
    number: '11A7B12' will be parsed as course_num = 11, postfix = 'A7B12'

    :param str course_string: The course string to parse

    :returns: `(course_num, course_postfix)`

    :raises: InvalidCourseStringError
    """
    course_num = ''
    course_postfix = ''

    count = 0
    for indx, char in enumerate(course_string):
        if not char.isdigit():
            break

        course_num += char
        count += 1
    try:
        course_num = int(course_num)
    except ValueError:
        logger.exception('Got an invalid course string: %s', course_string)
        raise InvalidCourseStringError(course_string)

    course_postfix = course_string[count:]

    return course_num, course_postfix


def get_school_name(obj):
    # type: (Union[Request, OfficeHour, School]) -> str
    # This nasty trick is to get around circular imports
    class_name = obj.__class__.__name__

    name = ''
    if class_name in ('Request', 'OfficeHour'):
        name = obj.course.school.name
    elif class_name == 'School':
        name = obj.name
    else:
        raise NotImplementedError(
            "Can't get school name for instance of {}"
            "".format(obj.__class__.__name__)
        )
    return name

def get_ta_queue_name(school, course):
    # type: (School, Course) -> str
    return '{school_name}-ta-{course_id}'.format(
        school_name=school.name,
        course_id=course.pk
    )


def broadcast_message(channel_name, message_type, data_packet):
    # type: (str, str, Dict[str,Union[str,int]]) -> None
    message_packet = {
        'type': message_type,
        'data': data_packet,
    }
    ChannelsGroup(channel_name).send({
        'text': json.dumps(message_packet),
    })
