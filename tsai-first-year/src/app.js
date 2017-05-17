Vue.component('graph', {
  mixins: [mxGraph],
  created: function() {
    Vue.http.get('./src/data/' + this.props.id + '.json').then(this.getSuccess, this.getError);
  },
  methods: {
    getSuccess: function(response) {
      // prepare data
      this.rows.orig = response.body;
      this.rows.user = JSON.parse(JSON.stringify(response.body))
      this.rows.user.forEach(function(row, index, rows) {
        if(row.fix && !(index + 1 < rows.length && !rows[index + 1].fix))
          row.show = false;
      });
      // draw
      this.draw();
    },
    getError: function(response) {
      console.error(response);
    },
  },
  template: `
  <div class="graph" :id="props.id">
    <h2>{{ props.title }}</h2>
    <div class="before">
      <p v-for="paragraph in props.text.before">{{ paragraph }}</p>
    </div>
    <div class="draw"></div>
    <div class="after">
      <p v-for="paragraph in props.text.after">{{ paragraph }}</p>
    </div>
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
    title: '蔡總統的第一年',
    description: ['段落文字一', '段落文字二'],
  },
});
