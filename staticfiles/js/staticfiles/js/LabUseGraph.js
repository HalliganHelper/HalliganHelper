function LabUseGraph(lab){
    $.get('/api/getRoomInfo', {'lab': lab}, function(data){
        var inUse = [];
        console.log(data);
        if (data.length < 1){
            return;
        }
        for(var i in data){
            var time = py2jsDate(data[i].fields.updateTime);
            inUse.push([time, data[i].fields.numReporting]);
        }

        var plot = $.jqplot(lab + '_graph', [inUse],
            {
                title: 'Use Over Time',
                seriesDefaults: {
                  showMarker: false,
                  pointLabels: {show: true }
                },
                axesDefaults: {
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                },
                axes: {
                  xaxis: {
                      renderer: $.jqplot.DateAxisRenderer,
                      tickOptions: {formatString: '%b %#d, %y'},
                      min: 'October 1, 2013',
                      tickInterval: '1 day'
                  },
                  yaxis: {
                      label: "Computers On",
                      pad: 0
                  }
                },
                series: [
                    {
                        lineWidth: 2,
                        markerOptions: {style: 'diamond'}
                    }
                ]
            }
        );

    });
}
