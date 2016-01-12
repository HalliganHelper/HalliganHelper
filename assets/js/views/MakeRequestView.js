var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var MakeRequestView = Backbone.View.extend({
    template: _.template( $( '#make-request-remplate' ).html() ),
    events: {
        'keyup .problem-input': 'problemChanged',
        'keyup .location-input': 'locationChanged',
    },
    problemChanged: function() {
        this.problemCharCount.text( this.problemInput.val().length );
    },
    locationChanged: function() {
        this.locationCharCount.text( this.locationInput.val().length );
    },
    render: function() {
        this.$el.html( this.template() );

        this.problemInput = this.$el.find( '.problem-input' );
        this.problemCharCount = this.$el.find( '.problem-char-count' );

        this.locationInput = this.$el.find( '.location-input' );
        this.locationCharCount = this.$el.find( '.location-char-count' );

        return this;
    }
});

module.exports = MakeRequestView;

