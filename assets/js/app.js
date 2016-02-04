require('./../scss/extend_foundation.scss');

var $ = require('jquery');

var Utils = require('./components/utils');

var SchoolView = require('./views/SchoolView');
var LoginView = require('./views/LoginView');
var User = require('./models/User');

function show_notification(msg) {
    var options = {
        'body': msg,
        'icon': '/static/tas/imgs/HH_Logo.jpg'
    };
    var notification = new Notification("Halligan Helper", options);
}



Utils.ajaxSetup();
var user = new User();
var sv = new SchoolView( { 'model': user } );
var lv = new LoginView( { 'model': user } );

user.fetch({
    'success': function( model, response, options ) {
        lv.remove();
        user.trigger( 'loggedIn' );
        /* Note: Intentionally not calling render here. 
         * The SchoolView renders itself once it fetches the 
         * school information
         */
    },
    'error': function( model, response, options ) {
        $( 'body' ).html( lv.render().el );
    }
});
