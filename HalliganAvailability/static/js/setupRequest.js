$(function initRequest(){
    if (localStorage && localStorage['gethelp']){
        var id = localStorage['gethelp'];
        $('#id_course').val(id);
    }
});


