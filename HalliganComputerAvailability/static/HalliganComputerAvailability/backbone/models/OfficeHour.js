app = typeof app !== "undefined" ? app : {};

app.OfficeHour = Backbone.TastypieModel.extend({
    defaults: {
        end_time: '',
        start_time: '',
        location: '',
        ta: null,
        image_url: 'http://placekitten.com/g/100/101'

    }
});

