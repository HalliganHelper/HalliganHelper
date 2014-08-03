app.roomView = Backbone.View.extend({
    tagName: 'div',
    className: 'roomView',
    template: _.template( $('#roomTemplate').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});
