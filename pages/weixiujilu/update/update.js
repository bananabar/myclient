// pages/weixiujilu/accept/accept.js
var app = getApp()
var util=require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updatedata1: [
      { key: "订单编号", val: '1234567888' },
      { key: "联系人电话", val: '水岸东方' },
      { key: "联系人姓名", val: '13991265566' },
      { key: "上报时间", val: '2017-05-05' },
      { key: "订单状态", val: '未受理' },
    ],
    updatedata2: [
      { key: "设备问题描述", val: "坏了" },
      { key: "备注", val: "无" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    console.log(id)

    for (var i = 0; i < app.globalData.weixiudan.length; i++) {
      if (id == app.globalData.weixiudan[i].MaintenanceId) {
        that.setData({
          updatedata1: [
            { key: "联系人电话", val: app.globalData.weixiudan[i].CientTel },
            { key: "联系人姓名", val: app.globalData.weixiudan[i].Client },
            { key: "上报时间", val: util.formatTime(app.globalData.weixiudan[i].CreateDate) },
            { key: "上门时间", val: app.globalData.weixiudan[i].SuitTime },
            { key: "订单状态", val: "未受理" },

          ],
          updatedata2: [
            { key: "设备问题描述", val: app.globalData.weixiudan[i].Question },
            { key: "备注", val: app.globalData.weixiudan[i].Note }
          ]
        })
      }
    }
  },


})