var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var TAs = require('./../models/TA');

var TAsView = Backbone.View.extend({
    template: _.template( require( '/../templates/ta-overlay-template' ) ),

    render: function() {

    }
});

module.exports = TAsView;
