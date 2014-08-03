var AppRouter = Backbone.Router.extend({
    routes: {
        "room/:roomNum": "roomRoute",
        "labs": "labRoute",
        "ta/queue/:courseNum": "taQueueRoute",
        "*actions": "defaultRoute",
    }
});

$(function() {
    var app_router = new AppRouter();

    app_router.on('route:roomRoute', function(roomNum) {
        $('.custom-sidenav > li > a').removeClass('active');
        $('#room'+roomNum).addClass('active');
        console.log("Going to room " + roomNum);
        $('#content').fadeOut(100, function() {
            $('#content').empty();      
            console.log('Animation complete');
            new app.ComputersView([], {'roomNum': roomNum, 'el': '#content'});
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:taQueueRoute', function(courseNum) {
        $('.custom-sidenav > li > a').removeClass('active');
        $('#queue'+courseNum).addClass('active');
        console.log('Going to the queue for ' + courseNum);
        $('#content').fadeOut(100, function() {
            console.log('Animation complete');
            $('#content').empty();      
            $('#content').fadeIn(100);
        });
    });

    app_router.on('route:defaultRoute', function(actions) {
        $('.custom-sidenav > li > a').removeClass('active');
        $('#home').addClass('active');
        console.log("Default route. Actions: " + actions);
    });

    app_router.on('route:labRoute', function(actions) {
        $('.custom-sidenav > li > a').removeClass('active');
        $('#labs').addClass('active');
        console.log("Going to Labs");
        $('#content').fadeOut(100, function() {
            console.log('Animation complete');
            $('#content').empty();      
            new app.LabsView();
            $('#content').fadeIn(100);
        });
    });

    Backbone.history.start();
});
