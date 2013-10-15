function py2jsDate(dateStr){
    datePart = dateStr.split("T")[0];
    timePart = dateStr.split("T")[1];

    dateArr = datePart.split("-");
    dateArr[1]--;
    timeArr = timePart.split(".")[0].split(":");

    return new Date(dateArr[0], dateArr[1], dateArr[2],
                    timeArr[0], timeArr[1])
}
