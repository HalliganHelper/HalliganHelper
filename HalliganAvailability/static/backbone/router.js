var AppRouter = Backbone.Router.extend({
    routes: {
        "room/:roomNum": "roomRoute",
        "labs": "labRoute",
        "ta/queue/:courseNum": "taQueueRoute",
        "*actions": "defaultRoute",
    }
});


Backbone.View.prototype.showWaiting = function() {
    var circleOne = $('<div class="circle"/>'),
        circleTwo = circleOne.clone();
    this.$el.append(circleOne).append(circleTwo);
    this.$el.append("Loading...");
};

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
    setInterval(function() {
        $('.moment').each(function updateIntervals(indx, item) {
            $(item).html(moment($(item).data('time'), 'YYYY-MM-DD HH:mm:ss').fromNow());
        });
    }, 300000);
    
    var app_router = new AppRouter();
    app.currentRoomNumber = null;
    app.currentCourseNumber = null;
    app.currentView = null;
    app.announcementSocket = io.connect('/announcements');
    app.announcementSocket.on("message", function(data) {
        console.log(data)
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
        }
    });


    app.currentTASocket = io.connect('/taqueue');
    app.currentTASocket.on("message", function(rq_data) {
        switch (rq_data.type) {
            case 'add':
                var rq_course = rq_data.resource.course.Number;
                if (Boolean(app.currentCourseNumber) && rq_course == app.currentCourseNumber) {
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
                app.currentView.removeContainerDiv(rq_data.id);
                break;
            case 'update':
                var id = rq_data.id,
                    question = rq_data.question,
                    loc = rq_data.location;
                var model_instance = app.currentView.collection.get(id);
                if (Boolean(model_instance)) {
                    model_instance.set({'question': question, 'whereLocated': loc});
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

    app_router.on('route:defaultRoute', function(actions) {
        app.currentRoomNumber = null;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#home').addClass('active');
    });

    app_router.on('route:labRoute', function(actions) {
        app.currentRoomNumber = null;
        $('.custom-sidenav > li > a').removeClass('active');
        $('#labs').addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            app.currentView = new app.LabsView();
            $('#content').fadeIn(100);
        });
    });

    Backbone.history.start();
});
