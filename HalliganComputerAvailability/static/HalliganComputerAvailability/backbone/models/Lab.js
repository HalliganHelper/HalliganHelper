app = typeof app !== "undefined" ? app : {};

app.Lab = Backbone.TastypieModel.extend({
    defaults: {
        course_name: 'DEFAULT',
        room_number: 0,
        start_time: null,
        end_time: null,
        day_of_week_str: ''
    }
});
