app = typeof app !== "undefined" ? app : {};

app.officeHourView = Backbone.View.extend({
    tagName: 'li',
    className: 'taCard',
    template: _.template( $('#officeHourTemplate').html() ),
    events: {},
    initialize: function() {
        this.model.on('change', this.render, this);
        this.events['click #cancelOfficeHours'] = this.cancelHours;
        this.delegateEvents(this.events);
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
    cancelHours: function() {
        this.model.save({'end_time': (new Date()).toISOString()}, {patch: true});
        this.model.trigger('destroy', this.model);
    }
});
