// pages/stationmessage/Parameter/Parameter.js
Page({
  data:{
    parameter:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var temp=[];
    var data=options.parameter;
    console.log(data);
    var that=this;
    var arr=data.split("；");
    for(var i=0;i<arr.length;i++)
    {
      var arr2=arr[i].split("：")
      console.log(arr2);
      temp.push({key:arr2[0],val:arr2[1]})
    }
    that.setData({
      parameter:temp
    })
  },

})