function show_notification(msg) {
    var options = {
        'body': msg,
        'icon': '/static/HalliganTAAvailability/imgs/HH_Logo.jpg'
    };
    var notification = new Notification("Halligan Helper", options);
}

var AppRouter = Backbone.Router.extend({
    routes: {
        "room/:roomNum": "roomRoute",
        "labs": "labRoute",
        "ta/queue/:courseNum": "taQueueRoute",
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
    app.currentCourseNumber = null;
    app.currentView = null;
    app.ohView = null;
    app.announcementSocket = io.connect('/announcements');
    app.announcementSocket.on("message", function(data) {
        console.log(data);
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
                if (Boolean(app.ohView) && app.currentCourseNumber == data.course_number) {
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
        console.log(rq_data);
        var rq_course;
        switch (rq_data.type) {
            case 'office_hour_update':
                if ( Boolean ( app.ohView ) && rq_data.course == app.currentCourseNumber ) {
                    var item = app.ohView.collection.get(rq_data.data.id);
                    if ( Boolean( item ) ) {
                        app.ohView.listenToOnce(item, 'change', function() {
                            app.ohView.hideEmptyDivIfNecessary();
                        });
                        item.set(rq_data.data);
                    }
                }
                break;

            case 'office_hour_create':
                console.log ("CREATING");
                if ( Boolean ( app.ohView ) && rq_data.course == app.currentCourseNumber ) {
                    app.ohView.collection.add ( new app.OfficeHour ( rq_data.data ) );
                }
                break;

            case 'request_update':
                if ( Boolean( app.currentView ) && rq_data.course == app.currentCourseNumber ) {
                    var item = app.currentView.collection.get(rq_data.data.id);
                    if ( Boolean( item ) ) {
                        console.log("UPDATE", item);
                        app.currentView.listenToOnce(item, 'change', function() {
                            app.currentView.hideEmptyDivIfNecessary();
                        });
                        item.set(rq_data.data);
                    }
                }
                break;

            case 'request_create':
                if ( Boolean ( app.currentView ) && rq_data.course == app.currentCourseNumber ) {
                    app.currentView.collection.add ( new app.QueueItem( rq_data.data ) );
                    app.currentView.hideEmptyDivIfNecessary();
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
        app.currentCourseNumber = null;
        app.currentRoomNumber = roomNum;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#room'+roomNum).addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.ComputersView([], {'roomNum': roomNum, 'el': '#content'});
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:taQueueRoute', function(courseNum) {
        app.currentRoomNumber = null;
        app.currentCourseNumber = courseNum;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#queue'+courseNum).addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.queueItemsView([], {'courseNum': courseNum});
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
        //Backbone.history.navigate('#room/116')
        app_router.navigate('room/116', {trigger: true});
    });

    Backbone.history.start();
});
