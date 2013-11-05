var plots = [];

function LabUseGraph(lab){
    $.get('/api/getRoomInfo', {'lab': lab}, function(data){
        var inUse = [];
        if (data.length < 1){
            return;
        }
        for(var i in data){
            var time = py2jsDate(data[i].fields.updateTime);
            /* TODO this is a total horseshit way of doing timezones */
            var hr = time.getHours();
            time.setHours(hr - 4);
            /* TODO end of horseshit */
            inUse.push([time, data[i].fields.numReporting]);
        }
        var plot = $.jqplot(lab + '_graph', [inUse],
            {
                title: 'Use Over Time',
                height: 300,
                width: 400,
                seriesDefaults: {
                    showMarker: false,
                    pointLabels: {show: false }
                },
                axesDefaults: {
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.DateAxisRenderer,
                        tickOptions: {formatString: '%m/%d %I:%M %p', angle: -30},
                        min: 'October 15, 2013',
                        tickInterval: '3 days'
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
        plots.push([plot, lab]);
    });

}


$(document).ready(function(){
    $('#tabs').on('gumby.onChange', function(e, index){
        for(p in plots){
            try {
                $('#' + plots[p][1] + '_graph').height($('#' + plots[p][1] + '_graph_wrapper').height() * 0.96);
                $('#' + plots[p][1] + '_graph').width($('#' + plots[p][1] + '_graph_wrapper').width() * 0.96);
                plots[p][0]._width = $('#' + plots[p][1] + '_graph').width();
                plots[p][0]._height = $('#' + plots[p][1] + '_graph').height();
                plots[p][0].replot();
            } catch(e) {

                $('#' + plots[p][1] + '_graph').empty().text('Something Went Wrong')

            }

        }
    });
});

