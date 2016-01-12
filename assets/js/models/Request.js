var Backbone = require('backbone');

var Request = Backbone.Model.extend( {
    defaults: {
        editable: true
    }
} );

module.exports = Request;

