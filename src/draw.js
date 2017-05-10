var Graph = function(data, options) {
  // thanks to https://github.com/ryanmcdermott/clean-code-javascript
  options = Object.assign({
    w: 800,
    h: 450,
    r: 4,
  }, options);
  options.padding = options.r*8;

  var self = this;
  this.options = options;
  this.data = data;
  // clone data without hide attribute
  this.data.originalPoints = JSON.parse(JSON.stringify(this.data.points))
    .map(function(obj) {
      delete obj.hide;
      return obj;
    });

  this.graph = d3.select(this.options.el)
    .append('svg')
    .attr('width', this.options.w)
    .attr('height', this.options.h);

  // x & y scale
  var xValues = this.data.points.map(function(d) { return d.x; });
  this.xScale = d3.scalePoint()
    .domain(xValues)
    .range([0 + this.options.padding, options.w - this.options.padding]);
  this.yScale = d3.scaleLinear()
    .domain([data.axes.y.min, data.axes.y.max])
    .range([this.options.h - this.options.padding, 0 + this.options.padding]);

  // function for generating path between points
  this.line = d3.line()
    .x(function(d) { return self.xScale(d.x); })
    .y(function(d) { return self.yScale(d.y); });

  // draw circles & path through circles
  this.gUser = this.graph.append('g').attr('id', 'user');
  this.gOriginal = this.graph.append('g').attr('id', 'original');

  // draw x axis
  this.xAxis = d3.axisTop(this.xScale)
    .tickFormat(function(d) {
      return d + (this.parentNode.nextSibling ? '' : self.data.axes.x.unit); // add unit at last tick
    });
  this.graph.append('g')
    .attr('id', 'axis-x')
    .attr('transform', 'translate(' + [0, this.options.h - 2].join(',') + ')')
    .call(this.xAxis);

  // draw y axis
  this.yFormat = function(d) {
    return d3.format(self.data.axes.y.formatString)(d/self.data.axes.y.divider);
  };
  this.yAxis = d3.axisRight(this.yScale)
    .tickFormat(function(d) {
      // format + unit at last tick
      return self.yFormat(d) + (this.parentNode.nextSibling ? '' : self.data.axes.y.unit);
    });
  this.graph.append('g')
    .attr('id', 'axis-y')
    .call(this.yAxis);

  // add button to finish and show comparison
  this.button = d3.select(this.options.el).append('button')
    .text('畫好了啦')
    .on('click', function() {
      self.drawOriginal();
      self.graph.on('mousedown', null);
      self.graph.on('mousedown.drag', null);
    });

  // make callback to redraw at user input
  function redraw() {
    // get input position
    var m = d3.mouse(this);
    var x = m[0];
    var y = Math.max(self.options.padding, Math.min(m[1], self.options.h - self.options.padding));

    // find point to modify
    for(var target = 0; x > self.xScale.range()[0] + self.xScale.step()*(target + 0.5); target++);
    if(target < self.data.points.length && self.data.points[target].fix !== true) {
      self.data.points[target].y = self.yScale.invert(y);
      self.data.points[target].hide = false;
      self.drawUser();
    }
  }
  // execute callback on click/touch/drag
  this.graph.on('mousedown', redraw);
  this.graph.call(d3.drag().on('drag', redraw));

  // draw
  this.drawUser();
};
Graph.prototype.drawUser = function() {
  this.drawPath(this.gUser, this.data.points);
};
Graph.prototype.drawOriginal = function() {
  this.drawPath(this.gOriginal, this.data.originalPoints)
};
Graph.prototype.drawPath = function(graph, points) {
  // https://github.com/d3/d3-selection/blob/master/README.md#selection_data
  // General Update Pattern
  // select → data → exit → remove → enter → append → merge
  var self = this;

  // find segments
  var segments = [];
  var currentSegment = [];
  for(var point of points) {
    if(point.hide === true) {
      if(currentSegment.length > 0)
        segments.push(currentSegment);
      currentSegment = [];
    }
    else {
      currentSegment.push(point);
    }
  }
  if(currentSegment.length > 0)
    segments.push(currentSegment);

  // draw path
  var paths = graph.selectAll('path').data(segments);
  paths.exit().remove();
  paths.enter().append('path').merge(paths).attr('d', this.line);

  // draw circles
  var circles = graph.selectAll('circle').data(points, function(d) { return d.x; });
  circles.exit().remove();
  circles.enter().append('circle').merge(circles)
    .attr('r', this.options.r)
    .attr('cx', function(d) { return self.xScale(d.x); })
    .attr('cy', function(d) { return self.yScale(d.y); })
    .classed('fix', function(d) {return !!d.fix })
    .classed('hide', function(d) { return !!d.hide });

  var labels = graph.selectAll('text').data(points, function(d) { return d.x; });
  labels.exit().remove();
  labels.enter().append('text').merge(labels)
    .text(function(d) { console.log(self); return self.yFormat(d.y); })
    .attr('x', function(d) { return self.xScale(d.x); })
    .attr('y', function(d) { return self.yScale(d.y) - self.options.r*1.5; })
    .classed('hide', function(d) { return !!d.hide });

};
