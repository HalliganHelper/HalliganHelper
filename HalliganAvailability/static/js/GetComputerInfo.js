/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/17/13
 * Time: 11:16 PM
 * To change this template use File | Settings | File Templates.
 */

var ScheduledHandle = null;

function GetComputerInfo(room) {
    var jqxhr = $.get('/api/room/' + room, function(data) {
        window.clearInterval(ScheduledHandle)
        ScheduledHandle =  window.setInterval(QueueRooms, 900000);

        PotentialDivs = $('.RoomBody');
        var DataDiv = null;
        length = PotentialDivs.length;
        for (i = 0; i < length; i++){
            if (PotentialDivs[i].dataset.room_tab == room) {
                DataDiv = PotentialDivs[i];
                break;
            }
        }


        if (data.success == true){
            $('#FailureDiv').remove();
            var table = $('<table></table>').addClass('striped').addClass('rounded');
            var head = $('<thead></thead>');
            var row = $('<tr></tr>');

            $(row).append($('<td></td>').text('Computer Number'));
            $(row).append($('<td></td>').text('Status'));
            //$(row).append($('<td></td>').text('Last Updated'));

            var lastUpdatedTD = $('<td></td>').text('Last Updated');
            var RefreshButton = $('<i></i>').addClass('icon-arrows-ccw ttip');
            var UpdateTime = new Date();
            var RefreshText = $('<span></span>').html("Updates are received from computers every 15 minutes.<br/> This table will refresh automatically every 15 minutes. <br/> This table was last refreshed at " + UpdateTime.toLocaleTimeString())
            var refreshLink = $('<a href="#"></a>').append(RefreshButton).append(RefreshText).addClass('Refresh hasTooltip');
            $(refreshLink).click(function() {
                QueueRooms();
            })
            $(lastUpdatedTD).append(refreshLink)
            $(row).append(lastUpdatedTD)
            $(head).append(row);

            var body = $('<tbody></tbody>');
            for (mch in data.machines) {
                var machine = data.machines[mch];
                row = $('<tr></tr>');
                switch (machine.Status) {
                    case "INUSE":
                        $(row).addClass('InUse');
                        break;
                    case "AVAILABLE":
                        $(row).addClass('Available');
                        break;
                    case "OFF":
                        $(row).addClass('Off');
                        break;
                    case "ERROR":
                        $(row).addClass('Error');
                        break;
                }
                $(row).append($('<td></td>').text(mch));
                $(row).append($('<td></td>').text(machine.Status));
                $(row).append($('<td></td>').text(machine.LastUpdated))
                $(body).append(row);

            }

            $(table).append(head);
            $(table).append(body);

            $(DataDiv).empty().append(table);
        }
    });
    jqxhr.fail(function() {
        var ContentDiv = $('#content');
        var Failure = $('<div id="FailureDiv"></div>').addClass('danger alert');
        Failure.text('Something went wrong. Please click here to try again');
        Failure.click(function(){
            QueueRooms();
        })

        if( $('#FailureDiv').length == 0) {
            $(ContentDiv).prepend(Failure);
        }

    })
}

function QueueRooms(){
    var Rooms = $(".RoomTab")
    var RoomLength = Rooms.length;
    console.log(RoomLength)
    for (var i = 0; i < RoomLength; i++) {
        var roomNum = Rooms[i].dataset.room_header;
        GetComputerInfo(roomNum);
    }

    //ScheduledHandle =  window.setInterval(QueueRooms, 900000);
}

$(document).ready(QueueRooms)
