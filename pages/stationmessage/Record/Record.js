// pages/stationmessage/Record/Record.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    record: []
  },
  onLoad: function (options) {
    var equipmentid = options.EquipmentId
    console.log("equipmentid", equipmentid)
    var that = this
    var weixiudan, weixiujilu
    var renyuan
    var id
    var data = []
    for (var k = app.globalData.weixiudan.length - 1; k >= 0; k--) {
      if (equipmentid == app.globalData.weixiudan[k].EquipmentId) {
        if (app.globalData.weixiudan[k].Status == "已维修" || app.globalData.weixiudan[k].Status == "已评价") {
          weixiudan = app.globalData.weixiudan[k]
          console.log(weixiudan)
          for (var i = app.globalData.weixiujilu.length - 1; i > -1; i--) {
            if (app.globalData.weixiujilu[i].MaintenanceId == weixiudan.MaintenanceId) {
              weixiujilu = app.globalData.weixiujilu[i]
              break
            }
          }
          for (var i = 0; i < app.globalData.weixiurenyuan.length; i++) {
            if (app.globalData.weixiurenyuan[i].EquipmentId == weixiujilu.EquipmentId) {
              renyuan = app.globalData.weixiurenyuan[i]
            }
          }
          data.push({ CientTel: weixiudan.CientTel, Client: weixiudan.Client, servername: renyuan.RealName, servertle: renyuan.Mobile, ClientCost: weixiujilu.ClientCost, CompanyCost: weixiujilu.CompanyCost, time3: util.formatTime(weixiujilu.CreateDate), Question: weixiujilu.Question, Note: weixiujilu.Note })
        }
      }
    }
    that.setData({
      record: data
    })
  },

})