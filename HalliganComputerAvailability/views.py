# Create your views here.
from django.http import HttpResponse
from django.views.decorators.http import require_GET, require_http_methods, require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from models import Lab, Computer
import json
from django.template import RequestContext


def ApiDocs(request):
    return render_to_response('ApiDocs.html')


@require_GET
def AllComps(request):
    response = {}

    try:
        Comps = Computer.objects.all()
    except Computer.DoesNotExist:
        response['success'] = False
        return HttpResponse(json.dumps(response), mimetype="application/json")

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
            response['rooms'][lab.RoomNumber]['inLab'] = True
            response['rooms'][lab.RoomNumber]['labInfo'] = {
                'class': lab.ClassName,
                'startTime': lab.StartTime,
                'endTime': lab.EndTime
            }

    response['success'] = True
    return HttpResponse(json.dumps(response), mimetype="application/json")


@require_GET
def SpecificRoom(request, RmNum):
    Comps = Computer.objects.filter(RoomNumber=RmNum)
    response = {}
    print Comps.count()
    if Comps.count() is 0:
        response['success'] = False
        print "DUMP"
        print json.dumps(response)
        return HttpResponse(json.dumps(response), mimetype="application/json")

    Labs = Lab.objects.filter(RoomNumber=RmNum)
    Labs = list(Labs)
    Labs = [x for x in Labs if x.is_lab_in_session() is True]
    print Labs

    if len(Labs) is 0:
        response['inLab'] = False
    else:
        response['inLab'] = False
        response['labInfo'] = {}
        response['labInfo']['class'] = Labs[0].ClassName
        response['labInfo']['startTime'] = Labs[0].StartTime
        response['labInfo']['endTime'] = Labs[0].EndTime

    response['machines'] = {}
    for c in Comps:
        response['machines'][c.ComputerNumber] = c.Status
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
        result['Error'] = 'You do not have the permissions to update machine status'
        return HttpResponse(json.dumps(result), mimetype="application/json")

    if NewStatus not in Computer.CHOICES:
        result['success'] = False
        result['Error'] = 'Failure. You set status to ' + NewStatus + '. Use one of: ' + str(Computer.CHOICES)
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

    result['success'] = True

    return HttpResponse(json.dumps(result), mimetype="application/json")


def HomePage(request):
    print request
    return render_to_response('ComputerInfo.html', context_instance=RequestContext(request))