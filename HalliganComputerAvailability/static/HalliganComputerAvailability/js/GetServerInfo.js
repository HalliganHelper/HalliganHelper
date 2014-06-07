var listServersInterval = null;

function ListServers() {
    $.get('/api/v2/server/', {format: 'json'}, function(data) {
        var dataDiv = $('#ServerContainer'),
            table = $('<table/>').addClass('striped rounded'),
            head = $('<thead/>'),
            body = $('<tbody/>'),
            servers = data.objects,
            numServers = servers.length,
            lastTD = $('<td/>').text('Last Updated'),
            refreshButton = $('<i/>').addClass('icon-arrows-ccw'),
            updateTime = new Date(),
            refreshText = $('<span/>'),
            refreshLink = $('<a href="#"/>'),
            row = $('<tr/>');

        var msg = 'Updates are received from computers every 15 minutes. <br/>';
        msg += 'This table will refresh automatically in 15 minutes. <br/>';
        msg += 'This table was last refreshed at ' + updateTime.toLocaleTimeString();

        
        $(refreshText).html(msg);
        $(refreshLink).append(refreshButton)
                      .append(refreshText)
                      .addClass('Refresh hasTooltip');

        $(refreshLink).click(function() {
            ListServers();
        });

        $(lastTD).append(refreshLink);
        $(row).append($('<td/>').text('Server'))
              .append($('<td/>').text('Users'))
              .append($(lastTD));

        $(head).append(row);

        for(var i = 0; i < numServers; i++) {
            var server = servers[i],
                row = $('<tr/>'),
                update = new Date(server.last_updated);
            
            $(row).append($('<td/>').text(server.name));
            $(row).append($('<td/>').text(server.num_users));
            $(row).append($('<td/>').text(formatDate(update)));
            $(body).append(row);
        }

        $(table).append(head).append(body);

        $(dataDiv).empty().append(table);

    });

    clearInterval(listServersInterval);
    ListServersInterval = setInterval(ListServers, 90000);
}

$(function() {
    ListServers();
});
