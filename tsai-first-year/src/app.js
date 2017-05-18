Vue.component('graph', {
  mixins: [mxGraph],
  created: function() {
    Promise.all(
      [this.props.id].concat(!!this.props.compare ? this.props.compare : []).map(function(id) {
        return Vue.http.get('./src/data/' + id + '.json');
      })
    ).then(this.getSuccess, this.getError);
  },
  methods: {
    getSuccess: function(responses) {
      // process responses
      this.rows.orig = responses.shift().body;
      this.rows.user = JSON.parse(JSON.stringify(this.rows.orig))
      this.rows.user.forEach(function(row, index, rows) {
        if(row.fix && !(index + 1 < rows.length && !rows[index + 1].fix))
          row.show = false;
      });
      this.rows.comp = responses.map(function(res) {
        return res.body.map(function(row) {
          return Object.assign(row, {show: true, fix: true});
        });
      });

      // draw
      this.init();
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
    <div class="draw">
      <div class="you-draw">
        <div class="line"></div>
        <div class="hand"></div>
      </div>
    </div>
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
