class LoginManager {
  static code = ''
  static ajax({type, data, url}) {
    return Util.Ajax({
      type: type,
      data: data,
      url: url
    })
  }
  static sendMessage({type, data, url}) {
    return new Promise((rsv, rej) => {
      this.checkAjax().then(e => {
        this.ajax({ type, data, url }).then(e => {
          rsv(e)
        }).catch(e => {
          rej()
        })
      })
    })
  }
  static checkAjax() {
    // 发送请求前检验登陆态，过期自动重新登陆
    return new Promise((rsv, rej) => {
      this.checkSession().then(e => {
        rsv()
      }).catch(e => {
        this.login().then(e => {
          rsv()
        }).catch(e => {
          rej()
        })
      });
    })
  }
  static checkSession() {
    return new Promise((rsv, rej) => {
      if (!this.code) {
        console.warn('登陆态过期')
        rej()
      } else {
        wx.checkSession({
          success(res) {
            console.log('登陆态未过期')
            rsv();
          },
          fail(res) {
            console.warn('登陆态过期')
            rej()
          }
        })
      }
    })
  }
  static startGame() {
    this.sendMessage({
      url: '/gameplay/game/start',
      type: 'get',
      data: {
        token: wxCenter.token
      }
    }).then(e => {
      console.log(e)
      wxCenter.lastGameId = e['result'];
    })
  }
  static getRank() {
    return new Promise((rsv, rej) => {
      LoginManager.sendMessage({
        url: '/gameplay/game/rank',
        type: 'get',
        data: {
          token: wxCenter.token,
          page: 0,
          pageSize: 20
        }
      }).then(e => {
        wxCenter.rankList = e['result']['list']
        wxCenter.selfRank = e['result']['self']
        rsv()
      }).catch(e => {
        rej();
      })
    })
  }
  static endGame(score) {
    this.sendMessage({
      url: `/gameplay/game/over/${wxCenter.lastGameId}`,
      type: 'get',
      data: {
        token: wxCenter.token,
        score: score
      }
    }).then(e => {
      console.log(e)
    })
  }
  static login() {
    return new Promise((rsv, rej) => {
      wx.login({
        success(res) {
          console.log(res.code)
          LoginManager.code = res.code;
          let userInfo = wxCenter.userInfo;
          Util.Ajax({
            type: 'post',
            url: '/gameplay/users/login',
            data: {
              "avatarUrl": userInfo['avatarUrl'],
              "city": userInfo['city'],
              "code": LoginManager.code, //code
              "country": userInfo['country'], //国家
              "device": "", //设备信息
              "gender": userInfo['gender'], //性别
              "nickName": userInfo['nickName'], //昵称
              "province": userInfo['province'], //省份
              "registerIp": "", //注册ip
              "type": 1000 //类型1000小程序
            }
          }).then(e => {
            wxCenter.token = e['result']['token']
            rsv()
          })
        },
        fail(res) {
          rej()
        }
      })
    })
  }
  static getUserInfo() {
    return new Promise((rsv, rej) => {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo'] && wx.createUserInfoButton) {
            wx.getSystemInfo({
              success(res) {
                let h = res.screenHeight;
                let w = res.screenWidth;
                let ratio = w / h > 750 / 1334 ? h / 1334 : w / 750;
                EventManager.pub('togglePageAuth', true)
                let button = wx.createUserInfoButton({
                  type: 'text',
                  text: '登陆',
                  style: {
                    left: (UIConfig.stageW - 361) * ratio / 2,
                    top: (860 + UIConfig.offsetH - 50) * ratio,
                    width: 361 * ratio,
                    height: 101 * ratio,
                    lineHeight: 40,
                    backgroundColor: '#ff6852',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 400
                  }
                })
                EventManager.sub('togglePageAuth', flag => {
                  if (!flag) {
                    button.hide()
                  }
                })
                button.onTap((res) => {
                  if (res.errMsg.indexOf('fail') == -1) {
                    EventManager.pub('togglePageAuth', false)
                    rsv(res.userInfo)
                  } else {
                    rej();
                  }
                })
              }
            })
          } else {
            wx.getUserInfo({
              success(res) {
                rsv(res.userInfo)
                EventManager.pub('togglePageAuth', false)
              },
              fail(res) {
                rej()
              }
            })
          }
        },
      })
    })
  }
  static gameLogin() {
    this.getUserInfo().then(data => {
      wxCenter.userInfo = data;
      this.login()
    })
  }
}
window['LoginManager'] = LoginManager;