var scheduleHandle = null;

function compareComputers(compOne, compTwo) {
    if (compOne.number < compTwo.number) {
        return -1;
    }
    if (compOne.number > compTwo.number) {
        return 1;
    }
    return 0;
}

function formatDate(dateObject) {
    var hour = dateObject.getHours(),
        minute = dateObject.getMinutes(),
        day = dateObject.getDate(),
        month = 1 + dateObject.getMonth(), 
        year = dateObject.getFullYear().toString().substr(2,2),
        AMorPM = "AM";

    month = month + "";
    if ( month.length == 1) {
        month = "0" + month;
    }

    day = day + "";
    if ( day.length == 1) {
        day = "0" + day;
    }

    if (hour > 12) {
        hour = 24 - hour;
        AMorPM = "PM";
    } else {
        AMorPM = "AM";
    }

    return month + "/" + day + "/" + year + " " + hour + ":" + minute + " " + AMorPM 
}

function GetComputerInfo(roomNumber) {
    $.get('/api/v2/computer/?format=json&room_number=' + roomNumber, function(data) {
        if (scheduleHandle != null) {
            clearInterval(scheduleHandle);
        }

        scheduleHandle = setInterval(QueueRooms, 900000);

        var dataDiv = $('#content_div_' + roomNumber),
            table = $('<table/>').addClass('striped rounded'),
            head = $('<thead/>'),
            body = $('<tbody/>'),
            row = $('<tr/>'),
            lastUpdatedTD = $('<td/>').text('Last Updated'),
            refreshButton = $('<i/>').addClass('icon-arrows-ccw'),
            updateTime = new Date(),
            refreshText = $('<span/>'),
            refreshLink = $('<a href="#"/>'),
            machines = data.objects,
            numMachines = machines.length;

        var update_string = "Updates are received from computers every 15 minutes.<br/>";
        update_string += "This table will refresh automaticlly every 15 minutes.<br/>";
        update_string += "This table was last refreshed at " + updateTime.toLocaleTimeString();

        $(refreshText).html(update_string);
        $(refreshLink).append(refreshButton).append(refreshText).addClass('Refresh hasTooltip');
        $(refreshLink).click(function() {
            clearInterval(scheduleHandle);
            QueueRooms();
            scheduleHandle = setInterval(QueueRooms, 90000);
        });
        

        $(dataDiv).empty();
        $('#FailureDiv').remove();

        $(lastUpdatedTD).append(refreshLink);
        $(row).append($('<td/>').text('Computer Number'))
              .append($('<td/>').text('Status'))
              .append(lastUpdatedTD);
        
        $(head).append(row);
        
        machines.sort(compareComputers); 
        
        for (var i = 0; i < numMachines; i++) {
            var machine = machines[i],
                classStr = machine.status.replace(/ /g, ''),
                updateTime = new Date(machine.last_update),
                timeStr = formatDate(updateTime);
            row = $('<tr/>');

            $(row).append($('<td/>').text(machine.number));
            switch (machine.status) {
                case "INUSE":
                    $(row).addClass('InUse')
                          .append($('<td/>').text('In Use'));
                    break;
                case "AVAILABLE":
                    $(row).addClass('Available')
                          .append($('<td/>').text('Available'));
                    break;
                case "OFF":
                    $(row).addClass('Off')
                          .append($('<td/>').text('Off'));
                    break;
                case "ERROR":
                    $(row).addClass('Error')
                          .append($('<td/>').text('Error'));
                    break;
            }
            $(row).append($('<td/>').text(timeStr));

            $(body).append(row);
        }
        
        $(table).append(head).append(body);
        $(dataDiv).empty().append(table);
    })
    .fail(function() {
        var contentDiv = $('#content'),
            failure = $('<div id="FailureDiv"/>').addClass('danger alert');
        failure.text('Something went wrong. Please click here to try again');
        failure.click(function() {
            QueueRooms();
        });      
        if ( $('#FailureDiv').length == 0 ) {
            $(contentDiv).prepend(failure);
        }
    });
}

function QueueRooms() {
    var rooms = $('.RoomTab'),
        roomLength = rooms.length;

    for (var i = 0; i < roomLength; i++) {
        var roomNum = $(rooms[i]).data('room_header');
        GetComputerInfo(roomNum);        
    }

    QueueRoomsForLabInfo();
}

$(function() {
    QueueRooms();
});
