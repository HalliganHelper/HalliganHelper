var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var LoginView = Backbone.View.extend({
    el: 'body',
    template: _.template( $( '#login-template' ).html() ),

    events: {
        'click .login-button': 'login',
        'click .register-button': 'register'
    },

    login: function() {
        var email = this.$el.find( '.login-email-address' ).val();
        var password = this.$el.find( '.login-password' ).val();
        this.model.login( email, password, _.bind(function() {
            //this.remove();
        }, this ) );

    },
    register: function() {

    },

    render: function() {
        this.$el.html( this.template() );
        return this;
    }
});

module.exports = LoginView;
