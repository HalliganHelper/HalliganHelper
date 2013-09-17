
function drawCharts(){
    $.get('/api/serverInfo?NumDataPoints=10', function(data){
        for (server in data) {
            var ChartData = [];
            ChartData.push(['Time', 'Number of Users'])

            for (update in data[server]){
                var date = data[server][update].fields.Updated;
                var year = date.slice(0,4);
                var month = date.slice(5,7);
                var day = date.slice(8,10);
                var hour = date.slice(11,13);
                var minute = date.slice(14,16);
                var second = date.slice(17,19);
                var milli = date.slice(20,23);

                date = new Date(year, month, day, hour, minute, second, milli);
                var numUsers = data[server][update].fields.NumUsers;
                ChartData.push([date.toTimeString().slice(0,5), numUsers])
            }
            ChartData = google.visualization.arrayToDataTable(ChartData);
            var options = {
                title: server,
                titleTextStyle: {fontSize: 18, bold: true},
                legend: {position: 'none'},
                vAxis: {title: 'Number of Users'},
                width: 800,
                height: 500
            };

            //2013-09-17T05:40:31.515

            var chart = new google.visualization.LineChart(document.getElementById('ChartFor' + server));
            chart.draw(ChartData, options);
        }
        /*
        for (server in data){
            for (update in server){
                ChartData.push([''])
            }
        }
        */

    });
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCharts);