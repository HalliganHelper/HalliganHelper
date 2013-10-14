var plots = [];

function LabUseGraph(lab){
    $.get('/api/getRoomInfo', {'lab': lab}, function(data){
        var inUse = [];
        console.log( lab + "LENGTH: " + data.length);
        if (data.length < 1){
            return;
        }
        for(var i in data){
            var time = py2jsDate(data[i].fields.updateTime);
            inUse.push([time, data[i].fields.numReporting]);
        }
        //console.log(inUse);
        var plot = $('#' + lab + '_graph').jqplot([inUse],
            {
                title: 'Use Over Time',
                seriesDefaults: {
                    showMarker: false,
                    pointLabels: {show: true }
                },
                axesDefaults: {
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.DateAxisRenderer,
                        tickOptions: {formatString: '%m/%d %H:%M', angle: -30},
                        min: 'October 8, 2013',
                        tickInterval: '1 week'
                    },
                    yaxis: {
                        label: "Computers On",
                        tickoptions: {formatString: '%d'},
                        pad: 0,
                        min: 0
                    }
                },
                cursor: {
                    show: true,
                    zoom: true,
                    showTooltip: false
                },
                series: [
                    {
                        lineWidth: 2,
                        markerOptions: {style: 'diamond'}
                    }
                ]
            }
        );
        plots.push(plot);
        //console.log(plot);

    });

}
$(document).ready(function(){
    $('#tabs').on('gumby.onChange', function(e, index){
        console.log(plots);
        for(p in plots){
            $.jqplot(plots[p]).replot();
        }
    });
});
