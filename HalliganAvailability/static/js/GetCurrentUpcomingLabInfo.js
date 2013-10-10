/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/18/13
 * Time: 11:59 PM
 * To change this template use File | Settings | File Templates.
 */



function GetUpcomingLabInfo(roomNum) {
    $.get('/api/labInformation', {room: roomNum, current: true, upcoming: true}, function(data){
        var warningDiv = $('<div></div>').attr('id', 'warning_div_' + roomNum);
        var dangerDiv = $('<div></div>').attr('id', '#danger_div_' + roomNum);

        var ComingUpMarker = false;
        var InSessionMarker = false;
        for (index in data) {
            var item = data[index];
            if (item.ComingUp) {
                var warn = $('<row></row>').append($('<div></div>').addClass('centered seven columns').append($('<span></span>').addClass('warning alert').text(item.ClassName + ' has a lab from ' + item.StartTime + ' to ' + item.EndTime)));
                ComingUpMarker = true;
                $(warningDiv).prepend(warn);
            }
            if (item.InSession){
                var danger = $('<row></row>').append($('<div></div>').addClass('centered seven columns').append($('<span></span>').addClass('danger alert').text(item.ClassName + ' has a lab from ' + item.StartTime + ' to ' + item.EndTime)));
                InSessionMarker = true;
                $(dangerDiv).prepend(danger);
            }
        }

        //console.log($('#' + roomNum + '_warning_badge'))

        if (ComingUpMarker) {
            $('#' + roomNum + '_warning_badge').addClass('Shown').removeClass('Hidden');
        } else {
            $('#' + roomNum + '_warning_badge').addClass('Hidden').removeClass('Shown');
        }

        if (InSessionMarker) {
            $('#' + roomNum + '_danger_badge').addClass('Shown').removeClass('Hidden');
        } else {
            $('#' + roomNum + '_danger_badge').addClass('Hidden').removeClass('Shown');
        }


        $('#notifications_' + roomNum).append(warningDiv).append(dangerDiv);


    })
}


function QueueRoomsForLabInfo() {
    var Rooms = $(".RoomTab")
    var RoomLength = Rooms.length;
    for (var i = 0; i < RoomLength; i++) {

        var roomNum = Rooms[i].dataset.room_header;
        $('#notifications_' + roomNum).empty();
        GetUpcomingLabInfo(roomNum);
    }

}