var t = getApp(), e = null;

require("../util/crypto.js");

Page({
    data: {
        cityid: "021",
        cityname: "城市",
        keyworks: "",
        resultlist: "",
        busrev: "",
        showTip: wx.getStorageSync("showTip") ? wx.getStorageSync("showTip") : 1,
        jiangeshjian: 0,
        line_css_type: 0
    },
    onLoad: function() {
        e = null, 
        this.new_interstitia(1);
    },
    onShow: function() {
        var t = wx.getStorageSync("wxcityid"), 
        e = "" != wx.getStorageSync("cityname") ? wx.getStorageSync("cityname") : "城市";
        this.setData({
            cityname: e,
            line_css_type: wx.getStorageSync("line_css_type") ? wx.getStorageSync("line_css_type") : 0
        }), ("" == t || t <= 0) && this.dingwei(), this.weather(e);
        var i = wx.getStorageSync("linerev" + t);
        this.setData({
            busrev: i
        }), console.log(i);
    },
    formsubmitclick: function(e) {
        var i = this, 
        a = wx.getStorageSync("wxcaseopenid"), 
        n = wx.getStorageSync("wxcityid"), 
        o = e.detail.value.keyworks ? e.detail.value.keyworks : e.detail.value;
        if ("" == o) return i.setData({
            resultlist: ""
        }), void wx.showToast({
            title: "搜索关键词不能为空",
            icon: "none",
            duration: 2e3
        });
        wx.showLoading({
            title: "正在请求...",
            mask: !0
        }), 
        wx.request({
            url: "http://api.wxbus163.cn/z_busapi/BusApi.php?optype=luxian&uname=183********&cityid=73&keywords=" 
                  + o + "&keySecret=",
            method: "POST",
            success: function(t) {
                "ok" == t.data.return_code ? (i.setData({
                    resultlist: t.data.returl_list,
                    keyworks: o
                }), wx.hideLoading()) : (i.setData({
                    resultlist: ""
                }), wx.showToast({
                    title: t.data.msg,
                    icon: "none",
                    duration: 2e3
                }));
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
    selectcityclick: function() {
        console.log(e), clearTimeout(e), console.log("清空：", e), wx.reLaunch({
            url: "./selct_city"
        });
    },
    dingwei: function() {
        var e = this;
        wx.getLocation({
            type: "wgs84",
            complete: function(i) {
                "getLocation:ok" == i.errMsg ? (wx.showLoading({
                    title: "正在请求...",
                    mask: !0
                }), wx.request({
                    url: t.globalData.requesturl + "?do=luxian&op=dingweicity",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: {
                        latitude: i.latitude,
                        longitude: i.longitude
                    },
                    success: function(t) {
                        1 == t.data.status ? (wx.setStorageSync("wxcityid", t.data.cityss.cityid), wx.setStorageSync("cityname", t.data.cityss.cityname), 
                        e.onShow(), wx.hideLoading()) : wx.reLaunch({
                            url: "./selct_city"
                        });
                    }
                })) : wx.reLaunch({
                    url: "./selct_city"
                });
            }
        });
    },
    new_interstitia: function(t) {
        var i = this;
        if (1 == t) {
            var a = i.data.jiangeshjian > 0 ? i.data.jiangeshjian : 15e3;
            console.log("初始化：" + a), e = setTimeout(function() {
                console.log("允许：" + a), i.setData({
                    jiangeshjian: a + 45e3
                }), i.new_interstitia(2);
            }, a);
        }
        if (2 == t) {
            var n = wx.createInterstitialAd({
                adUnitId: "adunit-d7f5c81d5695bbd0"
            });
            n.onLoad(function() {
                console.log("onLoad event emit"), n.show().catch(function(t) {
                    i.new_interstitia(1), console.error(t);
                });
            }), n.onError(function(t) {
                i.new_interstitia(1), console.log("onError event emit", t);
            }), n.onClose(function(t) {
                n.destroy(), i.new_interstitia(1), console.log("onClose event emit", t);
            });
        }
    },
    news_look: function() {
        var t = this;
        console.log(wx.getStorageSync("scribe_item")), "" == wx.getStorageSync("scribe_item") && wx.requestSubscribeMessage({
            tmplIds: [ "u-o9lqJXoGyxAWncgN23k4fLaqplDv061TiSvLLm8W4" ],
            success: function(e) {
                "accept" == e["u-o9lqJXoGyxAWncgN23k4fLaqplDv061TiSvLLm8W4"] ? (wx.setStorageSync("scribe_item", 1), 
                t.dingyueHttp()) : wx.setStorageSync("scribe_item", 2);
            }
        });
    },
    dingyueHttp: function() {
        var e = wx.getStorageSync("wxcaseopenid"), i = wx.getStorageSync("scribe_item");
        wx.request({
            url: t.globalData.requesturl + "?do=luxian&op=dingyuexiaoxi",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                login_openid: e,
                scribe_item: i,
                appid: t.globalData.appid
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    weather: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = this;
        if ("城市" != t) {
            var i = t.substring(0, t.length - 1);
            wx.request({
                url: "https://www.baidu.com/home/other/data/weatherInfo?city=" + i + "&indextype=manht&_req_seqid=0xc2595539001249ce&asyn=1&t=1594176318223&sid=1424_31326_32139_31253_32045_32231_31322_32111_22159",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "GET",
                success: function(t) {
                    var i = [], a = t.data.data.weather.content;
                    if (a) {
                        i[0] = a.today;
                        var n = i[0].time.split(" ");
                        i[0].time = n[0], i[1] = a.tomorrow, i[2] = a.thirdday, i[3] = a.fourthday, e.setData({
                            weatherstr: i
                        });
                    }
                }
            });
        }
    },
    onShareAppMessage: function(e) {
        return {
            title: "推荐一款实时公交查询小程序给你ღ( ´･ᴗ･` )",
            path: "pages/index/zzz_webview",
            imageUrl: t.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    },
    onShareTimeline: function(e) {
        return {
            title: "推荐一款实时公交查询小程序给你ღ( ´･ᴗ･` )",
            query: "",
            imageUrl: t.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    },
    hiddenbox: function() {
        wx.setStorageSync("showTip", "2"), this.setData({
            showTip: 2
        });
    },
    qiehuangcss: function() {
        this.setData({
            line_css_type: !this.data.line_css_type
        }), wx.setStorageSync("line_css_type", this.data.line_css_type);
    }
});