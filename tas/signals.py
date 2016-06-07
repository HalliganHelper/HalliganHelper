import logging

from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.utils import timezone


from tas.utils import (
    get_school_admin_group_name,
    get_school_name,
    get_ta_queue_name,
    broadcast_message,
)

logger = logging.getLogger(__name__)


def create_school_admin_group(instance, created, **kwargs):
    if created:
        group_name = get_school_admin_group_name(instance.name)
        Group.objects.get_or_create(name=group_name)


def create_student_profile_for_user(instance, created, **kwargs):
    if created:
        domain = instance.email.split('@')[-1]
        try:
            sed = SchoolEmailDomain.objects.get(domain=domain)
            Student.objects.get_or_create(user=instance, school=sed.school)

        except SchoolEmailDomain.DoesNotExist:
            logger.error('Tried to create a student for the '
                         'non existent email domain: %s', domain)


def request_modified(instance, created, **kwargs):
    # type: (Request, Boolean, Dict) -> None
    course_id = instance.course.pk
    request_id = instance.pk
    channel_name = get_school_name(instance)
    ta_queue_name = get_ta_queue_name(instance.course.school, instance.course)
    if created:
        logger.info('Request %s created', request_id)
        broadcast_message(channel_name, 'request_created', {
            'course': course_id,
            'id': request_id
        })
        broadcast_message(ta_queue_name, 'student_added', {
            'course_name': instance.course.name,
            'studnet_name': instance.requestor.user.get_full_name()
        })
    else:
        removed = instance.cancelled or instance.solved
        packet_type = 'request_removed' if removed else 'request_updated'
        broadcast_message(channel_name, packet_type, {
            'course': course_id,
            'id': request_id,
        })

        if not removed:
            # TODO: publish message for TAs to know someone is on their queue
            pass


def office_hour_modified(instance, created, **kwargs):
    channel_name = get_school_name(instance)
    if created:
        broadcast_message(channel_name, 'on_duty', {
            'course': instance.course.pk,
            'id': instance.pk,
        })

    elif not created and office_hour.end_time <= timezone.now():
        broadcast_message(channel_name, 'off_duty', {
            'course': instance.course.pk,
            'id': instance.pk,
        })
