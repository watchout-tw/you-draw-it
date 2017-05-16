var mxGraph = {
  props: {
    g: Object,
  },
  methods: {
    render: function() {
      this.$graph = d3.select(this.$el).select('.draw')
        .append('svg')
        .attr('width', this.g.size.w)
        .attr('height', this.g.size.h);
    }
  }
}
