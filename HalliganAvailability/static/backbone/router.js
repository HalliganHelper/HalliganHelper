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
    app.currentView = null;

    app_router.on('route:roomRoute', function(roomNum) {
        if(app.currentRoomNumber == roomNum) {
            return;
        }

        app.currentRoomNumber = roomNum;
        checkXhrAndAbort();
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
        checkXhrAndAbort();
        $('.custom-sidenav > li > a').removeClass('active');
        $('#queue'+courseNum).addClass('active');
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:defaultRoute', function(actions) {
        app.currentRoomNumber = null;
        checkXhrAndAbort();
        $('.custom-sidenav > li > a').removeClass('active');
        $('#home').addClass('active');
    });

    app_router.on('route:labRoute', function(actions) {
        app.currentRoomNumber = null;
        checkXhrAndAbort();
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
