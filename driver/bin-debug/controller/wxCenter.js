var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wxCenter = (function () {
    function wxCenter() {
    }
    wxCenter.getMyBest = function () {
        var data = egret.localStorage.getItem('selfData') || '{}';
        data = JSON.parse(data);
        var score = +(data['score'] || 0);
        wxCenter.bestScore = score;
    };
    wxCenter.setMyBest = function (score) {
        var data = egret.localStorage.getItem('selfData') || '{}';
        data = JSON.parse(data);
        data['score'] = score;
        egret.localStorage.setItem('selfData', JSON.stringify(data));
    };
    wxCenter.updateScore = function (score) {
        if (score <= wxCenter.bestScore) {
            return false;
        }
        wxCenter.bestScore = score;
        wxCenter.setMyBest(score);
        var timeStamp = Math.floor(new Date().getTime() / 1000);
        var data = {
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
        });
        return true;
    };
    wxCenter.bestScore = 0;
    wxCenter.userInfo = {};
    wxCenter.token = '';
    wxCenter.lastGameId = 0;
    wxCenter.rankList = [];
    wxCenter.selfRank = {
        sort: 0,
        score: 0
    };
    return wxCenter;
}());
__reflect(wxCenter.prototype, "wxCenter");
window['wxCenter'] = wxCenter;
