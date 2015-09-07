app = typeof app !== "undefined" ? app : {};

app.RoomsView = Backbone.View.extend({
    el: '#rooms',
    initialize: function() {
        this.collection = new app.Rooms();
        this.listenTo(this.collection, 'fetch', this.showWaiting);
        this.listenTo(this.collection, 'add', this.renderRoom);
        this.listenTo(this.collection, 'reset', this.render);

        app.fetchXhr = this.collection.fetch({reset: true});
        this.render();
    },

    render: function() {
        this.$el.empty();
        this.collection.each(function(item) {
            this.renderRoom( item );
        }, this);
    },

    renderRoom: function( item ) {
        var roomView = new app.roomView({
            model: item
        });
        this.$el.append( roomView.render().el );
    },
});
