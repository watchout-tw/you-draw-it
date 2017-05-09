var makeGraph = function(points, options) {
  options.w = !!options.w ? options.w : 800;
  options.h = !!options.h ? options.h : 450;
  options.r = !!options.r ? options.r : 4;

  var padding = options.r*8;
  var numCircles = points.length; //20;

  var graph = d3.select(options.el)
    .append('svg')
    .attr('width', options.w)
    .attr('height', options.h);

  var xValues = points.map(function(d) { return d.x; });
  var yValues = points.map(function(d) { return d.y; });
  var xScale = d3.scaleBand().domain(xValues).range([0, options.w]);
  var yScale = d3.scaleLinear().domain([d3.min(yValues), d3.max(yValues)]).range([options.h, 0]);

  // function for generating path between points
  var line = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveCatmullRom.alpha(0.2));

  // draw circles
  var circles = graph.append('g').selectAll('circle').data(points).enter()
      .append('circle')
      .attr('r', options.r)
      .attr('cx', function(d) { return xScale(d.x); })
      .attr('cy', function(d) { return yScale(d.y); });

  // set up dragging
  var drag = d3.drag().on('drag', function dragHandler() {
    // get mouse position
    var m = d3.mouse(this);
    var x = m[0];
    var y = Math.max(padding, Math.min(m[1], options.h - padding));

    for(var target = 0; x > (xScale.range()[0] + xScale.step()*target + xScale.bandwidth()/2); target++);
    if(target < circles.size()) {
      points[target].y = y;
      circles.filter(function(d, i) { return i === target; }).attr('cy', y);
    }
  });
  graph.call(drag);
};
