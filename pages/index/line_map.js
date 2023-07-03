var e = getApp();

Page({
    data: {
        cityid: 0,
        point: "",
        lineId: "",
        lineNo: "",
        name: "",
        direction: "",
        polyline: [],
        markers: [],
            //[
                //{ "id": 0, "latitude": "39.90995372620653", "longitude": "116.23491022106148", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 1, "latitude": "39.907509", "longitude": "116.27445817278739", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 2, "latitude": "39.907509", "longitude": "116.27888798025516", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 3, "latitude": "39.907344", "longitude": "116.345773", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 4, "latitude": "39.90727363641431", "longitude": "116.3629204597869", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 5, "latitude": "39.908614", "longitude": "116.43843125913253", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 6, "latitude": "39.908547919932715", "longitude": "116.44972775634218", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 7, "latitude": "39.908395410961624", "longitude": "116.4688444003372", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }, { "id": 8, "latitude": "39.90828484550875", "longitude": "116.4834787814966", "width": 28, "height": 32, "iconPath": "../common/buspoi2.png" }
            //],
        viewPoints: []
    },
    onLoad: function (e) {
        wx.getStorageSync("wxcaseopenid");
        var t = wx.getStorageSync("wxcityid");
        console.log("e: " + JSON.stringify(e))
        let markers = e.markers.replace("\"([^\"]*)\"", "$1");
        //console.log("getStorageSync('markers'): " + wx.getStorageSync('markers'))
        //markers = wx.getStorageSync('markers')
        this.setData({
            cityid: t,
            //point: e.point,
            markers: JSON.parse(markers),
            lineId: e.a,
            lineNo: e.b,
            name: e.c,
            direction: e.d
        })
        //this.initfun(e);
        //console.log("e: " + JSON.stringify(e.markers))
    },
    initfun: function (e) {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, a = this, i = wx.getStorageSync("wxcaseopenid"), n = wx.getStorageSync("wxcityid"), o = a.data.lineId, s = a.data.lineNo, r = a.data.name, d = a.data.direction;
        // wx.request({
        //     url: e.globalData.requesturl + "?do=luxian&op=line_map",
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     method: "POST",
        //     data: {
        //         login_openid: i,
        //         cityid: n,
        //         lineId: o,
        //         lineNo: s,
        //         name: r,
        //         direction: d
        //     },
        //     success: function(e) {
        //         "1" == e.data.status ? (0 == t ? a.setData({
        //             polyline: e.data.polyline,
        //             markers: e.data.markers,
        //             viewPoints: e.data.viewPoints
        //         }) : a.setData({
        //             markers: e.data.markers
        //         }), wx.setStorageSync("svtime", new Date().getTime()), wx.hideLoading()) : wx.showToast({
        //             title: e.data.msg,
        //             icon: "none",
        //             duration: 2e3
        //         });
        //     },
        //     fail: function(e) {
        //         wx.showToast({
        //             title: "请求失败",
        //             icon: "none",
        //             duration: 2e3
        //         });
        //     }
        // });
        console.log("e.point: " + e.point)
        wx.request({
            url: "https://uri.amap.com/marker?markers=" + e.point + "&src=mypage",
        })
    },
    refresh: function () {
        var e = wx.getStorageSync("svtime");
        new Date().getTime() - e <= 12e3 ? (wx.showLoading({
            title: "加载中",
            mask: !0
        }), setTimeout(function () {
            wx.hideLoading();
        }, 500)) : this.initfun(1);
    },
    onShareAppMessage: function (t) {
        return {
            title: "我发现一款非常精准的公交查询平台推荐给您",
            path: "pages/index/zzz_webview",
            imageUrl: e.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    },
    onShareTimeline: function (t) {
        return {
            title: "我发现一款非常精准的公交查询平台推荐给您",
            query: "",
            imageUrl: e.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    }
});