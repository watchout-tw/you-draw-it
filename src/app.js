var graphs = {};
$(function() {
  graphs.PublicDebt = new Graph(DataSet.PublicDebt, {
    el: '#graph0'
  });
});
