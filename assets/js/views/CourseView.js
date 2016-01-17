var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var Course = require('./../models/Course');
var Requests = require('./../collections/Requests');
var RequestView = require('./RequestView');
var MakeRequestView = require('./MakeRequestView');

var CourseView = Backbone.View.extend({
    template: _.template( require( './../templates/course-template' ) ),
    initialize: function( options ) {
        this.course = new Course();
        this.requests = new Requests();
        this.makeRequestView = new MakeRequestView( { 'course': this.course } );

        this.listenTo( this.course, 'change:id', this.fetchCourse );
        this.listenTo( this.course, 'change:name', this.render );
        this.listenTo( this.requests, 'reset', this.renderAllRequests );
        this.listenTo( this.requests, 'add', this.renderRequest );
        this.listenTo( this.makeRequestView, 'newRequest', this.newRequest );

        this.listenTo( this, 'newCourse', this.newCourse );
    },
    fetchCourse: function() {
        this.course.fetch( {
            success: _.bind(function( course ) {
                this.requests.trigger( 'resetCourse', course.get( 'id' ) );
            }, this )
        } );
    },
    newCourse: function( courseID ) {
        this.course.set( { 'id': courseID } );
    },
    newRequest: function( request ) {
        this.requests.add( request );
    },
    renderRequest: function( request ) {
        var requestElement = new RequestView( { model: request } );
        this.requestsContainer.append( requestElement.render().el );
    },
    renderAllRequests: function() {
        console.log( 'Render all requests for course ', this.course.get( 'name' ) );
        this.requestsContainer.empty();
        this.requests.each( this.renderRequest, this );
    },
    render: function() {
        this.$el.html( this.template( this.course.attributes ) );
        this.requestsContainer = this.$el.find( $( '.requests-container' ) );
        this.makeRequestView.setElement( this.$el.find( '.make-request-container' ) );
        this.makeRequestView.render();
        return this;
    }
});

module.exports = CourseView;
