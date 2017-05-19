var app = new Vue({
  el: '#app',
  methods: {
    markdown: marked,
  },
  data: {
    common: CommonData,
    title: '不然你來畫畫看啊',
    description: '不靠感覺，靠資料、靠數據的新聞，有時候，並不符合大眾的預期。你也來試試？',
    pages: [
      {
        id: 'tsai-first-year',
        title: '蔡總統的第一年',
      }
    ]
  }
})
