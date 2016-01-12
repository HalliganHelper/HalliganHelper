var Backbone = require('backbone');

var Course = Backbone.Model.extend({
    urlRoot: '/api/v3/school/courses',
    save: function() {
        /* noop for courses, since they can't be changed */
    },
    initialize: function( attributes, options ) {},
});

module.exports = Course;

