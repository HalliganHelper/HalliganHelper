app = typeof app !== "undefined" ? app : {};

app.OfficeHour = Backbone.TastypieModel.extend({
    urlRoot: function() {
        return '/api/v2/officehour/';
    },
    defaults: {
        end_time: '',
        start_time: '',
        location: '',
        ta: null,
        image_url: '//placekitten.com/g/99/99'
    }
});

