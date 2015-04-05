app = typeof app !== "undefined" ? app : {};

app.queueItemsView = Backbone.View.extend({
    el: '#content',
    events: {},
    initialize: function(prevModels, options) {
        this.courseNum = options.courseNum;
        this.courseUrl = options.courseUrl;
        this.collection = new app.queueItems([], options.courseNum);
        app.fetchXhr = this.collection.fetch({reset: true});

        this.listenTo(this.collection, 'add', this.renderQueueItem);
        this.listenTo(this.collection, 'reset', this.render);
        this.events["click #makeRequestButton"] = this.makeRequest;
        this.events["keyup #location"] = this.enterPressed;
        this.events["keyup #problem"] = this.enterPressed;
        this.delegateEvents(this.events);
    },
    template: _.template( $('#queueItemHeaderTemplate').html() ),
    render: function() {
        this.$el.append( this.template({'courseNum': this.courseNum}) );
        this.$el.append( _.template( $('#emptyListTemplate').html() )() );    
        this.hideEmptyDivIfNecessary();
        this.$el.append( _.template( $('#makeRequestTemplate').html() )() );    
        var taDiv = $('<div/>');
        this.$el.find('#get-help').after(taDiv);
        app.ohView = new app.OfficeHoursView([], {'courseNum': this.courseNum, 'el': taDiv});
        this.collection.each(function(item) {
            this.renderQueueItem( item );
        }, this);
    },
    hideEmptyDivIfNecessary: function() {
        console.log('HIDING?');
        var emptyDiv = this.$el.find('#emptyList');

        if (this.collection.length !== 0) {
            console.log('HIDING');
            emptyDiv.addClass('hide');
        } else {
            console.log('SHOWING');
            emptyDiv.removeClass('hide');
        }
    },
    kill: function() {
        this.events["click #makeRequestButton"] = undefined;
        this.events["keyup #location"] = undefined;
        this.events["keyup #problem"] = undefined;

        this.delegateEvents(this.events);
    },
    renderQueueItem: function( item ) {
        var queueItemView = new app.queueItemView({
            model: item
        });
        this.$el.find('#get-help').before( queueItemView.render().el );
    },
    makeRequest: function(ev) {
        if (Notification.permission != 'granted') {
            Notification.requestPermission();
        }

        var locationField = this.$el.find('#location'),
            problemField = $('#problem'),
            whereLocated = locationField.val(),
            problem = problemField.val(),
            $requestButton = $($('#makeRequestButton')[0]),
            $questionField = $('#questionField'),
            $locationField = $('#locationField'),
            _this = this;
        
        $requestButton.prop('disabled', true);
        $questionField.removeClass('error');
        $locationField.removeClass('error');

        console.log('MAKING REQUEST');

        var newRequest = new app.QueueItem({
            'question': problem,
            'whereLocated': whereLocated,
            'course': this.courseNum,
        });

        newRequest.save({}, {
            success: function requestSuccess(){
                locationField.val(''); 
                problemField.val('');
                $requestButton.prop('disabled', false);
                _this.collection.add(newRequest);
            },
            error: function requestFail(model, response, options){
                console.log('ERROR');
                errors = response.responseJSON.request;
                if ('question' in errors) {
                    $questionField.addClass('error');
                }
                if ('whereLocated' in errors) {
                    $locationField.addClass('error');
                }
                $requestButton.prop('disabled', false);
            }
        });
        
     },
    enterPressed: function(e) {
        if(e.which == 13) {
            this.makeRequest();
        }
    },
    removeContainerDiv: function(objectId) {
        var _this = this;
        var theObject = this.collection.get(objectId);
        if (Boolean(theObject)) {
            this.collection.remove(theObject);
            var theDiv = $('div').find("[data-main-object-id='" + objectId + "']");
            theDiv.fadeOut(300, function() { 
                $(this).remove(); 
                if( _this.collection.length === 0) {
                    _this.$el.find('#emptyList').removeClass('hide');
                }
            });
        }
    }
});
