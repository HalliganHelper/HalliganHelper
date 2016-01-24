var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var ProfileView = Backbone.View.extend({
    className: 'profile-view', 
    template: _.template( require('./../templates/profile-template') ),
    initialize: function( options ) {
    
    },
    render: function() {
        console.log( this.model.attributes );
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    }
});

module.exports = ProfileView;
