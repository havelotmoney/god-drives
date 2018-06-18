var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wxCenter = (function () {
    function wxCenter() {
    }
    wxCenter.updateScore = function (score) {
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
    };
    return wxCenter;
}());
__reflect(wxCenter.prototype, "wxCenter");
window['wxCenter'] = wxCenter;
