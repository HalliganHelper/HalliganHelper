function show_notification(msg) {
    var options = {
        'body': msg,
        'icon': '/static/tas/imgs/HH_Logo.jpg'
    };
    var notification = new Notification("Halligan Helper", options);
}

var AppRouter = Backbone.Router.extend({
    routes: {
        "room/:roomNum": "roomRoute",
        "labs": "labRoute",
        "ta/queue/:coursePk": "taQueueRoute",
        "*actions": "defaultRoute",
    }
});

_.each(["Model", "Collection"], function(name) {
    var ctor = Backbone[name];
    var fetch = ctor.prototype.fetch;
    ctor.prototype.fetch = function() {
        this.trigger("fetch", this);
        return fetch.apply(this, arguments);
    };
    ctor.prototype.kill = function() {
    };
});

function checkXhrAndAbort() {
    if (Boolean(app.fetchXhr) && app.fetchXhr.readyState > 0 && app.fetchXhr.readyState < 4) {
        app.fetchXhr.abort();
    }
}

$(function() {

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

    ajaxSetup();
    var app_router = new AppRouter();
    app.currentCoursePk = null;
    app.currentView = null;
    app.currentCourse = null;
    app.ohView = null;
    
    var websocketProtocol = location.protocol === "http:" ? "ws:" : "wss:"; 
    var websocketURI = websocketProtocol + "//" + location.host + "/ws/ta?subscribe-broadcast";

    var ws4redis = WS4Redis({
        uri: websocketURI,
        heartbeat_msg: '--heartbeat--',
        receive_message: function(msg) {
            console.log(msg);
            try {
                var data = JSON.parse(msg);
                app.currentCourse.handleUpdate( data );
                switch( data.type ) {
                    case 'request_update': 
                        console.log(data);
                        break;
                    case 'request_create':
                        console.log(data);
                        break;
                    case 'office_hour_update':
                        console.log(data);
                        break;
                    case 'office_hour_create':
                        console.log(data);
                        break;
                    case 'notifyta':
                    case 'notifystudent':
                        console.log(data);
                        break;
                }
            } catch( err ) {
                return;
            }
        }
    });

    app_router.on('route', function() {
        if (Boolean(app.currentView) && Boolean(app.currentView.kill)) {
            app.currentView.kill();
            app.currentView = null;
        }
        checkXhrAndAbort();
    });

    app_router.on('route:roomRoute', function(roomNum) {
        app.ohView = null;
        app.currentCoursePk = null;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#room'+roomNum).addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.ComputersView([], {'roomNum': roomNum, 'el': '#content'});
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:taQueueRoute', function(coursePk) {
        app.currentCoursePk = coursePk;
        $('.custom-sidenav > li > a').removeClass('active');
        var queueItem = $('#queue' + coursePk);
        queueItem.addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.CourseView({
                'coursePk': coursePk
            });
            app.currentCourse = app.currentView;
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:labRoute', function(actions) {
        app.ohView = null;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#labs').addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.LabsView();
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:defaultRoute', function(actions) {
        app.ohView = null;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#home').addClass('active');
        app_router.navigate('room/116', {trigger: true});
    });

    Backbone.history.start();
});
