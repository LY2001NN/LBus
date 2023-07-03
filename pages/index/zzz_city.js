var t = getApp();

Page({
    data: {
        dqlist: [],
        newdqlist: [],
        lat: 0,
        lng: 0
    },
    onLoad: function(t) {
        this.initfun();
    },
    initfun: function() {
        var a = this;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), wx.request({
            url: t.globalData.requesturl + "?do=luxian&op=citylist",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                dddddd: ""
            },
            success: function(t) {
                "1" == t.data.status ? (a.setData({
                    dqlist: t.data.list,
                    newdqlist: t.data.newcity
                }), wx.hideLoading()) : wx.showToast({
                    title: t.data.msg,
                    icon: "none",
                    duration: 2e3
                }), wx.hideLoading();
            },
            fail: function(t) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    selectxca: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.setStorageSync("wxcityid", t.target.dataset.cityid), wx.setStorageSync("cityname", t.target.dataset.city), 
        setTimeout(function() {
            wx.hideLoading(), wx.reLaunch({
                url: "./index"
            });
        }, 200);
    }
});