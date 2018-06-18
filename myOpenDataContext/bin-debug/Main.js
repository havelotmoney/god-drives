var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /**
         * 便于演示数据，这里使用家数据
         * 有关获取还有的接口参考：https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/open-data.html?t=2018323
         */
        _this.gameData = [
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 100, time: 1000 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 101, time: 100 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 102, time: 1700 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 103, time: 1800 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 104, time: 1900 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 105, time: 1070 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 106, time: 1030 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 107, time: 1010 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 108, time: 1020 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 109, time: 1030 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 111, time: 1040 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 112, time: 1050 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 123, time: 1060 }] },
            { openId: '', avatarUrl: '', nickName: 'peony', data: [{ score: 167, time: 1080 }] }
        ];
        wx.onMessage(function (data) {
            console.log(data);
            if (data.isDisplay) {
                //获取小游戏开放数据接口 --- 开始
                wx.getFriendCloudStorage({
                    keyList: [],
                    success: function (res) {
                        console.log(res);
                        _this.runGame();
                    },
                    fail: function (err) {
                        console.log(err);
                    },
                    complete: function () {
                    }
                });
                //监听消息 isDisplay
            }
            else {
                _this.cancelGame();
            }
        });
        //获取小游戏开放数据接口 --- 结束        
        //测试点击
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            console.log('子域输出点击');
        }, _this);
        return _this;
    }
    Main.prototype.runGame = function () {
        var txt = new TextField({
            size: 22,
            text: '2222222'
        });
        this.addChild(txt);
        console.log(2);
    };
    Main.prototype.cancelGame = function () {
        console.log('停止开放数据域');
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
// // 微信关系数据的获取
// // 上传方法类似、开发者自行填写
// declare namespace wx {
//     /**
//      * 监听消息
//      */
//     const onMessage: (callback: (data: { [key: string]: any }) => void) => void;
//     /**
//      * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
//      * @param keyList 要拉取的 key 列表
//      * @param success 接口调用成功的回调函数
//      * @param fail 	接口调用失败的回调函数
//      * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
//      */
//     const getFriendCloudStorage: (Object: {
//         keyList?: string[],
//         success?: (res: {
//             data: UserGameData[]
//         }) => void,
//         fail?: (err: any) => void,
//         complete?: () => void,
//     }) => void;
//     /**
//      * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
//      * @param shareTicket 群分享对应的 shareTicket
//      * @param keyList 要拉取的 key 列表
//      * @param success 接口调用成功的回调函数
//      * @param fail 接口调用失败的回调函数
//      * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
//      */
//     const getGroupCloudStorage: (Object: {
//         shareTicket: string,
//         keyList: string[],
//         success?: (res: {
//             data: UserGameData[]
//         }) => void,
//         fail?: (err?: any) => void,
//         complete?: () => void,
//     }) => void;
//     /**
//      * 用户数据
//      */
//     type UserGameData = {
//         /** 用户的微信头像 url */
//         avatarUrl: string,
//         /** 用户的微信昵称 */
//         nickName: string,
//         /** 用户的 openId */
//         openId: string,
//         /**用户自定义数据 */
//         KVList: KVData[]
//     }
//     type KVData = {
//         key: string,
//         value: string
//     }
// } 
