app = typeof app !== "undefined" ? app : {};

app.QueueItem = Backbone.TastypieModel.extend({
    urlRoot: function() {
        return '/api/v2/request/';
    },
    defaults: {
        course: -1,
        question: '',
        whenAsked: new Date(),
        whereLocated: '',
        allow_resolve: false,
        allow_edit: false,
    },
});
