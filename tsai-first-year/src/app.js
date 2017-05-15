Vue.component('graph', {
  props: {
    g: Object,
  },
  template: `
  <div class="graph" :id="g.graphID"></div>
  `
})
var app = new Vue({
  el: '#app',
  methods: {
  },
  created: function() {
    var self = this;
    Vue.http.get(this.dataSource.root + this.dataSource.list + this.dataSource.fileType).then(function(response) {
      self.graphs = response.body;
      Promise.all(self.graphs.map(function(g) {
        return Vue.http.get(self.dataSource.root + g.graphID + self.dataSource.fileType);
      })).then(function(responses) {
        for(var i in responses)
          self.graphs[i].rows = responses[i].body;
      });
    });
  },
  data: {
    common: CommonData,
    dataSource: {
      root: './src/data/',
      list: 'graphs',
      fileType: '.json',
    },
    graphs: [],
  },
});
