app = typeof app !== "undefined" ? app : {};

app.Rooms = Backbone.TastypieCollection.extend({
    model: app.Room,
    url: '/api/v2/computer'
});

