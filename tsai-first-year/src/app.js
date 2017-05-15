var app = new Vue({
  el: '#app',
  methods: {
  },
  created: function() {
    var self = this;
    Vue.http.get(this.data.root + this.data.list + this.data.fileType).then(function (response) {
      var list = response.body;
      for(let key in list) {
        Vue.http.get(self.data.root + key + self.data.fileType).then(function(response) {
          var rows = response.body;
          console.log(key, rows);
        });
      }
    })
  },
  data: {
    common: CommonData,
    data: {
      root: './src/data/',
      list: 'graphs',
      fileType: '.json',
    }
  },
});
