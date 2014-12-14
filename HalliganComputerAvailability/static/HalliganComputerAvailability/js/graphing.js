//TODO: LOOK UP BRUSHING
$(function(){
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    /*{{{*/
    /* Set up axes and scales */
    var parseDate = d3.time.format.iso.parse,
    bisectDate = d3.bisector(function(d) { 
        console.log(d);
        if (Boolean(d.whenAsked)) return d.whenAsked;
        if (Boolean(d.last_updated)) return d.last_updated;
    }).left;

    var x = d3.time.scale()
        .range([0, width]);
    //.tickFormat("%I:%M");
    //.ticks(d3.time.minutes, 15);

    var yOne = d3.scale.linear().range([height, 0]);
    var yTwo = d3.scale.linear().range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(d3.time.days, 1)
        .tickFormat(d3.time.format('%c'))
        .orient("bottom");

    var yAxisLeft = d3.svg.axis()
        .scale(yOne)
        .orient("left");

    var yAxisRight = d3.svg.axis()
        .scale(yTwo)
        .orient("right");

    var lineOne = d3.svg.line()
        .x(function(d) { return x(d.last_updated); })
        .y(function(d) { return yOne(d.num_course_machines); }); //TODO: Graph course usage

    var lineTwo = d3.svg.line()
        .x(function(d) { return x(d.whenAsked); })
        .y(function(d) { return yTwo(d.num_reporting); }); //TODO: Graph course usage
    /*}}}*/

    /* Create the SVG for the chart */
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var focus = svg.append("g")
        .style("display", "none"); 

    d3.json('/api/v2/roominfo/?order_by=-last_updated&lab=lab118&limit=100').get(function(err, roominfo) {

        roominfo = roominfo.objects;
        roominfo.reverse();

        /* Clean up the roominfo roominfo */
        roominfo.forEach(function(d) {
            d.last_updated = parseDate(d.last_updated); //TODO: Look here
            d.num_course_machines = 0;
            for(var i=0; i < d.cuis.length; i++) {
                if(d.cuis[i].course == 'comp11') {
                    d.num_course_machines += d.cuis[i].num_machines;
                }
            }

            delete d.cuis; //TODO: Check this
            
            d.num_course_machines = +d.num_course_machines;
            d.num_reporting = +d.num_reporting;
        });

        d3.json('/api/v2/request/?order_by=-whenAsked&course__Number=11&limit=500').get(function(err, requests) {
            requests = requests.objects;
            requests.reverse();
            //console.log("REQUESTS")
            //console.log(requests);
            var buckets = {};
            requests.forEach(function(d) {
                delete d.course.tas;
                d.whenAsked = parseDate(d.whenAsked);
                //d.num_reporting = Math.floor(Math.random()*11);
                var moddedTime = roundDown(d.whenAsked).getTime();
                //console.log(moddedTime);
                //if (! (moddedTime in buckets)) {
                //if (buckets[moddedTime] == undefined) {
                if (buckets[moddedTime] == undefined) {
                    console.log("==============================NOT FOUND==============================");
                    buckets[moddedTime] = 0;
                    if (buckets[moddedTime] == undefined) {
                        console.log("What the actual fuck");
                    }
                }
                buckets[moddedTime] = buckets[moddedTime] + 1;
                console.log(buckets[moddedTime]);
                console.log(buckets);
            });

            var realRequests = [];
            for(var time in buckets) {
                var obj = {};
                //console.log(time);
                //console.log(typeof time);
                obj.whenAsked = new Date(parseInt(time));
                obj.num_reporting = buckets[time];
                realRequests.push(obj);
            }

            //console.log(realRequests);

              
            buildGraph(roominfo, realRequests);
        });
    });

    function roundDown(time) {
        console.log("OLD: " + time);
        var minutes = time.getMinutes();
        var hours = time.getHours();
        var m = (((minutes + 7.5)/15 | 0) * 15) % 60;
        var h = ((((minutes/105) + .5) | 0) + hours) % 24;

        time.setMinutes(m);
        time.setHours(h);
        time.setSeconds(0);
        time.setMilliseconds(0);
        console.log("NEW: " + time);
        console.log('---------------------------------------');

        
        return time;
    }

    function buildGraph(dataOne, dataTwo) {
        /*
        console.log("ROOMS");
        console.log(dataOne);
        console.log("REQUESTS");
        console.log(dataTwo);
        */
        var minDate = Math.min(d3.min(dataOne, function(d) { return d.last_updated; }),
                d3.min(dataTwo, function(d) { return d.whenAsked; }));
        console.log("Min date: " + new Date(minDate));
        var maxDate = Math.max(d3.max(dataOne, function(d) { return d.last_updated; }),
                d3.max(dataTwo, function(d) { return d.whenAsked; }));
        console.log("Max date: " + new Date(maxDate));

        x.domain([minDate, maxDate]);

        yOne.domain([0, d3.max(dataOne, function(d) { return d.num_course_machines; })]);
        yTwo.domain([0, d3.max(dataTwo, function(d) { return d.num_reporting; })]);

        svg.append("path")      // Add the valueline path.
            .data(dataOne)
            .attr("class", "line")
            .attr("d", lineOne(dataOne))
            .on('mouseover', function(d) {
                console.log("Number of machines: " + d.num_course_machines);
                /* Doesn't seem to work right now... */
            });

        svg.append("path")      // Add the valueline2 path.
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", lineTwo(dataTwo))
            .data(dataTwo)
            .on('mouseover', function(d) {
                console.log(this);
            });

        svg.append("g")         // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '10.8em')
            .attr('dy', '1.15em')
            .attr('transform', "rotate(-65)");

        svg.append("g")         // Add the Y Axis
            .attr("class", "y axis")
            .call(yAxisLeft)
            .style("fill", "steelblue");

        svg.append("g")         // Add the Y Axis
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ", 0)")
            .call(yAxisRight)
            .style("fill", "red");

        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + yOne(dataOne[0].num_course_machines) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "red");

        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + yTwo(dataTwo[0].num_reporting) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "steelblue");


        focus.append('circle')
            .attr('class', 'y')
            .style('fill', 'none')
            .style('stroke', 'steelblue')
            .attr('r', 10);


        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', function() { focus.style('display', null); } )
            .on('mouseout', function() { focus.style('display', 'none'); } )
            .on('mousemove', mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(dataOne, x0, 1),
                d0 = dataOne[i - 1],
                d1 = dataOne[i],
                d = x0 - d0.last_updated > d1.last_updated - x0 ? d1 : d0;

            //console.log(x0)

            focus.select("circle.y")
                .attr("transform",
                      "translate(" + x(d.last_updated) + "," +
                      yOne(d.num_course_machines) + ")"); 
        }
    }
});


