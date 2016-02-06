var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var School = require('./../models/School');
var CourseView = require('./CourseView');
var DashboardView = require('./DashboardView');
var ProfileView = require('./ProfileView');
var AppRouter = require('./../router');
var WebSocketHandler = require('./../components/WebSocketHandler');
var utils = require( './../components/utils' );


var SchoolView = Backbone.View.extend({
    el: 'body', /** The School is the main view of the app, so it is the root */
    template: _.template( require( './../templates/school-template' ) ),

    initialize: function( options ) {
        this.webSocketHandler = new WebSocketHandler();
        this.school = new School();
        this.courseView = new CourseView( { 
            'user': this.model,
            'webSocketHandler': this.webSocketHandler 
        } );
        this.dashboardView = new DashboardView( { 'model': this.school } );
        this.profileView = new ProfileView( { 'model': this.model } );

        this.listenTo( this.model, 'loggedIn', _.bind( this.initSchool, this ) );
        
    },
    requestAdded: function( data ) {
        /* 
         * When we receive a request, update the course request count
         * so that the dashboard stays valid
         */
        this.school.courses.get( { 'id': data.course } ).fetch();

    },
    requestCheckedOut: function( data ) {
        console.log( data );
        msg = data.checked_out_by + ' to the rescue!';
        options = {
            'icon': data.headshot,
            'tag': 'incoming_help',
        };
        utils.notify( 'Help is on the way!', msg, options );
    },
    initWebSocketListeners: function() {
        this.listenTo( this.webSocketHandler, 
                       'request_created', 
                       _.bind( this.requestAdded, this ) );

        this.listenTo( this.webSocketHandler,
                       'checked_out',
                       _.bind( this.requestCheckedOut, this ) );
    },
    initSchool: function() {
        this.listenTo( this.school, 'change', this.render );
        this.school.fetch({
            /* 
             * Only bind the router once we have a school, so that we only try to
             * get a course once we have a school 
             */
            success: _.bind( this.initRouter, this )
        });
    },
    initRouter: function() {
        this.router = new AppRouter();
        var router = this.router;

        this.initWebSocketListeners();

        this.router.on( 'route:course', _.bind(function( id ) {
            this.courseView.trigger( 'newCourse', Number( id ) );
            this.mainContent.html( this.courseView.$el );
        }, this ) );
    
        this.router.on( 'route:dashboard', _.bind( function() {
            this.mainContent.html( this.dashboardView.render().$el );
        }, this ) );

        this.router.on( 'route:profile', _.bind( function() {
            this.mainContent.html( this.profileView.render().$el );
        }, this ) );

        this.router.on( 'route:logout', _.bind( function() {
            this.model.logout( {
                'success': function() {
                    router.navigate('/'); 
                } 
            } ); 
        }, this) );
        
        /* Backbone.history.start returns false if the current url doesn't 
         * match any known route. If there's no match, show them the dashboard
         */
        if( ! Backbone.history.start() ) {
            this.router.navigate( 'dashboard', { 'trigger': true } );
        }

    },
    render: function() {
        this.$el.html( this.template( this.school.attributes ) ); 
        this.mainContent = this.$el.find( '.main-content' );
        return this;
    },
});

module.exports = SchoolView;
