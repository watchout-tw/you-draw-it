var Graph = function(data, options) {
  options.w = !!options.w ? options.w : 800;
  options.h = !!options.h ? options.h : 450;
  options.r = !!options.r ? options.r : 4;

  options.padding = options.r*8;

  var self = this;
  self.data = data;
  self.options = options;

  self.graph = d3.select(self.options.el)
    .append('svg')
    .attr('width', self.options.w)
    .attr('height', self.options.h);

  // x & y scale
  var xValues = self.data.points.map(function(d) { return d.x; });
  self.xScale = d3.scalePoint()
    .domain(xValues)
    .range([0 + self.options.padding, options.w - self.options.padding]);
  self.yScale = d3.scaleLinear()
    .domain([data.axes.y.min, data.axes.y.max])
    .range([self.options.h - self.options.padding, 0 + self.options.padding]);

  // function for generating path between points
  self.line = d3.line()
    .x(function(d) { return self.xScale(d.x); })
    .y(function(d) { return self.yScale(d.y); })
    .curve(d3.curveCatmullRom.alpha(1));

  // draw circles & path through circles
  self.gCircles = self.graph.append('g').attr('id', 'circles');
  self.gPaths = self.graph.append('g').attr('id', 'paths');
  self.drawCircles();
  self.drawPath();

  // draw x axis
  self.xAxis = d3.axisTop(self.xScale)
    .tickFormat(function(d) {
      return d + (this.parentNode.nextSibling ? '' : self.data.axes.x.unit); // add unit at last tick
    });
  self.graph.append('g')
    .attr('id', 'axis-x')
    .attr('transform', 'translate(' + [0, self.options.h].join(',') + ')')
    .call(self.xAxis);

  // draw y axis
  self.yFormat = d3.format(self.data.axes.y.formatString);
  self.yAxis = d3.axisRight(self.yScale)
    .tickFormat(function(d) {
      // format + unit at last tick
      return self.yFormat(d/self.data.axes.y.divider) + (this.parentNode.nextSibling ? '' : self.data.axes.y.unit);
    });
  self.graph.append('g')
    .attr('id', 'axis-y')
    .call(self.yAxis);

  // add button to finish and show comparison
  self.button = d3.select(self.options.el).append('button').text('Done.');

  // make callback to redraw at user input
  function redraw() {
    // get input position
    var m = d3.mouse(this);
    var x = m[0];
    var y = Math.max(self.options.padding, Math.min(m[1], self.options.h - self.options.padding));

    // find point to modify
    for(var target = 0; x > (self.xScale.range()[0] + self.xScale.step()*target + self.xScale.bandwidth()/2); target++);
    if(target < self.data.points.length) {
      self.data.points[target].y = self.yScale.invert(y);
      self.data.points[target].hide = false;
      self.drawCircles();
      self.drawPath();
    }
  }
  self.graph.on('mousedown', redraw);
  self.graph.call(d3.drag().on('drag', redraw));
};
Graph.prototype.drawCircles = function() {
  var self = this;

  // https://github.com/d3/d3-selection/blob/master/README.md#selection_data
  // General Update Pattern
  // select → data → exit → remove → enter → append → merge
  var circles = self.gCircles.selectAll('circle').data(self.data.points, function(d) { return d.x; });
  circles.exit().remove();
  circles.enter().append('circle').merge(circles)
    .attr('r', self.options.r)
    .attr('cx', function(d) { return self.xScale(d.x); })
    .attr('cy', function(d) { return self.yScale(d.y); })
    .classed('hide', function(d) { return !!d.hide });
};
Graph.prototype.drawPath = function() {
  var self = this;
  var path = self.gPaths.selectAll('path').data([self.data.points]);
  path.exit().remove();
  path.enter().append('path').merge(path).attr('d', self.line);
};
