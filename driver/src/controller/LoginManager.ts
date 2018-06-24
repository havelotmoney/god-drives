class LoginManager {
  static code = ''
  static ajax(type, data) {

  }
  static sendMessage(type, data) {
    return new Promise((rsv, rej) => {
      this.checkAjax().then(e => {
        this.ajax(type, data)
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
  static login() {
    return new Promise((rsv, rej) => {
      wx.login({
        success(res) {
          console.log(res.code)
          LoginManager.code = res.code;
          rsv()
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
                  }
                })
              }
            })
          } else {
            wx.getUserInfo({
              success(res) {
                console.log('success', res.userInfo)
                EventManager.pub('togglePageAuth', false)
              },
              fail(res) {
                // reject(res)
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