var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var TAs = require('./../models/TA');

var TAsView = Backbone.View.extend({
    className: 'ta-overlay',
    template: _.template( require( './../templates/ta-overlay-template' ) ),
    initialize: function( options ) {
        this.listenTo( this.collection, 'change reset', this.render );
    },
    renderTA: function( ta ) {
        this.$el.append( this.template( ta.attributes ) );
    }, 
    render: function() {
        this.$el.empty();
        this.collection.each( this.renderTA, this );
        return this;
    }
});

module.exports = TAsView;
