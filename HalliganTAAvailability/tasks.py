from __future__ import absolute_import
# Author: tyler
# Created on: 9/30/14
__author__ = 'tyler'
from celery import shared_task
from .models import OfficeHour
from .views import AnnouncementNamespace
import logging

logger = logging.getLogger("task")

@shared_task
def cancel_hours(office_hour_id):
    AnnouncementNamespace.cancel_office_hours(office_hour_id)



