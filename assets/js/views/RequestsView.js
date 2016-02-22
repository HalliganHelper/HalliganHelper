var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var RequestView = require( './RequestView' );

var RequestsView = Backbone.View.extend({
    template: _.template( require( './../templates/requests-view-template' ) ),
    initialize: function( options ) {
        this.listenTo( this.collection, 'reset', this.render );
        this.listenTo( this.collection, 'add', this.renderRequest );
    },
    renderRequest: function( request ) {
        var requestView = new RequestView( { model: request } ); 
        this.$el.append( requestView.render().$el );
    },
    render: function() {
        this.$el.html( this.template() );
        this.collection.each( this.renderRequest, this ); 
        return this;
    }
});

module.exports = RequestsView;
