function LabUseGraph(lab){
    console.log('LABUSEGRAPH')
    //google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);
    function drawChart(){
        console.log('DRAW CHART')

        $.getJSON('/api/getRoomInfo', {'lab': lab}, function(data){

            var graphInfo = []
            graphInfo.push(['Time', 'In Use', 'Average CPU']);
            for(var i in data){
                var item = [
                    i.fields.updateTime,
                    i.fields.numReporting,
                    i.fields.avgCpu
                ];

                graphInfo.push(item);
            }

            console.log(i);

            var options = {
                title: "Use over time for " + lab
            };

            var chart = new google.visualization.LineChart(document.getElementById(lab + '_graph'));
            chart.draw(graphInfo, options);
        });
    }
}