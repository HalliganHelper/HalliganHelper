var Backbone = require('backbone');
var Request = require('./../models/Request');

var Requests = Backbone.Collection.extend({
    model: Request,
    initialize: function(initialModels, options) {
        this.listenTo( this, 'resetCourse', this.resetCourse );
    },
    resetCourse: function( resetCourseID ) {
        this.courseID = resetCourseID;
        this.fetch( { reset: true } );
    },
    url: function() {
        return '/api/v3/school/courses/' + this.courseID + '/requests/';
    },
    comparator: function ( request ) {
        return request.get( 'when_asked' );
    }
});

module.exports = Requests;
