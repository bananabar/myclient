var app = getApp();

Page({
  data: {
    cache: [
      { iconurl: '/Image/kefu.png', title: '联系客服', tap: 'kefu' },
      { iconurl: '/Image/fankui.png', title: '意见反馈', tap: 'fankui'},
      { iconurl: '/Image/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' },
      { iconurl: '/Image/icon/tuichu.png', title: '退出登录', tap: 'quitCache' },
      { iconurl: '/Image/aboutme.png', title: '关于我们', tap: 'aboutme' }
    ],
    device: [
      { iconurl: '/Image/notice.png', title: '通知公告', tap: 'gonggao' },
      { iconurl: '/Image/data.png', title: '实时数据', tap: 'shuju' },
      { iconurl: '/Image/zhangdan.png', title: '热费账单', tap: 'zhangdan' },
      { iconurl: '/Image/shebei.png', title: '设备信息', tap: 'equipment' },
      { iconurl: '/Image/icon/wx_app_lonlat.png', title: '维修情况', tap: 'weixiudan' }
     
    ],
   
    avatarUrl:'',
    userInfo:{}
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userdata.Data,
      avatarUrl: app.globalData.g_userInfo.avatarUrl
    })
  },


// 退出登录
  quitCache: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },
  //联系客服
  kefu: function(){
    wx.navigateTo({
      url: '../custom-message/custom-message',
    })
  },
  //关于我们
  aboutme: function(){
    wx.navigateTo({
      url: 'aboutme/aboutme',
    })
  },
  //实时数据查询
  shuju: function(){
    var code = this.data.userInfo.Code
    var url1 = '../detail/detail?ch=' + code.slice(2);
    if (code.substr(0, 2) == 'YH') {
      wx.navigateTo({
        url: url1
      })
    }
    else {
      wx.navigateTo({
        url: '../search/search'
      })
    }
  },
  //账单查询
  zhangdan: function(){
    wx.navigateTo({
      url: '../zhangdan/zhangdan?id=' + this.data.userInfo.Code.slice(2),
    })
  },
  //设备信息
  equipment:function(){
    wx.navigateTo({
      url: '../equipment/equipment',
    })
  },
  //维修单
  weixiudan: function(){
    wx.navigateTo({
      url: '../weixiujilu/weixiujilu',
    })
  },
  //公告
  gonggao:function(){
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  //用户信息
  userInfo:function(){
    wx.navigateTo({
      url: 'userinfo/userinfo',
    })
  },
  //意见反馈
  fankui:function(){
    wx.navigateTo({
      url: '../fankui/fankui',
    })
  }


})