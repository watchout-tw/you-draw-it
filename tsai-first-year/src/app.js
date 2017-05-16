Vue.component('graph', {
  mixins: [mxGraph],
  created: function() {
    Vue.http.get('./src/data/' + this.g.id + '.json').then(this.getSuccess, this.getError);
  },
  methods: {
    getSuccess: function(response) {
      this.g.rows = response.body;
      this.render();
    },
    getError: function(response) {
      console.error(response);
    },
  },
  template: `
  <div class="graph" :id="g.graphID">
    <h2>{{ g.title }}</h2>
    <p v-for="p in g.text.before">{{ p }}</p>
    <div class="draw"></div>
    <p v-for="p in g.text.after">{{ p }}</p>
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
    title: '頁面大標',
    description: ['段落文字一', '段落文字二'],
  },
});
