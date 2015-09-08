app = typeof app !== "undefined" ? app : {};

app.Requests = Backbone.TastypieCollection.extend({
    model: app.Request,
    initialize: function(initialModels, options) {
        this.coursePk = options.coursePk;
    },
    url: function() {
        return '/api/v2/request/?course=' + this.coursePk;
    },
    comparator: function (collection) {
        return collection.get('when_asked');
    }
});
