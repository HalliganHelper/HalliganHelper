function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            var csrftoken = getCookie('csrftoken')
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

function hookup_resolve(){
    $('.resolveBtn').click(function(e){
        e.preventDefault();
        var btn = $(this);
        var id = $(this).data('id');
        var tableID = $(this).parents('table').attr('id');
        var jqxhr = $.post('users/resolveRequest', {'requestID': id}, function(data){
        })
        .fail(function(data) {
            $(btn).text('Unauthorized');
        });
    })
}

function hookup_checkout(){
    $('.checkoutBtn').click(function(e){
        e.preventDefault();
        var btn = $(this);
        var id = $(this).data('id');
        $.post('users/checkoutRequest', {'pk': id}).fail(function(data){
            console.log(data);
            $(btn).text('Unauthorized');
        });

    });

}

$(function(){
    hookup_checkout();
});

function remove_row(obj) {
    var rq_id = obj.rq
    var el = $("[data-rqID='" + rq_id + "']");
    var tbl = $(el[0]).parent();
    
    $(el).remove();
        if ($(tbl).prop('rows').length == 0) {
            var tdstr = "<td colspan='5' class='text-center'>There's nothing here!</td>";
            var my_row = $('<tr data-empty="true">' + tdstr + '</tr>');
            $(tbl).append($(my_row));
        }
    var counter = $('#comp' + obj.course + 'count');
    var oldCount = $(counter).data('count');
    var newCount = oldCount - 1;
    $(counter).data('count', oldCount - 1);
    $(counter).text(newCount);
    if(newCount < 1){
        $(counter).addClass('Hidden');
    }
}

function add_row(obj) {
    var nm_td = "<td>" + obj.name + "</td>";
    var lo_td = "<td>" + obj.location + "</td>";
    var pr_td = "<td>" + obj.problem + "</td>";
    var wh_td = "<td>" + obj.when + "</td>";
    var re_td = $("<td></td>");
    if(obj.ta){
        var btn = $('<div class="medium default btn"></div>');
        var link = $('<a href="#" class="checkoutBtn" data-id="' + obj.pk + '">Check Out</a>');
        $(btn).append($(link));
        $(re_td).append($(btn));

        var otherBtn = $('<div class="medium info btn"></div>');
        var otherLink = $('<a href="#" class="resolveBtn" data-id="' + obj.pk + '">Resolve</a>');
        $(otherBtn).append($(otherLink));
        $(re_td).append($(otherBtn));
    }
    var new_row = $("<tr data-rqID='" + obj.pk + "'></tr>").append($(nm_td)).append($(lo_td));
    $(new_row).append($(pr_td)).append($(wh_td)).append($(re_td));

    var tbdy = $('#' + obj.course + 'Table > tbody');
    $(tbdy).children().each(function(){
        if( $(this).data('empty') == true ) {
            $(this).remove();
        }
    });

    var counter = $('#comp' + obj.course + 'count');
    var oldCount = $(counter).data('count');
    var newCount = oldCount + 1;
    $(counter).data('count', oldCount + 1);
    $(counter).text(newCount);
    $(counter).removeClass('Hidden');
    

    $(tbdy).append($(new_row));
    hookup_resolve();
    hookup_checkout();
}

$(function(){
    hookup_resolve();
});


function check_out(obj) {
    console.log(obj)
}


$(function() {
    if(window.webkitNotifications) {
        window.webkitNotifications.requestPermission();
    }
});

function notification(obj) {
    var api = window.webkitNotifications;
    if (api && api.checkPermission() == 0) {
        var notification = window.webkitNotifications.createNotification(
            'http://i.stack.imgur.com/dmHl0.png',
            'HalliganHelper Queue Updated!',
            'Someone has been added to the Comp ' + obj.number + ' Queue.' 
        );

        notification.onclick = function () {
            notification.close();
        }
        notification.show();
    }

    $.titleAlert("Queue Updated");

    
}

socket = io.connect('/taqueue', {transports: ['xhr-polling']});

socket.on("message", function(obj) {
    console.log(obj);
    switch (obj.type){
        case 'resolve':
            remove_row(obj);
            break;
        case 'add':
            add_row(obj);
            break;
        case 'check_out':
            check_out(obj);
            break;
        case 'notify':
            notification(obj);
            break;
    }
});

$(function setStorage(){

    if (localStorage) {
        $('.needHelp').click(function(e) {
            var t = this;
            var id = $(t).data('course');
            localStorage['gethelp'] = id;
        });
    }
});

$(function goOnDuty(){
    $('.goOnDuty').click(function(e) {
        if(localStorage) {
            var course = $(this).data('course');
            console.log(course);
            localStorage['goOnDuty'] = course;
        }
    });
})
