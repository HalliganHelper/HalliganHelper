
function drawCharts(){
    $.get('/api/serverInfo', function(data){
        var ChartData = [];
        ChartData.push(['Time', 'Number of Users'])

        for (update in data['homework']){
            ChartData.push([update.fields.Updated, update.fields.NumUsers])
        }
        console.log(ChartData)
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