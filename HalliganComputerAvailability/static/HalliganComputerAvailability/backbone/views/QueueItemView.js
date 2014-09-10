app = typeof app !== "undefined" ? app : {};

app.queueItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'queueItemView',
    template: _.template( $('#queueTemplate').html() ),
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});
