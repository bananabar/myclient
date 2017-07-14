//app.js

var app = getApp();
App({
  onLaunch: function () {
    this._getUserInfo();
    // wx.login();
  },
  _getUserInfo: function () {
    var userInfoStorage = wx.getStorageSync('user');
    if (!userInfoStorage) {
      var that = this;
      wx.login({
        success: function (res) {
          console.log(res)
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.g_userInfo = res.userInfo
              wx.setStorageSync('user', res.userInfo)
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }
    else {
      this.globalData.g_userInfo = userInfoStorage;
    }
  },
  //全局变量
  globalData: {
    userInfo: null,//微信用户信息
    userdata: null,//用户后台信息
    noticedata: null,//公告内容
    g_userInfo: null,
    url: "https://rw.oupusoft.com/",//服务器域名
    // url:"http://localhost/",
    record: null,
    equipmentdata: null,//设备信息
    weixiudan: null,//维修单
    weixiurenyuan: null,//维修人员
    weixiujilu: null,//维修记录
    weixiupingjia: null//维修评价
  }
})