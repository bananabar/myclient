var app = getApp()
Page({
    data: {
        title: "",
        detail: "",
        publishtime: "",
        noticedata: {},
        arr:[],
        
    },
    onLoad: function (options) {
        var that = this
        var noticedata = app.globalData.noticedata[options.id]
        // 将得到的公告根据回车进行分割成数组
        var arr = noticedata.Detail.split("\n");
        that.setData({
            noticedata: noticedata,
            arr:arr
        })
    }
})