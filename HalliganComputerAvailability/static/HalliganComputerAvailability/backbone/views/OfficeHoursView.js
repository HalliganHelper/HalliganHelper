app = typeof app !== "undefined" ? app : {};

app.OfficeHoursView = Backbone.View.extend({
    events: {},
    initialize: function(prevModels, options) {
        this.$el = options.el;
        this.courseNum = options.courseNum;
        this.collection = new app.OfficeHours([], this.courseNum);
        this.listenTo(this.collection, 'fetch', this.showWaiting);
        app.fetchXhr = this.collection.fetch({
            reset: true,
        });

        
        this.listenTo(this.collection, 'add', this.renderOfficeHour);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },
    hideEmptyDivIfNecessary: function() {
        if (this.collection.length != 0) {
            this.$el.find('#emptyList').addClass('hide');
        }
    },
    render: function() {
        var _this = this;
        this.$el.empty();
        this.listBlock = $('<ul class="medium-block-grid-3 small-block-grid-1"/>');
        this.$el.append(this.listBlock);
        this.listBlock.before($('<div class="row queue-header text-center"><h4>TAs On Duty</h4></div>'));

        if (this.collection.recent_meta.ta) {
            var addHoursDiv = _.template( $('#addOfficeHourTemplate').html() )();
            this.listBlock.append(addHoursDiv);
            var clockInBtn = $(addHoursDiv).find('#clockInBtn');
            $('#clockInBtn').click(function clockIn() {
                if (Notification.permission != 'enabled') {
                    Notification.requestPermission();
                }
                var hq = $('#TAHQ').val(),
                    endTime = $('#dtPick').val();
                var newHour = new app.OfficeHour({
                    location: hq,
                    end_time: moment(endTime).toISOString(),
                    course_num: _this.courseNum
                });
                newHour.url = location.origin + '/api/v2/officehour/go_on_duty/'
                newHour.save();

            });
            var today = moment();
            var tomorrow = moment(today).add('days', 1);
            var startTime = moment(today).add('hours', 1);
            $('#dtPick').datetimepicker({
                minDateTime: startTime.toDate(),
                maxDateTime: tomorrow.toDate(),
                alwaysSetTime: true,
                timeFormat: 'hh:mm TT'
            });

        } else {
            this.$el.append( _.template( $('#emptyListTemplate').html() )() );    
            this.hideEmptyDivIfNecessary();
        }
        this.collection.each(function(item) {
            this.renderOfficeHour( item );
        }, this);
    },

    renderOfficeHour: function( item ) {
        var officeHourView = new app.officeHourView({
            model: item
        });
        if (this.collection.recent_meta.ta) {
            $('#addHours').before( officeHourView.render().el );
        } else {
            this.listBlock.append( officeHourView.render().el );
        }
    },
});
