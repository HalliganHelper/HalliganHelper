app = typeof app !== "undefined" ? app : {};

app.Request = Backbone.TastypieModel.extend({
    urlRoot: function() {
        return '/api/v2/request/';
    },
});
