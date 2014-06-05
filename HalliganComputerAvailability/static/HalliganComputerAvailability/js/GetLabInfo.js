/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/18/13
 * Time: 9:54 PM
 * To change this template use File | Settings | File Templates.
 */

function GetLabInfo() {
    $.get('/api/v2/lab/?format=json', function(data) {
        var labContainer = $('#LabContainer'),
            table = $('<table/>').addClass('striped rounded'),
            head = $('<thead/>'),
            body = $('<tbody/>'),
            row = $('<tr/>'),
            lastUpdatedTD = $('<td/>').text('Class'),
            refreshButton = $('<i/>').addClass('icon-arrows-ccw ttip'),
            updateTime = new Date(),
            refreshText = $('<span/>'),
            refreshLink = $('<a href="#"/>'),
            labs = data.objects,
            numLabs = labs.length;
        
        var updateStr = "This list will automatically update every 15 minutes.";
        updateStr += "<br/> Last updated at " + updateTime.toLocaleTimeString();
        $(row).append($('<td/>').text('Day'))
              .append($('<td/>').text('Start Time'))
              .append($('<td/>').text('End Time'))
              .append($('<td/>').text('Room'));

        $(refreshText).html(updateStr);
        $(refreshLink).append(refreshButton)
                      .append(refreshText)
                      .addClass('Refresh hasTooltip');

        $(refreshLink).click(function() {
            QueueLabs();
        });

        for(var i = 0; i < numLabs; i++) {
            var lab = labs[i],
                row = $('<tr/>');

            if (lab.coming_up) {
                $(row).addClass('ComingUp');
            }
            if (lab.in_session) {
                $(row).addClass('InSession');
            }
            
            $(row).append($('<td/>').text(lab.day_of_week))
                  .append($('<td/>').text(lab.start_time))
                  .append($('<td/>').text(lab.end_time))
                  .append($('<td/>').text(lab.room_number))
                  .append($('<td/>').text(lab.course_name));
            $(body).append(row);

        }

        $(table).append(head)
                .append(body);

        $(labContainer).empty().append(table);
    });
}

function QueueLabs() {
    var rooms = $('.RoomTab'),
        roomsLength = rooms.length;
    /*
    for (var i = 0; i < roomsLength; i++) {
        var roomNum = $(rooms[i]).data('room_header');
        GetLabInfo(roomNum);
    }
    */
}

$(function() {
    GetLabInfo();
});
