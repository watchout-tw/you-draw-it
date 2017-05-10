var makeGraph = function(data, options) {
  options.w = !!options.w ? options.w : 800;
  options.h = !!options.h ? options.h : 450;
  options.r = !!options.r ? options.r : 4;

  var padding = options.r*8;
  var graph = d3.select(options.el)
    .append('svg')
    .attr('width', options.w)
    .attr('height', options.h);

  var xValues = data.points.map(function(d) { return d.x; });
  var xScale = d3.scalePoint()
    .domain(xValues)
    .range([0 + padding, options.w - padding]);
  var yScale = d3.scaleLinear()
    .domain([data.axes.y.min, data.axes.y.max])
    .range([options.h - padding, 0 + padding]);

  // function for generating path between points
  var line = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveCatmullRom.alpha(1));

  // draw circles & path through circles
  // https://github.com/d3/d3-selection/blob/master/README.md#selection_data
  // General Update Pattern
  // select → data → exit → remove → enter → append → merge
  var gCircles = graph.append('g').attr('id', 'circles');
  var gPaths = graph.append('g').attr('id', 'paths');

  var drawCircles = function() {
    var circles = gCircles.selectAll('circle').data(data.points, function(d) { return d.x; });
    circles.exit().remove();
    circles.enter().append('circle').merge(circles)
      .attr('r', options.r)
      .attr('cx', function(d) { return xScale(d.x); })
      .attr('cy', function(d) { return yScale(d.y); })
      .classed('hide', function(d) { return !!d.hide });
  };
  var drawPath = function() {
    var path = gPaths.selectAll('path').data([data.points]);
    path.exit().remove();
    path.enter().append('path').merge(path).attr('d', line);
  };
  drawCircles();
  drawPath();

  // make callback to redraw at user input
  function redraw() {
    // get input position
    var m = d3.mouse(this);
    var x = m[0];
    var y = Math.max(padding, Math.min(m[1], options.h - padding));

    for(var target = 0; x > (xScale.range()[0] + xScale.step()*target + xScale.bandwidth()/2); target++);
    if(target < data.points.length) {
      data.points[target].y = yScale.invert(y);
      data.points[target].hide = false;
      drawCircles();
      drawPath();
    }
  }
  graph.on('mousedown', redraw);
  graph.call(d3.drag().on('drag', redraw));

  // draw axes
  var xAxis = d3.axisTop(xScale)
    .tickFormat(function(d) {
      return d + (this.parentNode.nextSibling ? '' : data.axes.x.unit); // add unit at last tick
    });
  graph.append('g')
    .attr('id', 'axis-x')
    .attr('transform', 'translate(' + [0, options.h].join(',') + ')')
    .call(xAxis);

  var yFormat = d3.format(data.axes.y.formatString);
  var yAxis = d3.axisRight(yScale)
    .tickFormat(function(d) {
      // format + unit at last tick
      return yFormat(d/data.axes.y.divider) + (this.parentNode.nextSibling ? '' : data.axes.y.unit);
    });
  graph.append('g')
    .attr('id', 'axis-y')
    .call(yAxis);
};
