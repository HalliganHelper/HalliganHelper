# Create your views here.
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Computer
from HalliganTAAvailability.models import Course, Request
from django.core.cache import cache

import logging

logger = logging.getLogger(__name__)


ROOMS_CACHE_KEY = "ROOMS_CACHE_KEY"
LABS_CACHE_KEY = "LABS_CACHE_KEY"


@login_required
def ModularHomePage(request):
    template_params = {}

    rooms = cache.get(ROOMS_CACHE_KEY)
    if not rooms or rooms:
        rooms = Computer.objects.values_list('room_number', flat=True)
        rooms = sorted(list(set(rooms)))
        cache.set(ROOMS_CACHE_KEY, rooms)

    courses = Course.objects.values_list('Number', flat=True)
    course_data = []
    for course in courses:
        count = Request.objects.still_open()
        count = count.filter(course__Number=course).count()
        data = {
            'num': course,
            'count': count
        }
        course_data.append(data)

    course_data = sorted(course_data, key=lambda k: k['num'])
    template_params['rooms'] = rooms
    template_params['courses'] = course_data

    return render(request, 'logged_in.html', template_params)
