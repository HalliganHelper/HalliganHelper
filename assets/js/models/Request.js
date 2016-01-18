var Backbone = require('backbone');

var Request = Backbone.Model.extend( {
    initialize: function( attrs, options ) {
        this.course = options.course;
    },

    url: function() {
        var _url = Backbone.Model.prototype.url.call( this );
        if ( _url.charAt( _url.length - 1 ) != '/' ) {
            _url += '/';
        }

        return  _url;
    },
    urlRoot: function() {
        if( this.collection ) {
            return this.collection.url();
        }

        var courseID = this.course.get('id');
        return '/api/v3/school/courses/' + courseID + '/requests/';
    },
    defaults: {
        editable: true
    }
} );

module.exports = Request;

