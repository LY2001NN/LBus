var e = getApp();

Page({
    data: {
        cityid: "",
        lineId: "",
        lineNo: "",
        name: "",
        direction: 0,
        linestrid: "",
        linenum: "",
        otherlines: [],
        lineinfo: "",
        bus_ing: "等待发车...",
        stations: "",
        bus_list: [],
        timetable: [],
        xf_staname: "",
        xf_ddtimes: "",
        xf_stanumb_mkm: "",
        line_type_css: 1
    },
    onLoad: function (e) {
        wx.getStorageSync("wxcaseopenid");
        var t = wx.getStorageSync("wxcityid");
        console.log("t:(cityid) " + t)
        console.log("e.data: " + JSON.stringify(e))
        console.log("e: " + e.name)
        wx.setNavigationBarTitle({
            title: e.name + "路"
        }), this.setData({
            cityid: t,
            name: e.name,
        });
        console.log("setData: " + e.name + "; " + this.linestrid + "; " + this.linenum)
        for (var a = wx.getStorageSync("linerev" + t) ? wx.getStorageSync("linerev" + t) : [], n = 0; n < a.length; n++) a[n].linename == e.name && a.splice(n, 1);
        a.length > 9 && a.pop(), a.unshift({
            linename: e.name,
            linepath: "/pages/index/index_line?lineId=" + e.lineId + "&lineNo=" + e.lineNo + "&name=" + e.name + "&direction=" + e.direction
        })
        wx.setStorageSync("linerev" + t, a), this.initfun(e);
    },
    onShow: function () {
        this.setData({
            line_type_css: wx.getStorageSync("line_type_css") > 0 ? wx.getStorageSync("line_type_css") : 1
        });
    },
    initfun: function (e) {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "正在加载", a = this, n = wx.getStorageSync("wxcaseopenid"), i = wx.getStorageSync("wxcityid"), s = a.data.lineId, o = a.data.lineNo, l = a.data.name, d = a.data.direction;
        wx.showLoading({
            title: t,
            mask: !0
        }),
            wx.request({
                url: "http://api.wxbus163.cn/z_busapi/BusApi.php?optype=luxian&uname=183********&cityid=73&keywords=" + e.name + "&keySecret=",
                method: "POST",
                success: function (t) {
                    console.log("t.data: " + JSON.stringify(t.data))
                    if ("ok" == t.data.return_code) {
                        var linestrid = t.data.returl_list[0].bus_linestrid;
                        var linenum = t.data.returl_list[0].bus_linenum;
                        wx.request({
                            url: "http://api.wxbus163.cn/z_busapi/BusApi.php?optype=rtbus&uname=183********&cityid=73&bus_linestrid=" + linestrid + "&bus_linenum=" + linenum + "&bus_staname=" + e.name + "&keySecret=",
                            method: "POST",
                            success: function (e) {
                                console.log(e), "ok" == e.data.return_code ? (a.setData({
                                    lineinfo: e.data.returl_list.lineinfo,
                                    bus_ing: e.data.returl_list.buses ? e.data.returl_list.buses.length + "辆车正在行驶" : "等待发车...",
                                    stations: e.data.returl_list.stations,
                                    bus_list: e.data.returl_list.buses ? e.data.returl_list.buses : [],
                                    otherlines: e.data.returl_list.lineinfo.other_lineid,
                                    //timetable: e.data.shikeb
                                }), wx.setStorageSync("svtime", new Date().getTime()), wx.hideLoading()) : wx.showToast({
                                    title: e.data.msg,
                                    icon: "none",
                                    duration: 2e3
                                });
                            },
                            fail: function (e) {
                                wx.showToast({
                                    title: "请求失败",
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                        });
                    }
                },
                fail: function (t) {
                    wx.showToast({
                        title: "请求失败",
                        icon: "none",
                        duration: 2e3
                    });
                }
            })
        //  wx.request({
        //     url: "http://api.wxbus163.cn/z_busapi/BusApi.php?optype=rtbus&uname=19896003096&cityid=73&bus_linestrid=" + this.linestrid + "&bus_linenum=" + this.linenum + "&bus_staname=" + e.name + "&keySecret=a1e786cf95fc68c8c1faa27fe24f7ee5",
        //     method: "POST",
        //     success: function(e) {
        //         console.log(e), "ok" == e.data.return_code ? (a.setData({
        //             lineinfo: e.data.returl_list.lineinfo,
        //             bus_ing: e.data.returl_list.buses ? e.data.returl_list.buses.length + "辆车正在行驶" : "等待发车...",
        //             stations: e.data.returl_list.stations,
        //             bus_list: e.data.returl_list.buses ? e.data.returl_list.buses : [],
        //             otherlines: e.data.returl_list.lineinfo.other_lineid,
        //             //timetable: e.data.shikeb
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
        //console.log("stations: " + JSON.stringify(this.stations))
    },
    indexclick: function () {
        wx.navigateBack({
            data: 1
        });
    },
    // shuaxinclick: function() {
    //     var e = wx.getStorageSync("svtime");
    //     new Date().getTime() - e <= 1e4 ? (wx.showLoading({
    //         title: "正在加载",
    //         mask: !0
    //     }), setTimeout(function() {
    //         wx.hideLoading();
    //     }, 700)) : this.initfun(), this.setData({
    //         xf_staname: ""
    //     });
    // },
    // huanxiangclick: function() {
    //     if (this.data.otherlines) {
    //         var e = this.data.otherlines.lineId;
    //         this.setData({
    //             lineId: e
    //         }), this.initfun();
    //     } else wx.showToast({
    //         title: "反向异常，返回重试",
    //         icon: "none",
    //         duration: 2e3
    //     });
    //     this.setData({
    //         xf_staname: ""
    //     });
    // },
    shareline: function () {
        wx.updateShareMenu({
            withShareTicket: !0,
            success: function () { }
        });
    },
    shikeclick: function () {
        var t = this.data.name, a = wx.getStorageSync("wxcityid"), n = "";
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), wx.request({
            url: e.globalData.requesturl + "?do=luxian&op=line_shike",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                bus_staname: t,
                cityid: a
            },
            success: function (e) {
                if (console.log(e.data.return_code + "_" + e.data.error_msg), "ok" == e.data.return_code) {
                    for (var t = e.data.returl_list, a = 0; a < t.length; a++) n = n + " " + t[a];
                    n += "\r\n\r\n仅供参考，请注意提前候车！", wx.showModal({
                        title: "发车时刻表",
                        content: n,
                        showCancel: !1,
                        confirmText: "关闭"
                    }), wx.hideLoading();
                } else wx.showToast({
                    title: e.data.error_msg,
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function (e) {
                wx.showToast({
                    title: "请求失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    linemapnagr: function () {
        var markers = [];
        console.log("this.data.bus_list: " + JSON.stringify(this.data.bus_list))
        console.log("length: " + this.data.bus_list.length)
        for (var i = 0; i <= this.data.bus_list.length - 1; i++) {
            markers.push(
                {
                    id: i,
                    title: "距离下一站：" + this.data.bus_list[i].distance + "米",
                    latitude: this.data.bus_list[i].lating,
                    longitude: this.data.bus_list[i].longing,
                    width: 28,
                    height: 32,
                    iconPath: "../common/buspoi2.png"
                })
        }
        let marker = JSON.stringify(markers)
        console.log("markers: " + JSON.stringify(markers))
        console.log("marker: " + JSON.parse(marker))
        wx.navigateTo({
            url: "../index/line_map?markers=" + marker
        });
    },
    shwostationinfo: function (e) {
        console.log("e.currentTarget.dataset: " + JSON.stringify(e.currentTarget.dataset));
        console.log("n this.data.bus_list" + JSON.stringify(this.data.bus_list));
        console.log("n.length: " + this.data.bus_list.length);
        var r = "";
        for (var i = 0; i <= this.data.bus_list.length - 1; i++) {
            console.log("this.data.bus_list[i].dis_stat: " + this.data.bus_list[i].dis_stat)
            console.log("e.currentTarget.dataset.stadex: " + e.currentTarget.dataset.stadex)
            if (this.data.bus_list[i].dis_stat == e.currentTarget.dataset.stadex) {
                console.log("this.data.bus_list[i].distance: " + this.data.bus_list[i].distance)
                if (this.data.bus_list[i].distance == 0) {
                    r = "公交已到站";
                    break;
                } else {
                    r = "即将到站/" + this.data.bus_list[i].distance + "m";
                    break;
                }
            }
            if (this.data.bus_list[i].dis_stat < e.currentTarget.dataset.stadex) {
                var num = e.currentTarget.dataset.stadex - this.data.bus_list[i].dis_stat;
                r = "还有" + num + "个站";
                break;
            }
            else {
                r = "等待发车";
            }
        }

        // for (var t = e.currentTarget.dataset.stadex, a = e.currentTarget.dataset.staname,
        //     n = (this.data.stations, this.data.bus_list), i = 0, s = 0, o = n.length - 1; o >= 0; o--) {
        //     if (t >= n[o].dis_stat) {
        //         i = n[o].dis_stat,
        //             s = n[o].distance;
        //         break;
        //     }
        // }
        // var l = 0, d = 0, r = "";
        // if (i > 0) {
        //     for (var c = i; c <= t - 1; c++) l++;
        //     if (0 == s && 0 == l && (d = "", r = "公交已到站"), s > 0 && 0 == l) {
        //         var u = l >= 1 ? l + "站" : "即将到站", h = s >= 1e3 ? (s / 1e3).toFixed(1) + "km" : s + "m";
        //         d = s / 360 > 1 ? s / 360 : 1, d = l >= 1 ? parseInt(d + 30 * l / 60) + "分钟" : parseInt(d) + "分钟",
        //             r = u + " / " + h;
        //     }
        //     l > 0 && (d = l + "个站", r = l <= 2 ? "即将到站" : "行驶中");
        // }
        // else d = "", r = "等候发车";
        // var w = [];
        // w[t] = "color:#05a19a;font-weight:700;"
        this.setData({
            xf_staname: e.currentTarget.dataset.staname,
            //xf_ddtimes: d,
            xf_stanumb_mkm: r,
            //click_sta_cls: w
        });
    },
    qiehuanlinecsstype: function () {
        this.setData({
            line_type_css: 1 == this.data.line_type_css ? 2 : 1
        }), wx.setStorageSync("line_type_css", this.data.line_type_css);
    },
    onShareAppMessage: function (t) {
        return {
            title: "我发现一款非常精准的公交查询平台推荐给您",
            path: "pages/index/zzz_webview",
            imageUrl: e.globalData.host + "/web/themes/default/bus/aaashare.png"
        };
    }
});