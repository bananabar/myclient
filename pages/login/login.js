//index.js
//获取应用实例
var app = getApp()
var md = require('../../utils/md5.js')

Page({
  data: {
    username: "",
    password: "",
    isremenpasschecked: false
  },
  bindpassword: function (e) {
    this.data.password = e.detail.value
  },
  bindusername: function (e) {
    this.data.username = e.detail.value
  },
  
  onLoad: function () {
    
    var that = this;
    try {
      //获得保存的用户名，密码
      var value1 = wx.getStorageSync('username')
      var value2 = wx.getStorageSync('pass')
      var value3 = wx.getStorageSync('check')
      that.setData({
        username: value1,
        password: value2,
        isremenpasschecked:value3
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  onReady: function(){
    
  },
  checkboxChange: function(e){
    var value=!this.data.isremenpasschecked
    this.setData({
      isremenpasschecked:value
    })
    console.log(this.data.isremenpasschecked)
  },
  login: function () {
    if (this.data.isremenpasschecked) {
      try {
        //保存用户名，密码
        wx.setStorageSync('username', this.data.username)
        wx.setStorageSync('pass', this.data.password)
        wx.setStorageSync('check', this.data.isremenpasschecked)
      } catch (e) {
      }
    }
    else{
      wx.setStorageSync('user', this.data.username)
      wx.setStorageSync('check', this.data.isremenpasschecked)
      wx.setStorageSync('pass', '')
    }
    var pass = md.hex_md5(this.data.password);
    var username = this.data.username;
    console.log(pass, username);
    var that = this;
    var url=app.globalData.url+"api/login"
    //登录，获得用户后台信息
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: {
        account: username,
        password: pass
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.Succeed) {
          app.globalData.userdata = res.data;
          wx.switchTab({
            url: '../index/index'
          })
        }
        else {
          wx.showModal({
            title: '登录失败',
            content: res.data.ErrorMsg,
          })
        }
      }
    })
  }
})