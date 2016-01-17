var Backbone = require('backbone');

var Request = Backbone.Model.extend( {
    initialize: function( attrs, options ) {
        this.course = options.course;
    },

    urlRoot: function() {
        var courseID = this.course.get('id');
        return '/api/v3/school/courses/' + courseID + '/requests/';
    },
    defaults: {
        editable: true
    }
} );

module.exports = Request;

