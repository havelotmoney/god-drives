declare module wx {
    function setUserCloudStorage(obj);
    function getOpenDataContext();
}
class wxCenter {
    static updateScore(score) {
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
    }
}
window['wxCenter'] = wxCenter