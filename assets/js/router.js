var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        'course/:id': 'course',
        'dashboard': 'dashboard',
        'logout': 'logout',
    },
});

module.exports = AppRouter;
