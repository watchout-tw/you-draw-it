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
    size: { // size of graph on page & some other parameters for rendering
      w: 800,
      h: 450,
      r: 4,
    },
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
        max: 800000,
        formatString: 'd',
      }
    },
    sequenceCount: 2,
    sequences: [
      {
        label: {
          formatString: '.1f',
        }
      }
    ],
    title: '每月來台旅客人數',
    text: {
      before: ['lalala'],
      after: ['hahaha', 'paragraph'],
    },
  },
  {
    id: 'annual-visitors',
    sheetID: '1810543594',
    size: {
      w: 800,
      h: 450,
      r: 4,
    },
    axes: {
      x: {
        divider: 1,
        unit: 'year',
        label: '年',
      },
      y: {
        divider: 1000000,
        unit: 'person',
        label: '百萬人',
        min: 0,
        max: 12000000,
        formatString: 'd',
      }
    },
    sequenceCount: 1,
    sequences: [
      {
        label: {
          formatString: '.1f',
        }
      }
    ],
    title: '每年來台旅客人數',
    text: {
      before: ['自2000年以來，來台旅客數從balblabla'],
      after: ['沒想到', 'really?'],
    },
  },
];
