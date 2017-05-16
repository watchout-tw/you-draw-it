Vue.component('graph', {
  props: {
    g: Object,
  },
  created: function() {
    Vue.http.get('./src/data/' + this.g.id + '.json').then(this.getSuccess, this.getError);
  },
  methods: {
    getSuccess: function(response) {
      this.g.rows = response.body;
      $vm0.$el.querySelector('.draw')
    },
    getError: function(response) {
      console.error(response);
    },
  },
  template: `
  <div class="graph" :id="g.graphID">
    <h2>{{ g.title }}</h2>
    <p>{{ g.text.before }}</p>
    <div class="draw"></div>
    <p>{{ g.text.after }}</p>
  </div>
  `,
});

var app = new Vue({
  el: '#app',
  methods: {
  },
  data: {
    common: CommonData,
    graphs: graphs,
  },
});
