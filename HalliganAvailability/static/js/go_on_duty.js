$(function(){
    try {
        var current_day = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(current_day.getDate() + 2)
        $('#' + field_id).datetimepicker({
            format:'m/d/Y H:i',
            minDate: 0,
            maxDate: '+1970/01/02',
            minTime: 0,
        });
    } catch (e) {
        // Means that you already are on duty
    }
});

$(function(){
   try{
       console.log(cancel_field_name);
        var form = $('#cancel_hours');
        $('#dont_cancel_btn').click(function(e){
            $('#' + cancel_field_name).prop('checked', false);
            $(form).submit();
        });

        $('#cancel_btn').click(function(e){
            console.log("CANCEL CLICKED");
            $('#' + cancel_field_name).prop('checked', true);
            $(form).submit();

            e.preventDefault();
        });
    } catch (e) {
        // Means that you are not currently on duty
    }
});
