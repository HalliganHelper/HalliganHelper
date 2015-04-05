app.labView = Backbone.View.extend({
    tagName: 'div',
    className: 'labView',
    template: _.template( $('#labTemplate').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});
