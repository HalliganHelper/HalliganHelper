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
    url: function() {
        return Boolean(this.url) ? this.url : location.origin + '/api/v2/request/' + this.id;
    },
});
