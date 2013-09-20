/**
 * Created with PyCharm.
 * User: tyler
 * Date: 9/19/13
 * Time: 12:58 AM
 * To change this template use File | Settings | File Templates.
 */

function ListServers() {
    $.get('/api/ServerList', function(data) {
        var DataDiv = $('#ServerContainer');

        var table = $('<table></table>').addClass('striped rounded');

        var head = $('<thead></thead>');
        var row = $('<tr></tr>');
        $(row).append($('<td></td>').text('Server'));
        $(row).append($('<td></td>').text('Users'));
        $(row).append($('<td></td>').text('Last Updated'));

        $(head).append(row);
        var body = $('<tbody></tbody>');
        for (item in data) {
            server = data[item];
            row = $('<tr></tr>');
            $(row).append($('<td></td>').text(server.ComputerName));
            $(row).append($('<td></td>').text(server.NumUsers));
            $(row).append($('<td></td>').text(server.LastUpdated));

            $(body).append(row);
        }

        $(table).append(head);
        $(table).append(body);

        $(DataDiv).append(table);

    })
}

$(document).ready(ListServers)