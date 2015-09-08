app = typeof app !== "undefined" ? app : {};

app.Course = Backbone.TastypieModel.extend({
    initialize: function(attributes, options) {
        this.coursePk = attributes.coursePk;
        this.requests = new app.Requests([], this.attributes);
        this.officeHours = new app.OfficeHours([], this.attributes);
    },
    url: function() {
        return '/api/v2/course/' + this.coursePk;
    }
});

