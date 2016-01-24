var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var TA = Backbone.Model.extend({
    defaults: {
        'on_duty': true
    },
    url: function() {
        var _url = Backbone.Model.prototype.url.call( this );
        if ( _url.charAt( _url.length - 1 ) != '/' ) {
            _url += '/';
        }

        return _url;
    },
    urlRoot: function() {
        if( this.collection ) {
            return this.collection.url();
        }

        var courseID = this.course.get( 'id' );
        return '/api/v3/school/courses/' + courseID + '/tas/';
    } 
});

module.exports = TA;
