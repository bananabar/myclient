// pages/baoxiu/baoxiu.js
var app = getApp();
Page({
  data: {
    EquipmentId: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      EquipmentId: options.EquipmentId
    })
    console.log(options.EquipmentId)
  },
  bindEquipmentChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      EquipmentIndex: e.detail.value
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

    var item = {
      EquipmentId: that.data.EquipmentId,
      Client: result.ConnectPerson,
      CientTel: result.ConnectPhone,
      Note: result.Note,
      Question: result.Question,
      SuitTime: result.SuitTime,
      Status: "未受理",
    }
    console.log(item)
    var httpsurl = app.globalData.url + "api/updateMaintenance/insert";
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      method: "POST",
      data: item,
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log(res)
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
            app.globalData.weixiudan = res.data.Data
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '上传成功',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        })
        
      }
    })
    // var ConnectPerson = result.ConnectPerson;
    // var ConnectPhone = result.ConnectPhone;
    // var Founds = result.Founds;
    // var RegTime = result.RegTime;
    // var ServiceIntroduction = result.ServiceIntroduction;
    // var ServiceName = result.ServiceName;
    // var Size = result.Size;
    // var serviceArea = result.ServiceArea;
    // var province = result.province;
    // var city = result.city;
    // var serviceType = result.ServiceType;
    // var ServiceLocation = province + "-" + city;
    // var ServiceType = serviceType.join(",");
    // var ServiceArea = serviceArea.join(" ");
    // var token = wx.getStorageSync("token");
    // var tempFilePaths = wx.getStorageSync('tempFilePaths');
  }
})