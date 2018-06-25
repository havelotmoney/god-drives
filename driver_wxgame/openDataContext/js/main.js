var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 生成位图
 * @config 配置信息，可单独传入图片src（string），也可传入完整配置对象（object）
 * @author wangnan
 */
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    /****************方法***************/
    //初始化
    function Bitmap(config) {
        var _this = _super.call(this) || this;
        var self = _this;
        if (typeof config === 'string') {
            self.src = config;
        }
        else if (typeof config === 'object') {
            config.source != undefined && (self.src = config.source);
            config.width != undefined && (self.width = config.width);
            config.height != undefined && (self.height = config.height);
            config.x != undefined && (self.x = config.x);
            config.y != undefined && (self.y = config.y);
            config.rotation != undefined && (self.rotation = config.rotation);
            if (config.anchorCenter) {
                self.anchorOffsetX = (self.width / 2);
                self.anchorOffsetY = (self.height / 2);
            }
            else {
                (config.anchorOffsetX != undefined) && (self.anchorOffsetX = config.anchorOffsetX);
                (config.anchorOffsetY != undefined) && (self.anchorOffsetY = config.anchorOffsetY);
            }
            config.alpha != undefined && (self.alpha = config.alpha);
            config.visible != undefined && (self.visible = config.visible);
            config.touchEnabled != undefined && (self.touchEnabled = config.touchEnabled);
        }
        return _this;
    }
    Object.defineProperty(Bitmap.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (newSrc) {
            this._src = newSrc;
            this.texture = RES.getRes(newSrc);
        },
        enumerable: true,
        configurable: true
    });
    return Bitmap;
}(egret.Bitmap));
__reflect(Bitmap.prototype, "Bitmap");
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(config) {
        var _this = _super.call(this) || this;
        var self = _this;
        // 记录必要参数
        self.imgMask = config['mask'] || null;
        self.W = config['width'] || 0;
        self.H = config['height'] || 0;
        if (config['maskConfig']) {
            // 存在遮罩配置属性时绘制一个遮罩
            self.imgMask = new egret.Shape();
            self.imgMask.graphics.beginFill(0xcccccc);
            self.imgMask.graphics.drawRoundRect(0, 0, config['maskConfig'][0] || 0, config['maskConfig'][1] || 0, config['maskConfig'][2] || 0);
            self.imgMask.graphics.endFill();
        }
        self.src = config['src'];
        _this.x = config['x'] || _this.x;
        _this.y = config['y'] || _this.y;
        return _this;
    }
    Object.defineProperty(ImageLoader.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (src) {
            this._src = src;
            this.setSrc(src);
        },
        enumerable: true,
        configurable: true
    });
    ImageLoader.prototype.setSrc = function (src) {
        var self = this;
        // 不存在src属性时return
        if (!src)
            return;
        // 创建图像加载器
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, function (evt) {
            self.removeChildren();
            var loader = evt.currentTarget;
            var texture = new egret.Texture();
            texture._setBitmapData(loader.data);
            // 加载完成，创建图片
            self.image = new egret.Bitmap(texture);
            // 按需缩放图片
            self.W && (self.image.scaleX = self.W / self.image.width);
            self.H && (self.image.scaleY = self.H / self.image.height);
            if (self.imgMask) {
                //如果存在遮罩属性，为图片增加遮罩
                self.addChild(self.imgMask);
                self.image.mask = self.imgMask;
            }
            self.addChild(self.image);
        }, this);
        imgLoader.load(src);
    };
    return ImageLoader;
}(egret.Sprite));
__reflect(ImageLoader.prototype, "ImageLoader");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.info = {};
        var self = _this;
        wx.onMessage(function (data) {
            if (data.isDisplay) {
                //获取小游戏开放数据接口 --- 开始
                wx.getFriendCloudStorage({
                    keyList: ['rank'],
                    success: function (res) {
                        console.log(res);
                        _this.runGame(res.data);
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
    /**
     * 便于演示数据，这里使用家数据
     * 有关获取还有的接口参考：https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/open-data.html?t=2018323
     */
    Main.prototype.sort = function (a, b) {
        return JSON.parse(b['KVDataList'][0]['value'])['wxgame']['score'] - JSON.parse(a['KVDataList'][0]['value'])['wxgame']['score'];
    };
    Main.prototype.runGame = function (list) {
        var _this = this;
        var stage = egret.MainContext.instance.stage;
        this.wrap = this.wrap || new egret.Sprite;
        this.stage.addChild(this.wrap);
        this.wrap.removeChildren();
        var wrap2 = new egret.Sprite;
        list = list.sort(this.sort);
        list.forEach(function (config, index) {
            console.log(JSON.parse(config['KVDataList'][0]['value']));
            var sp = _this.renderItem({
                rank: index + 1,
                avatar: config.avatarUrl,
                name: config.nickname,
                score: JSON.parse(config['KVDataList'][0]['value'])['wxgame']['score'] || 0
            }, index);
            sp.y = index * 100;
            sp.x = 50;
            wrap2.addChild(sp);
        });
        var scroll = new egret.ScrollView();
        scroll.width = stage.stageWidth;
        scroll.height = stage.stageHeight - 154;
        scroll.y = 22;
        scroll.horizontalScrollPolicy = 'off';
        console.log(scroll.width, scroll.height);
        this.wrap.addChild(scroll);
        scroll.setContent(wrap2);
        var infoMine = this.getMine(list);
        console.log(infoMine);
        var spMine = this.renderItem({ name: '3232', rank: 2, avatar: '', score: 22222222222 }, 0);
        spMine.x = 53;
        spMine.y = 716;
        this.wrap.addChild(spMine);
    };
    Main.prototype.getMine = function (list) {
        var self = this;
        wx.getUserInfo({
            success: function (res) {
                self.info = res.userInfo;
                list.forEach(function (item) {
                    if (item['openid'] == self.info['openId']) {
                        return item;
                    }
                });
            },
            fail: function (res) {
            }
        });
    };
    Main.prototype.renderItem = function (item, index) {
        var stage = egret.MainContext.instance.stage;
        var sp = new egret.Sprite;
        sp.y = 100 * index;
        var bg = new Bitmap({
            source: 'bg-yellow_png',
            width: stage.stageWidth,
            height: 100
        });
        sp.addChild(bg);
        bg.alpha = index % 2 == 0 ? 0 : 1;
        if (item.rank < 4) {
            var spRank = new ImageLoader({
                src: 'resource/assets/rank-icon' + item.rank + '.png',
                x: 40,
                y: 18
            });
            sp.addChild(spRank);
        }
        else {
            var spRank = new TextField({
                bold: true,
                size: 40,
                x: 45,
                width: 57,
                textAlign: 'center',
                height: 100,
                verticalAlign: 'middle',
                text: item.rank.toString(),
                color: 0x000000
            });
            sp.addChild(spRank);
        }
        var avatar = new ImageLoader({
            width: 60,
            height: 60,
            src: item['avatar'],
            x: 170,
            y: 20
        });
        sp.addChild(avatar);
        var spName = new TextField({
            size: 32,
            color: 0x000000,
            text: item['name'],
            x: 240,
            height: 100,
            verticalAlign: 'middle'
        });
        sp.addChild(spName);
        var spScore = new TextField({
            size: 40,
            color: 0x000000,
            text: item['score'].toString(),
            x: 430,
            width: 220,
            textAlign: 'center',
            height: 100,
            verticalAlign: 'middle',
            bold: true
        });
        sp.addChild(spScore);
        return sp;
    };
    Main.prototype.cancelGame = function () {
        console.log('停止开放数据域');
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var TextField = (function (_super) {
    __extends(TextField, _super);
    //初始化
    function TextField(config) {
        var _this = _super.call(this) || this;
        var self = _this;
        //属性赋值
        if (typeof config === 'string') {
            self.text = config;
        }
        else if (typeof config === 'object') {
            self.fontFamily = config.fontFamily || 'PingFang SC,Microsoft YaHei';
            config.text != undefined && (self.text = config.text);
            config.color != undefined && (self.textColor = config.color);
            config.size != undefined && (self.size = config.size);
            config.bold != undefined && (self.bold = config.bold);
            config.width != undefined && (self.width = config.width);
            config.height != undefined && (self.height = config.height);
            config.x != undefined && (self.x = config.x);
            config.y != undefined && (self.y = config.y);
            config.rotation && (self.rotation = config.rotation);
            config.anchorCenter != undefined && (self.anchorOffsetX = self.width / 2);
            config.anchorCenter != undefined && (self.anchorOffsetY = self.height / 2);
            config.anchorOffsetX != undefined && (self.anchorOffsetX = config.anchorOffsetX);
            config.anchorOffsetY != undefined && (self.anchorOffsetY = config.anchorOffsetY);
            config.textAlign != undefined && (self.textAlign = config.textAlign);
            config.verticalAlign != undefined && (self.verticalAlign = config.verticalAlign);
            config.lineSpacing != undefined && (self.lineSpacing = config.lineSpacing);
            config.multiline != undefined && (self.multiline = config.multiline);
        }
        return _this;
    }
    Object.defineProperty(TextField.prototype, "ID", {
        /*******************属性******************/
        /*******************方法******************/
        // public set text(val){
        //   this.text = val;
        // }
        set: function (val) {
            this.text = "ID:" + val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "IP", {
        set: function (val) {
            this.text = "IP:" + val;
        },
        enumerable: true,
        configurable: true
    });
    return TextField;
}(egret.TextField));
__reflect(TextField.prototype, "TextField");
;window.Main = Main;