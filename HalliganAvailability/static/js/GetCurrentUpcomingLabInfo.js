/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/18/13
 * Time: 11:59 PM
 * To change this template use File | Settings | File Templates.
 */



function GetUpcomingLabInfo(roomNum) {
    $.get('/api/labInformation', {room: roomNum, current: true, upcoming: true}, function(data){
        var warningDiv = $('#warning_div_' + roomNum);
        var dangerDiv = $('#danger_div_' + roomNum);

        for (index in data) {
            var item = data[index];
            if (item.ComingUp) {
                var warn = $('<row></row>').append($('<div></div>').addClass('centered five columns').append($('<span></span>').addClass('warning alert').text(item.ClassName + ' has a lab from ' + item.StartTime + ' to ' + item.EndTime)));

                $(warningDiv).prepend(warn);
            }
            if (item.InSession){
                var danger = $('<row></row>').append($('<div></div>').addClass('centered five columns').append($('<span></span>').addClass('danger alert').text(item.ClassName + ' has a lab from ' + item.StartTime + ' to ' + item.EndTime)));

                $(dangerDiv).prepend(danger);
            }
        }
    })
}


function QueueRoomsForLabInfo() {
    console.log('Queing rooms for labs!')
    var Rooms = $(".RoomTab")
    var RoomLength = Rooms.length;
    console.log(Rooms);
    for (var i = 0; i < RoomLength; i++) {

        var roomNum = Rooms[i].dataset.room_header;
        console.log(roomNum)
        GetUpcomingLabInfo(roomNum);
    }

}

$(document).ready(QueueRoomsForLabInfo)