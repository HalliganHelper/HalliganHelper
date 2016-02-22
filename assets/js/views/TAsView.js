var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var TAView = require( './TAView' );

var TAsView = Backbone.View.extend({
    className: 'ta-grid',
    initialize: function( options ) {
        this.listenTo( this.collection, 'reset', this.render );
        this.listenTo( this.collection, 'add', this.renderTA );
    },
    renderTA: function( ta ) {
        var taView = new TAView( { model: ta } );
        this.$el.append( taView.render().$el );
    },
    render: function() {
        this.$el.empty();
        this.collection.each( this.renderTA, this );
        return this;
    }
});

module.exports = TAsView;
