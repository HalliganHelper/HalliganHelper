app = typeof app !== "undefined" ? app : {};

app.QueueItem = Backbone.TastypieModel.extend({
    defaults: {
        id: -1,
        course: -1,
        question: '',
        whenAsked: new Date(),
        whereLocated: '',
        allow_resolve: false,
        allow_edit: false,
    },
});
