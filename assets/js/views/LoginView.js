var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var LoginView = Backbone.View.extend({
    el: 'body',
    template: _.template( require( './../templates/login-template' ) ),

    events: {
        'click .login-button': 'login',
        'click .register-button': 'register',
        'keyup input': 'inputChanged',
    },

    login: function() {
        if ( this.registrationBox.is( ':visible' ) ) {
            this.hideRegistrationBox();
            return;
        }
        var email = this.emailInput.val();
        var password = this.$el.find( '.login-password' ).val();

        options = {
            'error': _.bind( function( model, response ) {
                console.log( 'ERROR ON LOGIN ', response );
                this.renderRegistrationErrors( response.responseJSON );
            }, this ),
        };
        this.model.login( email, password, options );
    },
    register: function() {
        
        if ( ! this.registrationBox.is( ':visible' ) ) {
            this.showRegistrationBox();
            return;
        }
        var email = this.emailInput.val();
        var password = this.passwordInput.val();
        var confirmPassword = this.confirmPasswordInput.val();
        var firstName = this.firstNameInput.val();
        var lastName = this.lastNameInput.val();

        var options = {
            'error': _.bind( function( response ) {
                this.renderRegistrationErrors( response.responseJSON );
            }, this ),
            'success': function( data ) {
                console.log( 'Success!', arguments );
            },
        };

        this.model.register( email, 
                             password, 
                             confirmPassword, 
                             firstName, 
                             lastName,
                             options );

    },

    inputChanged: function( e ) {
        $( e.target ).parents( '.error' ).removeClass( 'error' );

        if ( e.keyCode == 13 ) {
            if ( this.registerState ) {
                this.register();
            } else {
                this.login();
            }
        }
    },
    
    hideRegistrationBox: function() {
        this.hideRegistrationErrors();
        this.registrationBox.addClass( 'hidden' );
        this.registerButton
            .removeClass( 'primary' )
            .addClass( 'secondary' )
            .text( 'Registration Form' );
        this.loginButton
            .removeClass( 'secondary' )
            .addClass( 'primary' )
            .text( 'Login' );
    }, 
    showRegistrationBox: function() {
        this.hideRegistrationErrors();
        this.registrationBox.removeClass( 'hidden' );

        this.registerButton
            .removeClass( 'secondary' )
            .addClass( 'primary' )
            .text( 'Register' );

        this.loginButton
            .removeClass( 'primary' )
            .addClass( 'secondary' )
            .text( 'Login Form' );

    },
    hideRegistrationErrors: function () {
        this.$el.find( '.error ').removeClass( 'error' );
    },
    renderRegistrationErrors: function( errors ) {
        console.log( 'rendereing registration errors: ', errors );
        for ( var errorType in errors ) { // FIXME: Is this valid?
            console.log( 'Error for: ', errorType );
            var className = '.' + errorType + '-row';
            var row = this.$el.find( className );
            var errorList = row.find( '.error-message > ul' );
            var errorStrings = errors[ errorType ];

            errorList.empty();
            for( var i = 0; i < errorStrings.length; i++ ) {
                var error = errorStrings[ i ];
                console.log( '    Error is: ', error );
                errorList.append( $( '<li>' + error + '</li>' ) );
            }

            row.addClass( 'error' );
        }
    },
    render: function() {
        this.$el.html( this.template() );
        this.emailInput = this.$el.find( '.login-email-address' );
        this.passwordInput = this.$el.find( '.login-password' );
        this.confirmPasswordInput = this.$el.find( '.confirm-password' );
        this.firstNameInput = this.$el.find( '.first-name' );
        this.lastNameInput = this.$el.find( '.last-name' );
        this.registrationBox = this.$el.find( '.registration-box' );

        this.registerButton = this.$el.find( '.register-button' );
        this.loginButton = this.$el.find( '.login-button' );
        return this;
    }
});

module.exports = LoginView;
