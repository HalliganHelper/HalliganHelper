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
    app.currentRoomNumber = null;
    app.currentCoursePk = null;
    app.currentView = null;
    app.ohView = null;
    app.announcementSocket = io.connect('/announcements');
    app.announcementSocket.on("message", function(data) {
        switch (data.type) {
            case 'request_update':
                var lbl = $('#' + data.course_number + '-count');
                $(lbl).text(data.num_requests);
                if (data.num_requests <= 20) {
                    lbl.removeClass('alert');
                    lbl.addClass('success');
                } else {
                    lbl.removeClass('success');
                    lbl.addClass('alert');
                }
                break;
            case 'cancel_hours':
                if (Boolean(app.ohView) && app.currentCoursePk == data.course_number) {
                    app.ohView.collection.remove(data.office_hour_id);
                }
                break;
            case 'notifyta':
                var msg = data.name + " added themself to the queue";
                show_notification(msg);
                break;
            case 'notifystudent':
                show_notification(data.name + " is on their way!");
                break;
        }
    });


    app.currentTASocket = io.connect('/taqueue');
    app.currentTASocket.on("message", function(rq_data) {
        var rq_course;
        var item;
        var request_count;
        console.log(rq_data);
        switch (rq_data.type) {
            case 'office_hour_update':
                if ( Boolean ( app.ohView ) && rq_data.course == app.currentCoursePk ) {
                    item = app.ohView.collection.get(rq_data.data.id);
                    if ( Boolean( item ) ) {
                        var same_end_time = rq_data.end_time == item.get('end_time');
                        if ( ! same_end_time ) {
                            app.ohView.collection.remove(item);
                        } else {
                            item.set(rq_data.data);
                        }
                    }
                }
                break;

            case 'office_hour_create':
                if ( Boolean ( app.ohView ) && rq_data.course == app.currentCoursePk ) {
                    app.ohView.collection.add ( new app.OfficeHour ( rq_data.data ) );
                }
                break;

            case 'request_update':
                if ( Boolean( app.currentView ) && rq_data.course == app.currentCoursePk ) {
                    item = app.currentView.collection.get(rq_data.id);
                    if ( Boolean(item) && rq_data.remove ) {
                        item.collection.remove(item);
                        //app.currentView.collection.remove(item);
                    } else if ( Boolean( item ) ) {
                        item.fetch();
                    }
                }
                break;

            case 'request_create':
                if ( Boolean( app.currentView ) && rq_data.course == app.currentCoursePk ) {
                    var newRequest = new app.QueueItem({id: rq_data.id});
                    newRequest.fetch({
                        success: function(model, response, options) {
                            console.log(model);
                            app.currentView.collection.add(model);
                        }    
                    });
                }
                break;
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
        if(app.currentRoomNumber == roomNum) {
            return;
        }
        app.currentCoursePk = null;
        app.currentRoomNumber = roomNum;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#room'+roomNum).addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.ComputersView([], {'roomNum': roomNum, 'el': '#content'});
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:taQueueRoute', function(coursePk) {
        app.currentRoomNumber = null;
        app.currentCoursePk = coursePk;
        $('.custom-sidenav > li > a').removeClass('active');
        var queueItem = $('#queue' + coursePk);
        queueItem.addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.CourseView({
                'coursePk': coursePk
            });
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:labRoute', function(actions) {
        app.ohView = null;
        app.currentRoomNumber = null;
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
        app.currentRoomNumber = null;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#home').addClass('active');
        app_router.navigate('room/116', {trigger: true});
    });

    Backbone.history.start();
});
