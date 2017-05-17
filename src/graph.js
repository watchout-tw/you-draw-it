var colors = {
  'bian-1': 'rgba(0, 255, 0, 0.25)',
  'bian-2': 'rgba(0, 255, 0, 0.35)',
  'ma-1': 'rgba(0, 0, 255, 0.25)',
  'ma-2': 'rgba(0, 0, 255, 0.35)',
  'tsai-1': 'rgba(0, 255, 0, 0.25)',
};
var mxGraph = {
  props: {
    id: String,
    props: Object,
  },
  data: function() {
    return {
      el: {},
      rows: {},
      util: {
        axes: {
          x: {},
          y: {},
        },
        sequences: {
          label: {}
        }
      },
    }
  },
  methods: {
    drawUser: function() {
      this.drawPath(this.el.user, this.rows.user);
    },
    drawOrig: function() {
      this.drawPath(this.el.orig, this.rows.orig)
    },
    drawPath: function(el, points) {
      // https://github.com/d3/d3-selection/blob/master/README.md#selection_data
      // General Update Pattern
      // select → data → exit → remove → enter → append → merge
      var self = this;

      // find segments
      var segments = [];
      var currentSegment = [];
      for(var point of points) {
        if(!point.show) {
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
      var paths = el.selectAll('path').data(segments);
      paths.exit().remove();
      paths.enter().append('path').merge(paths).attr('d', this.util.line);

      // draw circles
      var circles = el.selectAll('circle').data(points, function(d) { return d.x; });
      circles.exit().remove();
      circles.enter().append('circle').merge(circles)
        .attr('r', this.props.size.r)
        .attr('cx', function(d) { return self.util.axes.x.scale(d.x); })
        .attr('cy', function(d) { return self.util.axes.y.scale(d.y); })
        .classed('fix', function(d) { return d.fix; })
        .classed('hide', function(d) { return !d.show; });

      var endpoints = segments.reduce(function(acc, cur) {
        return acc.concat([cur[0], cur[cur.length - 1]]);
      }, []);
      var labels = el.selectAll('text').data(endpoints, function(d) { return d.x; });
      labels.exit().remove();
      labels.enter().append('text').merge(labels)
        .text(function(d) { return self.util.sequences.label.format(d.y); })
        .attr('x', function(d) { return self.util.axes.x.scale(d.x); })
        .attr('y', function(d) { return self.util.axes.y.scale(d.y) - self.props.size.r*2; })
        .classed('hide', function(d) { return !d.show; });
    },
    draw: function() {
      var self = this;
      var props = this.props;
      var util = this.util;
      var rows = this.rows;

      // calculations
      props.size.w = 480;
      props.size.h = 480;

      props.size.a = props.size.h/props.size.w;
      props.size.p = props.size.r*8;

      // make graph
      this.el.$container = $(this.$el).find('.draw');
      this.el.container = d3.select(this.$el).select('.draw');
      this.el.root = this.el.container.append('svg')

        .attr('viewBox', [0, 0, props.size.w, props.size.h].join(' '));

      // x & y scale
      util.axes.x.values = rows.user.map(function(d) { return d.x; });
      util.axes.x.scale = d3.scalePoint()
        .domain(util.axes.x.values)
        .range([props.size.p, props.size.w - props.size.p]);
      util.axes.y.scale = d3.scaleLinear()
        .domain([props.axes.y.min, props.axes.y.max])
        .range([props.size.h - props.size.p, 0 + props.size.p]);

      util.sequences.label.format = function(d) {
        return d3.format(props.sequences[0].label.formatString)(d/props.axes.y.divider);
      };

      // function for generating path between points
      util.line = d3.line()
        .x(function(d) { return util.axes.x.scale(d.x); })
        .y(function(d) { return util.axes.y.scale(d.y); });

      // draw background
      this.el.bg = this.el.root.append('g')
        .attr('class', 'bg')
        .attr('transform', 'translate(' + [-util.axes.x.scale.step()/2, 0].join(',') + ')');

      var rectangles = this.el.bg.selectAll('rect').data(rows.user);
      rectangles.exit().remove();
      rectangles.enter().append('rect').merge(rectangles)
        .attr('x', function(d) { return util.axes.x.scale(d.x); })
        .attr('y', util.axes.y.scale(props.axes.y.max))
        .attr('width', util.axes.x.scale.step())
        .attr('height', util.axes.y.scale(props.axes.y.min) - util.axes.y.scale(props.axes.y.max))
        .attr('fill', function(d) { return colors[d.label]; });

      // draw x axis
      util.axes.x.axis = d3.axisBottom(util.axes.x.scale)
        .tickSize(props.size.h - props.size.p*2);
      util.axes.x.customize = function(g) {
        g.call(util.axes.x.axis);
        g.select('.domain').remove();
        g.selectAll('.tick').each(function(d, i, nodes) {
          var tick = d3.select(this);
          tick.select('line')

          tick.selectAll('text').remove();
          var text = tick.append('g')
            .attr('transform', 'translate(' + [-util.axes.x.scale.step()/2, props.size.h - props.size.p - props.size.r*8].join(',') + ')');

          // omit year when repeat
          if(d.indexOf('/') > -1) {
            var [y, m] = d.split('/');
            var target = this.previousSibling;
            while(!!target && d3.select(target).datum().indexOf('/') < 0) {
              target = target.previousSibling;
            }
            if(!(!!target && d3.select(target).datum().indexOf(y) > -1)) {
              text.append('text')
                .attr('dy', '2em')
                .text(y);
            }
            d = m;
          }
          if(d%2 == 0)
            return;
          text.append('text')
            .text(d + (!this.nextSibling ? props.axes.x.label : ''))
            .attr('dy', '1em');
        })
      };
      this.el.root.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', 'translate(' + [0, props.size.p].join(',') + ')')
        .call(util.axes.x.customize);

      // draw y axis
      util.axes.y.format = function(d) {
        return d3.format(props.axes.y.formatString)(d/props.axes.y.divider);
      };
      util.axes.y.axis = d3.axisRight(util.axes.y.scale)
        .tickSize(0)
        .tickFormat(function(d) {
          // format + unit at last tick
          return util.axes.y.format(d);
        });
      util.axes.y.customize = function(g) {
        g.call(util.axes.y.axis);
        g.select('.domain').remove();
        g.selectAll('.tick > text')
          .attr('x', 0)
        g.select('.tick:last-of-type').append('text')
          .classed('unit-label', true)
          .attr('dy', '-1em')
          .text(props.axes.y.label);
      };
      this.el.root.append('g')
        .attr('class', 'axis axis-y')
        .call(util.axes.y.customize);

      // make space for circles and paths
      this.el.user = this.el.root.append('g').attr('class', 'sequence user');
      this.el.orig = this.el.root.append('g').attr('class', 'sequence orig');

      // add button to finish and show comparison
      this.el.button = this.el.container.append('button')
        .text('不想畫啦')
        .on('click', function() {
          self.rows.orig.forEach(function(row) {
            row.show = true;
          });
          self.drawOrig();
          self.el.root.on('mousedown', null);
          self.el.root.on('mousedown.drag', null);

          $(self.$el).find('.after').addClass('show');
        });

      // make callback to redraw at user input
      function redraw() {
        self.el.button.text('畫好了啦');

        // get input position
        var m = d3.mouse(this);
        var x = m[0];
        var y = Math.max(props.size.p, Math.min(m[1], props.size.h - props.size.p));

        // find point to modify
        for(var target = 0; x > util.axes.x.scale.range()[0] + util.axes.x.scale.step()*(target + 0.5); target++);
        if(target < rows.user.length && !rows.orig[target].fix) {
          rows.user[target].y = util.axes.y.scale.invert(y);
          rows.user[target].show = true;
          self.drawUser();
        }
      }

      // execute callback on click/touch/drag
      self.el.root.on('mousedown', redraw);
      self.el.root.call(d3.drag().on('drag', redraw));

      // draw
      this.drawOrig();
    }
  }
}
