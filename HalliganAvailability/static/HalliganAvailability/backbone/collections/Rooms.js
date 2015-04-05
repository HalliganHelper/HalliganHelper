app = typeof app !== "undefined" ? app : {};

app.Rooms = Backbone.TastypieCollection.extend({
    model: app.Room,
    url: location.origin + '/api/v2/computer'
});

