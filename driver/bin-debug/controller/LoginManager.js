var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginManager = (function () {
    function LoginManager() {
    }
    LoginManager.ajax = function (_a) {
        var type = _a.type, data = _a.data, url = _a.url;
        return Util.Ajax({
            type: type,
            data: data,
            url: url
        });
    };
    LoginManager.sendMessage = function (_a) {
        var _this = this;
        var type = _a.type, data = _a.data, url = _a.url;
        return new Promise(function (rsv, rej) {
            _this.checkAjax().then(function (e) {
                _this.ajax({ type: type, data: data, url: url }).then(function (e) {
                    rsv(e);
                }).catch(function (e) {
                    rej();
                });
            });
        });
    };
    LoginManager.checkAjax = function () {
        var _this = this;
        // 发送请求前检验登陆态，过期自动重新登陆
        return new Promise(function (rsv, rej) {
            _this.checkSession().then(function (e) {
                rsv();
            }).catch(function (e) {
                _this.login().then(function (e) {
                    rsv();
                }).catch(function (e) {
                    rej();
                });
            });
        });
    };
    LoginManager.checkSession = function () {
        var _this = this;
        return new Promise(function (rsv, rej) {
            if (!_this.code) {
                console.warn('登陆态过期');
                rej();
            }
            else {
                wx.checkSession({
                    success: function (res) {
                        console.log('登陆态未过期');
                        rsv();
                    },
                    fail: function (res) {
                        console.warn('登陆态过期');
                        rej();
                    }
                });
            }
        });
    };
    LoginManager.startGame = function () {
        this.sendMessage({
            url: '/gameplay/game/start',
            type: 'get',
            data: {
                token: wxCenter.token
            }
        }).then(function (e) {
            console.log(e);
            wxCenter.lastGameId = e['result'];
        });
    };
    LoginManager.getRank = function () {
        return new Promise(function (rsv, rej) {
            LoginManager.sendMessage({
                url: '/gameplay/game/rank',
                type: 'get',
                data: {
                    token: wxCenter.token,
                    page: 0,
                    pageSize: 20
                }
            }).then(function (e) {
                wxCenter.rankList = e['result']['list'];
                wxCenter.selfRank = e['result']['self'];
                rsv();
            }).catch(function (e) {
                rej();
            });
        });
    };
    LoginManager.endGame = function (score) {
        this.sendMessage({
            url: "/gameplay/game/over/" + wxCenter.lastGameId,
            type: 'get',
            data: {
                token: wxCenter.token,
                score: score
            }
        }).then(function (e) {
            console.log(e);
        });
    };
    LoginManager.login = function () {
        return new Promise(function (rsv, rej) {
            wx.login({
                success: function (res) {
                    console.log(res.code);
                    LoginManager.code = res.code;
                    var userInfo = wxCenter.userInfo;
                    Util.Ajax({
                        type: 'post',
                        url: '/gameplay/users/login',
                        data: {
                            "avatarUrl": userInfo['avatarUrl'],
                            "city": userInfo['city'],
                            "code": LoginManager.code,
                            "country": userInfo['country'],
                            "device": "",
                            "gender": userInfo['gender'],
                            "nickName": userInfo['nickName'],
                            "province": userInfo['province'],
                            "registerIp": "",
                            "type": 1000 //类型1000小程序
                        }
                    }).then(function (e) {
                        wxCenter.token = e['result']['token'];
                        rsv();
                    });
                },
                fail: function (res) {
                    rej();
                }
            });
        });
    };
    LoginManager.getUserInfo = function () {
        return new Promise(function (rsv, rej) {
            wx.getSetting({
                success: function (res) {
                    if (!res.authSetting['scope.userInfo'] && wx.createUserInfoButton) {
                        wx.getSystemInfo({
                            success: function (res) {
                                var h = res.screenHeight;
                                var w = res.screenWidth;
                                var ratio = w / h > 750 / 1334 ? h / 1334 : w / 750;
                                EventManager.pub('togglePageAuth', true);
                                var button = wx.createUserInfoButton({
                                    type: 'text',
                                    text: '登陆',
                                    style: {
                                        left: (UIConfig.stageW - 361) * ratio / 2,
                                        top: (860 + UIConfig.offsetH - 50) * ratio,
                                        width: 361 * ratio,
                                        height: 101 * ratio,
                                        lineHeight: 101 * ratio,
                                        backgroundColor: '#ff6852',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        borderRadius: 400
                                    }
                                });
                                EventManager.sub('togglePageAuth', function (flag) {
                                    if (!flag) {
                                        button.hide();
                                    }
                                });
                                button.onTap(function (res) {
                                    if (res.errMsg.indexOf('fail') == -1) {
                                        EventManager.pub('togglePageAuth', false);
                                        rsv(res.userInfo);
                                    }
                                    else {
                                        rej();
                                    }
                                });
                            }
                        });
                    }
                    else {
                        wx.getUserInfo({
                            success: function (res) {
                                rsv(res.userInfo);
                                EventManager.pub('togglePageAuth', false);
                            },
                            fail: function (res) {
                                rej();
                            }
                        });
                    }
                },
            });
        });
    };
    LoginManager.gameLogin = function () {
        var _this = this;
        this.getUserInfo().then(function (data) {
            wxCenter.userInfo = data;
            var openDataContext = wx.getOpenDataContext();
            openDataContext.postMessage({
                event: 'setInfo',
                data: wxCenter.userInfo
            });
            _this.login();
        });
    };
    LoginManager.code = '';
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
window['LoginManager'] = LoginManager;
