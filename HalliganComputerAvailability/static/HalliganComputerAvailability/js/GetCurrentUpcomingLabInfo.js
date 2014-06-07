function GetUpcomingLabInfo(roomNum) {
    $.get('/api/v2/lab', {format: 'json', room_number: roomNum}, function(data){
        var warningDiv = $('<div/>').attr('id', 'warning_div_' + roomNum),
            dangerDiv = $('<div/>').attr('id', 'danger_div_' + roomNum),
            comingUpMarker = false,
            inSessionMarker = false,
            labs = data.objects,
            numLabs = labs.length;

        for (var i = 0; i < numLabs; i++) {
            var lab = labs[i];
            if (lab.coming_up) {
                comingUpMarker = true;

                var msg = lab.course_name + ' has a lab from ';
                msg += lab.start_time + ' to ' + lab.end_time;

                var span = $('<span/>').addClass('warning alert').text(msg);
                var alert = $('<div/>').addClass('centered seven columns')
                                       .append(span);
                var warn = $('<div/>').addClass('row').append(alert);
                $(warningDiv).prepend(warn);
            }

            if (lab.in_session) {
                inSessionMarker = true;

                var msg = lab.course_name + ' has a lab from ';
                msg += lab.start_time + ' to ' + lab.end_time;

                var span = $('<span/>').addClass('danger alert').text(msg);
                var alert = $('<div/>').addClass('centered seven columns')
                                       .append(span);
                var warn = $('<div/>').addClass('row').append(alert);
                $(dangerDiv).prepend(warn);
            }
        }

        if (comingUpMarker) {
            $('#' + roomNum + '_warning_badge').addClass('Shown')
                                               .removeClass('Hidden');
        } else {
            $('#' + roomNum + '_warning_badge').addClass('Hidden')
                                               .removeClass('Shown');
        }

        if (inSessionMarker) {
            $('#' + roomNum + '_danger_badge').addClass('Shown')
                                               .removeClass('Hidden');
        } else {
            $('#' + roomNum + '_danger_badge').addClass('Hidden')
                                               .removeClass('Shown');
        }
        
        $('#notifications_' + roomNum).append(warningDiv).append(dangerDiv);
        
    });
}

function QueueRoomsForLabInfo() {
    var rooms = $('.RoomTab'),
        roomLength = rooms.length;

    for (var i = 0; i < roomLength; i++) {
        var roomNum = $(rooms[i]).data('room_header');
        $('#notifications_' + roomNum).empty();
        GetUpcomingLabInfo(roomNum);
    }
}
