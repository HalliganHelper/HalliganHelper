app = typeof app !== "undefined" ? app : {};

app.OfficeHours = Backbone.TastypieCollection.extend({
    model: app.OfficeHour,
    initialize: function(initialModels, options) {
        this.course = options.course; 
    },
    url: function() {
        return '/api/v2/officehour/?course=' + this.course.get('id');
    },
    comparator: function (collection) {
        return collection.get('end_time');
    }
});

