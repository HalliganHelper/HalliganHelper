var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        'course/:id': 'course',
        'logout': 'logout',
    },
});

module.exports = AppRouter;
