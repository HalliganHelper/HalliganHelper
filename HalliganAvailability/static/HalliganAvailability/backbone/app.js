var app = typeof app !== "undefined" ? app : {};


Backbone.View.prototype.showWaiting = function() {
    var loading = $('<div class="loading"/>');
    var loading = $('<div class="spinner"/>');
    for(var i = 1; i < 6; i++) {
        var innerDiv = $('<div class="rect' + i + '"/>');
        $(loading).append(innerDiv);
    }

    this.$el.append(loading);
};
