app = typeof app !== "undefined" ? app : {};

app.queueItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'queueItemView',
    template: _.template( $('#queueTemplate').html() ),
    editTemplate: _.template( $('#queueEditTemplate').html() ),
    events: {
        'click .cancel-button': 'cancel',
        'click .resolve-button': 'resolve',
        'click .checkout-button': 'checkout',
        'click .edit-button': 'renderEdit',
        'click .undo-button': 'render',
        'click .save-button': 'update',
        'keyup #whereLocated': 'enterKeyUpdate',
        'keyup #question': 'enterKeyUpdate',
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'remove', this.removeFromPage);
    },
    removeFromPage: function() {
        var _this = this;
        this.$el.fadeOut(1000, function() {
            _this.model.trigger('destroy', this.model);
        });
    },
    render: function() {
        if (this.model.get('cancelled') || this.model.get('solved') ) {
            this.removeFromPage();
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
                _this.model.collection.remove(_this.model);
                app.currentView.hideEmptyDivIfNecessary();
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
                'where_located': whereLocated.val(),
                'question': question.val()
            },
            _this = this;

        this.model.save(updates, {patch: true,
            success: function() {
                _this.render(); 
            },
            error: function(model, response, options) {
                var responseJSON = response.responseJSON;
                if ( Boolean( responseJSON.request.question ) ) {
                    $(question).parent().addClass('error');
                    var questionError = $(question).parent().next();
                    $(questionError).html(responseJSON.request.question);
                    $(questionError).removeClass('hide');
                }
                if ( Boolean( responseJSON.request.where_located ) ) {
                    $(whereLocated).parent().addClass('error');
                    var locationError = $(whereLocated).parent().next();
                    $(locationError).html(responseJSON.request.question);
                    $(locationError).removeClass('hide');
                }
            },
            silent: true,
            wait: true
        });
    }
});
