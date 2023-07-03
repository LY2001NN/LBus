var e = getApp();

Page({
    data: {
        luxianstr: "",
        dingwei_flag: 0,
        cityname: "",
        nowcityname: "",
        dingwei_address_title: ""
    },
    onLoad: function() {
        this.dingweiop();
    },
    // dingweiop: function() {
    //     var t = this;
    //     wx.showLoading({
    //         title: "正在加载...",
    //         mask: !0
    //     }), wx.getLocation({
    //         type: "gcj02",
    //         complete: function(e) {
    //             "getLocation:ok" == e.errMsg ? (wx.setNavigationBarTitle({
    //                 title: "附近公交站点"
    //             }), t.setData({
    //                 dingwei_flag: 1
    //             }), wx.setStorageSync("xclat", e.latitude), wx.setStorageSync("xclng", e.longitude), 
    //             t.initfun(e.latitude, e.longitude)) : (wx.setNavigationBarTitle({
    //                 title: "位置获取失败，请允许小程序获取位置信息"
    //             }), t.setData({
    //                 dingwei_flag: 2
    //             }), wx.hideLoading(), wx.stopPullDownRefresh());
    //         }
    //     });
    // },
    dingweiop: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载...",
            mask: !0
        }), wx.chooseLocation({
            type: "gcj02",
            complete: function(e) {
                "chooseLocation:ok" == e.errMsg ? (wx.setNavigationBarTitle({
                    title: "附近公交站点"
                }), 
                t.setData({
                    dingwei_flag: 1
                }), 
                wx.setStorageSync("xclat", e.latitude), wx.setStorageSync("xclng", e.longitude), 
                t.initfun(e.latitude, e.longitude)) : (wx.setNavigationBarTitle({
                    title: "位置获取失败，请允许小程序获取位置信息"
                }), 
                t.setData({
                    dingwei_flag: 2
                }), wx.hideLoading(), wx.stopPullDownRefresh());
            }
        });
    },
    initfun: function(t, e) {
        var a = this, 
        i = (wx.getStorageSync("wxcaseopenid"), wx.getStorageSync("wxcityid"), wx.getStorageSync("cityname"));
        wx.request({
            url: "https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(" + t + "," + e + ",1500)&page_size=20&page_index=1&keyword=%E5%85%AC%E4%BA%A4&orderby=_distance&key=SOTBZ-IKIAK-3JWJE-ANKXQ-2G6OT-MNB5N&",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success: function(t) {
                console.log("t.data: " + t.data),
                0 == t.data.status ? i == t.data.data[0].ad_info.city ? a.setData({
                    luxianstr: t.data.data
                }) : a.setData({
                    dingwei_flag: 3,
                    cityname: i,
                    nowcityname: t.data.data[0].ad_info.city
                }) : a.setData({
                    luxianstr: ""
                }), wx.hideLoading(), wx.stopPullDownRefresh();
            },
            fail: function(t) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 2e3
                }), wx.stopPullDownRefresh();
            }
        });
    },
    dingwei2: function() {
        var a = this;
        wx.getStorageSync("wxcityid"), wx.getStorageSync("noqhcityid");
        wx.getLocation({
            type: "gcj02",
            complete: function(i) {
                "getLocation:ok" == i.errMsg ? (wx.showLoading({
                    title: "正在加载...",
                    mask: !0
                }), wx.request({
                    url: e.globalData.requesturl + "?do=luxian&op=dingweicity",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: {
                        latitude: i.latitude,
                        longitude: i.longitude
                    },
                    success: function(t) {
                        1 == t.data.status ? (wx.hideLoading(), wx.setStorageSync("wxcityid", t.data.cityss.cityid), 
                        wx.setStorageSync("cityname", t.data.cityss.cityname), a.onShow()) : wx.showToast({
                            title: res.data.msg,
                            icon: "none",
                            duration: 2e3
                        });
                    }
                })) : (wx.setNavigationBarTitle({
                    title: "位置获取失败，请允许小程序获取位置信息"
                }), t.setData({
                    dingwei_flag: 2
                }));
            }
        });
    },
    open_seting: function() {
        wx.openSetting({
            success: function(t) {
                console.log(t.authSetting);
            }
        });
    },
    onPullDownRefresh: function() {
        this.dingweiop();
    },
    onShareAppMessage: function() {
        return {
            title: "我发现一款非常精准的公交查询平台推荐给您",
            path: "pages/index/zzz_webview",
            imageUrl: e.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    }
});