# Create your views here.
from django.http import HttpResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response, render
from .models import Lab, Computer, Server, RoomInfo, ServerInfo
from .models import CourseUsageInfo
import json
from django.core.cache import cache
from django.core import serializers
import operator
from dateutil import tz
import datetime as dt
from collections import defaultdict

import logging

logger = logging.getLogger(__name__)


def ApiDocs(request):
    return render_to_response('ApiDocs.html')


@require_GET
def AllComps(request):

    def SerializeHandler(obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        else:
            raise TypeError(
                'Object of type %s with value of %s is not JSON serializable' %
                (type(obj), repr(obj)))

    response = {}

    try:
        Comps = Computer.objects.all()
    except Computer.DoesNotExist:
        response['success'] = False
        return HttpResponse(
            json.dumps(
                response,
                default=SerializeHandler),
            content_type="application/json")

    try:
        Labs = Lab.objects.all()
    except Lab.DoesNotExist:
        pass

    response['rooms'] = {}

    # response['rooms'][c.room_number] =
    for c in Comps:
        if c.room_number not in response['rooms']:
            response['rooms'][c.room_number] = {'classRoom': c.room_number}
            response['rooms'][c.room_number]['machines'] = {}
            response['rooms'][c.room_number]['inLab'] = False
        response['rooms'][c.room_number]['machines'][c.number] = c.status

    for lab in Labs:
        if lab.is_lab_in_session() and lab.room_number in response['rooms']:
            response['rooms'][lab.room_number]['inLab'] = True
            response['rooms'][lab.room_number]['labInfo'] = {
                'class': lab.course_name,
                'startTime': lab.start_time,
                'endTime': lab.end_time
            }

    response['success'] = True
    return HttpResponse(
        json.dumps(
            response,
            default=SerializeHandler),
        content_type="application/json")


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


# @require_GET
# def GetRoomInfo(request):
#     logger.debug('GET ROOM INFO')
#     labName = request.GET.get('lab', default=None)
#     if labName is None:
#         return HttpResponse(status=400)
#
#     try:
#         labs = RoomInfo.objects.filter(lab=labName)
#         if not labs.exists():
#             return HttpResponse(status=404)
#         data = serializers.serialize(
#             'json',
#             labs,
#             fields=(
#                 'lab',
#                 'num_reporting',
#                 'last_updated',
#                 'num_available',
#                 'num_unavailable',
#                 'num_error',
#                 'courseusageinfo'))
#
#     except RoomInfo.DoesNotExist:
#         return HttpResponse(status=404)
#
#     return HttpResponse(data, content_type="application/json")


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


# @require_GET
# def ServerInfoView(request):
#     # roomNums = Computer.objects.values_list('room_number', flat=True)
#     logger.debug('SERVER INFO VIEW')
#     servers = ServerInfo.objects.values_list('name', flat=True)
#     result = {}
#     NumDataPoints = request.GET.get('NumDataPoints', '10')
#     NumDataPoints = int(NumDataPoints)
#     for server in servers:
#         DataPoints = ServerInfo.objects.filter(ComputerName=server)
#         TotalDataPoints = DataPoints.count()
#         StartingFrom = TotalDataPoints - NumDataPoints
#         if StartingFrom < 0:
#             StartingFrom = 0
#         DataPoints = DataPoints[StartingFrom:]
#         result[server] = serializers.serialize('json', DataPoints)
#
#     # create json dump and then clean it up
#     jsonStr = json.dumps(result)
#     jsonStr = jsonStr.replace('\\', '')
#     jsonStr = jsonStr.replace('"[', '[')
#     jsonStr = jsonStr.replace(']"', ']')
#     return HttpResponse(jsonStr, content_type="application/json")


# def HomePage(request):
#
#     retVal = cache.get("HOMEPAGE")
#     if not retVal or retVal:
#         TemplateParams = {}
#         LabsInSession = {}
#         comps = {}
#         rooms = {}
#         roomNums = Computer.objects.values_list('room_number', flat=True)
#         roomNums = sorted(list(set(roomNums)))
#
#         for roomNum in roomNums:
#             index = "Room" + str(roomNum)
#             rooms[index] = {}
#             rooms[index]['inSession'] = False
#             labs = Lab.objects.filter(room_number=int(roomNum))
#             rooms[index]['UpcomingLabs'] = []
#             if not labs.count() == 0:
#                 for lab in labs:
#
#                     if lab.is_lab_in_session():
#                         rooms[index]['inSession'] = True
#                         rooms[index]['lab'] = lab
#                     if lab.is_lab_coming_up():
#                         rooms[index]['UpcomingLabs'].append(lab)
#
#         TemplateParams['labInfo'] = rooms
#         TemplateParams['allRooms'] = roomNums
#         TemplateParams['allLabs'] = Lab.objects.all()
#
#         TemplateParams['servers'] = Server.objects.all()
#
#         Room116 = Computer.objects.filter(room_number=116)
#         Room116.order_by('number')
#         Room118 = Computer.objects.filter(room_number=118)
#         Room118.order_by('number')
#         Room120 = Computer.objects.filter(room_number=120)
#         Room120.order_by('number')
#
#         TemplateParams['Room116'] = Room116
#         TemplateParams['Room118'] = Room118
#         TemplateParams['Room120'] = Room120
#
#         TemplateParams['comps'] = comps
#         TemplateParams['labs'] = LabsInSession
#         retVal = render(request, 'ComputerInfo.html', TemplateParams)
#         cache.set("HOMEPAGE", retVal)
#
#     return retVal


ROOMS_CACHE_KEY = "ROOMS_CACHE_KEY"
LABS_CACHE_KEY = "LABS_CACHE_KEY"


def ModularHomePage(request):
    TemplateParams = {}

    Rooms = cache.get(ROOMS_CACHE_KEY)
    if not Rooms or Rooms:
        Rooms = Computer.objects.values_list('room_number', flat=True)
        Rooms = sorted(list(set(Rooms)))
        cache.set(ROOMS_CACHE_KEY, Rooms)

    TemplateParams['Rooms'] = Rooms

    return render(request, 'AjaxHomePage.html', TemplateParams)


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

