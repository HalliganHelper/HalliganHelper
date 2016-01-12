app = typeof app !== "undefined" ? app : {};

app.Room = Backbone.TastypieModel.extend({
    defaults: {
        room: '',
        numReporting: 0,
        numAvailable: 0,
        numUnavailable: 0,
        numError: 0,
        lastUpdated: Date()
    }
});

