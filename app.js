App({
    onLaunch: function() {
        this.wxlogin();
    },
    wxlogin: function() {
        var t = this;
        "" == wx.getStorageSync("wxcaseopenid") && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), wx.login({
            success: function(a) {
                var o = t.globalData.appid;
                wx.request({
                    url: t.globalData.requesturl + "?do=luxian&op=wxlogin",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: {
                        appid: o,
                        code: a.code
                    },
                    success: function(t) {
                        "1" == t.data.status ? (wx.setStorageSync("wxcaseopenid", t.data.list.openid), wx.hideLoading()) : wx.showToast({
                            title: t.data.msg,
                            image: "none",
                            duration: 2e3
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "请求失败，检查网络~",
                            image: "none",
                            duration: 2e3
                        });
                    }
                });
            }
        }));
    },
    globalData: {
        userInfo: null,
        host: "https://job.dwmm136.cn",
        requesturl: "https://job.dwmm136.cn/z_busapi/bus_shishi.php",
        luxianurl: "https://job.dwmm136.cn/z_busapi/bus_luxian.php",
        otherappurl: "https://job.dwmm136.cn/z_busapi/bus_otherapp.php",
        appid: "wx77a04eb355a50864"
    }
});