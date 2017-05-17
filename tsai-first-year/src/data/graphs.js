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
        min: 2000000,
        max: 12000000,
        formatString: '.1f',
      }
    },
    nofSequences: 1,
    title: '每年來台旅客人數',
    text: {
      before: ['自2000年以來，來台旅客數從balblabla'],
      after: ['沒想到', 'really?'],
    },
  },
  {
    id: 'public-debt',
    sheetID: '92876274',
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
        divider: 100000000000,
        unit: 'NTD',
        label: '千億元',
        min: 2000000000000,
        max: 6000000000000,
        formatString: '.1f',
      }
    },
    nofSequences: 1,
    title: '中央債府1年以上公共債務未償餘額',
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
  {
    id: 'unemployment',
    sheetID: '541577362',
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
        divider: 1,
        unit: '%',
        label: '%',
        min: 2.5,
        max: 6.5,
        formatString: '.1f',
      }
    },
    nofSequences: 1,
    title: '每年失業率',
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
  {
    id: 'annual-budget',
    sheetID: '1456792974', 
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
        divider: 100000000000,
        unit: 'billion',
        label: '十億元',
        min: 1300000000000,
        max: 2000000000000,
        formatString: '.1f',
      }
    },
    nofSequences: 2,
    title: '各年度中央政府歲入歲出',
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
];
