from __future__ import absolute_import
# Author: tyler
# Created on: 9/30/14
__author__ = 'tyler'
from celery import shared_task
from .views import AnnouncementNamespace
import logging
import redis

logger = logging.getLogger("task")

POOL = redis.ConnectionPool(host='localhost', db=0)

@shared_task
def cancel_hours(office_hour_id, course_number):
    logger.debug("OFFICE HOUR CANCELLED FOR COURSE {}".format(course_number))
    AnnouncementNamespace.cancel_office_hours(office_hour_id, course_number)
    logger.debug("CANCEL RAN")
