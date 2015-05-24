app = typeof app !== "undefined" ? app : {};

app.QueueItem = Backbone.TastypieModel.extend({
    urlRoot: function() {
        return '/api/v2/request/';
    },
    defaults: {
        course: -1,
        question: '',
        when_asked: new Date(),
        where_located: '',
        allow_resolve: false,
        allow_edit: false,
    },
});
