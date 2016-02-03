var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var Course = require('./../models/Course');
var Request = require('./../models/Request');
var Requests = require('./../collections/Requests');
var TAs = require('./../collections/TAs');
var RequestView = require('./RequestView');
var MakeRequestView = require('./MakeRequestView');
var TAsView = require('./TAsView');

var CourseView = Backbone.View.extend({
    template: _.template( require( './../templates/course-template' ) ),
    events: {
        'click .show-tas': 'showTAs'
    },

    initialize: function( options ) {
        this.course = new Course();
        this.requests = new Requests();
        this.tas = new TAs();
        this.webSocketHandler = options.webSocketHandler;
        this.makeRequestView = new MakeRequestView( { 'course': this.course } );
        this.TAsView = new TAsView( { 'collection': this.tas } );

        this.listenTo( this.course, 'change:id', this.fetchCourse );
        this.listenTo( this.course, 'change:name', this.render );
        this.listenTo( this.tas, 'reset', this.setTACount );
        this.listenTo( this.requests, 'reset', this.renderAllRequests );
        this.listenTo( this.requests, 'add', this.renderRequest );
        this.listenTo( this.makeRequestView, 'newRequest', this.newRequest );
        this.listenTo( options.webSocketHandler, 
                       'request_created request_updated', 
                       this.newWebSocketRequest );
        this.listenTo( options.webSocketHandler,
                       'request_removed',
                       this.removeWebSocketRequest );
        this.listenTo( this, 'newCourse', this.newCourse );
    },
    newWebSocketRequest: function( data ) {
        if ( data.course != this.course.get('id' ) ) {
           return; 
        }
        var request = new Request( { 'id': data.id }, { 'course': this.course } );
        request.fetch( {
            'success': _.bind( function( model ) {
                this.requests.add( model, { 'merge': true } ); 
            }, this )
        } );
    },
    removeWebSocketRequest: function( data ) {
        if ( data.course != this.course.get('id' ) ) {
           return; 
        }
        try {
            this.requests.get( data.id ).trigger( 'destroy' );
        } catch ( e ) {
        }
    },
    fetchCourse: function() {
        this.course.fetch( {
            success: _.bind(function( course ) {
                this.requests.trigger( 'resetCourse', course.get( 'id' ) );
                this.tas.trigger( 'resetCourse', course.get( 'id' ) );
            }, this )
        } );
    },
    newCourse: function( courseID ) {
        if( this.course.get( 'id' ) !== courseID ) {
            this.course.set( { 'id': courseID } );
        } else {
            this.course.trigger( 'change:name' );
        }
    },
    newRequest: function( request ) {
        this.requests.add( request );
    },
    showTAs: function() {
        this.taContainer.toggleClass( 'hidden' ); 
    },
    setTACount: function() {
        var taCount = this.tas.where( { 'on_duty': true } ).length;
        this.taCountContainer.text( taCount );
    },
    renderRequest: function( request ) {
        var requestElement = new RequestView( { model: request } );
        this.requestsContainer.append( requestElement.render().el );
    },
    renderAllRequests: function() {
        this.requestsContainer.empty();
        this.requests.each( this.renderRequest, this );
    },
    render: function() {
        this.$el.html( this.template( this.course.attributes ) );
        this.taCountContainer = this.$el.find( '.ta-count' );
        this.taContainer = this.$el.find( '.ta-overlay-container' );
        this.requestsContainer = this.$el.find( '.requests-container' );
        this.makeRequestView.setElement( this.$el.find( '.make-request-container' ) );
        this.makeRequestView.render();
        this.TAsView.setElement( this.$el.find( '.ta-overlay-container' ) );

        this.delegateEvents();
        return this;
    }
});

module.exports = CourseView;
