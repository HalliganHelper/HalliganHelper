var Backbone = require('backbone');
var $ = require( 'jquery' );
var _ = require( 'underscore' );

var User = Backbone.Model.extend( {
    url: '/api/v3/user/',
    noop: function() {},
    login: function( email, password, success, error ) {
        var saveUrl = this.url + 'login/';

        var errorFunc = _.isFunction( error ) ? error : this.noop;
        function successFunc( model, response, options ) {
            model.unset( 'password' , { 'silent': true } );
            model.trigger( 'loggedIn' );

            if ( _.isFunction( success ) ) {
                return success( model, response, options );
            }
        }
        
        this.save( 
                   { 'email': email, 'password': password },
                   { 'url': saveUrl, 'success': successFunc, 'error': errorFunc }
                 );
    },
    logout: function( options ) {
        var logoutUrl = this.url + 'logout/';

        var errorFunc = _.isFunction( options.error ) ? options.error : this.noop;
        function successFunc( model, response, options ) {
            model.trigger( 'loggedOut' );

            if ( _.isFunction( options.success ) ) {
                return options.success( model, response, options );
            }
        }

        this.save( 
                   {}, 
                   { 'url': logoutUrl, 'success': successFunc, 'error': errorFunc } 
                 );
    },
    setPhoto: function( photo, options ) {
        options = options || {};
        var photoUrl = this.url + 'upload_photo/';
        var formData = new FormData();
        formData.append( 'photo', photo );

        var successFunc = _.isFunction( options.success ) ? options.success : this.noop;
        var errorFunc = _.isFunction( options.error ) ? options.error : this.noop;

        $.ajax( {
            url: photoUrl,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: _.bind( function( data ) {
                this.set( 'headshot_url', data.headshot_url );
            }, this ),
            error: _.bind( function( request ) {
                errorFunc( photo, 'network' );
            }, this ),
        } );
    },
} );

module.exports = User;

