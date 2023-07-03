var t = getApp();

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
    dingweiop: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载...",
            mask: !0
        }), wx.getLocation({
            type: "gcj02",
            complete: function(e) {
                "getLocation:ok" == e.errMsg ? (t.setData({
                    dingwei_flag: 1
                }), wx.setStorageSync("xclat", e.latitude), wx.setStorageSync("xclng", e.longitude), 
                t.initfun(e.latitude, e.longitude)) : (t.setData({
                    dingwei_flag: 2
                }), wx.hideLoading());
            }
        });
    },
    initfun: function(t, e) {
        var a = this, i = (wx.getStorageSync("wxcaseopenid"), wx.getStorageSync("wxcityid"), 
        wx.getStorageSync("cityname"));
        wx.request({
            url: "https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(" + t + "," + e + ",1500)&page_size=20&page_index=1&keyword=%E5%85%AC%E4%BA%A4&orderby=_distance&key=SOTBZ-IKIAK-3JWJE-ANKXQ-2G6OT-MNB5N&",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success: function(t) {
                console.log(t), 0 == t.data.status ? i == t.data.data[0].ad_info.city || i == t.data.data[0].ad_info.district ? a.luxian_query(t.data.data) : (a.setData({
                    dingwei_flag: 3,
                    cityname: i,
                    nowcityname: t.data.data[0].ad_info.city
                }), wx.hideLoading()) : (a.setData({
                    luxianstr: ""
                }), wx.hideLoading());
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
    luxian_query: function(e) {
        var a = this, i = wx.getStorageSync("wxcityid");
        wx.showLoading({
            title: "正在加载...",
            mask: !0
        });
        var n = [ e[0], e[1], e[2] ];
        wx.request({
            url: t.globalData.requesturl + "?do=luxian&op=fujinlist",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                elemt1: n[0].address,
                elemt2: n[1].address,
                elemt3: n[2].address,
                cityid: i
            },
            success: function(t) {
                n[0].tel = t.data[0], n[1].tel = t.data[1], n[2].tel = t.data[2], a.setData({
                    luxianzjl: n
                }), wx.hideLoading();
            }
        }), e.splice(0, 3), a.setData({
            luxianstr: e
        });
    },
    dingwei2: function() {
        var e = this;
        wx.getStorageSync("wxcityid"), wx.getStorageSync("noqhcityid");
        wx.getLocation({
            type: "gcj02",
            complete: function(a) {
                "getLocation:ok" == a.errMsg ? (wx.showLoading({
                    title: "正在加载...",
                    mask: !0
                }), wx.request({
                    url: t.globalData.requesturl + "?do=luxian&op=dingweicity",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: {
                        latitude: a.latitude,
                        longitude: a.longitude
                    },
                    success: function(t) {
                        1 == t.data.status ? (wx.hideLoading(), wx.setStorageSync("wxcityid", t.data.cityss.cityid), 
                        wx.setStorageSync("cityname", t.data.cityss.cityname), e.setData({
                            dingwei_flag: 1
                        }), wx.setStorageSync("xclat", a.latitude), wx.setStorageSync("xclng", a.longitude), 
                        e.initfun(a.latitude, a.longitude)) : wx.showToast({
                            title: res.data.msg,
                            icon: "none",
                            duration: 2e3
                        });
                    }
                })) : e.setData({
                    dingwei_flag: 2
                });
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
    onShareAppMessage: function() {
        return {
            title: "我发现一款非常精准的公交查询平台推荐给您",
            path: "pages/index/zzz_webview",
            imageUrl: t.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    }
});