app.computerView = Backbone.View.extend({
    tagName: 'div',
    className: 'computerView',
    template: _.template( $('#computerTemplate').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});
