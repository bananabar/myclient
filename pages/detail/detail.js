
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    arr2: [
      { name: '***' }
    ],
    ch: "***",
    bhnum: 0,
    sort: "",
    arr1: [],
    banhuan: [],
    gong1: "", hui1: "", gei1: "", fan1: "",
    gong2: "", hui2: "", gei2: "", fan2: ""
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
  },
  // 曲线图
  createSimulationData: function () {
    var categories = [];
    var data = [];
    // 曲线图X,Y轴数据
    for (var i = 0; i < 60; i++) {
      categories.push(i + ":00");
      data.push(Math.random() * (20 - 10) + 10);
    }

    return {
      categories: categories,
      data: data
    }
  },
  // 点击出现曲线图
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.arr1;
    for (var i = 0, len = list.length; i < len; ++i) {
      // 由于canva组件是最高层级的，所以当不显示是需要隐藏
      if (list[i].id == id) {
        list[i].open = !list[i].open
        if (list[i].open) {
          lineChart.updateData({
            height: 150,
          });
        }
        else {
          lineChart.updateData({
            height: 0,
          });
        }
      } else {
        list[i].open = false
      }
    }
    this.setData({
      arr1: list
    });


  },
  // 初始化曲线
  onShow: function () {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas1',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      background: '#f5f5f5',
      series: [{
        name: '时间',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + 'Mpa';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '压力 (Mpa)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 150,
      dataLabel: false,
      dataPointShape: true,

    });
  },
  // 板换的点击事件
  kindToggle1: function (e) {
    var id = e.currentTarget.id, list = this.data.banhuan;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
        if (i < 3) {
          this.setData({
            gong1: list[i].gong,
            hui1: list[i].hui,
            gei1: list[i].gei,
            fan1: list[i].fan
          })
        }
        else {
          this.setData({
            gong2: list[i].gong,
            hui2: list[i].hui,
            gei2: list[i].gei,
            fan2: list[i].fan
          })
        }
      } else {
        list[i].open = false
      }
    }
    this.setData({
      banhuan: list
    });
  },
  //当进入页面时，需要进行获取站点的实时数据
  onLoad: function (opation) {
    var that = this;
    var httpsurl = app.globalData.url + "api/RealTime"
    that.setData({
      arr2: [],
      sort: opation.ch
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: httpsurl,
      data: {
        sort: opation.ch
      },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        // 当token无效时，需要返回界面重新登录
        if (res.data.ErrorMsg == 'Token无效') {
          wx.redirectTo({
            url: '../login/login'
          })
        }
        var arr1temp = [];
        var banhuantemp = [];
        that.setData({
          arr1: [],
          banhuantemp: []
        })
        if (res.data.Succeed == true) {
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
          if (res.data.ErrorMsg == 'Token无效') {
            wx.redirectTo({
              url: '../login/login'
            })
          }
          else {
            if (res.data.Data.sort < 500) {
              console.log(res.data);
              var bhnum = 0;
              // 将数据进行处理，封装
              arr1temp.push({ id: 1, open: false, title: "压力", gong: res.data.Data.A0101.toFixed(2), hui: res.data.Data.A0102.toFixed(2), tu: "../../Image/yali.png" }, { id: 2, open: false, title: "温度", gong: res.data.Data.A0107.toFixed(2), hui: res.data.Data.A0108.toFixed(2), tu: "../../Image/wendu.png" }, { id: 3, open: false, title: "瞬时流量", gong: res.data.Data.A0103.toFixed(2), hui: res.data.Data.A0105.toFixed(2), tu: "../../Image/shunshi.png" }, { id: 4, open: false, title: "累计流量", gong: res.data.Data.A0104.toFixed(1), hui: res.data.Data.A0106.toFixed(1), tu: "../../Image/leiji.png" })

              if (res.data.Data.A0121 != null) {
                banhuantemp.push({ id: 1, open: false, gong: res.data.Data.A0211.toFixed(2), hui: res.data.Data.A0212.toFixed(2), gei: res.data.Data.A0121.toFixed(2), fan: res.data.Data.A0131.toFixed(2) })
                bhnum = 1
              }
              if (res.data.Data.A0122 != null) {
                banhuantemp.push({ id: 2, open: false, gong: res.data.Data.A0221.toFixed(2), hui: res.data.Data.A0222.toFixed(2), gei: res.data.Data.A0122.toFixed(2), fan: res.data.Data.A0132.toFixed(2) })
                bhnum = 2
              }
              if (res.data.Data.A0123 != null) {
                banhuantemp.push({ id: 3, open: false, gong: res.data.Data.A0231.toFixed(2), hui: res.data.Data.A0232.toFixed(2), gei: res.data.Data.A0123.toFixed(2), fan: res.data.Data.A0133.toFixed(2) })
                bhnum = 3
              }
              if (res.data.Data.A0124 != null) {
                banhuantemp.push({ id: 4, open: false, gong: res.data.Data.A0241.toFixed(2), hui: res.data.Data.A0242.toFixed(2), gei: res.data.Data.A0124.toFixed(2), fan: res.data.Data.A0134.toFixed(2) })
                bhnum = 4
              }
              if (res.data.Data.A0125 != null) {
                banhuantemp.push({ id: 5, open: false, gong: res.data.Data.A0251.toFixed(2), hui: res.data.Data.A0252.toFixed(2), gei: res.data.Data.A0125.toFixed(2), fan: res.data.Data.A0135.toFixed(2) })
                bhnum = 5
              }
              if (res.data.Data.A0126 != null) {
                banhuantemp.push({ id: 6, open: false, gong: res.data.Data.A0261.toFixed(2), hui: res.data.Data.A0262.toFixed(2), gei: res.data.Data.A0126.toFixed(2), fan: res.data.Data.A0136.toFixed(2) })
                bhnum = 6
              }
            }
            else {
              arr1temp.push({ id: 1, open: false, title: "压力", gong: res.data.Data.A0101.toFixed(2), tu: "../../Image/yali.png" }, { id: 2, open: false, title: "温度", gong: res.data.Data.A0107.toFixed(2), tu: "../../Image/wendu.png" }, { id: 3, open: false, title: "瞬时流量", gong: res.data.Data.A0103.toFixed(2), tu: "../../Image/shunshi.png" }, { id: 4, open: false, title: "累计流量", gong: res.data.Data.A0104.toFixed(1), tu: "../../Image/leiji.png" })
            }
          }
          that.setData({
            ch: res.data.Data.station_ch.replace(/ /g, ''),
            sort: res.data.Data.sort,
            arr1: arr1temp,
            bhnum: bhnum
          });
          if (res.data.Data.sort < 500) {
            that.setData({
              banhuan: banhuantemp
            });
          }
        }
        else {
          that.setData({
            ch: res.data.ErrorMsg
          })
        }
        // wx.hideNavigationBarLoading()
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    var httpsurl = app.globalData.url + "api/RealTime"
    var ch = this.data.sort
    that.setData({
      arr2: []
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: httpsurl,
      data: {
        sort: ch
      },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        // 当token无效时，需要返回界面重新登录
        if (res.data.ErrorMsg == 'Token无效') {
          wx.redirectTo({
            url: '../login/login'
          })
        }
        var arr1temp = [];
        var banhuantemp = [];
        that.setData({
          arr1: [],
          banhuantemp: []
        })
        if (res.data.Succeed == true) {
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
          if (res.data.ErrorMsg == 'Token无效') {
            wx.redirectTo({
              url: '../login/login'
            })
          }
          else {
            if (res.data.Data.sort < 500) {
              console.log(res.data);
              var bhnum = 0;
              // 将数据进行处理，封装
              arr1temp.push({ id: 1, open: false, title: "压力", gong: res.data.Data.A0101.toFixed(2), hui: res.data.Data.A0102.toFixed(2), tu: "../../Image/yali.png" }, { id: 2, open: false, title: "温度", gong: res.data.Data.A0107.toFixed(2), hui: res.data.Data.A0108.toFixed(2), tu: "../../Image/wendu.png" }, { id: 3, open: false, title: "瞬时流量", gong: res.data.Data.A0103.toFixed(2), hui: res.data.Data.A0105.toFixed(2), tu: "../../Image/shunshi.png" }, { id: 4, open: false, title: "累计流量", gong: res.data.Data.A0104.toFixed(1), hui: res.data.Data.A0106.toFixed(1), tu: "../../Image/leiji.png" })

              if (res.data.Data.A0121 != null) {
                banhuantemp.push({ id: 1, open: false, gong: res.data.Data.A0211.toFixed(2), hui: res.data.Data.A0212.toFixed(2), gei: res.data.Data.A0121.toFixed(2), fan: res.data.Data.A0131.toFixed(2) })
                bhnum = 1
              }
              if (res.data.Data.A0122 != null) {
                banhuantemp.push({ id: 2, open: false, gong: res.data.Data.A0221.toFixed(2), hui: res.data.Data.A0222.toFixed(2), gei: res.data.Data.A0122.toFixed(2), fan: res.data.Data.A0132.toFixed(2) })
                bhnum = 2
              }
              if (res.data.Data.A0123 != null) {
                banhuantemp.push({ id: 3, open: false, gong: res.data.Data.A0231.toFixed(2), hui: res.data.Data.A0232.toFixed(2), gei: res.data.Data.A0123.toFixed(2), fan: res.data.Data.A0133.toFixed(2) })
                bhnum = 3
              }
              if (res.data.Data.A0124 != null) {
                banhuantemp.push({ id: 4, open: false, gong: res.data.Data.A0241.toFixed(2), hui: res.data.Data.A0242.toFixed(2), gei: res.data.Data.A0124.toFixed(2), fan: res.data.Data.A0134.toFixed(2) })
                bhnum = 4
              }
              if (res.data.Data.A0125 != null) {
                banhuantemp.push({ id: 5, open: false, gong: res.data.Data.A0251.toFixed(2), hui: res.data.Data.A0252.toFixed(2), gei: res.data.Data.A0125.toFixed(2), fan: res.data.Data.A0135.toFixed(2) })
                bhnum = 5
              }
              if (res.data.Data.A0126 != null) {
                banhuantemp.push({ id: 6, open: false, gong: res.data.Data.A0261.toFixed(2), hui: res.data.Data.A0262.toFixed(2), gei: res.data.Data.A0126.toFixed(2), fan: res.data.Data.A0136.toFixed(2) })
                bhnum = 6
              }
            }
            else {
              arr1temp.push({ id: 1, open: false, title: "压力", gong: res.data.Data.A0101.toFixed(2), tu: "../../Image/yali.png" }, { id: 2, open: false, title: "温度", gong: res.data.Data.A0107.toFixed(2), tu: "../../Image/wendu.png" }, { id: 3, open: false, title: "瞬时流量", gong: res.data.Data.A0103.toFixed(2), tu: "../../Image/shunshi.png" }, { id: 4, open: false, title: "累计流量", gong: res.data.Data.A0104.toFixed(1), tu: "../../Image/leiji.png" })
            }
          }
          that.setData({
            ch: res.data.Data.station_ch.replace(/ /g, ''),
            sort: res.data.Data.sort,
            arr1: arr1temp,
            bhnum: bhnum
          });
          if (res.data.Data.sort < 500) {
            that.setData({
              banhuan: banhuantemp
            });
          }
        }
        else {
          that.setData({
            ch: res.data.ErrorMsg
          })
        }
        // wx.hideNavigationBarLoading()
      }
    })
    wx.stopPullDownRefresh()
  }
})