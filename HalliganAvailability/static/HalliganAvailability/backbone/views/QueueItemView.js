app = typeof app !== "undefined" ? app : {};

app.queueItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'queueItemView',
    template: _.template( $('#queueTemplate').html() ),
    editTemplate: _.template( $('#queueEditTemplate').html() ),
    events: {},
    initialize: function() {
        this.model.on('change', this.render, this);
        this.events['click .cancel-button'] = this.cancel;
        this.events['click .resolve-button'] = this.resolve;
        this.events['click .checkout-button'] = this.checkout;
        this.events['click .edit-button'] = this.renderEdit;
        this.events['click .undo-button'] = this.render;
        this.events['click .save-button'] = this.update;
        this.events['keyup #whereLocated'] = this.enterKeyUpdate;
        this.events['keyup #question'] = this.enterKeyUpdate;
        this.delegateEvents(this.events);
    },
    render: function() {
        if (this.model.get('cancelled') || this.model.get('solved') ) {
            var _this = this;
            this.$el.fadeOut(1000, function() {
                _this.model.trigger('destroy', this.model);
            });
        } else {
            this.$el.html( this.template( this.model.toJSON() ) );
        }
        return this;
    },
    renderEdit: function() {
        this.$el.html( this.editTemplate( this.model.toJSON() ) );
    },
    updateAndRemove: function(ev, type) {
        var _this = this,
            updates = {};

        updates[type] = true;
        
        this.model.save(updates, {patch: true,
            success: function() {
                console.log('SAVED');
                _this.model.collection.remove(_this.model);
                app.currentView.hideEmptyDivIfNecessary();
            },
            error: function(model, response, options) {
                console.log("UPDATE FAILED");
                console.log(model, response, options);
            }
        });

    },
    checkout: function(ev) {
        this.model.save({'checked_out': true}, {patch: true,
            success: function() {
            },
            error: function() {
            }
        });
    },
    resolve: function(ev) {
        this.updateAndRemove(ev, 'solved'); 
    },
    cancel: function(ev) {
        this.updateAndRemove(ev, 'cancelled');
    },
    enterKeyUpdate: function(ev) {
        if ( ev.which === 13 ) {
            this.update();
        }
    },
    update: function(ev) {
        var whereLocated = this.$el.find('#whereLocated'),
            question = this.$el.find('#question'),
            updates = {
                'whereLocated': whereLocated.val(),
                'question': question.val()
            },
            _this = this;

        this.model.save(updates, {patch: true,
            success: function() {
                _this.render(); 
            },
            error: function(model, response, options) {
                console.log(model);
                var responseJSON = response.responseJSON;
                if ( Boolean( responseJSON.request.question ) ) {
                    $(question).parent().addClass('error');
                    console.log( responseJSON.request.question );
                }
                if ( Boolean( responseJSON.request.whereLocated ) ) {
                    $(whereLocated).parent().addClass('error');
                    console.log( responseJSON.request.whereLocated );
                }
            },
            silent: true,
            wait: true
        });
    }
});
