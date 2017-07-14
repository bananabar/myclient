var data = {
  arr: [
    { id: 1, zimu: 'sadfsq', ch: '水岸东方三期' },
    { id: 2, zimu: 'ygsd', ch: '阳光时代' },
    { id: 3, zimu: 'hdlzyhz', ch: '恒大绿洲一号站' },
    { id: 4, zimu: 'dfyj', ch: '东方雅居' },
    { id: 5, zimu: 'lheq', ch: '龙湖二期' },
    { id: 6, zimu: 'yjcsq', ch: '御锦城四期' },
    { id: 7, zimu: 'lsdcsq', ch: '绿水东城四期' },
    { id: 8, zimu: 'hthf', ch: '海棠华府' },
    { id: 9, zimu: 'cbxceq', ch: '浐灞新城二期' },
    { id: 10, zimu: 'qcccq', ch: '秦川厂厂区' },
    { id: 11, zimu: 'qccjq', ch: '秦川厂街区' },
    { id: 12, zimu: 'hhccq', ch: '黄河厂厂区' },
    { id: 13, zimu: 'hhcshq', ch: '黄河厂街区' },
    { id: 14, zimu: 'sq', ch: '陕汽' },
    { id: 15, zimu: 'qswbs', ch: '浅水湾别墅' },
    { id: 16, zimu: 'bydjsq', ch: '灞业大境三期' },
    { id: 17, zimu: 'xjw', ch: '香江湾' },
    { id: 18, zimu: 'qswsq', ch: '浅水湾三期' },
    { id: 19, zimu: 'bydjeq', ch: '灞业大境二期' },
    { id: 20, zimu: 'gklsdcsq', ch: '高科绿水东城三期' },
    { id: 21, zimu: 'xgccq', ch: '西光厂厂区' },
    { id: 22, zimu: 'qswxzl', ch: '浅水湾行政楼' },
    { id: 23, zimu: 'sdc', ch: '尚东城' },
    { id: 24, zimu: 'dx', ch: '党校' },
    { id: 25, zimu: 'dcxyjazf', ch: '东城新一家安置房' },
    { id: 26, zimu: 'hdlzehz', ch: '恒大绿洲二号站' },
    { id: 27, zimu: 'smgc', ch: '三棉高层' },
    { id: 28, zimu: 'tmcehz', ch: '天睦城二号站' },
    { id: 29, zimu: 'xgcflq', ch: '西光厂福利区' },
    { id: 30, zimu: 'tmcyhz', ch: '天睦城一号站' },
    { id: 501, zimu: 'wsldtz', ch: '万寿路地铁站' },
    { id: 502, zimu: 'lcdkyz', ch: '老城东客运站' },
    { id: 503, zimu: 'hgyzc', ch: '红光养殖场' },
    { id: 504, zimu: 'jsdbj', ch: '军事代表局' },
    { id: 505, zimu: 'ztwz', ch: '中天物资' },
    { id: 506, zimu: 'fmdzpc', ch: '富民豆制品厂' },
    { id: 507, zimu: 'sjjd', ch: '双建酒店' },
    { id: 508, zimu: 'zhjc', ch: '综合建材' },
    { id: 509, zimu: 'jbhxd', ch: '金百合洗涤' },
    { id: 510, zimu: 'dljx', ch: '电力技校' },
    { id: 511, zimu: 'jhsm', ch: '嘉禾商贸' },
    { id: 512, zimu: 'dnesc', ch: '丹尼尔商城' },
    { id: 514, zimu: 'jhxdh', ch: '金花新都汇' },
    { id: 515, zimu: 'xle', ch: '祥林2' },
    { id: 516, zimu: 'hjmdwpgxs', ch: '胡家庙第五批干休所' },
    { id: 517, zimu: 'dwwy', ch: '德文物业' },
    { id: 518, zimu: 'ty', ch: '天佑' },
    { id: 519, zimu: 'hnxd', ch: '华南洗涤'},
    { id: 520, zimu: 'xagcdx', ch: '西安工程大学' },
    { id: 521, zimu: 'xalgdx', ch: '西安理工大学' },
    { id: 522, zimu: 'gycz', ch: '工业车站'}
  ]
}
// 根据name得到对应的id
function nametoid(name) {
  for (let i = 0; i < data.arr.length; i++) {
    if (name == data.arr[i].ch) {
      return data.arr[i].id
    }
  }
}
function idtoname(id) {
  for (let i = 0; i < data.arr.length; i++) {
    if (id == data.arr[i].id) {
      return data.arr[i].ch
    }
  }
}
module.exports = {
  nametoid: nametoid,
  data: data,
  idtoname: idtoname
}