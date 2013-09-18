# Create your views here.
from django.http import HttpResponse
from django.views.decorators.http import require_GET, require_http_methods, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response, render
from models import Lab, Computer, Server, ServerInfo, ComputerInfo
import json
from django.core.cache import cache
from django.core import serializers
from django.template import RequestContext


def ApiDocs(request):
    return render_to_response('ApiDocs.html')


@require_GET
def AllComps(request):

    def SerializeHandler(obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        else:
            raise TypeError, 'Object of type %s with value of %s is not JSON serializable' %(type(obj), repr(obj))


    response = {}

    try:
        Comps = Computer.objects.all()
    except Computer.DoesNotExist:
        response['success'] = False
        return HttpResponse(json.dumps(response, default=SerializeHandler), mimetype="application/json")

    try:
        Labs = Lab.objects.all()
    except Lab.DoesNotExist:
        pass

    response['rooms'] = {}

    #response['rooms'][c.RoomNumber] =
    for c in Comps:
        if c.RoomNumber not in response['rooms']:
            response['rooms'][c.RoomNumber] = {'classRoom': c.RoomNumber}
            response['rooms'][c.RoomNumber]['machines'] = {}
            response['rooms'][c.RoomNumber]['inLab'] = False
        response['rooms'][c.RoomNumber]['machines'][c.ComputerNumber] = c.Status

    for lab in Labs:
        if lab.is_lab_in_session() and lab.RoomNumber in response['rooms']:
            #print lab.DayOfWeek
            response['rooms'][lab.RoomNumber]['inLab'] = True
            response['rooms'][lab.RoomNumber]['labInfo'] = {
                'class': lab.ClassName,
                'startTime': lab.StartTime,
                'endTime': lab.EndTime
            }

    response['success'] = True
    return HttpResponse(json.dumps(response, default=SerializeHandler), mimetype="application/json")


@require_GET
def SpecificRoom(request, RmNum):
    Comps = Computer.objects.filter(RoomNumber=RmNum)
    response = {}
    if Comps.count() is 0:
        response['success'] = False

        return HttpResponse(json.dumps(response), mimetype="application/json")

    Labs = Lab.objects.filter(RoomNumber=RmNum)
    Labs = list(Labs)
    Labs = [x for x in Labs if x.is_lab_in_session() is True]

    if len(Labs) is 0:
        response['inLab'] = False
    else:
        response['inLab'] = False
        response['labInfo'] = {}
        response['labInfo']['class'] = Labs[0].ClassName
        response['labInfo']['startTime'] = Labs[0].StartTime.strftime("%I:%M")
        response['labInfo']['endTime'] = Labs[0].EndTime.strftime("%I:%M")

    response['machines'] = {}
    for c in Comps:
        response['machines'][c.ComputerNumber] = {}
        response['machines'][c.ComputerNumber]['Status'] = c.Status
        response['machines'][c.ComputerNumber]['LastUpdated'] = c.LastUpdate.strftime('%m/%d/%y %I:%M')
    response['success'] = True
    response['classRoom'] = RmNum

    return HttpResponse(json.dumps(response), mimetype="application/json")


@require_GET
def SpecificMachine(request):
    Machines = request.GET.keys()
    response = {}
    try:
        Comps = Computer.objects.filter(pk__in=Machines)
    except Computer.DoesNotExist:
        response['success'] = False
        return HttpResponse(json.dumps(response), mimetype="application/json")

    if Comps.count() is 0:
        response['success'] = False
        return HttpResponse(json.dumps(response), mimetype="application/json")

    response['success'] = True
    response['machines'] = {}

    for c in Comps:
        response['machines'][c.ComputerNumber] = c.Status

    return HttpResponse(json.dumps(response), mimetype="application/json")

@require_POST
@csrf_exempt
def UpdateStatus(request, MchID, NewStatus):
    result = {}
    MchID = MchID.lower()

    AuthCode = request.POST.get('AuthKey', default='')
    print "AUTHCODE", AuthCode

    if not AuthCode == 'OnlyTylerGetsAccessToThis':
        result['success'] = False
        result['error'] = 'You do not have the permissions to update machine status'
        return HttpResponse(json.dumps(result), mimetype="application/json")

    if NewStatus not in Computer.CHOICES:
        result['success'] = False
        result['error'] = 'Failure. You set status to ' + NewStatus + '. Use one of: ' + str(Computer.CHOICES)
        return HttpResponse(json.dumps(result), mimetype="application/json")

    try:
        RoomNum = int(MchID[3:6])
    except ValueError:
        result['success'] = False
        result['error'] = 'Failure. RoomNumber in incorrect form. Needs to be lab[num][letter]'
        return HttpResponse(json.dumps(result), mimetype="application/json")

    Comp, created = Computer.objects.get_or_create(pk=MchID, RoomNumber=RoomNum)
    Comp.Status = NewStatus
    Comp.save()

    CompInfo = ComputerInfo(ComputerNumber=MchID, ComputerStatus=NewStatus, RoomNumber=RoomNum)
    CompInfo.save()


    result['success'] = True
    cache.delete("HOMEPAGE")
    return HttpResponse(json.dumps(result), mimetype="application/json")

@require_POST
@csrf_exempt
def UpdateServer(request, MchID, NewStatus, NumUsers):
    result = {}
    MchID = MchID.lower()

    AuthCode = request.POST.get('AuthKey', default='')

    if not AuthCode == 'OnlyTylerGetsAccessToThis':
        result['success'] = False
        result['error'] = 'You do not have the permissions to update server status'
        return HttpResponse(json.dumps(result), mimetype="application/json")

    if NewStatus not in Server.CHOICES:
        result['success'] = False
        result['error'] = 'Failure, You set status to ' + NewStatus + '. Use one of: ' + str(Server.CHOICES)
        return HttpResponse(json.dumps(result), mimetype="application/json")

    try:
        Serv = Server.objects.get(ComputerName=MchID)
        Serv.NumUsers = int(NumUsers)
        Serv.Status = NewStatus
        Serv.save()
    except Server.DoesNotExist:
        Serv = Server(ComputerName=MchID, NumUsers=int(NumUsers), Status=NewStatus)
        Serv.save()

    ServInfo = ServerInfo(ComputerName=MchID, NumUsers=int(NumUsers))
    ServInfo.save()

    result['success'] = True
    return HttpResponse(json.dumps(result), mimetype="application/json")

@require_GET
def ServerInfoView(request):
    #roomNums = Computer.objects.values_list('RoomNumber', flat=True)
    servers = ServerInfo.objects.values_list('ComputerName', flat=True)
    result = {}
    NumDataPoints = request.GET.get('NumDataPoints', '10')
    NumDataPoints = int(NumDataPoints)
    for server in servers:
        DataPoints = ServerInfo.objects.filter(ComputerName=server)
        TotalDataPoints = DataPoints.count()
        StartingFrom = TotalDataPoints - NumDataPoints
        if StartingFrom < 0:
            StartingFrom = 0
        DataPoints = DataPoints[StartingFrom:]
        result[server] = serializers.serialize('json', DataPoints)

    #create json dump and then clean it up
    jsonStr = json.dumps(result)
    jsonStr = jsonStr.replace('\\', '')
    jsonStr = jsonStr.replace('"[', '[')
    jsonStr = jsonStr.replace(']"', ']')
    return HttpResponse(jsonStr, mimetype="application/json")


def HomePage(request):

    retVal = cache.get("HOMEPAGE")
    if not retVal or retVal:
        print "Not Cached"
        TemplateParams = {}
        LabsInSession = {}
        comps = {}
        rooms = {}
        roomNums = Computer.objects.values_list('RoomNumber', flat=True)
        roomNums = sorted(list(set(roomNums)))

        for roomNum in roomNums:
            index = "Room" + str(roomNum)
            rooms[index] = {}
            rooms[index]['inSession'] = False
            labs = Lab.objects.filter(RoomNumber=int(roomNum))
            rooms[index]['UpcomingLabs'] = []
            if not labs.count() == 0:
                for lab in labs:

                    if lab.is_lab_in_session():
                        rooms[index]['inSession'] = True
                        rooms[index]['lab'] = lab
                    if lab.is_lab_coming_up():
                        rooms[index]['UpcomingLabs'].append(lab)


        TemplateParams['labInfo'] = rooms
        TemplateParams['allRooms'] = roomNums
        TemplateParams['allLabs'] = Lab.objects.all()

        TemplateParams['servers'] = Server.objects.all()

        Room116 = Computer.objects.filter(RoomNumber=116)
        Room116.order_by('ComputerNumber')
        Room118 = Computer.objects.filter(RoomNumber=118)
        Room118.order_by('ComputerNumber')
        Room120 = Computer.objects.filter(RoomNumber=120)
        Room120.order_by('ComputerNumber')

        TemplateParams['Room116'] = Room116
        TemplateParams['Room118'] = Room118
        TemplateParams['Room120'] = Room120

        TemplateParams['comps'] = comps
        TemplateParams['labs'] = LabsInSession
        retVal = render(request, 'ComputerInfo.html', TemplateParams)
        cache.set("HOMEPAGE", retVal)

    return retVal


ROOMS_CACHE_KEY = "ROOMS_CACHE_KEY"
LABS_CACHE_KEY = "LABS_CACHE_KEY"
def ModularHomePage(request):
    TemplateParams = {}

    Rooms = cache.get(ROOMS_CACHE_KEY)
    if not Rooms or Rooms:
        Rooms = Computer.objects.values_list('RoomNumber', flat=True)
        Rooms = sorted(list(set(Rooms)))
        cache.set(ROOMS_CACHE_KEY, Rooms)

    TemplateParams['Rooms'] = Rooms


    return render(request, 'AjaxHomePage.html', TemplateParams)