var t = getApp();

Page({
    data: {
        staname: "",
        busrev: "",
        sta_lat: "",
        sta_lng: ""
    },
    onLoad: function(t) {
        var a = t.staname, 
        b = t.staline.split(","),
        e = t.lat, 
        n = t.lng;
        wx.setNavigationBarTitle({
            title: a + "-线路列表"
        }), this.setData({
            sta_lat: e,
            sta_lng: n,
            staname: a,
            busrev: b
        });
        var i = t.staline;
        var lat = t.lat;
        var lng = t.lng;
        //var busrev = i.split(",");
        console.log("a: " + a + " " + "i(staline): " + i + "busrev: " + b);
        //this.initfun(a, lat, lng);
    },
    onShow: function() {},
    initfun: function(staname, lat, lng) {
        var e = this, 
        n = wx.getStorageSync("wxcityid");
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), 
        //console.log("n:(cityid) " + n + " " + "a:(staline) " + a);
        // wx.request({
        //     url: t.globalData.requesturl + "?do=luxian&op=fujinline",
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     method: "POST",
        //     data: {
        //         cityid: n,
        //         staline: a
        //     },
        //     success: function(t) {
        //         "1" == t.data.status ? (e.setData({
        //             busrev: t.data.staline,
        //             errot: t.data.errot
        //         }), wx.hideLoading()) : wx.showToast({
        //             title: t.data.msg,
        //             icon: "none",
        //             duration: 2e3
        //         }), wx.hideLoading();
        //         console.log("请求成功");
        //     },
        //     fail: function(t) {
        //         wx.showToast({
        //             title: "请求失败",
        //             icon: "none",
        //             duration: 2e3
        //         });
        //         console.log("请求失败");
        //     }
        // });
        
        wx.request({
            url: "http://api.wxbus163.cn/z_busapi/BusApi.php?optype=ptnear&uname=19896003096&keySecret=66093ce824014de406c10e21a111428e&xylat=" + lat + "&xylng=" + lng,
            // header: {
            //     "Content-Type": "application/x-www-form-urlencoded"
            // },
            method: "POST",
            // data: {
            //     cityid: n,
            //     staline: a
            // },
            success: function(t) {
                if(t.data.return_code == "ok"){
                    for(let i = 0; i < t.data.returl_list.length; ++i){
                        if(t.data.returl_list[i].title == staname.slice(0, -5)){
                            //e.setData({
                                busrev : t.data.returl_list[i].buslist
                            //})
                            //console.log("busrev: " + JSON.stringify(busrev))
                        }
                    }
                }
                // "ok" == t.data.return_code ? (e.setData({
                    
                //     busrev.push(item.buslist),
                //     errot: t.data.errot
                // }), 
                // wx.hideLoading()) : wx.showToast({
                //     title: t.data.msg,
                //     icon: "none",
                //     duration: 2e3
                // }), wx.hideLoading();
                console.log("请求成功");
                //console.log("busrev: " + JSON.stringify(t.data.returl_list));
            },
            fail: function(t) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 2e3
                });
                console.log("请求失败");
            }
        });
        
    },
    opemapt: function() {
        var t = this.data.staname, a = parseFloat(this.data.sta_lat), e = parseFloat(this.data.sta_lng);
        wx.openLocation({
            name: t,
            latitude: a,
            longitude: e,
            scale: 16
        });
    },
    not_tongbu: function() {
        wx.showToast({
            title: "未同步，以实际行驶为准",
            icon: "none"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "推荐一款实时公交查询小程序给你ღ( ´･ᴗ･` )",
            path: "pages/index/zzz_webview",
            imageUrl: t.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    }
});