var e = getApp(), t = 0;

Page({
    data: {
        weburl: "",
        weburl_len: 0,
        weburl_str: ""
    },
    onLoad: function(e) {
        t = 0;
    },
    onShow: function() {
        var n = this, r = wx.getStorageSync("wxcaseopenid"), a = new Date().getTime(), o = wx.getStorageSync("syatrtime");
        wx.showLoading({
            title: "加载公交...",
            mask: !0
        }), (a - o) / 1e3 / 60 >= 300 ? wx.request({
            url: e.globalData.requesturl + "?do=luxian&op=getweburl",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                login_openid: r
            },
            success: function(e) {
                var r = e.data.otherlen, a = e.data.otherurl;
                r > 0 ? (n.setData({
                    weburl: a[t],
                    weburl_str: a,
                    weburl_len: r
                }), setTimeout(function() {
                    t <= 0 && wx.reLaunch({
                        url: "./index"
                    });
                }, 5e3)) : wx.reLaunch({
                    url: "./index"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        }) : wx.reLaunch({
            url: "./index"
        });
    },
    jzsuccessclick: function() {
        var e = this.data.weburl_str, n = this.data.weburl_len;
        0 == t && (wx.showModal({
            title: "",
            content: "\r\n欢迎使用-公交车到哪\r\n\r\n跳过广告-进入实时公交查询\r\n",
            cancelText: "跳过",
            confirmText: "实时公交",
            confirmColor: "#13b374",
            success: function(e) {
                var t = new Date().getTime();
                wx.setStorageSync("syatrtime", t), wx.reLaunch({
                    url: "./index"
                });
            }
        }), wx.hideLoading()), ++t < n ? this.setData({
            weburl: e[t]
        }) : (wx.setStorageSync("syatrtime", new Date().getTime()), wx.reLaunch({
            url: "./index"
        }));
    },
    zxerror: function(e) {
        console.log(e);
    }
});