function formatDate(dateObject) {
    var hour = dateObject.getHours(),
        minute = dateObject.getMinutes(),
        day = dateObject.getDate(),
        month = 1 + dateObject.getMonth(), 
        year = dateObject.getFullYear().toString().substr(2,2),
        AMorPM = "AM",
        retVal = "";

    month = month + "";
    if ( month.length == 1) {
        month = "0" + month;
    }

    day = day + "";
    if ( day.length == 1) {
        day = "0" + day;
    }

    if (hour > 12) {
        hour = hour - 12;
        AMorPM = "PM";
    } else {
        AMorPM = "AM";
    }
    
    retVal = month + "/" + day + "/" + year + " ";
    retVal += hour + ":" + minute + " " + AMorPM;

    return retVal;
}

function formatTime(timeStr) {
    var time_pieces = timeStr.split(":"),
        hour = time_pieces[0],
        minute = time_pieces[1],
        AMorPM = "AM";

    if (hour > 12) {
        hour = hour - 12;
        AMorPM = "PM";
    } else {
        AMorPM = "AM";
    }

    return hour + ":" + minute + " " + AMorPM; 

}
