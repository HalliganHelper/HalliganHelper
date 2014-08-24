app = typeof app !== "undefined" ? app : {};

app.ComputersView = Backbone.View.extend({
    initialize: function(prevModels, options) {
        this.$el = $(options.el);
        this.roomNum = options.roomNum;
        this.collection = new app.Computers([], this.roomNum);
        this.listenTo(this.collection, 'fetch', this.showWaiting);
        app.fetchXhr = this.collection.fetch({reset: true});

        this.listenTo(this.collection, 'add', this.renderComputer);
        this.listenTo(this.collection, 'reset', this.render);
    },
    template: _.template( $('#computerHeaderTemplate').html() ),
    render: function() {
        console.log("RENDERING COMPUTERS");
        this.$el.empty();
        this.$el.append( this.template() );
        this.collection.each(function(item) {
            this.renderComputer( item );
        }, this);
    },

    renderComputer: function( item ) {
        var computerView = new app.computerView({
            model: item
        });
        this.$el.append( computerView.render().el );
    },
});
