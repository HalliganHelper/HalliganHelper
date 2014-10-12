app = typeof app !== "undefined" ? app : {};

app.queueItems = Backbone.TastypieCollection.extend({
    model: app.QueueItem,
    initialize: function(initialModels, courseNum) {
        this.courseNum = courseNum;
    },
    url: function() {
        return location.origin + '/api/v2/request/?course__Number=' + this.courseNum;
    },
    comparator: function (collection) {
        return collection.get('whenAsked');
    }
});


