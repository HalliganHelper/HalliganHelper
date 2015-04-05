app = typeof app !== "undefined" ? app : {};

app.LabsView = Backbone.View.extend({
    el: '#content',
    initialize: function() {
        this.collection = new app.Labs();
        app.fetchXhr = this.collection.fetch({reset: true});

        this.listenTo(this.collection, 'add', this.renderLab);
        this.listenTo(this.collection, 'reset', this.render);
    },
    template: _.template( $('#labHeaderTemplate').html() ),
    render: function() {
        console.log("RENDERING LABS");
        this.$el.append( this.template() );
        this.collection.each(function(item) {
            this.renderLab( item );
        }, this);
    },

    renderLab: function( item ) {
        var labView = new app.labView({
            model: item
        });
        this.$el.append( labView.render().el );
    }
});
