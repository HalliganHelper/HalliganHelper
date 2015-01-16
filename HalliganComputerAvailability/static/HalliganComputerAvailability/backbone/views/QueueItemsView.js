app = typeof app !== "undefined" ? app : {};

app.queueItemsView = Backbone.View.extend({
    el: '#content',
    events: {},
    initialize: function(prevModels, options) {
        this.courseNum = options.courseNum;
        this.collection = new app.queueItems([], options.courseNum);
        app.fetchXhr = this.collection.fetch({reset: true});

        this.listenTo(this.collection, 'add', this.renderQueueItem);
        this.listenTo(this.collection, 'reset', this.render);
        this.events["click #makeRequestButton"] = this.makeRequest;
        this.events["click .cancel-button"] = this.cancelRequest;
        this.events["click .edit-button"] = this.editRequest;
        this.events["click .resolve-button"] = this.resolveRequest;
        this.events["click .checkout-button"] = this.checkout;
        this.events["keyup #location"] = this.enterPressed;
        this.events["keyup #problem"] = this.enterPressed;
        this.delegateEvents(this.events);
    },
    template: _.template( $('#queueItemHeaderTemplate').html() ),
    render: function() {
        this.$el.append( $('<div class="row queue-course-header text-center"><div class="small-12"><h3> Comp ' + this.courseNum + ' Queue</h3></div></div>') );
        this.$el.append( this.template() );
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
        if (this.collection.length !== 0) {
            this.$el.find('#emptyList').addClass('hide');
        }
    },
    kill: function() {
        this.events["click #makeRequestButton"] = undefined;
        this.events["click .cancel-button"] = undefined;
        this.events["click .edit-button"] = undefined;
        this.events["click .resolve-button"] = undefined;
        this.events["click .checkout-button"] = undefined;
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
    makeRequest: function() {
        if (Notification.permission != 'granted') {
            Notification.requestPermission();
        }

        var locationField = $('#location'),
            problemField = $('#problem'),
            whereLocated = locationField.val(),
            problem = problemField.val(),
            $requestButton = $($('#makeRequestButton')[0]),
            $questionField = $('#questionField'),
            $locationField = $('#locationField');
        
        $requestButton.prop('disabled', true);
        $questionField.removeClass('error');
        $locationField.removeClass('error');

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
            },
            error: function requestFail(model, response, options){
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
    checkout: function(ev) {
        var objectId = $(ev.currentTarget).data('object-id'),
            currentObject = app.currentView.collection.get(objectId);

        currentObject.save({'checked_out': true}, {patch: true,
            success: function () {
                console.log('worked!');
            },
            error: function (model, response, options) {
                console.log('failed!', response, options); 
            }
        });
    },
    updateAndRemove: function(ev, type) {
        var _this = this,
            currentCollection = app.currentView.collection,
            objectId = $(ev.currentTarget).data('object-id'),
            currentObject = currentCollection.get(objectId),
            updates = {};

        updates[type] = true;
        
        currentObject.save(updates, {patch: true,
            success: function() {
               _this.removeContainerDiv(objectId);
            },
            error: function(model, response, options) {
            
            }
        });
    },
    cancelRequest: function(ev) {
        this.updateAndRemove(ev, 'cancelled');
    },
    resolveRequest: function(ev) {
        this.updateAndRemove(ev, 'solved'); 
    },
    enterPressed: function(e) {
        if(e.which == 13) {
            this.makeRequest();
        }
    },
    editRequest: function(ev) {
        var _this = this,
            target = $(ev.currentTarget),
            objectId = $(target).data('object-id'),
            loc = $('div').find(".queue-location[data-object-id='" + objectId + "']"),
            oldLoc = _this.collection.get(objectId).get('whereLocated'),
            ques = $('div').find(".queue-problem[data-object-id='" + objectId + "']"),
            oldQues = this.collection.get(objectId).get('question'),
            resolveBlock = $('div').find(".queue-resolve[data-object-id='" + objectId + "']"),
            oldResolveHtml = resolveBlock.html();

        loc.html('<input type="text" id="newLocation" data-object-id="' + objectId + '" value="' + oldLoc + '"/>');
        ques.html('<input type="text" id="newProblem" data-object-id="' + objectId + '" value="' + oldQues + '"/>');

        var saveEditsButton = $('<div class="tiny primary button save-edits" data-object-id="' + objectId + '"> Save </div>');
        var undoEditsButton = $('<div class="tiny secondary button undo-edits" data-object-id="' + objectId + '"> Undo </div>');
        undoEditsButton.click(function undoEdits() {
            loc.html('<span class="show-for-small-only">Location: </span>' + oldLoc);
            ques.html('<span class="show-for-small-only">Question: </span>' + oldQues);
            resolveBlock.html(oldResolveHtml);
        });
        
        saveEditsButton.click(function saveEdits() {
            var newLocation = loc.children().val(),
                newQuestion = ques.children().val(),
                modelInstance = _this.collection.get(objectId);

            modelInstance.set({'whereLocated': newLocation, 'question': newQuestion});
            modelInstance.trigger('change');
            modelInstance.save({'whereLocated': newLocation, 'question': newQuestion}, {patch: true,
                success: function() {
                
                },
                error: function(model, response, options) {
                
                }
            });
            resolveBlock.html(oldResolveHtml);
        });
        
        resolveBlock.empty();
        resolveBlock.append(undoEditsButton);
        resolveBlock.append(saveEditsButton);
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
