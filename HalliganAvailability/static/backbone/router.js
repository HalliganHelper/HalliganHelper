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
    if (Boolean(app.fetchXhr) && app.fetchXhr.readyState > 0
        && app.fetchXhr.readyState < 4) {
        app.fetchXhr.abort();
    }
}

$(function() {
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
        }
    });


    app.currentTASocket = io.connect('/taqueue');
    app.currentTASocket.on("message", function(rq_data) {
        console.log(rq_data);
        switch (rq_data.type) {
            case 'add_oh':
                var rq_course = rq_data.course_number;
                if(Boolean(app.ohView) && rq_course == app.currentCourseNumber) {
                    var newOH = new app.OfficeHour(rq_data.resource);
                    app.ohView.collection.add(newOH);
                    //app.ohView.collection.fetch();
                }
                break;
            case 'remove_oh':
                var rq_course = rq_data.resource.course.Number;
                if(Boolean(app.ohView) && rq_course == app.currentCourseNumber) {
                    app.ohView.collection.remove(app.ohView.collection.get(rq_data.id));
                }
                break;
            case 'add':
                var rq_course = rq_data.resource.course.Number;
                if (Boolean(app.currentCourseNumber) && rq_course == app.currentCourseNumber) {
                    console.log('adding');
                    var current_obj = app.currentView.collection.get(rq_data.resource.id);
                    if (Boolean(current_obj)) {
                        current_obj.set(rq_data.resource);
                    } else {
                        current_obj = new app.QueueItem(rq_data.resource);
                        app.currentView.collection.add(current_obj);
                        app.currentView.hideEmptyDivIfNecessary();
                    }
                }
                break;
            case 'remove':
                console.log('removing');
                app.currentView.removeContainerDiv(rq_data.id);
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
