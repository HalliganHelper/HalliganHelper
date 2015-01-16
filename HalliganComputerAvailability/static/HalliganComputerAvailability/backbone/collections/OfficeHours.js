app = typeof app !== "undefined" ? app : {};

app.OfficeHours = Backbone.TastypieCollection.extend({
    model: app.OfficeHour,
    initialize: function(initialModels, courseNum) {
        this.courseNum = courseNum; 
    },
    url: function() {
        return '/api/v2/officehour/?course__Number=' + this.courseNum;
    },
    comparator: function (collection) {
        return collection.get('end_time');
    }
});

