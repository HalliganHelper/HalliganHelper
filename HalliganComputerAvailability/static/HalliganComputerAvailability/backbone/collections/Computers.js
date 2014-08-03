app = typeof app !== "undefined" ? app : {};

app.Computers = Backbone.TastypieCollection.extend({
    model: app.Computer,
    initialize: function(initialModels, roomNum) {
        this.roomNum = roomNum;
    },
    url: function() {
        return '/api/v2/computer/?room_number=' + this.roomNum;
    },
    comparator: function (collection) {
        return collection.get('number');
    }
});

