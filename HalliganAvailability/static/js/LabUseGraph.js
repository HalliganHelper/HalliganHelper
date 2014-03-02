function CreateGraph(where, room) {
    var ticks = [];
    
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
        for (var i in ret) {
            var obj = ret[i];
            ticks.push([i, obj.updateTime]);
            var appended = [false, false, false, false, false, false, false];
            for (var indx in obj.cuis) {
                var cui = obj.cuis[indx];
                switch (cui.course) {
                    case 'comp11':
                        c11.push(cui.num_machines);
                        appended[0] = true;
                        break;
                    case 'comp15':
                        c15.push(cui.num_machines);
                        appended[1] = true;
                        break;
                    case 'comp40':
                        c40.push(cui.num_machines);
                        appended[2] = true;
                        break;
                    case 'comp20':
                        c20.push(cui.num_machines);
                        appended[3] = true;
                        break;
                    case 'comp23':
                        c23.push(cui.num_machines);
                        appended[4] = true;
                        break;
                    case 'comp105':
                        c105.push(cui.num_machines);
                        appended[5] = true;
                        break;
                    case 'Other':
                        other.push(cui.num_machines);
                        appended[6] = true;
                        break;
                }
            }
            for (var v in appended) {

                if (v == 0) {
                    if (!appended[v])
                        c11.push(0);
                } else if (v == 1) {
                    if (!appended[v])
                        c15.push(0);
                } else if (v == 2) {
                    if (!appended[v])
                        c40.push(0);
                } else if (v == 3) {
                    if (!appended[v])
                        c20.push(0);
                } else if (v == 4) {
                    if (!appended[v])
                        c23.push(0);
                } else if (v == 5) {
                    if (!appended[v])
                        c105.push(0);
                } else if (v == 6) {
                    if (!appended[v])
                        other.push(0);
                }
            }
        }
        return [c11, c15, c40, c20, c23, c105, other];
    };

    var jsonurl = "/api/v2/roominfo/?format=json&room=lab" + room;

    var plot = $.jqplot(where, jsonurl, {
        title: "Use over time: " + room,
        dataRenderer: ajaxDataRenderer,
        dataRendererOptions: {
            unusedOptionalUrl: jsonurl
        },
        stackSeries: true,
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
            location: 'e',
            placement: 'outside'
        },
        axes: {
       /*     xaxis: {
                ticks: ticks
            }
        */
        }

    });
//    $('#GraphContainer').append(plot);
}


$(document).ready(function(){
/* Gumby tab onchange event */
    $('#tabs').on('gumby.onChange', function(e, index) {
        if (index == 5) {
            CreateGraph('GraphContainer', 116);
        }
    });

});

