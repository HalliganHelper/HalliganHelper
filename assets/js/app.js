require('./../scss/extend_foundation.scss');

var $ = require('jquery');
require('jquery.cookie');

var SchoolView = require('./views/SchoolView');
var LoginView = require('./views/LoginView');
var User = require('./models/User');

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

(function ajaxSetup() {
   var csrftoken = $.cookie('csrftoken'); 

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            console.log('Pre send for ', settings.type);
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
})();

var user = new User();
var sv = new SchoolView( { 'model': user } );
var lv = new LoginView( { 'model': user } );

user.fetch({
    'success': function( model, response, options ) {
        user.trigger( 'loggedIn' );
        /* Note: Intentionally not calling render here. 
         * The SchoolView renders itself once it fetches the 
         * school information
         */
    },
    'error': function( model, response, options ) {
        lv.render();
    }
});
