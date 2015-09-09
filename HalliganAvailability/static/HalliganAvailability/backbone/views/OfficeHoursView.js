app = typeof app !== "undefined" ? app : {};

app.OfficeHoursView = Backbone.View.extend({
    events: {
        'click #clockInBtn': 'clockIn',
        'keyup #TAHQ': 'enterToSubmit',
        'keyup #dtPick': 'enterToSubmit',
    },
    initListeners: function() {
        this.listenTo(this.collection, 'fetch', this.showWaiting);
        this.listenTo(this.collection, 'add', this.renderOfficeHour);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },
    initialize: function( options ) {
        this.course = options.course;
        this.collection = new app.OfficeHours( [], { 'course': this.course } );
        this.initListeners();
        app.fetchXhr = this.collection.fetch( { reset: true } );
    },
    hideEmptyDivIfNecessary: function() {
        if (this.collection.length !== 0) {
            this.$('#emptyList').addClass('hide');
        }
    },
    computeNow: function() {
        var now = moment().startOf('minute'),
            minute = now.minute();
        if (minute < 15) {
            now.minute(15);
        } else if (minute < 30) {
            now.minute(30);
        } else if (minute < 45) {
            now.minute(45);
        } else {
            now.minute(0).add(1, 'hour');
        }
        return now;
    },
    enterToSubmit: function(ev) {
        if( ev.keyCode === 13 ) {
            this.clockIn();
        }
    },
    clockIn: function(ev) {
        var btnElement = ev.currentTarget;
        var _this = this;
        if (! this.collection.recent_meta.is_ta) {
            return;
        }

        btnElement.setAttribute('disabled', 'disabled');

        if (Notification.permission != 'enabled') {
            Notification.requestPermission();
        }
        var hq = $('#TAHQ'),
            endTime = $('#dtPick'),
            timeLabel = $("label[for='dtPick']"),
            hqLabel = $("label[for='TAHQ']"),
            date_obj = $('#dtPick').pickatime('picker').get('select');
        var newHour = new app.OfficeHour( {
            location: hq.val(),
            end_time: moment().startOf('day').minute(date_obj.mins).hour(date_obj.hour).toISOString(),
            course: this.course.get('resource_uri')
        } );

        newHour.save({}, 
            {
                success: function(model, response, options) {
                    _this.collection.add(model);
                   hq.val('');
                   timeLabel.removeClass('error');
                   hqLabel.removeClass('error');
                    btnElement.removeAttribute('disabled');
                },
                error: function(model, response, options) {
                    responseJSON = response.responseJSON;
                    if (Boolean(responseJSON.error) || Boolean(responseJSON.officehour.end_time)) {
                        timeLabel.addClass('error');
                    } else {
                        timeLabel.removeClass('label');
                    }
                    if (Boolean(responseJSON.officehour.location)) {
                        hqLabel.addClass('error');
                    } else {
                        hqLabel.removeClass('error');
                    }
                    btnElement.removeAttribute('disabled');
                }
            }
        );
    },
    render: function() {
        var _this = this;
        this.$el.empty();
        this.listContainer = $('<div class="small-12 columns"/>');
        this.listBlock = $('<ul class="medium-block-grid-3 small-block-grid-1"/>');
        this.$el.append($('<div class="row queue-header text-center"><h4>TAs On Duty</h4></div>'));
        this.listContainer.append(this.listBlock);
        this.$el.append(this.listContainer);

        if (this.collection.recent_meta.is_ta) {
            var addHoursDiv = _.template( $('#addOfficeHourTemplate').html() )();
            this.listBlock.append(addHoursDiv);
            var clockInBtn = $(addHoursDiv).find('#clockInBtn');
            
            $('#dtPick').pickatime({
                editable: false,
                min: _this.computeNow(),
                clear: false,
                interval: 15,
                onOpen: function() {
                    this.set('min', _this.computeNow());
                }
            });

            $('#dtPick').pickatime('picker').set('select', _this.computeNow());

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
