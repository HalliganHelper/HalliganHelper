var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var TA = require('./../models/TA');

var TAs = Backbone.Collection.extend({
    model: TA,

    initialize: function( initialModels, options ) {
        this.listenTo( this, 'resetCourse', this.resetCourse );
    },
    resetCourse: function( resetCourseID ) {
        this.courseID = resetCourseID;
        this.fetch( { reset: true } );
    },
    url: function() {
        return '/api/v3/school/courses/' + this.courseID + '/tas/';
    }
    
});

module.exports = TAs;
