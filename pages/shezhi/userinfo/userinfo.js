// pages/shezhi/userinfo/userinfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [
      { key: "用户编号", val: 'YH01' },
      { key: "用户名称", val: '天伦盛世' },
      { key: "用户电话", val: '13991265566' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = app.globalData.userdata.Data.UserName
    var code = app.globalData.userdata.Data.Code
    this.setData({
      userInfo: [
        { key: "用户编号", val: code },
        { key: "用户名称", val: name },
        { key: "用户电话", val: '13991265567' },
      ]
    })
  },


})