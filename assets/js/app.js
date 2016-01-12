require('./../scss/extend_foundation.scss');
var SchoolView = require('./views/SchoolView');

var app = typeof app !== "undefined" ? app : {};

function show_notification(msg) {
    var options = {
        'body': msg,
        'icon': '/static/tas/imgs/HH_Logo.jpg'
    };
    var notification = new Notification("Halligan Helper", options);
}

function setupWebsocket() {
    
    var websocketProtocol = location.protocol === "http:" ? "ws:" : "wss:"; 
    var websocketURI = websocketProtocol + "//" + location.host + "/ws/ta?subscribe-broadcast";

    var ws4redis = WS4Redis({
        uri: websocketURI,
        heartbeat_msg: '--heartbeat--',
        receive_message: function(msg) {
            try {
                var data = JSON.parse(msg);
                app.currentCourse.handleUpdate( data );
            } catch( err ) {
                return;
            }
        }
    });
}

function ajaxSetup() {
   var csrftoken = $.cookie('csrftoken'); 

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}

sv = new SchoolView();
