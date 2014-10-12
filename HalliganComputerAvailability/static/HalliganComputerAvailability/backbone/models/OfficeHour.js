app = typeof app !== "undefined" ? app : {};

app.OfficeHour = Backbone.TastypieModel.extend({
    defaults: {
        end_time: '',
        start_time: '',
        location: '',
        ta: null,
        image_url: '//placekitten.com/g/99/99'

    }
});

