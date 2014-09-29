app = typeof app !== "undefined" ? app : {};

app.Labs = Backbone.TastypieCollection.extend({
    model: app.Lab,
    url: location.origin + '/api/v2/lab/'
});

