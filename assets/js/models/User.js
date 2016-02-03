var Backbone = require('backbone');
var $ = require( 'jquery' );
var _ = require( 'underscore' );

var User = Backbone.Model.extend( {
    url: '/api/v3/user/',
    noop: function() {},
    register: function( email, password, passwordConfirm, firstName, lastName, options ) {
        var registerUrl = this.url + 'register/';

        options = options || {};

        var successFunc = _.isFunction( options.success ) ? options.success : this.noop;
        var errorFunc = _.isFunction( options.error ) ? options.error : this.noop;

        var data = {
            'email': email,
            'password': password,
            'password_confirm': passwordConfirm,
            'first_name': firstName,
            'last_name': lastName,
        };

        $.ajax( {
            url: registerUrl,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: _.bind( successFunc, this ),
            error: _.bind( errorFunc, this ),
        } );
    },
    login: function( email, password, options ) {
        var saveUrl = this.url + 'login/';
        options = options || {};

        var errorFunc = _.isFunction( options.error ) ? options.error : this.noop;
        function successFunc( model, response, successOptions ) {
            model.unset( 'password' , { 'silent': true } );
            model.trigger( 'loggedIn' );

            if ( _.isFunction( options.success ) ) {
                return options.success( model, response, successOptions );
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

