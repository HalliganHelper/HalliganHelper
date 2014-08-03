app = typeof app !== "undefined" ? app : {};

app.Computer = Backbone.TastypieModel.extend({
    defaults: {
        number: '',
        room_number: 0,
        status: '',
        used_for: '',
        last_update: Date()
    }
});

