var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var RequestView = Backbone.View.extend({
    template: _.template( $( '#request-listing-template' ) ),
    render: function() {

    }
});

module.exports = RequestView;
