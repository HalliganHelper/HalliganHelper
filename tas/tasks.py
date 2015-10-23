from __future__ import absolute_import
# Author: tyler
# Created on: 9/30/14
__author__ = 'tyler'
from celery import shared_task
import logging
import redis

logger = logging.getLogger(__name__)

POOL = redis.ConnectionPool(host='localhost', db=0)
