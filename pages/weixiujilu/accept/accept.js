// pages/weixiujilu/accept/accept.js
var app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1: [
      { key: "订单编号", val: '1245678988' },
      { key: "联系人电话", val: '13991265566' },
      { key: "联系人姓名", val: '水岸东方' },
      { key: "接单时间", val: '2017-12-12' },
      { key: "订单状态", val: '已受理待维修' },
    ],
    data2: [
      { key: "设备问题描述", val: "坏了" },
      { key: "备注", val: "无" }
    ],
    data3: [
      { key: "维修人员姓名", val: '小王' },
      { key: "维修人员电话", val: '1399165588' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    console.log(id)
    var maintence
    var renyuan = []
    for (var i = 0; i < app.globalData.weixiudan.length; i++) {
      if (id == app.globalData.weixiudan[i].MaintenanceId) {
        maintence = app.globalData.weixiudan[i]
        break
      }
    }
    for (var i = app.globalData.weixiurenyuan.length - 1; i > -1; i--) {
      if (id == app.globalData.weixiurenyuan[i].MaintenanceId) {
        renyuan.push({ name: app.globalData.weixiurenyuan[i].RealName, telephone: app.globalData.weixiurenyuan[i].Mobile, time: app.globalData.weixiurenyuan[i].CreateDate })
      }
    }
    that.setData({
      data1: [
        { key: "报修人电话", val: maintence.CientTel },
        { key: "报修人姓名", val: maintence.Client },
        { key: "受理时间", val: util.formatTime(renyuan[0].time) },
        { key: "上门时间", val: maintence.SuitTime },
        { key: "订单状态", val: "受理" },

      ],
      data2: [
        { key: "设备问题描述", val: maintence.Question },
        { key: "备注", val: maintence.Note }
      ],
      data3: renyuan
    })
  },


})