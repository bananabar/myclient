// pages/weixiujilu/accept/accept.js
var app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updatedata1: [
      { key: "订单编号", val: '12345678988' },
      { key: "联系人电话", val: '13991265566' },
      { key: "联系人姓名", val: '水岸东方' },
      { key: "维修人员姓名", val: '小王' },
      { key: "维修人员电话", val: '1399165588' },
      { key: "客户承担费用", val: "128元" },
      { key: "公司承担费用", val: "125元" },
      { key: "订单状态", val: '已完成' },
      { key: "评价等级", val: '满意' }
    ],
    date: [
      { key: "上报时间", val: "2017-02-03" },
      { key: "受理时间", val: "2017-02-04" },
      { key: "完成时间", val: "2017-02-04" },
      { key: "评价时间", val: "2017-02-05" },
    ],
    updatedata2: [
      { key: "设备故障描述", val: "就是坏了" },
      { key: "备注", val: "换了就好" },
      { key: "评价内容", val: "很好" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    console.log(id)
    var maintence, pingjia, weixiujilu
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
    for (var i = app.globalData.weixiujilu.length-1; i >-1 ; i--) {
      if (id == app.globalData.weixiujilu[i].MaintenanceId) {
        weixiujilu = app.globalData.weixiujilu[i]
        break
      }
    }
    for (var i = 0; i < app.globalData.weixiupingjia.length; i++) {
      if (id == app.globalData.weixiupingjia[i].MaintenanceId) {
        pingjia = app.globalData.weixiupingjia[i]
        break
      }
    }
    that.setData({
      data1: [
        { key: "报修人电话", val: maintence.CientTel },
        { key: "报修人姓名", val: maintence.Client },
        { key: "客户承担费用", val: weixiujilu.ClientCost + "元" },
        { key: "公司承担费用", val: weixiujilu.CompanyCost + "元" },
        { key: "评价等级", val: pingjia.Lever },
        { key: "订单状态", val: "已完成" },

      ],
      date2: [
        { key: "上报时间", val: util.formatTime(maintence.CreateDate) },
        { key: "受理时间", val: util.formatTime(renyuan[0].time) },
        { key: "完成时间", val: util.formatTime(weixiujilu.CreateDate) },
        { key: "评价时间", val: util.formatTime(pingjia.CreateDate) },
      ],
      data3: [
        { key: "客户评价内容", val: pingjia.Description },
        { key: "设备问题描述", val: weixiujilu.Question },
        { key: "备注", val: weixiujilu.Note }
      ],
      data4: renyuan
    })
  }
})