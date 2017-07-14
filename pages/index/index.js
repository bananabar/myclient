//index.js
//获取应用实例
var app = getApp()
var md = require('../../utils/md5.js')
var dt = require('../../utils/data.js')
var utils = require('../../utils/util.js')
Page({
  data: {
    savedFilePath: "",
    username: "",
    password: "",
    username: "",
    code: "",
    // 滚动图
    imgUrls: [
      '../../Image/dianchang.jpg',
      '../../Image/dianchang2.jpg',
    ],
    // 工具第一行
    arr1: [
      { imgurl: '../../Image/notice.png', txt: '公告' },
      { imgurl: '../../Image/data.png', txt: '数据' },
      { imgurl: '../../Image/zhangdan.png', txt: '账单' },
      { imgurl: '../../Image/kefu.png', txt: '客服' },
    ],
    // 工具第二行
    arr2: [
      { imgurl: '../../Image/saoyisao.png', txt: '扫一扫' },
      { imgurl: '../../Image/weixiu.png', txt: '维修' },
      { imgurl: '../../Image/shebei.png', txt: '设备' },
      { imgurl: '../../Image/fankui.png', txt: '反馈' }
    ],
    // 公告
    noticedata: [
      { Title: "实时数据监控系统", PublishTime: "2017-03-22" },
      { Title: "app上线", PublishTime: "2017-02-22" },
      { Title: "热费管理系统上线", PublishTime: "2017-02-11" }
    ]
  },
  onLoad: function () {
    if (wx.showLoading) {
      wx.showLoading()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该APP，请升级到最新微信版本后重试。',
      })
    }
    var that = this
    var httpsurl = app.globalData.url + "gonggao";
    that.setData({
      username: app.globalData.userdata.Data.UserName,
      noticedata: app.globalData.userdata.Data.noticedata,
      code: app.globalData.userdata.Data.Code,
    })
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    
    httpsurl = app.globalData.url + "api/accepMaintenance/listbyuserid"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { userId: app.globalData.userdata.Data.UserId },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("维修人员", res)
        app.globalData.weixiurenyuan = res.data.Data
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
            httpsurl = app.globalData.url + "api/maintenanceRecord/listbyuserid"
            wx.request({
              url: httpsurl, //仅为示例，并非真实的接口地址
              data: { userId: app.globalData.userdata.Data.UserId },
              header: {
                'content-type': 'application/json',
                token: app.globalData.userdata.Data.ObjectId
              },
              success: function (res) {
                console.log("维修记录", res)
                app.globalData.weixiujilu = res.data.Data
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
                    app.globalData.weixiupingjia = res.data.Data
                    httpsurl = app.globalData.url + "api/equipmentInfo/list"
                    wx.request({
                      url: httpsurl, //仅为示例，并非真实的接口地址
                      data: { userId: app.globalData.userdata.Data.UserId },
                      header: {
                        'content-type': 'application/json',
                        token: app.globalData.userdata.Data.ObjectId
                      },
                      success: function (res) {
                        console.log("设备信息", res)
                        app.globalData.equipmentdata = res.data.Data
                        setTimeout(function () {
                          wx.hideLoading()
                        }, 1000)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    var httpsurl = app.globalData.url + "api/accepMaintenance/listbyuserid"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { userId: app.globalData.userdata.Data.UserId },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("维修人员", res)
        app.globalData.weixiurenyuan = res.data.Data
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
            httpsurl = app.globalData.url + "api/maintenanceRecord/listbyuserid"
            wx.request({
              url: httpsurl, //仅为示例，并非真实的接口地址
              data: { userId: app.globalData.userdata.Data.UserId },
              header: {
                'content-type': 'application/json',
                token: app.globalData.userdata.Data.ObjectId
              },
              success: function (res) {
                console.log("维修记录", res)
                app.globalData.weixiujilu = res.data.Data
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
                    app.globalData.weixiupingjia = res.data.Data
                    httpsurl = app.globalData.url + "api/equipmentInfo/list"
                    wx.request({
                      url: httpsurl, //仅为示例，并非真实的接口地址
                      data: { userId: app.globalData.userdata.Data.UserId },
                      header: {
                        'content-type': 'application/json',
                        token: app.globalData.userdata.Data.ObjectId
                      },
                      success: function (res) {
                        console.log("设备信息", res)
                        app.globalData.equipmentdata = res.data.Data
                        setTimeout(function () {
                          wx.hideLoading()
                        }, 1000)
                        wx.stopPullDownRefresh()
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },




  kindToggle: function (e) {
    var txt = e.currentTarget.id;
    var code = this.data.code;
    var httpsurl = app.globalData.url;
    var url1 = '../detail/detail?ch=' + code.slice(2);
    switch (txt) {
      case '公告':
        wx.navigateTo({
          url: '../notice/notice'
        });
        break;
      case '数据':
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
        break;
      case '账单':
        wx.navigateTo({
          url: '../zhangdan/zhangdan?id=' + code.slice(2),
        })
        break;
      case '客服':
        wx.navigateTo({
          url: '../custom-message/custom-message'
        });
        break;
      case '扫一扫':
        wx.scanCode({
          success: (res) => {
            console.log(res)
            var url = '../stationmessage/stationmessage?id=' + res.result
            wx.navigateTo({
              url: url
            });
          }
        });
        break;
      case '维修':
        wx.navigateTo({
          url: '../weixiujilu/weixiujilu'
        });
        break;
      case '反馈':
        wx.navigateTo({
          url: '../fankui/fankui'
        });
        break;
      case '设备':
        wx.navigateTo({
          url: '../equipment/equipment'
        });
        break;
    }
  },
  //打开pdf公告
  opennoticepdf: function () {
    var that = this
    var filePath = 'https://rw.oupusoft.com/gonggao/' + "11dae6aa-4283-44fc-a2ef-e4f2b0600ac5.pdf"
    wx.downloadFile({
      url: filePath,
      success: function (res) {
        console.log("保存前", res.tempFilePath)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath
            console.log("保存后", savedFilePath)
            that.setData({
              savedFilePath: savedFilePath
            })
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      }
    })
  },
  opennoticepdf2: function () {
    var httpsurl = app.globalData.url + "api/uploadFile/insert"
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: httpsurl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            token: app.globalData.userdata.Data.ObjectId
          },
          formData: {
            filename: 'test'
          },
          success: function (res) {
            console.log("succee", res)
            //do something
          },
          fail: function (res) {
            console.log("fail", res)
          }
        })
      }
    })
  }
})