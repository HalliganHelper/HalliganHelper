import logging
logger = logging.getLogger(__name__)

from django.utils import timezone
from channels import Group
from channels.auth import (
    channel_session_user,
    channel_session_user_from_http
)

from tas.models import OfficeHour
from tas.utils import (
    get_ta_queue_name,
)


@channel_session_user_from_http
def websocket_connect(message):

    student = message.user.student
    school_name = student.school.name
    Group(school_name).add(message.reply_channel)

    # If they're an on-duty TA, add them to that message queue
    courses = message.user.student.ta_jobs.filter(ta__active=True)
    hours = OfficeHour.objects.filter(
        course__in=courses,
        ta=student,
        end_time__gte=timezone.now()
    )
    for hour in hours:
        queue_name = get_ta_queue_name(student.school, hour.course)
        Group(queue_name).add(message.reply_channel)

        # Put the reply channel in the session
        # so we can tie a user to it later
        channel_name = message.reply_channel.name

        # This is also used when ending an office hour. If you must change this
        # grep for the string and make sure you hit all use cases.
        ta_channel_key = 'ta_channels'

        if ta_channel_key not in message.http_session:
            message.http_session[ta_channel_key] = []

        if channel_name not in message.http_session[ta_channel_key]:
            message.http_session[ta_channel_key].append(channel_name)


@channel_session_user
def websocket_disconnect(message):
    logger.debug('Websocket disconnected: %s', message)
    school_name = message.user.student.school.name
    Group(school_name).discard(message.reply_channel)
