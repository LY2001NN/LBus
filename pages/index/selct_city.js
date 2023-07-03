var i = getApp();

Page({
    data: {
        orientationList: [ {
            id: "0",
            region: "#"
        }, {
            id: "A",
            region: "A"
        }, {
            id: "B",
            region: "B"
        }, {
            id: "C",
            region: "C"
        }, {
            id: "D",
            region: "D"
        }, {
            id: "F",
            region: "F"
        }, {
            id: "G",
            region: "G"
        }, {
            id: "H",
            region: "H"
        }, {
            id: "J",
            region: "J"
        }, {
            id: "K",
            region: "K"
        }, {
            id: "L",
            region: "L"
        }, {
            id: "M",
            region: "M"
        }, {
            id: "N",
            region: "N"
        }, {
            id: "P",
            region: "P"
        }, {
            id: "Q",
            region: "Q"
        }, {
            id: "R",
            region: "R"
        }, {
            id: "S",
            region: "S"
        }, {
            id: "T",
            region: "T"
        }, {
            id: "W",
            region: "W"
        }, {
            id: "X",
            region: "X"
        }, {
            id: "Y",
            region: "Y"
        }, {
            id: "Z",
            region: "Z"
        } ],
        toView: "inToView01",
        cityid: 0,
        cityname: ""
    },
    scrollToViewFn: function(i) {
        var t = i.target.dataset.id;
        this.setData({
            toView: "inToView" + t
        }), wx.showToast({
            title: t,
            icon: "none",
            duration: 1e3
        });
    },
    onLoad: function(i) {
        var t = wx.getStorageSync("wxcityid"), e = wx.getStorageSync("cityname");
        this.setData({
            cityid: t,
            cityname: e
        }), this.initfun();
    },
    initfun: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), wx.request({
            url: i.globalData.requesturl + "?do=luxian&op=citylist",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                dddddd: ""
            },
            success: function(i) {
                console.log(i), "1" == i.data.status ? (t.setData({
                    act_addList: i.data.citystr
                }), wx.hideLoading()) : wx.showToast({
                    title: i.data.msg,
                    icon: "none",
                    duration: 2e3
                }), wx.hideLoading();
            },
            fail: function(i) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    selectxca: function(i) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.setStorageSync("wxcityid", i.target.dataset.cityid), wx.setStorageSync("cityname", i.target.dataset.city), 
        setTimeout(function() {
            wx.hideLoading(), wx.reLaunch({
                url: "./index"
            });
        }, 300);
    },
    chazhao: function() {
        this.setData({
            kscztype: !this.data.kscztype
        });
    },
    start_query: function(i) {
        var t = i.detail.value.replace(/市/, ""), e = this.data.act_addList, n = [];
        if ("" != t) {
            for (var a = 0; a < e.length; a++) for (var o = e[a].city, d = 0; d < o.length; d++) -1 != o[d].city.indexOf(t) && n.push(o[d]);
            this.setData({
                reslt: n
            }), 0 == n.length && wx.showToast({
                title: "暂无记录或输入有误！",
                icon: "none"
            }), console.log(this.data.act_addList);
        }
    }
});