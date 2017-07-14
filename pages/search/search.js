var arr = require('../../utils/data').data.arr
Page({
    data: {
        value: "",
        arr1: [

        ]
    },
    //当input变化是运行
    inputfunc: function (e) {
        var that = this;
        var value = e.detail.value;
        const length = arr.length;
        //清空原来的数据
        this.setData({
            arr1: []
        })
        //增加符合条件的数据
        for (let i = length - 1; i >= 0; i--) {
            var temp = arr[i];
            if (value == temp.id || value == temp.zimu.substring(0, value.length) || value == temp.ch.substring(0, value.length)) {
                if (value.length != 0) {
                    this.data.arr1 = [{ id: temp.id, zimu: temp.zimu, ch: temp.ch }].concat(this.data.arr1);
                    this.setData({
                        arr1: this.data.arr1
                    })
                }
            }
        }
    },
    // 当跳转时运行
    clear: function () {
        this.setData({
            arr1: [],
            value: ""
        })
    },
    input: function () {
        this.setData({
            value: e.detail.value
        })
    }
})