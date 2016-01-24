var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var WS4Redis = require('./WS4Redis');

var WebSocketHandler = Backbone.Model.extend({
    initialize: function() {
        var websocketProtocol = location.protocol === "http:" ? "ws:" : "wss:"; 
        var websocketURI = websocketProtocol + "//" + location.host + "/ws/ta?subscribe-broadcast";
        this.ws4redis = WS4Redis({
            uri: websocketURI,
            heartbeat_msg: '--heartbeat--',
            receive_message: _.bind( this.receiveMessage, this )
        });
    },
    receiveMessage: function( msg ) {
        msg = JSON.parse( msg );
        this.trigger( msg.type, msg.data );
    }
});

module.exports = WebSocketHandler;
