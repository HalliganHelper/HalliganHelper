function CreateGraph(where, room) {
    var FirstTime = 'March 23, 2014'; 
    var ajaxDataRenderer = function(url, plot, options) {
        var ret = null;
        $.ajax({
            async: false,
            url: url,
            dataType:"json",
            success: function(data) {
                ret = data.objects;
                plot._next = data.meta.next;
                plot._prev = data.meta.previous;
            }
        });

        var c11 = [], c15 = [], c40 = [], c20 = [], c23 = [],
            c105 = [], other=[];

        FirstTime = (new Date(ret[0].updateTime)).toString();
        for (var i in ret) {
            var obj = ret[i];
            var t = (new Date(obj.updateTime)).toString();
            var appended = [false, false, false, false, false, false, false];
            for (var indx in obj.cuis) {
                var cui = obj.cuis[indx];
                switch (cui.course) {
                    case 'comp11':
                        c11.push([t, cui.num_machines]);
                        appended[0] = true;
                        break;
                    case 'comp15':
                        c15.push([t, cui.num_machines]);
                        appended[1] = true;
                        break;
                    case 'comp40':
                        c40.push([t, cui.num_machines]);
                        appended[2] = true;
                        break;
                    case 'comp20':
                        c20.push([t, cui.num_machines]);
                        appended[3] = true;
                        break;
                    case 'comp23':
                        c23.push([t, cui.num_machines]);
                        appended[4] = true;
                        break;
                    case 'comp105':
                        c105.push([t, cui.num_machines]);
                        appended[5] = true;
                        break;
                    case 'Other':
                        other.push([t, cui.num_machines]);
                        appended[6] = true;
                        break;
                }
            }
            for (var v in appended) {

                if (v == 0) {
                    if (!appended[v])
                        c11.push([t, 0]);
                } else if (v == 1) {
                    if (!appended[v])
                        c15.push([t, 0]);
                } else if (v == 2) {
                    if (!appended[v])
                        c40.push([t, 0]);
                } else if (v == 3) {
                    if (!appended[v])
                        c20.push([t, 0]);
                } else if (v == 4) {
                    if (!appended[v])
                        c23.push([t, 0]);
                } else if (v == 5) {
                    if (!appended[v])
                        c105.push([t, 0]);
                } else if (v == 6) {
                    if (!appended[v])
                        other.push([t, 0]);
                }
            }
        }
        vals = [c11, c15, c40, c20, c23, c105, other];
        vals.map(function(val){ return val.reverse() });

        return vals;
    };

    var jsonurl = "/api/v2/roominfo/?format=json&lab=lab" + room;

    var plot = $.jqplot(where, jsonurl, {
        title: "Use over time: " + room,
        dataRenderer: ajaxDataRenderer,
        dataRendererOptions: {
            unusedOptionalUrl: jsonurl
        },
        stackSeries: true,
        seriesDefaults: {
            fill: true
        },
        series: [
            {label: 'Comp 11'},
            {label: 'Comp 15'},
            {label: 'Comp 40'},
            {label: 'Comp 20'},
            {label: 'Comp 23'},
            {label: 'Comp 105'},
            {label: 'Other'}
        ],
        legend: {
            show: true,
            renderer: $.jqplot.EnhancedLegendRenderer,
            rendererOptions: {
                numberRows: 1
            },
            location: 's',
            placement: 'outsideGrid'
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    formatString: "%m/%d/%y %H:%M",
                    angle: -45,
                    fontSize: '10pt'   
                },
                tickInterval: '1 hour'
            },
        
            yaxis: {
                min: 0
            }
        }

    });
//    $('#GraphContainer').append(plot);
}


$(function(){
/* Gumby tab onchange event */
    $('#tabs').on('gumby.onChange', function(e, index) {
        if (index == 5) {
            $('#116Graph').empty();
            $('#118Graph').empty();
            $('#120Graph').empty();
            $('#graph_spinner').show();
            setTimeout(function(){
                CreateGraph('116Graph', 116);
                CreateGraph('118Graph', 118);
                CreateGraph('120Graph', 120);
                $('#graph_spinner').hide();
            }, 30);
        }
    });

});

