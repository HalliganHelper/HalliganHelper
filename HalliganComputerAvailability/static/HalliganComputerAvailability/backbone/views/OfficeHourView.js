app = typeof app !== "undefined" ? app : {};

app.officeHourView = Backbone.View.extend({
    tagName: 'li',
    className: 'taCard',
    template: _.template( $('#officeHourTemplate').html() ),
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});
