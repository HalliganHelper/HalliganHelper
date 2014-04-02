$(function initRequest(){
    if (localStorage && localStorage['gethelp']){
        var id = localStorage['gethelp'];
        $('#id_course').val(id);
    }

    $('#submit').click(function(e){
        localStorage.removeItem('gethelp');
    });
});


