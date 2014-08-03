app = typeof app !== "undefined" ? app : {};

app.Labs = Backbone.TastypieCollection.extend({
    model: app.Lab,
    url: '/api/v2/lab'
});

