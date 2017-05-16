/*
array is a list of things enclosed by []
object is a dictionary of things enclosed by {}
syntax of an object is like

object = {
  key0: value0,
  key1: value1,
};

graphs is an array
each object in graphs contains information of each graph
*/

var graphs = [
  {
    id: 'monthly-visitors',
    sheetID: '918177893', // run get.py and get sheetID from data/graphs.json
    axes: {
      x: {
        divider: 1,
        unit: 'month',
        label: '月',
      },
      y: {
        divider: 10000,
        unit: 'person',
        label: '萬人',
        min: 0,
        max: 500000,
        formatString: '.1f',
      }
    },
    nofSequences: 2,
    title: '每月來台旅客人數',
    text: {
      before: ['lalala'],
      after: ['hahaha', 'paragraph'],
    },
  },
];
