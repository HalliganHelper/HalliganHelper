var $ = require('jquery');
require('jquery.cookie');

var Utils = {
    ajaxSetup: function() {
       var csrftoken = $.cookie('csrftoken'); 

        function csrfSafeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
    }
};

module.exports = Utils;
