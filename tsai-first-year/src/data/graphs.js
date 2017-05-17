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
var relations = [
  [
    'monthly-visitors-china',
    'monthly-visitors-world',
  ],
  [
    'annual-revenue',
    'annual-spending',
  ],
]
var graphs = [
  {
    id: 'monthly-visitors-china',
    title: '中國旅客每月來台人數',
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
        max: 900000,
        formatString: 'd',
      }
    },
    sequence: {
      label: {
        formatString: '.1f',
      }
    },
    text: {
      before: ['lalala'],
      after: ['hahaha', 'paragraph'],
    },
  },
  {
    id: 'monthly-visitors-world',
    title: '世界旅客每月來台人數',
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
        max: 900000,
        formatString: 'd',
      }
    },
    sequence: {
      label: {
        formatString: '.1f',
      }
    },
    text: {
      before: ['lalala'],
      after: ['hahaha', 'paragraph'],
    },
  },
  {
    id: 'annual-visitors',
    title: '每年來台旅客人數',
    sheetID: '1810543594',
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
    sequence: {
      label: {
        formatString: '.1f',
      }
    },
    text: {
      before: ['自2000年以來，來台旅客數從balblabla'],
      after: ['沒想到', 'really?'],
    },
  },
  {
    id: 'public-debt',
    title: '中央政府一年以上公共債務未償餘額',
    sheetID: '92876274',
    axes: {
      x: {
        divider: 1,
        unit: 'year',
        label: '年',
      },
      y: {
        divider: 1000000,
        unit: 'NTD',
        label: '兆元',
        min: 0,
        max: 8000000,
        formatString: 'd',
      }
    },
    sequence: {
      label: {
        formatString: '.1f',
      }
    },
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
  {
    id: 'unemployment',
    title: '每年失業率',
    sheetID: '541577362',
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
        min: 0,
        max: 10,
        formatString: 'd',
      }
    },
    sequence: {
      label: {
        formatString: '.1f',
      }
    },
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
  {
    id: 'annual-revenue',
    title: '各年度中央政府歲入',
    sheetID: '1456792974',
    axes: {
      x: {
        divider: 1,
        unit: 'year',
        label: '年',
      },
      y: {
        divider: 1000000,
        unit: 'trillion',
        label: '兆',
        min: 1000000,
        max: 2400000,
        formatString: '.1f',
      }
    },
    sequenceCount: 2,
    sequence: {
      label: {
        formatString: '.2f',
      }
    },
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
  {
    id: 'annual-spending',
    title: '各年度中央政府歲出',
    sheetID: '1456792974',
    axes: {
      x: {
        divider: 1,
        unit: 'year',
        label: '年',
      },
      y: {
        divider: 1000000,
        unit: 'trillion',
        label: '兆',
        min: 1000000,
        max: 2400000,
        formatString: '.1f',
      }
    },
    sequenceCount: 2,
    sequence: {
      label: {
        formatString: '.2f',
      }
    },
    text: {
      before: ['test'],
      after: ['qq', 'aoao?'],
    },
  },
];
