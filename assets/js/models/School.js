var Backbone = require('backbone');
var CourseCollection = require('../collections/Courses');

var School = Backbone.Model.extend({
    url: '/api/v3/school/',
    save: function() {
       /* noop for schools, since they can't be changed. */ 
    },

    initialize: function( attributes, options ) {
        this.courseCollection = new CourseCollection();
        this.listenTo( this, 'change:courses', this.courseListChanged );
    },

    courseListChanged: function( newCourses ) {
        this.courseCollection.add( newCourses, { 'merge': true } );
    }

});

module.exports = School;
