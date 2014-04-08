$(function(){
    var current_day = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(current_day.getDate() + 2)
    console.log(tomorrow)
    $('#' + field_id).datetimepicker({
        format:'m/d/Y H:i',
        minDate: 0,
        maxDate: '+1970/01/02'
    });
});
