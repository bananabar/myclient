var app = getApp()
var util = require('../../utils/util.js')
Page({
    data: {
        noticedata: [],
        date: ""
    },
    //查询公告，根据月份查询
    onLoad: function () {
        var that = this
        // 获得当月的起始日期和结束日期
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var day1 = new Date(year, month, 0);
        var date1 = (year.toString() + '-' + month.toString() + '-01');
        var date2 = year + '-' + month + '-' + day1.getDate();
        // 获取当月公告
        this.setData({
            date: (year.toString() + '-' + month.toString())
        })
        var httpsurl = app.globalData.url + "api/announcement/history"
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: httpsurl,
            data: {
                userId: app.globalData.userdata.Data.UserId,
                start: date1,
                end: date2
            },
            header: {
                'content-type': 'application/json',
                token: app.globalData.userdata.Data.ObjectId
            },
            success: function (res) {
                setTimeout(function () {
                    wx.hideLoading()
                }, 500)
                console.log(res.data)
                if (res.data.ErrorMsg == 'Token无效') {
                    wx.redirectTo({
                        url: '../login/login'
                    })
                }
                else {
                    for (var i = 0; i < res.data.Data.length; i++) {
                        res.data.Data[i].PublishTime = util.formatTime(res.data.Data[i].PublishTime)
                    }
                    that.setData({
                        noticedata: res.data.Data
                    })
                }
                app.globalData.noticedata = res.data.Data
                // wx.hideNavigationBarLoading()
            },
        })
    },
    // 当月份改变时运行
    bindDateChange: function (e) {
        // 获得当月的起始日期和结束日期
        var data = e.detail.value;
        var nowyear = data.substr(0, 4);
        var nowmonth = data.substr(5, 2);
        this.setData({
            date: e.detail.value
        })
        var day1 = new Date(nowyear, nowmonth, 0);
        var monthStartDate = (nowyear + '-' + nowmonth + '-01');
        var monthEndDate = nowyear + '-' + nowmonth + '-' + day1.getDate();
        console.log(monthStartDate, monthEndDate)
        var that = this
        var httpsurl = app.globalData.url + "api/announcement/history"
        wx.showNavigationBarLoading();
        // 获取当月公告
        wx.request({
            url: httpsurl,
            data: {
                userId: app.globalData.userdata.Data.UserId,
                start: monthStartDate,
                end: monthEndDate
            },
            header: {
                'content-type': 'application/json',
                token: app.globalData.userdata.Data.ObjectId
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.ErrorMsg == 'Token无效') {
                    wx.redirectTo({
                        url: '../login/login'
                    })
                }
                else {
                    for (var i = 0; i < res.data.Data.length; i++) {
                        res.data.Data[i].PublishTime = util.formatTime(res.data.Data[i].PublishTime)
                    }
                    that.setData({
                        noticedata: res.data.Data
                    })
                }
                app.globalData.noticedata = res.data.Data
                wx.hideNavigationBarLoading()
            },
        })
    }
    //pdf文档
    // bindview: function (event) {
    //     console.log(event)
    //     var filePath = 'https://oupusoft.asuscomm.com' + event.currentTarget.id
    //     wx.downloadFile({
    //         url: filePath,
    //         success: function (res) {
    //             wx.openDocument({
    //                 filePath: res.tempFilePath,
    //                 success: function (res) {
    //                     console.log('打开文档成功')
    //                 }
    //             })
    //         }
    //     })
    // }
})