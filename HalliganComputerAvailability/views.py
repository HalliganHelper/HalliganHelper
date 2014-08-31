# Create your views here.
from django.http import HttpResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Lab, Computer, Server, RoomInfo
from .models import CourseUsageInfo
from HalliganTAAvailability.models import Course
import json
from django.core.cache import cache
import operator
from dateutil import tz
import datetime as dt
from collections import defaultdict

import logging

logger = logging.getLogger(__name__)


@require_GET
def labInformation(request):
    room = request.GET.get('room', None)
    current = request.GET.get('current', False)
    upcoming = request.GET.get('upcoming', False)
    response = []

    if room and current == 'true' and upcoming == 'true':
        labs = Lab.objects.filter(room_number=room)
        response = []
        for lab in labs:
            if lab.is_lab_coming_up() or lab.is_lab_in_session():
                response.append(lab.for_response())

        return HttpResponse(
            json.dumps(response),
            content_type="application/json")

    now = dt.datetime.now().date()
    if not room:
        labs = Lab.objects.all()
        for lab in labs:
            if lab.end_date > now:
                response.append(lab.for_response())

    else:
        labs = Lab.objects.filter(room_number=room)
        for lab in labs:
            data = lab.for_response()
            response.append(data)

    response.sort(
        key=operator.itemgetter(
            'DayOfWeek_AsNum',
            'start_time',
            'room_number'))

    return HttpResponse(json.dumps(response), content_type="application/json")


@require_GET
def SpecificRoom(request, RmNum):
    Comps = Computer.objects.filter(room_number=RmNum)
    response = {}
    if Comps.count() is 0:
        response['success'] = False

        return HttpResponse(
            json.dumps(response),
            content_type="application/json")

    Labs = Lab.objects.filter(room_number=RmNum)
    # Labs = list(Labs)
    Labs = [x for x in Labs if x.is_lab_in_session() is True]

    if len(Labs) is 0:
        response['inLab'] = False
    else:
        response['inLab'] = False
        response['labInfo'] = {}
        response['labInfo']['class'] = Labs[0].course_name
        response['labInfo']['startTime'] = Labs[0].start_time.strftime("%I:%M")
        response['labInfo']['endTime'] = Labs[0].end_time.strftime("%I:%M")

    response['machines'] = {}
    for c in Comps:
        time = c.last_update.astimezone(tz.gettz('America/New_York'))
        response['machines'][c.number] = {}
        response['machines'][c.number]['status'] = c.get_status_display()
        response['machines'][c.number][
            'last_updated'] = time.strftime('%m/%d/%y %I:%M %p')
        response['machines'][c.number]['name'] = c.number
    response['success'] = True
    response['classRoom'] = RmNum

    return HttpResponse(json.dumps(response), content_type="application/json")


@require_GET
def SpecificMachine(request):
    Machines = request.GET.keys()
    response = {}
    try:
        Comps = Computer.objects.filter(pk__in=Machines)
    except Computer.DoesNotExist:
        response['success'] = False
        return HttpResponse(
            json.dumps(response),
            content_type="application/json")

    if Comps.count() is 0:
        response['success'] = False
        return HttpResponse(
            json.dumps(response),
            content_type="application/json")

    response['success'] = True
    response['machines'] = {}

    for c in Comps:
        response['machines'][c.number] = c.status

    return HttpResponse(json.dumps(response), content_type="application/json")


@require_POST
@csrf_exempt
def UpdateStatus(request, MchID, NewStatus):
    result = {}
    MchID = MchID.lower()

    AuthCode = request.POST.get('AuthKey', default='')

    if not AuthCode == 'OnlyTylerGetsAccessToThis':
        error = 'You do not have the permissions to update machine status'
        result['success'] = False
        result['error'] = error
        return HttpResponse(
            json.dumps(result),
            content_type="application/json")

    if NewStatus not in Computer.CHOICES:
        result['success'] = False
        result['error'] = 'Failure. You set status to ' + \
            NewStatus + '. Use one of: ' + str(Computer.CHOICES)
        return HttpResponse(
            json.dumps(result),
            content_type="application/json")

    try:
        RoomNum = int(MchID[3:6])
    except ValueError:
        error = 'Failure.'
        error += 'room_number in incorrect form. Needs to be lab[num][letter]'
        result['success'] = False
        result['error'] = error
        return HttpResponse(
            json.dumps(result),
            content_type="application/json")

    Comp, created = Computer.objects.get_or_create(
        pk=MchID, room_number=RoomNum)
    Comp.Status = NewStatus
    Comp.save()

    result['success'] = True
    cache.delete("HOMEPAGE")
    return HttpResponse(json.dumps(result), content_type="application/json")


@require_POST
@csrf_exempt
def UpdateAllStatus(request):
    # available, course, computer, user(Always 'None'), error#
    data = json.loads(request.body)

    room_data = defaultdict(lambda: defaultdict(int))
    room_available_info = defaultdict(lambda: defaultdict(int))

    for comp in data:
        MchID = comp['computer'].lower()
        RoomNum = int(MchID[3:6])
        room_key = 'lab' + str(RoomNum)
        cmptr, created = Computer.objects.get_or_create(
            pk=MchID, room_number=RoomNum)
        if not comp['error']:
            course = comp['course']
            if course:
                course = course.lower()
            else:
                course = None

            available = comp['available']
            if available:
                status = 'AVAILABLE'
                room_available_info[room_key]['available'] += 1
            else:
                status = 'INUSE'
                room_available_info[room_key]['unavailable'] += 1

            cmptr.used_for = course
            cmptr.Status = status

            room_data[room_key][course] += 1

        else:
            cmptr.Status = 'ERROR'
            room_available_info[room_key]['error'] += 1
            room_data[room_key]['error'] += 1

        cmptr.save()

    for room, availability in room_available_info.iteritems():
        rm_info = RoomInfo()
        rm_info.lab = room
        rm_info.num_reporting = sum(availability.values())
        rm_info.num_available = availability['available']
        rm_info.num_unavailable = availability['unavailable']
        rm_info.num_error = availability['error']
        rm_info.save()

        for course, count in room_data[room].iteritems():
            c_u_i = CourseUsageInfo()
            c_u_i.room = rm_info
            c_u_i.course = course
            c_u_i.num_machines = count
            c_u_i.save()

    return HttpResponse(status=200)


@require_POST
@csrf_exempt
def UpdateLab(request):
    lab = request.POST.get('lab', default='')
    numReporting = request.POST.get('num_reporting', default=0)
    numReporting = int(numReporting)
    avgCpu = request.POST.get('avgCPU', default=0.0)
    avgCpu = float(avgCpu)

    rm = RoomInfo(lab=lab, numReporting=numReporting, avgCpu=avgCpu)
    rm.save()

    return HttpResponse(status=200)


@require_POST
@csrf_exempt
def UpdateServer(request, MchID, NewStatus, NumUsers):
    result = {}
    MchID = MchID.lower()

    AuthCode = request.POST.get('AuthKey', default='')

    if not AuthCode == 'OnlyTylerGetsAccessToThis':
        error = 'You do not have the permissions to update server status'
        result['success'] = False
        result['error'] = error
        return HttpResponse(
            json.dumps(result),
            content_type="application/json")

    if NewStatus not in Server.CHOICES:
        result['success'] = False
        result['error'] = 'Failure, You set status to ' + \
            NewStatus + '. Use one of: ' + str(Server.CHOICES)
        return HttpResponse(
            json.dumps(result),
            content_type="application/json")

    try:
        Serv = Server.objects.get(ComputerName=MchID)
        Serv.num_users = int(NumUsers)
        Serv.status = NewStatus
        Serv.save()
    except Server.DoesNotExist:
        Serv = Server(
            ComputerName=MchID,
            NumUsers=int(NumUsers),
            Status=NewStatus)
        Serv.save()

    # ServInfo = ServerInfo(name=MchID, num_users=int(num_users))
    # ServInfo.save()

    result['success'] = True
    return HttpResponse(json.dumps(result), content_type="application/json")


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

    template_params['rooms'] = rooms
    template_params['courses'] = courses

    return render(request, 'logged_in.html', template_params)


@require_GET
def ServerList(request):
    servers = Server.objects.all()
    response = []
    for serv in servers:
        time = serv.last_updated.astimezone(tz.gettz('America/New_York'))
        data = {
            'name': serv.name,
            'last_updated': time.strftime('%m/%d/%y %I:%M %p'),
            'num_users': serv.num_users,
            'status': serv.status
        }

        response.append(data)
    response.sort(key=operator.itemgetter('name'))

    return HttpResponse(json.dumps(response), content_type="application/json")
