//获取应用实例
var app = getApp()
Page({
  data: {
    weixiudata: [],
    appointmentNum: 5,
    hasData: true,
    navTab: ["待受理", "已受理", "待评价", "已评价"],
    nickName: "",
    phoneNum: '18202801506',
    url: '/Image/zhandian2.png',
    statusImage: ['/Image/weiwancheng.png', '/Image/wancheng.png'],
    currentNavtab: 1,
    statusText: ['已上报待受理', '已受理待维修', '已维修待评价', '已完成'],
    startPoint: [0, 0],
    updatemaintence: [
      // { id: 123456789, clientTel: '15757126213', name: '天伦盛世', date: '2017-01-02 11:44', client: '王Sir', suittime: '8点到17点' },
      // { id: 987654321, clientTel: '15757126213', name: '天伦盛世', date: '2017-01-02 11:44', client: '赵Sir', suittime: '8点到17点' }
    ],
    acceptmaintence: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小钱', sercicertel: '1575126212' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小孙', sercicertel: '1575126212' }
    ],
    waiteluvation: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小钱', maintencetime: '2.5h' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小孙', maintencetime: '2.5h' }
    ],
    eluvation: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', lever: '满意', servicer: '小钱' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', lever: '不满意', servicer: '小孙' }
    ],
  },



  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },


  callEvent: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  },


  update: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'update/update?id=' + id,
    })

  },
  accept: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'accept/accept?id=' + id,
    })
  },
  eluvation: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'eluvation/eluvation?id=' + id,
    })
  },
  complete: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'complete/complete?id=' + id,
    })
  },


  // 加载
  onShow: function () {

    var that = this
    //更新数据
    var httpsurl;
    that.setData({
      updatemaintence: [],
      acceptmaintence: [],
      waiteluvation: [],
      eluvation: [],
      nickName: app.globalData.userdata.Data.UserName
    })

    var updatemaintence = []
    var acceptmaintence = []
    var waiteluvation = []
    var eluvation = []

    var equipment = app.globalData.equipmentdata
    var maintence = app.globalData.weixiudan
    var renyuan = app.globalData.weixiurenyuan
    var weixiujilu = app.globalData.weixiujilu
    var pingjia = app.globalData.weixiupingjia

    for (var i = 0; i < maintence.length; i++) {
      if (maintence[i].Status == "未受理") {
        for (var k = 0; k < equipment.length; k++) {
          if (equipment[k].EquipmentId == maintence[i].EquipmentId) {
            updatemaintence.push({ MaintenanceId: maintence[i].MaintenanceId, Client: maintence[i].Client, CientTel: maintence[i].CientTel, SuitTime: maintence[i].SuitTime, shebei: equipment[k].Name + equipment[k].KSID })
          }
        }
      }
      if (maintence[i].Status == "受理") {
        for (var k = 0; k < equipment.length; k++) {
          if (equipment[k].EquipmentId == maintence[i].EquipmentId) {
            for (var j = 0; j < renyuan.length; j++) {
              if (renyuan[j].MaintenanceId == maintence[i].MaintenanceId) {
                acceptmaintence.push({ MaintenanceId: renyuan[j].MaintenanceId, CientTel: maintence[i].CientTel, shebei: equipment[k].Name + equipment[k].KSID, Mobile: renyuan[j].Mobile, RealName: renyuan[j].RealName })
                break
              }
            }
          }

        }

      }
      if (maintence[i].Status == "已维修") {
        for (var k = 0; k < equipment.length; k++) {
          if (equipment[k].EquipmentId == maintence[i].EquipmentId) {
            for (var j = weixiujilu.length - 1; j >= 0; j--) {
              if (weixiujilu[j].MaintenanceId == maintence[i].MaintenanceId) {
                waiteluvation.push({ MaintenanceId: weixiujilu[j].MaintenanceId, CientTel: maintence[i].CientTel, shebei: equipment[k].Name + equipment[k].KSID, Evaluation: weixiujilu[j].Evaluation, Question: weixiujilu[j].Question })
                break
              }
            }
          }
        }
      }
      if (maintence[i].Status == "已评价") {
        for (var k = 0; k < equipment.length; k++) {
          if (equipment[k].EquipmentId == maintence[i].EquipmentId) {
            for (var j = 0; j < pingjia.length; j++) {
              if (pingjia[j].MaintenanceId == maintence[i].MaintenanceId) {
                eluvation.push({ MaintenanceId: maintence[i].MaintenanceId, CientTel: maintence[i].CientTel, shebei: equipment[k].Name + equipment[k].KSID, Lever: pingjia[j].Lever, Description: pingjia[j].Description })
              }
            }
          }
        }
        
      }
    }
    
    that.setData({
      updatemaintence: updatemaintence,
      acceptmaintence: acceptmaintence,
      waiteluvation: waiteluvation,
      eluvation: eluvation
    })

  }
})
