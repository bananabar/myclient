// pages/weixiujilu/starteluvation/starteluvation.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 1, value: '满意', checked: false },
      { id: 2, value: '一般', checked: false },
      { id: 3, value: '不满意', checked: false },

    ],
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id: id
    })
  },

  checkboxChange: function (e) {
    var id = e.detail.value
    var items = this.data.items
    var idd = id.length == 1 ? id[0] : id[1]
    var that = this
    for (var i = 0; i < items.length; i++) {
      items[i].checked = items[i].id != idd ? false : true
    }
    that.setData({
      items: items
    })
  },
  formSubmit: function (e) {
    var that = this
    var result = e.detail.value;
    var auth = true;
    for (var i in result) {
      var obj = result[i];
      if (obj == "") {
        wx.showModal({
          title: '提示',
          content: '请您将认证信息填写完整',
        })
        auth = false;
        return;
      }
    };
    if (!auth) {
      return;
    }
    var level = "满意"

    if (that.data.items[1].checked) {
      level = "一般"
    }
    if (that.data.items[2].checked) {
      level = "不满意"
    }


    var item = {
      MaintenanceId: that.data.id,
      EngineerId: app.globalData.userdata.Data.UserId,
      Lever: level,
      Description: result.neirong
    }
    console.log(item)
    var httpsurl = app.globalData.url + "api/evaluateMaintenance/insert";
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      method: "POST",
      data: item,
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        httpsurl = app.globalData.url + "api/updateMaintenance/listbyuserid"
        wx.request({
          url: httpsurl, //仅为示例，并非真实的接口地址
          data: { userId: app.globalData.userdata.Data.UserId },
          header: {
            'content-type': 'application/json',
            token: app.globalData.userdata.Data.ObjectId
          },
          success: function (res) {
            console.log("维修单", res)
            httpsurl = app.globalData.url + "api/evaluateMaintenance/listbyuserid"
            wx.request({
              url: httpsurl, //仅为示例，并非真实的接口地址
              data: { userId: app.globalData.userdata.Data.UserId },
              header: {
                'content-type': 'application/json',
                token: app.globalData.userdata.Data.ObjectId
              },
              success: function (res) {
                console.log("维修评价", res)
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '上传成功',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 2
                      })
                    }
                  }
                })
                app.globalData.weixiupingjia = res.data.Data
              }
            })
            app.globalData.weixiudan = res.data.Data
          }
        })
      }
    })
  }
})