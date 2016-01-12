var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var School = require('./../models/School');
var CourseView = require('./CourseView');
var AppRouter = require('./../router');

var SchoolView = Backbone.View.extend({
    el: 'body', /** The School is the main view of the app, so it is the root */
    template: _.template( $( '#school-template' ).html() ),
    
    initialize: function( options ) {
        this.school = new School();
        this.courseView = new CourseView();
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
        this.router.on( 'route:course', _.bind(function( id ) {
            this.courseView.trigger( 'newCourse', Number( id ) );
        }, this ) );
        Backbone.history.start();
    },
    render: function() {
        this.$el.html( this.template( this.school.attributes ) ); 
        this.courseView.setElement( this.$el.find( '.main-content' ) );
        return this;
    }
});

module.exports = SchoolView;
