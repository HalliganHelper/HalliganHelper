$(function initRequest(){
    if (localStorage && localStorage['goOnDuty']){
        var id = localStorage['goOnDuty'];
        $('#id_course').val(id);
    }
});


