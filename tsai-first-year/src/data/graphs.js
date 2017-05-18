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
      before: ['民進黨政府執政一年來，你認為失業率狀況是？'],
      after: ['根據行政院主計處[統計資料](https://www.stat.gov.tw/point.asp?index=3)，國民黨馬政府2008年上任時，國內失業率為3.86%。2009年第3季時曾一度攀升到6.08％最高峰，後逐漸趨緩，到2016年前總統馬英九卸任時失業率為3.90%。民進黨蔡政府去年5月上任之初，失業率為3.87％， 就任一年後，目前最新數據則是3.80%。'],
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
      before: ['來臺旅客人數常是歷任政府被檢驗的「施政成績」，民進黨重新執政一年來，不分國籍的旅客來臺狀況你認為是？'],
      after: ['根據交通部觀光局[統計數據](http://admin.taiwan.net.tw/statistics/year.aspx?no=134)，民進黨扁政府2000年上任時，來臺旅客人數為262萬人，至2007年陳水扁卸任前夕上升至371萬人。', '國民黨馬政府執政後，來臺旅客人數持續上升，至2015年達1,043萬人。2016年民進黨蔡政府執政後，來臺旅客人數至今則為1,069萬人。'],
    },
  },
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
      before: ['國民黨馬政府執政時，中國旅客來臺人數連年上升，在民進黨蔡政府執政後，你認為這一年來的變化是？'],
      after: ['根據交通部觀光局[統計數據](http://admin.taiwan.net.tw/statistics/year.aspx?no=134)，2015年4月，每月來臺旅客中有超過35萬人為中國人，其他國家僅有53萬人左右，中國客約佔4成。截至2016年2月總統馬英九卸任前夕，中國旅客更是單月突破四十萬人，佔全部來臺旅客44%，達近年最高峰。', '2016年5月政黨輪替後，中國旅客人數逐月下降，於2016年6月起低於30萬人。至今年3月，來臺中國旅客人數降至20萬人，佔總體來臺旅客22%。'],
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
    compare: ['monthly-visitors-china'],
    text: {
      before: ['民進黨蔡政府執政一年來，中國旅客以外的國際來臺旅客人數，你認為應該是？'],
      after: ['交通部觀光局[統計](http://admin.taiwan.net.tw/statistics/year.aspx?no=134)，2016年4月政黨輪替前，除中國外其他國家來臺旅客與前一年同期相近，約為53萬人，佔總體旅客人數約58%。', '政黨輪替後，其他國家旅客不斷攀升，至2016年底更一度突破80萬人，到今年3月份則為72萬人，佔總體旅客78%。'],
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
      before: ['民進黨執政一年來，政府藉由稅收、營業盈餘等各項財政收入所構成的「歲入」預算，你覺得有何變化？'],
      after: ['行政院主計處[統計資料](http://www.dgbas.gov.tw/public/data/dgbas01/106/106Ctab/106C歷年中央政府收支概況表.PDF)指出，政府歲入於民進黨扁政府執政的2001年，為1兆4171億元，至2007年增加到1兆6355億元。到了國民黨馬政府時期，2010年曾一度下滑至1兆4974億，到卸任前2015年時則增加到1兆8857億元。', '民進黨蔡政府執政後，2017年歲入則為1兆8411億元。'],
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
    compare: ['annual-revenue'],
    text: {
      before: ['這一年下來，政府每年推動各項政務的「歲出」預算，你認為的狀況是...？'],
      after: ['依據行政院主計處[統計資料](http://www.dgbas.gov.tw/public/data/dgbas01/106/106Ctab/106C歷年中央政府收支概況表.PDF)，2001年到2005年民進黨扁政府執政期間，連5年都呈現歲出大於歲入的超支情形，2006年開始出現餘絀，到了2007年在歲入1兆6354億元、歲出為1兆5520億元下，則創造834億元餘額。', '國民黨政府上任後，除2008年仍有餘額，其餘7年都呈現超支，其中以2012年超支2140億元為最。而民進黨再次執政後，目前仍是歲出大於歲入，以2017年而言，歲入1兆8411億元、歲出1兆9740億元，超支1329億元。'],
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
      before: ['自2010年國民黨政府到現在民進黨政府執政一年來，政府積欠的「一年以上未償公共債務」，你認為其中的變化是...？'],
      after: ['根據財政部[統計資料](http://www.mof.gov.tw/Pages/public/Data/statistic/monthly/10602/22150_10602.pdf)，民進黨扁政府就任時，2001年政府「公共債務」額度為2兆7594億元，到2007年增加到3兆7182億元。國民黨馬政府就任後，在首次任期屆滿前、2011年時，國債持續上揚增加到4兆7551億元。', '而前總統馬英九2012年連任，到卸任前、2015年結算，國債更增加到5兆3012億元。民進黨政府上任一年，截至2017年2月底國債額度則為5兆3808億元。'],
    },
  },
];
