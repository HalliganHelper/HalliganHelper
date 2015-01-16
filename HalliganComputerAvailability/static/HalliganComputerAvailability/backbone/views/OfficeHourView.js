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
        var end_date = new Date(this.model.get('end_time')),
            now = new Date(),
            element = this.$el;
        console.log(end_date.toISOString(), now.toISOString(), end_date < now);
        
        /*
        if ( end_date <= now) {
            this.$el.html("son of a bitch");
            this.$el.fadeOut(200, function() {
                this.$el.empty();
            });
        } else {
            this.$el.html( this.template( this.model.toJSON() ) );
        }
        */
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
    cancelHours: function() {
        this.model.save({'end_time': (new Date()).toISOString()}, {patch: true});
        app.currentView.collection.remove(this.model);
    }
});
