// pages/zhangdan/zhangdan.js
var dt = require('../../utils/data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    filepath: "",
    leixing: [
      "非供暖期",
      "工业用户",
      "商业用户",
      "居民用户",
      "非居民用户"
    ],
    leixingid:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var name = dt.idtoname(id)
    var leixing = id < 500 ? '热水账单' : '热汽账单'
    var filepath = app.globalData.url + 'zhangdan/' + leixing + '/' + name + '/月账单/'
    this.setData({
      filepath: filepath
    })
    console.log(filepath)
  },

  bindDateChange: function (e) {
    // 获得当月的起始日期和结束日期
    var date = e.detail.value;
    this.setData({
      date: date
    })
  },

  confirm: function () {
    var filename = this.data.leixing[this.data.leixingid]+this.data.date+".jpg"
    var httpsurl = this.data.filepath + filename
    console.log(httpsurl)
    wx.previewImage({
      urls: [httpsurl] // 需要预览的图片http链接列表
    })
  },

  bindPickerChange: function(e) {
    var leixingid = e.detail.value
    console.log("leixingid", leixingid)
    this.setData({
      leixingid : leixingid
    })
  }

})