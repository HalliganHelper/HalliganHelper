app = typeof app !== "undefined" ? app : {};

app.queueItemsView = Backbone.View.extend({
    events: {
        'click #makeRequestButton': 'makeRequest',
        'keyup #location': 'enterPressed',
        'keyup #problem': 'enterPressed'
    },
    initListeners: function() {
        this.listenTo(this.collection, 'add', this.renderQueueItem);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.hideEmptyDivIfNecessary);
    },
    initialize: function(options) {
        this.course = options.course;
        this.collection = new app.Requests([], {
            'coursePk': this.course.get('id')
        });
        this.initListeners();
        app.fetchXhr = this.collection.fetch({reset: true});
    },
    render: function() {
        this.$el.append( _.template( $('#emptyListTemplate').html() )() );    
        this.hideEmptyDivIfNecessary();
        this.$el.append( _.template( $('#makeRequestTemplate').html() )() );    
        this.collection.each(function(item) {
            this.renderQueueItem( item );
        }, this);
    },
    hideEmptyDivIfNecessary: function() {
        var emptyDiv = this.$('#emptyList');
        if (this.collection.length !== 0) {
            emptyDiv.addClass('hide');
        } else {
            emptyDiv.removeClass('hide');
        }
    },
    kill: function() {
        this.undelegateEvents();
    },
    renderQueueItem: function( item ) {
        var queueItemView = new app.queueItemView({
            model: item
        });
        this.$('#get-help').before( queueItemView.render().el );
        this.hideEmptyDivIfNecessary();
    },
    makeRequest: function(ev) {
        if (Notification.permission != 'granted') {
            Notification.requestPermission();
        }

        var locationField = this.$('#location'),
            problemField = $('#problem'),
            where_located = locationField.val(),
            problem = problemField.val(),
            $requestButton = $($('#makeRequestButton')[0]),
            $questionField = $('#questionField'),
            $locationField = $('#locationField'),
            _this = this;
        
        $requestButton.prop('disabled', true);
        $questionField.removeClass('error');
        $locationField.removeClass('error');
        $questionField.find('small').addClass('hide');
        $locationField.find('small').addClass('hide');

        var newRequest = new app.Request({
            'question': problem,
            'where_located': where_located,
            'course': this.course.get('resource_uri')
        });

        newRequest.save({}, {
            success: function requestSuccess(){
                locationField.val(''); 
                problemField.val('');
                $questionField.find('small').addClass('hide');
                $locationField.find('small').addClass('hide');
                $requestButton.prop('disabled', false);
                _this.collection.add(newRequest);
            },
            error: function requestFail(model, response, options){
                console.log('ERROR');
                if ( ! Boolean( response.responseJSON ) || ! Boolean ( response.responseJSON.request )) {
                    return;
                }
                if ( Boolean( response.responseJSON.request.question ) ) {
                    $questionField.addClass('error');
                    $questionField.find('small').removeClass('hide');
                    $questionField.find('small').html( response.responseJSON.request.question );
                }
                if ( Boolean( response.responseJSON.request.where_located ) ) {
                    $locationField.addClass('error');
                    $locationField.find('small').removeClass('hide');
                    $locationField.find('small').html( response.responseJSON.request.where_located );
                }
                $requestButton.prop('disabled', false);
            }
        });
     },
    enterPressed: function(e) {
        if(e.which == 13) {
            this.makeRequest();
        }
    }
});
