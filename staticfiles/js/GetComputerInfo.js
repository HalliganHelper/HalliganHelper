/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/17/13
 * Time: 11:16 PM
 * To change this template use File | Settings | File Templates.
 */

function QueueRooms(){
    var Rooms = document.getElementsByClassName('RoomTab');
    for (room in Rooms) {
        console.log(room.getAttribute('data-Room_Header'))
    }
}

$(document).ready(QueueRooms)
