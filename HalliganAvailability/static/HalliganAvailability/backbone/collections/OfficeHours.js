app = typeof app !== "undefined" ? app : {};

app.OfficeHours = Backbone.TastypieCollection.extend({
    model: app.OfficeHour,
    initialize: function(initialModels, options) {
        console.log('OfficeHours options:', options);
        this.coursePk = options.coursePk; 
    },
    url: function() {
        return '/api/v2/officehour/?course=' + this.coursePk;
    },
    comparator: function (collection) {
        return collection.get('end_time');
    }
});

