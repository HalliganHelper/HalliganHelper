import logging

from django.template import Context
from django.template.loader import get_template
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger(__name__)


def notify(user, courses, adding_ta=True):
    subject = 'TA Activation'
    from_email = 'halliganhelper@tylerlubeck.com'
    to_email = user.email
    if adding_ta:
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


def check_ta(user):
    pass
    # Because apparently having an '@' in the email gives a 403 back from Tufts
    # email = user.email.replace('@', ':')
    # logger.info('Checking if TA: user_id=%s email=%s', user.pk, email)
    # url = "http://www.cs.tufts.edu/~molay/compta/isata.cgi/{0}"
    # r = requests.get(url.format(email))
    # logger.info('Checking if TA: user_id=%s status=%s courses=%s',
    #             user.pk, r.status_code, r.text)
    # is_ta = r.text.strip() != 'NONE'
    # if is_ta:
    #     course_nums = r.text.strip().split(' ')
    #     courses = Course.objects.filter(number__in=course_nums)

    #     logger.debug('Added TA user_id', user.pk)
    #     ta, created = TA.objects.get_or_create(user=user)
    #     ta.active = True
    #     ta.course = courses
    #     ta.save()
    #     notify(user, courses, adding_ta=True)
    # else:
    #     if TA.objects.filter(user__email=email).exists():
    #         ta = TA.objects.get(user__email=email)
    #         ta.active = False
    #         ta.courses = []
    #         ta.save()
    #         notify(user, None, adding_ta=False)


def get_school_admin_group_name(school_name):
    return '{} Admins'.format(school_name)


def get_administrators_for_school(school):
    group_name = get_school_admin_group_name(school.name)
    user_model = get_user_model()
    group_admins = Group.objects\
        .prefetch_related('user_set').get(name=group_name).user_set.all()
    return group_admins | user_model.objects.filter(pk=school.administrator.pk)
