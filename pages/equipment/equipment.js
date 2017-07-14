// pages/equipment/equipment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Equipmentdata: [],
    ifshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Equipmentdata: app.globalData.equipmentdata,
      ifshow: true
    })
  },
  navigator: function (e) {
    var KSID = e.currentTarget.dataset.id
    console.log(KSID)
    wx.navigateTo({
      url: '../stationmessage/stationmessage?id=' + KSID,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      ifshow: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})