$(function initRequest(){
    console.log("LOADED");
    if (localStorage && localStorage['gethelp']){
        var id = localStorage['gethelp'];
        console.log(id);
        $('#id_course').val(id);
    }

    $('#submit').click(function(e){
        localStorage.removeItem('gethelp');
    });
});


