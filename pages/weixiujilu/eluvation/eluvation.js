// pages/weixiujilu/accept/accept.js
var app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    data1: [
      
    ],
    data2: [
      
    ],
    data3:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    that.setData({
      id:id
    })
    console.log(id)
    var maintence = 0
    var renyuan = []
    var weixiujilu,weixiudan
    for (var i = 0; i < app.globalData.weixiujilu.length; i++) {
      if (id == app.globalData.weixiujilu[i].MaintenanceId) {
        weixiujilu = app.globalData.weixiujilu[i]
        break
      }
    }
    for (var i = 0; i < app.globalData.weixiudan.length; i++) {
      if (id == app.globalData.weixiudan[i].MaintenanceId) {
        weixiudan = app.globalData.weixiudan[i]
        break
      }
    }
    for (var i = app.globalData.weixiurenyuan.length - 1; i > -1 ; i--) {
      if (id == app.globalData.weixiurenyuan[i].MaintenanceId) {
        renyuan.push({ name: app.globalData.weixiurenyuan[i].RealName, telephone: app.globalData.weixiurenyuan[i].Mobile, time: app.globalData.weixiurenyuan[i].CreateDate })
      }
    }
    that.setData({
      data1: [
        { key: "报修人电话", val: weixiudan.CientTel },
        { key: "报修人姓名", val: weixiudan.Client },
        { key: "维修完成时间", val: util.formatTime(weixiujilu.CreateDate) },
        { key: "客户承担费用", val: weixiujilu.ClientCost+"元" },
        { key: "公司承担费用", val: weixiujilu.CompanyCost+"元" },
        { key: "订单状态", val: "已维修" },

      ],
      data2: [
        { key: "设备问题描述", val: weixiujilu.Question },
        { key: "备注", val: weixiujilu.Note }
      ],
      data3: renyuan
    })
  },

  confirm: function(){
    wx.navigateTo({
      url: '../starteluvation/starteluvation?id='+this.data.id,
    })
  }
})