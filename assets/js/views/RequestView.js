var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var RequestView = Backbone.View.extend({
    className: 'request-listing',
    template: _.template( $( '#request-listing-template' ).html() ),
    events: {
        'click .primary.button': 'cancel'
    },
    cancel: function() {
        // this.remove();
        // this.model.trigger( 'destroy' );
        var view = this;
        var transitionFinishedEvents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
        this.$el.addClass( 'cancelled' )
            .on( transitionFinishedEvents, function() {
                $(this).height($(this).height());
                $(this).height(0).css({'margin':'0'}).on( transitionFinishedEvents, function() {
                    // $(this).css({'display': 'none'});
                    view.remove();
                } );
            } );
    },
    render: function() {
        this.$el.html( this.template( this.model.attributes ) ); 
        return this;
    }
});

module.exports = RequestView;
