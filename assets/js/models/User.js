var Backbone = require('backbone');
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
        console.log("logging out user");
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
    setPhoto: function( photo, success, error ) {
        var photoUrl = this.url + 'change_photo/';

        var successFunc = _.isFunction( success ) ? success : this.noop;
        var errorFunc = _.isFunction( error ) ? error : this.noop;

        this.save( 
                   { 'photo': photo }, 
                   { 'url': photoUrl, 'success': successFunc, 'error': errorFunc } 
                 );
    },
} );

module.exports = User;

