Vue.component('graph', {
  mixins: [mxGraph],
  created: function() {
    Promise.all(
      [this.props.id]
        .concat(!!this.props.compare ? this.props.compare.map(function(comp) { return comp.id; }) : [])
        .map(function(id) {
          return Vue.http.get('./src/data/' + id + '.json');
        })
    ).then(this.getSuccess, this.getError);
  },
  methods: {
    getSuccess: function(responses) {
      // process responses
      // use this.$set to enable change detection
      this.$set(this.rows, 'orig', responses.shift().body);
      this.$set(this.rows, 'user', JSON.parse(JSON.stringify(this.rows.orig)));
      this.rows.user.forEach(function(row, index, rows) {
        if(row.fix && !(index + 1 < rows.length && !rows[index + 1].fix))
          row.show = false;
      });

      this.$set(this.rows, 'comp', responses.map(function(res) {
        return res.body.map(function(row) {
          return Object.assign(row, {show: true, fix: true});
        });
      }));

      // draw
      this.init();
      this.draw();
    },
    getError: function(response) {
      console.error(response);
    },
    markdown: function(text) {
      return marked(text);
    },
  },
  template: `
  <div class="graph" :id="props.id">
    <div class="before textgroup">
      <h2>{{ props.text.title }}</h2>
      <div class="text a-text-only" v-html="markdown(props.text.before)"></div>
    </div>
    <div class="draw">
      <div class="you-draw">
        <div class="line"></div>
        <div class="hand"></div>
      </div>
    </div>
    <div class="after textgroup">
      <div class="score d-flex justify-content-center align-items-center"><div>畫的有</div><div class="number">{{ score }}</div><div>分像呢</div></div>
      <div class="text a-text-only" v-html="markdown(props.text.after)"></div>
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
    header: {
      title: '蔡總統的第一年',
      description: '蔡英文政府已執政滿一週年，跟過去幾年相比，到底表現好不好呢？沃草透過比較從扁政府、馬政府到蔡政府第一年的各項數據，先讓大家自己畫出心中的感受，再來看看你跟真實數據的差異有多少吧！',
    },
    authorship: [
      {
        job: '數據分析',
        people: ['洪國鈞'],
      },
      {
        job: '編輯',
        people: ['蕭長展', '洪國鈞'],
      },
      {
        job: '設計開發',
        people: ['游知澔'],
      },
    ],
    conclusion: {
      title: '結論：關心政治、持續監督',
      description: '這次你得了幾分呢？蔡總統第一年的表現和你想的一樣嗎？\n\n真實的數據，是否讓你感到意外？逐年攀升的國債是否令你吃驚呢？事實上，現在立法院正在審查前瞻基礎建設特別條例，未來八年很有可能會再舉債八千八百多億，國債也將會繼續攀升，或許明年再看到這個圖表的時候，你會更為驚訝。\n\n沃草的理念是**降低公民理解複雜政治議題的門檻**，持續以各種方式報導國會中重要的資訊。以上這些圖表及程式設計，都需要相當多的人力去整理資料及製作，如果你喜歡沃草的內容，請別忘了[支持我們](https://watchout.tw/#support)！',
    },
  },
  methods: {
    markdown: marked,
  },
});
