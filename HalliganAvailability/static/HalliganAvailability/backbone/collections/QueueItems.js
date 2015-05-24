app = typeof app !== "undefined" ? app : {};

app.queueItems = Backbone.TastypieCollection.extend({
    model: app.QueueItem,
    initialize: function(initialModels, options) {
        this.courseNum = options.courseNum;
        this.coursePk = options.coursePk;
    },
    url: function() {
        return '/api/v2/request/?course=' + this.coursePk;
    },
    comparator: function (collection) {
        return collection.get('when_asked');
    }
});
