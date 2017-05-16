Vue.component('graph', {
  mixins: [mxGraph],
  created: function() {
    Vue.http.get('./src/data/' + this.props.id + '.json').then(this.getSuccess, this.getError);
  },
  methods: {
    getSuccess: function(response) {
      this.rows.user = response.body;
      this.rows.orig = JSON.parse(JSON.stringify(this.rows.user));
      this.rows.orig.forEach(function(row) {
        row.show = 'yes'
      });
      this.draw();
    },
    getError: function(response) {
      console.error(response);
    },
  },
  template: `
  <div class="graph" :id="props.id">
    <h2>{{ props.title }}</h2>
    <p v-for="paragraph in props.text.before">{{ paragraph }}</p>
    <div class="draw"></div>
    <p v-for="paragraph in props.text.after">{{ paragraph }}</p>
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
