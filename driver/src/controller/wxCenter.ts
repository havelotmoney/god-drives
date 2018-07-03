declare module wx {
  function setUserCloudStorage(obj);
  function getOpenDataContext();
  function login(obj)
  function checkSession(obj)
  function getUserInfo(obj)
  function getSetting(obj)
  function createUserInfoButton(obj)
  function getSystemInfo(obj)
}
class wxCenter {
  static lastScore = 0;
  static bestScore = 0;
  static userInfo = {};
  static token = '';
  static lastGameId = 0;
  static rankList = [];
  static selfRank = {
    sort: 0,
    score: 0
  };
  static getMyBest() {
    let data = egret.localStorage.getItem('selfData') || '{}';
    data = JSON.parse(data);
    let score = +(data['score'] || 0);
    wxCenter.bestScore = score
  }
  static setMyBest(score) {
    let data = egret.localStorage.getItem('selfData') || '{}';
    data = JSON.parse(data);
    data['score'] = score;
    egret.localStorage.setItem('selfData', JSON.stringify(data));
  }
  static updateScore(score) {
    if (score <= wxCenter.bestScore) {
      return false;
    }
    wxCenter.bestScore = score;
    wxCenter.setMyBest(score);
    let timeStamp = Math.floor(new Date().getTime() / 1000);
    let data = {
      "key": "rank",
      "value": JSON.stringify({
        "wxgame": {
          "score": score,
          "update_time": timeStamp
        }
      })
    };
    wx.setUserCloudStorage({
      KVDataList: [data]
    })
    return true;
  }
}
window['wxCenter'] = wxCenter