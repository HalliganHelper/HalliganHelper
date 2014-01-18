/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/18/13
 * Time: 9:54 PM
 * To change this template use File | Settings | File Templates.
 */

function GetLabInfo(){
    var jqxhr = $.get('/api/labInformation', function(data){
        var LabContainer = $('#LabContainer');

        var table = $('<table></table>').addClass('striped rounded');
        var head = $('<thead></thead>');
        var row = $('<tr></tr>');

        $(row).append($('<td></td>').text('Day'));
        $(row).append($('<td></td>').text('Start Time'));
        $(row).append($('<td></td>').text('End Time'));
        $(row).append($('<td></td>').text('Room'));

        var lastUpdatedTD = $('<td></td>').text('Class');
        var RefreshButton = $('<i></i>').addClass('icon-arrows-ccw ttip');
        var UpdateTime = new Date();
        var RefreshText = $('<span></span>').html("This list will automatically update every 15 minutes. <br/> Last Updated at " + UpdateTime.toLocaleTimeString())
        var refreshLink = $('<a href="#"></a>').append(RefreshButton).append(RefreshText).addClass('Refresh hasTooltip');
        $(refreshLink).click(function() {
            QueueLabs();
        })
        $(lastUpdatedTD).append(refreshLink);
        $(row).append(lastUpdatedTD);
        $(head).append(row);


        var body = $('<tbody></tbody>');


        for(labItem in data) {
            lab = data[labItem];
            var row = $('<tr></tr>');

            if (lab.ComingUp) {
                $(row).addClass('ComingUp');
            }
            if (lab.InSession) {
                $(row).addClass('InSession');
            }

            $(row).append($('<td></td>').text(lab.DayOfWeek));
            $(row).append($('<td></td>').text(lab.StartTime));
            $(row).append($('<td></td>').text(lab.EndTime));
            $(row).append($('<td></td>').text(lab.RoomNumber));
            $(row).append($('<td></td>').text(lab.ClassName));
            $(body).append(row);
        }

        $(table).append(head);
        $(table).append(body);
        //$(LabContainer).append(table)
        $(LabContainer).empty().append(table);
    })
}

function QueueLabs(){
    var Rooms = $(".RoomTab")
    var RoomLength = Rooms.length;
    for (var i = 0; i < RoomLength; i++) {
        var roomNum = Rooms[i].dataset.room_header;
        GetLabInfo(roomNum);
    }

    //ScheduledHandle =  window.setInterval(QueueRooms, 900000);
}

$(document).ready(function() {
    GetLabInfo();
});


