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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var OfflineModal = (function (_super) {
    __extends(OfflineModal, _super);
    function OfflineModal() {
        var _this = _super.call(this) || this;
        _this.width = 408;
        _this.height = 262;
        _this.x = (UIConfig.width - 408) / 2;
        _this.y = 80;
        var bg = new Bitmap('modal-bg_png');
        _this.addChild(bg);
        var title = new Bitmap('modal-title_png');
        _this.addChild(title);
        title.x = 166;
        title.y = 10;
        _this.spText = new TextField({
            size: 22,
            y: 100,
            x: 0,
            width: 408,
            text: '您已断开连接，即将退出游戏...',
            color: 0x8a542e,
            bold: true,
            textAlign: 'center'
        });
        _this.addChild(_this.spText);
        var btn = new Bitmap('btn-sure_png');
        _this.addChild(btn);
        btn.x = 100;
        btn.y = 170;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.pub("closeGame");
            EventManager.pub('modal/onCloseOffline');
        }, _this);
        return _this;
    }
    return OfflineModal;
}(egret.DisplayObjectContainer));
__reflect(OfflineModal.prototype, "OfflineModal");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            LoginManager.login();
            this.createGameScene();
            EventManager.pub('tiki/init');
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            var prg = Math.floor((event.itemsLoaded - 1) * 100 / event.itemsTotal);
            if (prg == 100) {
                prg = 99;
            }
            EventManager.pub('tiki/setProgress', prg);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        setTimeout(function () {
            EventManager.pub('tiki/setProgress', 100);
        }, 300);
        UImanager = new UIManager(this);
        UImanager.to('game');
        this.gameBgm = RES.getRes("carbgm_mp3");
        // this.soundChannel = this.gameBgm.play(0, -1);
        EventManager.sub('tiki/musicLoadSuc', function () {
            if (_this.soundChannel) {
                _this.soundChannel.stop();
                _this.soundChannel = null;
            }
            _this.soundChannel = _this.gameBgm.play(0, -1);
            GameDataManager['recoredSoundType'] = true;
        });
        EventManager.sub('tiki/musicStop', function () {
            if (_this.soundChannel) {
                _this.soundChannel.stop();
                _this.soundChannel = null;
                console.log('原声音移除');
            }
            GameDataManager['recoredSoundType'] = false;
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
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
/**
 * 生成位图文字
 * @config 配置信息,传入的可以是string，也可以是object
 * @author wangnan
 */
var BitmapText = (function (_super) {
    __extends(BitmapText, _super);
    /****************方法***************/
    //初始化
    function BitmapText(config) {
        var _this = _super.call(this) || this;
        var self = _this;
        if (typeof config === 'string') {
            self.src = config;
        }
        else if (typeof config === 'object') {
            config.source != undefined && (self.src = config.source);
            config.width != undefined && (self.width = config.width);
            config.height != undefined && (self.height = config.height);
            config.text != undefined && (self.text = config.text);
            config.textAlign != undefined && (self.textAlign = config.textAlign);
            config.verticalAlign != undefined && (self.verticalAlign = config.verticalAlign);
            config.letterSpacing != undefined && (self.letterSpacing = config.letterSpacing);
            config.lineSpacing != undefined && (self.lineSpacing = config.lineSpacing);
            config.x != undefined && (self.x = config.x);
            config.y != undefined && (self.y = config.y);
            config.anchorOffsetX != undefined && (self.anchorOffsetX = config.anchorOffsetX);
            config.anchorOffsetY != undefined && (self.anchorOffsetY = config.anchorOffsetY);
            config.scaleX != undefined && (self.scaleX = config.scaleX);
            config.scaleY != undefined && (self.scaleY = config.scaleY);
        }
        return _this;
    }
    Object.defineProperty(BitmapText.prototype, "cont", {
        get: function () {
            return this._cont;
        },
        set: function (newCont) {
            this._cont = newCont;
            this.text = newCont;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapText.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (newSrc) {
            this._src = newSrc;
            this.font = RES.getRes(newSrc);
        },
        enumerable: true,
        configurable: true
    });
    return BitmapText;
}(egret.BitmapText));
__reflect(BitmapText.prototype, "BitmapText");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(arg) {
        var _this = _super.call(this) || this;
        _this.bg = new Bitmap('');
        _this._text = new Bitmap('');
        _this._defaultRes = '';
        _this._selectedRes = '';
        _this._disabledRes = '';
        _this.touchScale = 1;
        _this._status = 'default';
        _this._textdefault = '';
        _this._textselected = '';
        var self = _this;
        _this.addChild(_this.bg);
        _this.addChild(_this._text);
        // 获取资源配置
        if (typeof (arg) == 'string') {
            self._defaultRes = arg;
            self.setStatus('default');
        }
        else {
            arg['textEnable'] && (self._textEnable = arg['textEnable']);
            arg['textDefault'] && (self._textdefault = arg['textDefault']);
            arg['textSelected'] && (self._textselected = arg['textSelected']);
            self._defaultRes = arg['default'] || '';
            self._selectedRes = arg['selected'] || '';
            self._disabledRes = arg['disabled'] || '';
            self.touchScale = arg['touchScale'] || 1;
            self.setStatus('default');
            self.width = arg.width || self.width;
            self.height = arg.height || self.height;
            self._index = arg['index'] || 0;
            self._id = arg['id'] || 'id';
        }
        // 设置锚点与偏移值
        self.anchorOffsetX = self.width / 2;
        self.anchorOffsetY = self.height / 2;
        self.x = self.width / 2;
        self.y = self.height / 2;
        arg.x && (self.x = arg.x);
        arg.y && (self.y = arg.y);
        // 绑定点击事件
        self.touchEnabled = true;
        self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.changeScale(self.touchScale);
        }, _this);
        self.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.changeScale(1);
        }, _this);
        self.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.changeScale(1);
        }, _this);
        return _this;
    }
    Object.defineProperty(Button.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "texture", {
        set: function (src) {
            var pic = src;
            if (typeof (src) == 'string') {
                pic = RES.getRes(src);
            }
            this.bg.texture = pic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "defaultRes", {
        set: function (res) {
            this._defaultRes = res;
            this.setStatus('default');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "selectedRes", {
        set: function (res) {
            this._selectedRes = res;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "disabledRes", {
        set: function (res) {
            this._disabledRes = res;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
            this.setStatus(status);
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.changeScale = function (scale) {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({
            scaleX: scale,
            scaleY: scale
        }, 50);
    };
    // 设置按钮状态(default||selected||disabled),返回当前状态
    Button.prototype.setStatus = function (status) {
        var self = this;
        switch (status) {
            case 'default': {
                self._defaultRes != '' && (this.bg.texture = RES.getRes(self._defaultRes));
                self.touchEnabled = true;
                break;
            }
            case 'selected': {
                self._selectedRes != '' && (this.bg.texture = RES.getRes(self._selectedRes));
                self.touchEnabled = true;
                break;
            }
            case 'disabled': {
                console.log(self._disabledRes, self._disabledRes != '');
                self._disabledRes != '' && (this.bg.texture = RES.getRes(self._disabledRes));
                self.touchEnabled = false;
                break;
            }
        }
        self._status = status;
        if (self._textEnable) {
            self["_text" + status] != '' && (this._text.texture = RES.getRes(self["_text" + status]));
            self._text.x = (self.width - self._text.width) / 2;
            self._text.y = (self.height - self._text.height) / 2;
        }
        return status;
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
var GameUtil = (function () {
    function GameUtil() {
    }
    /**基于矩形的碰撞检测*/
    GameUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x - obj1.width / 2;
        rect1.y = obj1.y - obj1.height / 2;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //console.log(obj1.x,obj1.y) 
        //console.log(rect1.width,rect1.height,rect2.width,rect2.height);
        //console.log(rect1.x,rect1.y,rect2.x,rect2.y);
        return rect1.intersects(rect2);
    };
    /**圆形碰撞检测 */
    GameUtil.hitTest2 = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x - obj1.width / 2;
        rect1.y = obj1.y - obj1.height / 2;
        rect2.x = obj2.x - obj2.width / 2;
        rect2.y = obj2.y - obj2.height / 2;
        //console.log(obj1.x,obj1.y) 
        //console.log(rect1.width,rect1.height,rect2.width,rect2.height);
        //console.log(rect1.x,rect1.y,rect2.x,rect2.y);
        return rect1.intersects(rect2);
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
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
var LoadingLayer = (function (_super) {
    __extends(LoadingLayer, _super);
    function LoadingLayer() {
        var _this = _super.call(this) || this;
        _this.width = UIConfig.stageW;
        _this.height = UIConfig.stageH;
        // let shape = new Mask(.1);
        // this.addChild(shape);
        var wrap = new egret.Shape();
        wrap.graphics.beginFill(0x000000, .6);
        wrap.graphics.drawRoundRect(0, 0, 250, 250, 20);
        wrap.x = (_this.width - wrap.width) / 2;
        wrap.y = (_this.height - wrap.height) / 2;
        _this.addChild(wrap);
        return _this;
        // let loading = AnimateManager.createFrames('loading');
        // loading.frameRate = 8;
        // loading.gotoAndPlay('loading', -1);
        // loading.scaleX = 3;
        // loading.scaleY = 3;
        // loading.x = (this.width - loading.width * loading.scaleX) / 2;
        // loading.y = (this.height - loading.height * loading.scaleY) / 2;
        // this.addChild(loading);
    }
    return LoadingLayer;
}(egret.DisplayObjectContainer));
__reflect(LoadingLayer.prototype, "LoadingLayer");
var Mask = (function (_super) {
    __extends(Mask, _super);
    function Mask(alpha) {
        if (alpha === void 0) { alpha = .5; }
        var _this = _super.call(this) || this;
        // 绘制阴影
        _this.graphics.beginFill(0x000000, alpha);
        _this.graphics.drawRect(0, 0, 1, 1);
        // BUG: 诡异的触控区域与所在区域不匹配
        _this.scaleX = UImanager.container.width + 500;
        _this.scaleY = UImanager.container.height + 500;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, _this);
        return _this;
    }
    return Mask;
}(egret.Shape));
__reflect(Mask.prototype, "Mask");
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.bgMask = new Mask();
        _this.addChild(_this.bgMask);
        _this.bgMask.x = -(UImanager.container.width - _this.width) / 2;
        _this.bgMask.y = -(UImanager.container.height - _this.height) / 2;
        _this.modalBg = new egret.Shape();
        _this.modalBg.graphics.beginFill(0xfff5a5, 1);
        _this.modalBg.graphics.drawRect(0, 0, width, height);
        _this.modalBg.graphics.endFill();
        _this.addChild(_this.modalBg);
        _this.cirBg = new Bitmap({
            source: 'pic_ax_fk_png',
        });
        _this.cirBg.x = (width - _this.cirBg.width) / 2;
        _this.cirBg.y = (height - _this.cirBg.height) / 2 + 30;
        _this.addChild(_this.cirBg);
        return _this;
    }
    return Modal;
}(egret.DisplayObjectContainer));
__reflect(Modal.prototype, "Modal");
;
var ModalLayer = (function (_super) {
    __extends(ModalLayer, _super);
    function ModalLayer(width, height) {
        var _this = _super.call(this) || this;
        // this.width = width;
        // this.height = height;
        // 绘制中心弹框
        _this.modal = new Modal(width, height);
        _this.addChild(_this.modal);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            //   let point = this.parent.globalToLocal(0, 0);
            //   this.x = point.x;
            //   this.y = point.y;
            egret.Tween.get(_this).set({ alpha: .3 }).to({ alpha: 1 }, 200);
        }, _this);
        return _this;
    }
    return ModalLayer;
}(egret.DisplayObjectContainer));
__reflect(ModalLayer.prototype, "ModalLayer");
var Scroller = (function (_super) {
    __extends(Scroller, _super);
    function Scroller() {
        return _super.call(this) || this;
    }
    return Scroller;
}(egret.ScrollView));
__reflect(Scroller.prototype, "Scroller");
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
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(type, carType) {
        if (carType === void 0) { carType = 0; }
        var _this = _super.call(this) || this;
        // 加速时的加速度
        _this.a1 = .5;
        // 减速时的加速度
        _this.a2 = 1;
        // 横向匀速移动，该值不改变
        _this.speedX = 10;
        _this.speedY = 0;
        // 暂存左右移动方向 0不动1左2右
        _this.dirX = 0;
        // Y轴加速阈值
        _this.maxSpeedY = 60;
        _this.flagMove = true;
        _this.flagDown = false;
        // 1自己2对家3npc
        _this.carType = 0;
        if (carType == 0) {
            _this.maxSpeedY = 40;
        }
        _this.anistatus = 'normal';
        _this.carType = carType;
        var src;
        src = "pic_car_" + type + "_png";
        _this.bg = new Bitmap({
            source: src,
        });
        _this.addChild(_this.bg);
        _this.anchorOffsetX = _this.bg.width / 2;
        _this.anchorOffsetY = _this.bg.height / 2;
        var aniSrc = type == 2 ? 'hongche' : 'lanche';
        _this.aniCar = AnimateManager.createDragonBoneAni(aniSrc);
        _this.aniCar.visible = false;
        _this.aniCar.x = 36;
        _this.aniCar.y = 72;
        _this.addChild(_this.aniCar);
        _this.aniCar.addEvent(dragonBones.AnimationEvent.COMPLETE, function () {
            console.log('动画完成');
            // this.aniCar.animation.play('daiji', -1)
            _this.aniCar.visible = false;
            //复活后复位
            if (_this.anistatus == 'fuhuo') {
                _this.flagMove = true;
                _this.bg.visible = true;
                _this.anistatus = 'normal';
            }
        }, _this);
        // this.aniCar.addEvent(dragonBones.AnimationEvent., (e) => {
        //   console.log('动画完成',e)
        //   // this.aniCar.animation.play('daiji', -1)
        //   this.aniCar.visible = false;
        // }, this)
        _this.fListen();
        return _this;
    }
    Car.prototype.speedUp = function () {
        var flag = false;
        this.speedY += this.a1;
        if (this.speedY > this.maxSpeedY) {
            // 加速阈值限制
            this.speedY = this.maxSpeedY;
            flag = true;
        }
        this.y -= this.speedY;
        return flag;
    };
    Car.prototype.slowDown = function () {
        if (this.speedY <= 0) {
            // 减速至停止
            this.speedY = 0;
            return;
        }
        this.speedY -= this.a2;
        this.y -= this.speedY;
    };
    Car.prototype.moveLeft = function () {
        this.x -= this.speedX;
    };
    Car.prototype.moveRight = function () {
        this.x += this.speedX;
    };
    Car.prototype.moveX = function () {
        if (this.dirX == 0) {
        }
        else if (this.dirX == 1) {
            this.moveLeft();
        }
        else if (this.dirX == 2) {
            this.moveRight();
        }
    };
    Car.prototype.fListen = function () {
        var _this = this;
        this.addEventListener('crash', function (e) {
            var data = e.data;
            _this.getCrash(data.speedX, data.speedY, data.type);
        }, this);
    };
    Car.prototype.getCrash = function (speedX, speedY, type) {
        var _this = this;
        this.flagMove = false;
        var diedTime = 2200;
        if (this == myCar) {
            EventManager.pub('playHitSound');
        }
        else {
            diedTime = 2400;
        }
        if (type == 'wall') {
            //立即播放爆炸
            this.playBoom();
            setTimeout(function () {
                if (_this.anistatus == 'baozha') {
                    _this.x = 750 / 2 + UIConfig.offsetW;
                    _this.speedY = 0;
                    _this.playReview();
                }
            }, diedTime);
        }
        else if (type == 'npc') {
            // this.flagDown = true;
            this.playBoom();
            setTimeout(function () {
                if (_this.anistatus == 'baozha') {
                    _this.x = 750 / 2 + UIConfig.offsetW;
                    _this.speedY = 0;
                    _this.playReview();
                }
                // this.flagMove = true;
                // this.flagDown = false;
            }, diedTime);
        }
    };
    Car.prototype.testCrash = function () {
        var flagPass = false;
        var delY = this.y - myCar.y;
        if (delY < -UIConfig.stageH) {
            // 超出屏幕上方很远
            flagPass = true;
        }
        else if (delY > 400) {
            // 被超出400米
            flagPass = true;
        }
        else if (Math.abs(delY) <= myCar.height) {
            if (Math.abs(this.x - myCar.x) <= 73) {
                var speedX = myCar.speedX;
                if (this.x >= myCar.x) {
                    speedX = -speedX;
                }
                if (myCar.anistatus == 'normal') {
                    myCar.dispatchEventWith('crash', false, {
                        speedX: speedX,
                        speedY: this.speedY - myCar.speedY,
                        type: 'npc'
                    });
                }
            }
        }
        return flagPass;
    };
    Car.prototype.playBoom = function () {
        this.bg.visible = false;
        this.aniCar.visible = true;
        this.aniCar.animation.play('baozha', 1);
        this.anistatus = 'baozha';
        this.speedY = 0;
    };
    Car.prototype.playReview = function () {
        this.bg.visible = false;
        this.aniCar.visible = true;
        this.aniCar.animation.play('fuhuo', 1);
        this.anistatus = 'fuhuo';
    };
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(type) {
        return _super.call(this) || this;
    }
    return Tree;
}(egret.Bitmap));
__reflect(Tree.prototype, "Tree");
var ScoreBar = (function (_super) {
    __extends(ScoreBar, _super);
    function ScoreBar(type) {
        var _this = _super.call(this) || this;
        // type 0 : 縂得分 ； 1 ： 縂排名
        var src;
        type == 0 && (src = "pic_zdf_png");
        type == 1 && (src = "pic_zpm_png");
        _this.sType = new Bitmap({
            source: src,
        });
        _this.addChild(_this.sType);
        _this.sCont = new TextField({
            text: '123',
            size: 36,
            color: 0xffe152,
            width: 130,
            height: 36,
            textAlign: 'center',
            verticalAlign: 'middle',
        });
        _this.sCont.x = 200;
        if (type == 0)
            _this.sCont.x = 170;
        _this.sCont.y = 3;
        _this.addChild(_this.sCont);
        return _this;
    }
    Object.defineProperty(ScoreBar.prototype, "score", {
        get: function () {
            return this.sCont.text;
        },
        set: function (val) {
            this.sCont.text = val;
        },
        enumerable: true,
        configurable: true
    });
    return ScoreBar;
}(egret.DisplayObjectContainer));
__reflect(ScoreBar.prototype, "ScoreBar");
var BarBottom = (function (_super) {
    __extends(BarBottom, _super);
    function BarBottom() {
        var _this = _super.call(this) || this;
        _this.shapeBg = new egret.Shape();
        _this.shapeBg.graphics.beginFill(0x000000, 0.2);
        _this.shapeBg.graphics.drawRect(0, 0, UIConfig.stageW + 100, 50);
        _this.shapeBg.graphics.endFill();
        _this.addChild(_this.shapeBg);
        _this.hScore = new ScoreBar(0);
        _this.hScore.x = 120;
        _this.hScore.y = 5;
        _this.addChild(_this.hScore);
        _this.hRank = new ScoreBar(1);
        _this.hRank.x = 430;
        _this.hRank.y = 5;
        _this.addChild(_this.hRank);
        //更新排名、分数
        EventManager.sub('bottomBar/updataScore', function () {
            _this.hScore.score = GameDataManager.score.toString();
            _this.hRank.score = GameDataManager.rank.toString();
        });
        EventManager.sub('changeButtomBar', function (data) {
            if (data == 0) {
                _this.hScore.visible = false;
                _this.hRank.visible = false;
            }
            else {
                _this.hScore.visible = true;
                _this.hRank.visible = true;
            }
        });
        EventManager.pub('bottomBar/updataScore');
        return _this;
    }
    return BarBottom;
}(egret.Sprite));
__reflect(BarBottom.prototype, "BarBottom");
var RankBar = (function (_super) {
    __extends(RankBar, _super);
    function RankBar() {
        var _this = _super.call(this) || this;
        _this.rLogo = new Bitmap({
            source: 'pic_redjt_png',
        });
        _this.addChild(_this.rLogo);
        _this.rCont = new TextField({
            fontFamily: 'YouYuan',
            text: '增加120分',
            size: 28,
            color: 0x652106,
            bold: true,
        });
        _this.rCont.x = _this.rLogo.width + 20;
        _this.rCont.y = 15;
        _this.addChild(_this.rCont);
        return _this;
    }
    Object.defineProperty(RankBar.prototype, "score", {
        set: function (val) {
            if (val >= 0) {
                this.rCont.text = "增加" + val.toString() + "分";
                this.rLogo.src = "pic_redjt_png";
            }
            else if (val < 0) {
                this.rCont.text = "降低" + val.toString() + "分";
                this.rLogo.src = "pic_bluejt_png";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RankBar.prototype, "rank", {
        set: function (val) {
            if (val >= 0) {
                this.rCont.text = "排名上升" + val.toString() + "名";
                this.rLogo.src = "pic_redjt_png";
            }
            else if (val < 0) {
                this.rCont.text = "排名下降" + val.toString() + "名";
                this.rLogo.src = "pic_bluejt_png";
            }
        },
        enumerable: true,
        configurable: true
    });
    return RankBar;
}(egret.Sprite));
__reflect(RankBar.prototype, "RankBar");
var TitleBar = (function (_super) {
    __extends(TitleBar, _super);
    function TitleBar() {
        var _this = _super.call(this) || this;
        _this.sBg = new Bitmap({
            source: 'pic_banner_png',
        });
        _this.addChild(_this.sBg);
        _this.sCont = new TextField({
            fontFamily: 'YouYuan',
            text: '你和XX搭档在120秒共计干掉了XX对情侣',
            color: 0xa6490e,
            x: 50,
            y: 100,
            size: 28,
            width: 560,
            height: 50,
            textAlign: 'center',
            verticalAlign: 'middle',
        });
        _this.addChild(_this.sCont);
        return _this;
    }
    Object.defineProperty(TitleBar.prototype, "score", {
        get: function () {
            return this.sCont.text;
        },
        set: function (val) {
            this.sCont.text = val;
        },
        enumerable: true,
        configurable: true
    });
    return TitleBar;
}(egret.DisplayObjectContainer));
__reflect(TitleBar.prototype, "TitleBar");
var GameDataManager = {
    winScore: 10,
    sio: '',
    gameType: 0,
    dataSelf: { nick: '我' },
    dataOpp: { nick: '玩家二' },
    score: '123',
    rank: 123,
    roomId: 0,
    offsetH: 0,
    robotId: null,
    // robotId: 10000,
    robotPlayCount: 0,
    lastRight: 0,
    userID: '',
    oppID: '',
    //chess
    selfColor: 0,
    oppColor: 0,
    oppIsRobot: false,
    bSelfNoPosition: false,
    bOppNoPosition: false,
    turnSetChess: 0,
    readyCount: 0,
    firstID: '',
    chessBoardW: 0,
    chessBoardH: 0,
    chessScale: 1,
    oppTid: 0,
    selfTid: 0,
    oppIsReady: false,
    mapData: [],
    recoredSoundType: true,
    lang: GetQueryString('lang'),
};
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}
var LoginManager = (function () {
    function LoginManager() {
    }
    LoginManager.login = function () {
    };
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
// TypeScript file
var RobotCenter = {
    playcount: 0,
    init: function () {
        var self = this;
        EventManager.sub('RobotCenter/callToRobot', function () {
            console.log('机器人接收消息');
            var time = Math.random() * 500;
            var count = Math.floor(Math.random() * 4);
            if (count == 0)
                count = 1;
            setTimeout(function () {
                var isBackBrick = (Math.random());
                if (isBackBrick > 0.5) {
                    EventManager.pub('tiki/broadcastToAll', 'addBrick', { uid: GameDataManager.oppID, count: count });
                }
                console.log('机器人发送消息');
                self.playcount++;
                if (self.playcount > 15) {
                    var isLose = Math.floor(Math.random() * 15);
                    if (isLose == 1) {
                        EventManager.pub('tiki/broadcastToAll', 'gameover', { winId: GameDataManager.robotId });
                    }
                }
            }, time);
        });
        EventManager.sub('resetRobotData', function () {
            self.playcount = 0;
        });
    }
};
RobotCenter.init();
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
var testRank = [
    {
        rank: 1,
        name: 'aaaaa',
        score: 1111,
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717056030,451974468&fm=200&gp=0.jpg'
    }, {
        rank: 2,
        name: 'bbb',
        score: 1111
    }, {
        rank: 3,
        name: 'dsdad',
        score: 11
    }, {
        rank: 4,
        name: 'adawdad',
        score: 11
    }, {
        rank: 5,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }
];
var RankLayer = (function (_super) {
    __extends(RankLayer, _super);
    function RankLayer() {
        var _this = _super.call(this) || this;
        _this.wraps = [];
        _this.menus = [];
        var mask = new Mask(.6);
        _this.addChild(mask);
        _this.wrap = new egret.Sprite;
        _this.addChild(_this.wrap);
        var bg = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 800
        });
        var shape = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 800,
            x: (UIConfig.stageW - 647) / 2,
            y: 80
        });
        _this.addChild(shape);
        _this.wrap.mask = shape;
        _this.wrap.x = (UIConfig.stageW - 647) / 2;
        _this.wrap.y = 80;
        _this.wrap.addChild(bg);
        _this.scroll = new egret.ScrollView();
        _this.scroll.width = _this.wrap.width;
        _this.scroll.height = _this.wrap.height - 142;
        _this.scroll.y = 142;
        _this.scroll.horizontalScrollPolicy = 'off';
        _this.wrap.addChild(_this.scroll);
        _this.createRank();
        _this.createMenus();
        _this.createMine();
        return _this;
    }
    RankLayer.prototype.createMine = function () {
        this.wrapMine = new egret.Sprite();
        this.wrapMine.x = (UIConfig.stageW - 647) / 2;
        this.wrapMine.y = 900;
        this.addChild(this.wrapMine);
        var bg = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 134
        });
        this.wrapMine.addChild(bg);
        var sp = this.renderItem({ name: '222', rank: 1, avatar: '', score: 222 }, 0);
        sp.y = 17;
        this.wrapMine.addChild(sp);
    };
    RankLayer.prototype.createMenus = function () {
        var _this = this;
        var wrapMenu = new egret.Sprite;
        wrapMenu.x = 61.5;
        wrapMenu.y = 20;
        this.wrap.addChild(wrapMenu);
        var bg = new Bitmap({
            source: 'rank-menu0_png',
            width: 524
        });
        wrapMenu.addChild(bg);
        ['好友排行榜', '世界排行榜'].forEach(function (name, index) {
            var bg = new Bitmap({
                source: 'rank-menu1_png',
                x: 262 * index,
                width: 262
            });
            var txt = new TextField({
                size: 31,
                color: 0xffffff,
                width: 262,
                textAlign: 'center',
                height: 64,
                verticalAlign: 'middle',
                text: name,
                x: 262 * index
            });
            wrapMenu.addChild(bg);
            wrapMenu.addChild(txt);
            wrapMenu.addEventListener('changeMenu', function (e) {
                var i = e.data;
                bg.visible = i == index;
                txt.textColor = i == index ? 0xffffff : 0xf9a200;
            }, _this);
            txt.touchEnabled = true;
            txt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                wrapMenu.dispatchEventWith('changeMenu', false, index);
                _this.changeCnt(index);
            }, _this);
        });
        wrapMenu.dispatchEventWith('changeMenu', false, 0);
    };
    RankLayer.prototype.createRank = function () {
        var spTitle = new egret.Sprite;
        this.wrap.addChild(spTitle);
        spTitle.x = 50;
        spTitle.y = 100;
        var bg = new Bitmap({
            source: 'bg-yellow_png',
            x: -50,
            width: this.wrap.width
        });
        spTitle.addChild(bg);
        var txt = new TextField({
            size: 32,
            color: 0xf9a200,
            text: '排名                名称                 距离(米)',
            y: 2
        });
        spTitle.addChild(txt);
        this.renderFriend();
        this.renderRank(1);
        var btnBack = new Button({
            default: 'btn-bg-org_png',
            x: UIConfig.stageW / 2,
            y: 1110,
            touchScale: .9
        });
        var txtBack = new Bitmap({
            source: 'txt-fhdt_png',
            x: 92,
            y: 30
        });
        btnBack.addChild(txtBack);
        this.addChild(btnBack);
        var btnAgain = new Button({
            default: 'btn-bg-red_png',
            x: UIConfig.stageW / 2,
            y: 1230,
            touchScale: .9
        });
        var txtAgain = new Bitmap({
            source: 'txt-zlyj_png',
            x: 92,
            y: 30
        });
        btnAgain.addChild(txtAgain);
        this.addChild(btnAgain);
        btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.pub('resetGame');
            UImanager.hideRank();
        }, this);
    };
    RankLayer.prototype.renderRank = function (index, list) {
        var _this = this;
        if (list === void 0) { list = testRank; }
        this.wraps[index] = new egret.Sprite;
        var wrap = this.wraps[index];
        list.forEach(function (item, index) {
            var sp = _this.renderItem(item, index);
            wrap.addChild(sp);
        });
    };
    RankLayer.prototype.renderFriend = function () {
        this.wraps[0] = new egret.Sprite;
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        var bitmap = new egret.Bitmap(texture);
        var ratio = this.wrap.width / bitmap.width;
        bitmap.width *= ratio;
        bitmap.height *= ratio;
        this.wraps[0].addChild(bitmap);
    };
    RankLayer.prototype.renderItem = function (item, index) {
        var sp = new egret.Sprite;
        sp.y = 100 * index;
        var bg = new Bitmap({
            source: 'bg-yellow_png',
            width: this.wrap.width,
            height: 100
        });
        sp.addChild(bg);
        bg.alpha = index % 2 == 0 ? 0 : 1;
        if (item.rank < 4) {
            var spRank = new Bitmap({
                source: 'rank-icon' + item.rank + '_png',
                x: 40,
                y: 18
            });
            sp.addChild(spRank);
        }
        else {
            var spRank = new BitmapText({
                source: 'fnt-rankNum_fnt',
                x: 45,
                width: 57,
                textAlign: 'center',
                height: 100,
                verticalAlign: 'middle',
                text: item.rank.toString()
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
        var spScore = new BitmapText({
            source: 'fnt_rank_fnt',
            text: item['score'].toString(),
            x: 430,
            width: 220 / .5,
            textAlign: 'center',
            y: 50
        });
        spScore.scaleX = spScore.scaleY = .5;
        spScore.anchorOffsetY = spScore.height / 2;
        sp.addChild(spScore);
        return sp;
    };
    RankLayer.prototype.changeCnt = function (index) {
        // let wrap = this.wraps[index];
        // if (wrap) {
        //   this.wrap.addChild(this.wraps[index]);
        //   wrap.y = 142;
        // }
        this.scroll.setContent(this.wraps[index]);
        var openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            isDisplay: true,
            text: 'hello',
            year: (new Date()).getFullYear()
        });
    };
    return RankLayer;
}(egret.DisplayObjectContainer));
__reflect(RankLayer.prototype, "RankLayer");
var ResultLayer = (function (_super) {
    __extends(ResultLayer, _super);
    function ResultLayer() {
        var _this = _super.call(this) || this;
        var mask = new Mask(.5);
        _this.addChild(mask);
        _this.wrap = new egret.Sprite;
        _this.addChild(_this.wrap);
        var bg = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 530
        });
        _this.wrap.addChild(bg);
        _this.wrap.x = (UIConfig.stageW - 647) / 2;
        _this.wrap.y = 304;
        var title = new Bitmap({
            source: 'rank-title_png',
            x: 222,
            y: 70
        });
        _this.wrap.addChild(title);
        _this.spScore = new BitmapText({
            source: 'fnt_rank_fnt',
            text: '0',
            width: _this.wrap.width,
            textAlign: 'center',
            y: 220
        });
        _this.wrap.addChild(_this.spScore);
        var spDec = new Bitmap({
            source: 'rank-dec_png',
            x: 50,
            y: 150
        });
        _this.wrap.addChild(spDec);
        var bgBtm = new Bitmap({
            source: 'rank-yellow_png',
            width: _this.wrap.width,
            height: 60
        });
        bgBtm.anchorOffsetX = bgBtm.width / 2;
        bgBtm.anchorOffsetY = bgBtm.height / 2;
        bgBtm.rotation = 180;
        bgBtm.x = _this.wrap.width / 2;
        bgBtm.y = _this.wrap.height - bgBtm.height / 2;
        _this.wrap.addChild(bgBtm);
        var btnRank = new Button({
            default: 'sign-rank2_png',
            touchScale: .9,
            y: 500,
            x: _this.wrap.width / 2
        });
        _this.wrap.addChild(btnRank);
        btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UImanager.showRank();
        }, _this);
        _this.tagNew = new Bitmap({
            source: 'tag-new_png',
            x: 221,
            y: -40
        });
        _this.wrap.addChild(_this.tagNew);
        var btnShare = new Button({
            default: 'btn-bg-org_png',
            x: UIConfig.stageW / 2,
            y: 950,
            touchScale: .9
        });
        var txtShare = new Bitmap({
            source: 'sign-share_png',
            x: 92,
            y: 30
        });
        btnShare.addChild(txtShare);
        _this.addChild(btnShare);
        var btnAgain = new Button({
            default: 'btn-bg-red_png',
            x: UIConfig.stageW / 2,
            y: 1100,
            touchScale: .9
        });
        var txtAgain = new Bitmap({
            source: 'txt-zlyj_png',
            x: 92,
            y: 30
        });
        btnAgain.addChild(txtAgain);
        _this.addChild(btnAgain);
        btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.pub('resetGame');
            UImanager.hideResult();
        }, _this);
        return _this;
    }
    ResultLayer.prototype.setScore = function (score, isNew) {
        if (score === void 0) { score = 0; }
        if (isNew === void 0) { isNew = false; }
        this.spScore.text = score.toString();
        this.tagNew.visible = isNew;
    };
    return ResultLayer;
}(egret.DisplayObjectContainer));
__reflect(ResultLayer.prototype, "ResultLayer");
var StartLayer = (function (_super) {
    __extends(StartLayer, _super);
    function StartLayer() {
        var _this = _super.call(this) || this;
        _this.width = UIConfig.stageW;
        _this.height = UIConfig.stageH;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x000000, 0.5);
        shape.graphics.drawRect(0, 0, UIConfig.stageW, UIConfig.stageH);
        shape.graphics.endFill();
        _this.addChild(shape);
        var title = new Bitmap({
            source: 'startlayer-title_png',
            y: 250 + UIConfig.offsetH
        });
        title.x = (UIConfig.stageW - title.width) / 2;
        _this.addChild(title);
        _this.btn_start = new Button({
            default: 'btn-bg-red_png',
            touchScale: .9,
        });
        _this.btn_start.y = 860 + UIConfig.offsetH;
        _this.btn_start.x = (UIConfig.stageW) / 2;
        _this.addChild(_this.btn_start);
        var start_sign = new Bitmap({
            source: 'btn-sign-start_png',
        });
        start_sign.x = (_this.btn_start.width - start_sign.width) / 2;
        start_sign.y = (_this.btn_start.height - start_sign.height) / 2;
        _this.btn_start.addChild(start_sign);
        _this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EventManager.pub('startGame');
        }, _this);
        _this.btn_lookrank = new Button({
            default: 'sign-rank_png',
            touchScale: .9,
        });
        _this.btn_lookrank.y = 950 + UIConfig.offsetH;
        _this.btn_lookrank.x = (UIConfig.stageW) / 2;
        _this.addChild(_this.btn_lookrank);
        _this.btn_lookrank.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UImanager.showRank();
        }, _this);
        return _this;
    }
    return StartLayer;
}(egret.Sprite));
__reflect(StartLayer.prototype, "StartLayer");
/**
 * @author:qly
 */
var AnimateManager = (function () {
    function AnimateManager() {
    }
    // 圆动画，point圆心，r半径，(未调整anchor偏移，需自行调整以优化视觉效果)
    AnimateManager.circleMove = function (obj, point, r, angleStart, angleEnd, duration, isLoop) {
        if (angleStart === void 0) { angleStart = 360; }
        if (angleEnd === void 0) { angleEnd = 0; }
        if (duration === void 0) { duration = 2000; }
        if (isLoop === void 0) { isLoop = true; }
        return __awaiter(this, void 0, void 0, function () {
            var funcChange;
            return __generator(this, function (_a) {
                funcChange = function () {
                    this.x = point.x + r * Math.cos(this.angle * Math.PI / 180);
                    this.y = point.y - r * Math.sin(this.angle * Math.PI / 180);
                };
                egret.Tween.get(obj, { onChange: funcChange, onChangeObj: obj, loop: isLoop })
                    .set({
                    angle: angleStart,
                    x: point.x + r * Math.cos(angleStart * Math.PI / 180),
                    y: point.y - r * Math.sin(angleStart * Math.PI / 180)
                })
                    .to({
                    angle: angleEnd
                }, duration);
                return [2 /*return*/];
            });
        });
    };
    AnimateManager.createDragonBoneAni = function (sourceName, width, height, skeName) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (skeName === void 0) { skeName = ''; }
        skeName = skeName || sourceName;
        //定义dragonBones.EgretFactory对象
        var factory;
        factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(RES.getRes(sourceName + "_ske_json"));
        factory.parseTextureAtlasData(RES.getRes(sourceName + "_tex_json"), RES.getRes(sourceName + "_tex_png"));
        //直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
        var ar = factory.buildArmatureDisplay(skeName);
        width && (ar.scaleX = width / ar.width);
        height && (ar.scaleY = height / ar.height);
        return ar;
    };
    return AnimateManager;
}());
__reflect(AnimateManager.prototype, "AnimateManager");
var GameData = (function () {
    function GameData() {
    }
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
var UIConfig = (function () {
    function UIConfig() {
    }
    UIConfig.useTransition = true; //是否使用场景过度动画
    UIConfig.width = 750; //设计稿宽度
    UIConfig.height = 1334; //设计稿高度
    UIConfig.stageW = 0; //舞台宽度
    UIConfig.stageH = 0; //舞台高度
    UIConfig.offsetW = 0; //(舞台宽度-设计稿宽度)/2
    UIConfig.offsetH = 0; //(舞台高度-设计稿高度)/2
    UIConfig.sceneScaleWidth = 1;
    UIConfig.sceneScaleHeight = 1;
    UIConfig.deviceWidth = 0;
    UIConfig.deviceHeight = 0;
    return UIConfig;
}());
__reflect(UIConfig.prototype, "UIConfig");
var UIManager = (function () {
    // 顶层两个动画
    function UIManager(layer) {
        this.info = {};
        this.setContainer(layer);
        // this.barTop = new BarTop();
        // this.container.addChildAt(this.barTop, 1);
        // this.clock = new Clock();
        // this.container.addChildAt(this.clock,2);
        // this.barBottom = new BarBottom();
        // this.barBottom.x = (UIConfig.stageW - this.barBottom.width)/2;
        // this.barBottom.y = (UIConfig.stageH - this.barBottom.height);
        // this.container.addChildAt(this.barBottom, 1);
    }
    UIManager.prototype.fListen = function () {
        var _this = this;
        var self = this;
        EventManager.sub('modal/onShowModal', function (modalType, obj) {
            if (obj === void 0) { obj = {}; }
            self.showModal(modalType, obj);
        });
        EventManager.sub('modal/onModalClose', function () {
            if (_this.currentModal) {
                if (_this.currentModal.parent) {
                    egret.Tween.removeTweens(_this.currentModal);
                    egret.Tween.get(_this.currentModal).to({ alpha: 0 }, 200).call(function () {
                        if (_this.currentModal.parent) {
                            _this.container.removeChild(_this.currentModal);
                        }
                        _this.currentModal = undefined;
                    });
                }
                else {
                    _this.currentModal = undefined;
                }
            }
        });
        EventManager.sub('modal/onCloseOffline', function () {
            if (_this.modalOffline && _this.modalOffline.parent) {
                _this.container.removeChild(_this.modalOffline);
            }
        });
        EventManager.sub('modal/onShowOffline', function (obj) {
            if (obj === void 0) { obj = {}; }
            _this.modalOffline = _this.modalOffline || new OfflineModal();
            _this.modalOffline.spText.text = obj['text'];
            _this.container.addChildAt(_this.modalOffline, 50);
        });
    };
    UIManager.prototype.setContainer = function (layer) {
        this.container = layer;
        // 初始化舞台大小
        var stage = egret.MainContext.instance.stage;
        UIConfig.stageW = stage.stageWidth;
        UIConfig.stageH = stage.stageHeight;
        UIConfig.deviceHeight = egret.Capabilities.boundingClientHeight;
        UIConfig.deviceWidth = egret.Capabilities.boundingClientWidth;
        switch (UIConfig.deviceWidth) {
            case 320:
                UIConfig.deviceWidth *= 2;
                break;
            case 375:
                UIConfig.deviceWidth *= 2;
                break;
            case 414:
                UIConfig.deviceWidth *= 2;
                break;
        }
        UIConfig.offsetW = (stage.stageWidth - UIConfig.width) / 2;
        UIConfig.offsetH = (UIConfig.stageH - UIConfig.height) / 2;
        // 重排容器
        this.container.width = UIConfig.stageW;
        this.container.height = UIConfig.stageH;
        // this.container.y = UIConfig.stageW / 2 ;
        var oriRateWidth = 720 / 750;
        var oriRateHeight = 720 / 959;
        GameDataManager.chessBoardW = UIConfig.stageW * oriRateWidth;
        GameDataManager.chessBoardH = UIConfig.stageH * oriRateHeight;
        console.log('实际场景大小：', UIConfig.stageW, UIConfig.stageH);
        console.log('实际棋盘的宽高：', UIConfig.stageW * oriRateWidth, UIConfig.stageH * oriRateHeight);
        this.fListen();
    };
    UIManager.prototype.showModal = function (type, args) {
        if (args === void 0) { args = {}; }
        //   // 0个人信息,1设置
        var modal;
        switch (type) {
            case 0: {
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                break;
            }
            case 3: {
                break;
            }
        }
        if (this.currentModal) {
            this.container.removeChild(this.currentModal);
            this.currentModal = undefined;
        }
        if (modal) {
            this.currentModal = modal;
            this.container.addChildAt(modal, 50);
            if (args['type'] == 1) {
                EventManager.pub("startCT", 1);
            }
            else if (args['type'] == 2) {
                EventManager.pub("startCT", 2);
            }
        }
        else {
            console.warn('modal类型未定义');
        }
    };
    UIManager.prototype.to = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 清除所有已打开弹窗
                // EventManager.pub('modal/onModalClose');
                switch (name) {
                    case 'hall': {
                        // this.sceneHall = this.sceneHall || new SceneHall();
                        // this.add(this.sceneHall)
                        // break
                    }
                    case 'game': {
                        console.log('进入游戏场景');
                        this.sceneGame = this.sceneGame || new SceneGame();
                        // this.sceneGame.gameStartInit();
                        this.add(this.sceneGame);
                        break;
                    }
                    case 'over': {
                        // this.sceneOver = this.sceneOver || new SceneOver();
                        // this.add(this.sceneOver)
                        // EventManager.pub('clearReadyData');
                        // EventManager.pub('ResultBar/updataScore')
                        // this.barBottom.visible = true;
                        // //机器人再来一局逻辑
                        // this.robotReady();
                        // //机器人6s后强制自动断开
                        // if (GameDataManager.robotId != null) {
                        //   EventManager.pub('tiki/startTimerWaiting');
                        // }
                        // break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    UIManager.prototype.add = function (scene) {
        return __awaiter(this, void 0, void 0, function () {
            var onEnter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentScene) return [3 /*break*/, 2];
                        // 跳转到当前场景时返回
                        if (this.currentScene == scene) {
                            this.currentScene.onLeave && this.currentScene.onLeave();
                            this.currentScene.onEnter && this.currentScene.onEnter();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.remove(this.currentScene)];
                    case 1:
                        _a.sent();
                        console.log('====原场景已移除====');
                        _a.label = 2;
                    case 2:
                        onEnter = scene.onEnter || new Function;
                        scene.once(egret.Event.ADDED_TO_STAGE, onEnter, scene);
                        // 加载新场景
                        this.container.addChildAt(scene, 0);
                        console.log('====加载新场景成功====');
                        this.currentScene = scene;
                        if (!UIConfig.useTransition) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.transform(scene)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.remove = function (scene) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.container.contains(scene)) return [3 /*break*/, 3];
                        if (!UIConfig.useTransition) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transform(scene, false)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // 执行场景中定义的onLeave方法
                        scene.onLeave && scene.onLeave();
                        scene && scene.parent && this.container.removeChild(scene);
                        this.currentScene = undefined;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.transform = function (ele, direction, duration) {
        if (direction === void 0) { direction = true; }
        if (duration === void 0) { duration = 300; }
        return __awaiter(this, void 0, void 0, function () {
            var start, end, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        start = {
                            alpha: 0
                        };
                        end = {
                            alpha: 1
                        };
                        if (!direction) {
                            // 调换start，end状态
                            _a = [end, start], start = _a[0], end = _a[1];
                        }
                        return [4 /*yield*/, (function () {
                                return new Promise(function (resolve, reject) {
                                    egret.Tween.get(ele).set(start).to(end, duration).call(function () {
                                        resolve();
                                    });
                                });
                            })()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.createFrames = function (sourceName) {
        var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(sourceName + '_json'), RES.getRes(sourceName + '_png'));
        var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData(sourceName));
        return mc;
    };
    UIManager.prototype.showResult = function (score) {
        this.layerResult = this.layerResult || new ResultLayer();
        this.layerResult.setScore(score);
        this.container.addChild(this.layerResult);
    };
    UIManager.prototype.hideResult = function () {
        if (this.layerResult && this.layerResult.parent) {
            this.container.removeChild(this.layerResult);
        }
    };
    UIManager.prototype.showRank = function () {
        this.layerRank = this.layerRank || new RankLayer();
        this.container.addChild(this.layerRank);
    };
    UIManager.prototype.hideRank = function () {
        if (this.layerRank && this.layerRank.parent) {
            this.container.removeChild(this.layerRank);
        }
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
// 注册全局管理器
var UImanager;
var totalLen = 100000;
// const totalLen = 5000;
var myCar, oppCar;
var npcCars = [];
var trees = [];
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Bitmap(RES.getRes('bg_png'));
        _this.stageCenter = 0;
        _this.treePlantY = 0;
        _this.robotDir = 'left';
        _this.timer = null;
        _this.daojishi = 30 * 60;
        var self = _this;
        _this.init();
        // this.initLayer();
        _this.fListen();
        return _this;
    }
    SceneGame.prototype.initLayer = function () {
        this.startLayer = new StartLayer();
        this.addChild(this.startLayer);
    };
    SceneGame.prototype.init = function () {
        var self = this;
        this && this.removeChildren();
        this.ani321Timer = new egret.Timer(1000, 3);
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.width = UIConfig.stageW;
        this.bg.height = UIConfig.stageH;
        this.addChild(this.bg);
        this.timeBar_btm = new Bitmap({
            source: 'bar-time-bule_png',
            width: 530,
            height: 23,
        });
        this.timeBar_btm.scale9Grid = new egret.Rectangle(12, 10, 20, 3);
        this.barWrap = new egret.Sprite();
        this.barWrap.height = 636;
        this.barWrap.x = (UIConfig.stageW - this.barWrap.width) / 2;
        this.barWrap.addChild(this.timeBar_btm);
        this.timeBar_top = new Bitmap({
            source: 'bar-time-yellow_png',
            width: 530,
            height: 23,
        });
        this.timeBar_top.scale9Grid = new egret.Rectangle(12, 10, 20, 3);
        this.barWrap.addChild(this.timeBar_top);
        this.timeBar_btm.x = 78 + UIConfig.offsetW;
        this.timeBar_btm.y = -310;
        this.timeBar_top.x = 78 + UIConfig.offsetW;
        this.timeBar_top.y = -310;
        var timeSign = new Bitmap({
            source: 'bar-time-sign_png',
        });
        timeSign.x = this.timeBar_btm.x - timeSign.width / 2 + UIConfig.offsetW;
        timeSign.y = -325;
        this.barWrap.addChild(timeSign);
        this.distance = new BitmapText({
            source: 'white1_fnt',
            text: '0M',
            width: 500,
            textAlign: 'center',
            y: -280
        });
        this.distance.x = 90 + UIConfig.offsetW;
        this.barWrap.addChild(this.distance);
        this.barWrap.x = 35;
        this.barWrap.y = UIConfig.stageH - 950;
        this.stageCenter = UIConfig.stageH / 2;
        this.streetWrap = new egret.Sprite();
        this.streetWrap.width = UIConfig.stageW;
        // this.streetWrap.anchorOffsetX= this.streetWrap.width/2;
        this.addChild(this.streetWrap);
        this.streetWrap.y = UIConfig.stageH;
        var streetPic = new Bitmap({
            source: 'bg_png',
            width: UIConfig.stageW,
            height: totalLen + 2 * UIConfig.stageH,
            x: UIConfig.offsetW
        });
        streetPic.fillMode = egret.BitmapFillMode.REPEAT;
        streetPic.y = UIConfig.stageH - streetPic.height;
        this.streetWrap.addChild(streetPic);
        var overLine = new Bitmap({
            source: 'pic_xian_png',
        });
        overLine.x = (UIConfig.stageW - overLine.width) / 2;
        overLine.y = -totalLen;
        this.streetWrap.addChild(overLine);
        // let pic_star = new Bitmap({
        //   source: 'pic_star_png',
        // })
        // pic_star.y = - pic_star.height;
        // this.streetWrap.addChild(pic_star);
        // this.prgRed = new Bitmap({
        //   source: 'pic_bar_car_1_png',
        // })
        // this.prgRed.anchorOffsetY = this.prgRed.height / 2;
        // this.barWrap.addChild(this.prgRed);
        // this.prgRed.x = 25;
        // this.prgBlue = new Bitmap({
        //   source: 'pic_bar_car_2_png',
        // })
        // this.prgBlue.anchorOffsetY = this.prgBlue.height / 2;
        // this.barWrap.addChild(this.prgBlue);
        // this.prgBlue.x = - 40;
        this.touchLayer = new egret.Shape;
        this.touchLayer.graphics.beginFill(0xffffff, 0);
        this.touchLayer.graphics.drawRect(0, 0, UIConfig.stageW, UIConfig.stageH);
        this.touchLayer.graphics.endFill();
        this.touchLayer.touchEnabled = true;
        this.addChild(this.touchLayer);
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            if (e.localX <= UIConfig.stageW / 2) {
                myCar.dirX = 1;
            }
            else {
                myCar.dirX = 2;
            }
            // Connection.sendMessage('moveX', {
            //   dirX: myCar.dirX
            // })
        }, this);
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            myCar.dirX = 0;
            // Connection.sendMessage('moveX', {
            //   dirX: 0
            // })
        }, this);
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            myCar.dirX = 0;
            // Connection.sendMessage('moveX', {
            //   dirX: 0
            // })
        }, this);
        this.addChild(this.barWrap);
        // this.pan = new Bitmap({
        //   source: 'pic_biao_png',
        // })
        // this.pan.y = UIConfig.stageH - this.pan.height;
        // this.pan.x = (UIConfig.stageW - this.pan.width) / 2;
        // this.addChild(this.pan);
        // this.zhen = new Bitmap({
        //   source: 'pic_biao_zhen_png',
        // })
        // this.zhen.anchorOffsetX = this.zhen.width - 35;
        // this.zhen.anchorOffsetY = this.zhen.height / 2;
        // this.addChild(this.zhen);
        // this.zhen.x = UIConfig.stageW / 2 + this.zhen.width / 2 - 68;
        // this.zhen.y = UIConfig.stageH - 20;
        var startLine = new Bitmap({
            source: 'pic_xian_png',
        });
        startLine.x = (UIConfig.stageW - startLine.width) / 2;
        startLine.y = -290;
        this.streetWrap.addChild(startLine);
        // this.qiziLeft = new Bitmap({
        //   source: 'pic_qz_png',
        // })
        // this.qiziLeft.anchorOffsetX = this.qiziLeft.width;
        // this.qiziLeft.anchorOffsetY = this.qiziLeft.height;
        // this.qiziLeft.x = UIConfig.stageW / 2 + 70;
        // this.qiziLeft.y = 800;
        // this.addChild(this.qiziLeft);
        // this.qiziRight = new Bitmap({
        //   source: 'pic_qz2_png',
        // })
        // this.qiziRight.anchorOffsetY = this.qiziRight.height;
        // this.qiziRight.x = UIConfig.stageW / 2 - 70;
        // this.qiziRight.y = 800;
        // this.addChild(this.qiziRight);
        // this.aniNum = new Bitmap({
        //   source: 'pic_3_png',
        // })
        // this.aniNum.x = (UIConfig.stageW - this.aniNum.width) / 2;
        // this.aniNum.y = 400;
        // this.addChild(this.aniNum);
        // this.tipL = new Bitmap({
        //   source: 'tip-left_png',
        //   y: UIConfig.stageH - 300,
        // })
        // this.tipL.x = (UIConfig.stageW / 2) - 335;
        // this.addChild(this.tipL);
        // this.tipR = new Bitmap({
        //   source: 'tip-right_png',
        //   y: UIConfig.stageH - 300,
        // })
        // this.tipR.x = (UIConfig.stageW / 2) + 200;
        // this.addChild(this.tipR);
        // this.tipHand = new Bitmap({
        //   source: 'tip-hand_png',
        //   y: UIConfig.stageH - 200,
        // })
        // this.tipHand.x = (UIConfig.stageW / 2) + 200;
        // this.addChild(this.tipHand);
        // this.tipHnadother = new Bitmap({
        //   source: 'tip-hand_png',
        //   y: UIConfig.stageH - 200,
        // })
        // this.tipHnadother.scaleX = -1;
        // this.tipHnadother.x = (UIConfig.stageW / 2) - 200;
        // this.addChild(this.tipHnadother);
        // this.arrow = new Bitmap({
        //   source: 'jiantou_png',
        //   x: 244 + UIConfig.offsetW,
        //   y: 900,
        // })
        // this.addChild(this.arrow);
        myCar = new Car(2, 1);
        // oppCar = new Car(1, 2);
        this.streetWrap.addChild(myCar);
        // this.streetWrap.addChild(oppCar);
        // if (GameData.number == 1) {
        //   myCar.x = 276 + UIConfig.offsetW;
        // } else {
        //   myCar.x = 482 + UIConfig.offsetW;
        // }
        myCar.x = UIConfig.stageW / 2;
        myCar.y = -130;
        //模拟机器人
        // this.startRobot();
        this.hitBgm = RES.getRes("carcrash_mp3");
        this.startLayer = new StartLayer();
        this.addChild(this.startLayer);
    };
    SceneGame.prototype.startinit = function () {
        this.streetWrap.y = UIConfig.stageH;
        myCar.x = UIConfig.stageW / 2;
        myCar.y = -130;
    };
    SceneGame.prototype.createTree = function (start) {
        if (start === void 0) { start = 0; }
        // 出现景物，超出后删除
        var treeMax = 8;
        var startY = start || myCar.y - UIConfig.stageH + 200;
        for (var i = 0; i < treeMax; i++) {
            var random = Util.RandomNumBoth(1, 9);
            var treeTypeIsHouse = (random <= 4) ? true : false;
            var tree = new Bitmap("pic_lb_" + random + "_png");
            tree.y = startY - UIConfig.stageH * i / treeMax;
            var dirX = Math.random() < .5 ? 1 : -1;
            var x = 0;
            if (dirX == -1) {
                x = Util.RandomNumBoth(0, 180 - 127 + UIConfig.offsetW);
                tree.scaleX = -1;
                x += tree.width;
                if (treeTypeIsHouse) {
                    x = tree.width;
                }
            }
            else {
                x = Util.RandomNumBoth(566 + UIConfig.offsetW, UIConfig.stageW - 127);
                if (treeTypeIsHouse) {
                    x = UIConfig.stageW - tree.width;
                }
            }
            tree.x = x;
            this.streetWrap.addChild(tree);
            trees.push(tree);
        }
    };
    SceneGame.prototype.testTreePass = function () {
        var flag = trees.length != 0;
        trees.forEach(function (tree) {
            if (tree.y - myCar.y <= 500) {
                flag = false;
            }
        });
        if (flag) {
            trees.forEach(function (tree) {
                tree.parent && tree.parent.removeChild(tree);
            });
            trees = [];
        }
    };
    SceneGame.prototype.shuffle = function (arr) {
        for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x)
            ;
        return arr;
    };
    ;
    SceneGame.prototype.createNpcCar = function () {
        // 一次出现3辆车，全部甩开后刷新新车
        var carLen1 = 3;
        var carLen2 = 3;
        var maxDelY = UIConfig.stageH * 1.4;
        var arr = this.shuffle([0, 1, 2, 3]);
        for (var i = 0; i < carLen1; i++) {
            var npc = new Car(Util.RandomNumBoth(4, 7));
            var startY = myCar.y - UIConfig.stageH + 200;
            npc.y = Util.RandomNumBoth(startY, startY - maxDelY / 2 + 200);
            npc.speedY = Util.RandomNumBoth(2 * npc.maxSpeedY / 3, npc.maxSpeedY);
            var blank = 6;
            npc.x = 180 + myCar.width / 2 + (576 - 180) * arr[i] / 4 + UIConfig.offsetW;
            this.streetWrap.addChild(npc);
            npcCars.push(npc);
        }
        var arr2 = this.shuffle([0, 1, 2, 3]);
        for (var i = 0; i < carLen2; i++) {
            var npc = new Car(Util.RandomNumBoth(4, 7));
            var startY = myCar.y - UIConfig.stageH + 200;
            npc.y = Util.RandomNumBoth(startY - maxDelY / 2, startY - maxDelY);
            npc.speedY = Util.RandomNumBoth(2 * npc.maxSpeedY / 3, npc.maxSpeedY);
            var blank = 6;
            npc.x = 180 + myCar.width / 2 + (576 - 180) * arr2[i] / 4 + UIConfig.offsetW;
            this.streetWrap.addChild(npc);
            npcCars.push(npc);
        }
    };
    SceneGame.prototype.npcAutoMove = function () {
        var flagClear = npcCars.length != 0;
        npcCars.forEach(function (car) {
            car.speedUp();
            var flag = car.testCrash();
            if (!flag) {
                flagClear = false;
            }
        });
        if (flagClear) {
            npcCars.forEach(function (car) {
                car.parent && car.parent.removeChild(car);
            });
            npcCars = [];
        }
    };
    SceneGame.prototype.startGame = function () {
        var _this = this;
        this.clearTimer();
        this.timer = setInterval(function () {
            _this.enterFrame();
            if (_this.daojishi > 0) {
                _this.daojishi--;
                _this.setProcess();
            }
            else {
                //游戏结束
                var score = Math.abs(Math.floor(myCar.y));
                _this.gameOverInit();
                UImanager.showResult(score);
                wxCenter.updateScore(score);
            }
        }, 33);
    };
    SceneGame.prototype.enterFrame = function () {
        if (this.treePlantY - myCar.y > UIConfig.stageH) {
            this.treePlantY = myCar.y;
            this.createTree();
        }
        this.testTreePass();
        this.npcAutoMove();
        //我方小车移动
        if (myCar.flagMove) {
            var speedYMax = myCar.speedUp();
            if (speedYMax && npcCars.length == 0) {
                // 如果已经是最大速度且前方没有待超的npc车，添加npc车辆
                this.createNpcCar();
            }
            else {
                // 有待超车辆
            }
            myCar.moveX();
            // 移动容器，使小车总是显示在屏幕中
            this.streetWrap.y = -myCar.y + UIConfig.stageH - 300;
            if (myCar.y <= -totalLen) {
                // Connection.broadCast('sendResult', { winId: GameDataManager.userID })
                myCar.flagMove = false;
            }
            EventManager.pub('testCrash');
        }
        else if (myCar.flagDown) {
            //降速
            myCar.slowDown();
            myCar.moveX();
            this.streetWrap.y = -myCar.y + UIConfig.stageH - 300;
            if (myCar.y <= -totalLen) {
                // Connection.broadCast('sendResult', { winId: GameData.nId })
                myCar.flagMove = false;
            }
        }
        // if (oppCar.flagMove) {
        //   //10s 撞一次  1/300的概率
        //   if (GameDataManager.robotId != null) {
        //     if (oppCar.y <= -1000) {
        //       if (Math.floor(Math.random() * 500) == 299) {
        //         oppCar.dispatchEventWith('crash', false, { speedX: 10, speedY: 0, type: 'wall' })
        //       }
        //     }
        //   }
        //   oppCar.speedUp();
        //   oppCar.moveX();
        //   if (oppCar.y <= -totalLen) {
        //     Connection.broadCast('sendResult', { winId: GameDataManager.oppID })
        //     oppCar.flagMove = false;
        //   }
        //   this.oppHroMove();
        // }
        // this.setProgress();
    };
    SceneGame.prototype.oppHroMove = function () {
        var changeDir = Math.random() > 0.95 ? true : false;
        if (changeDir) {
            this.robotDir = (this.robotDir == 'left' ? 'right' : 'left');
        }
        if (this.robotDir == 'left') {
            if (oppCar.x <= 180 + 73 / 2 + UIConfig.offsetW) {
                oppCar.x += 1;
            }
            else {
                oppCar.x -= 1;
            }
        }
        else {
            if (oppCar.x >= 566 - 73 / 2 + UIConfig.offsetW) {
                oppCar.x -= 1;
            }
            else {
                oppCar.x += 1;
            }
        }
    };
    SceneGame.prototype.setProcess = function () {
        // this.zhen.rotation = (myCar.speedY / 60) * 135;
        this.timeBar_top.width = (this.daojishi / 1800) * 530;
        this.distance.text = '' + Math.abs(Math.floor(myCar.y)) + 'M';
    };
    SceneGame.prototype.checkOver = function () {
    };
    SceneGame.prototype.checkRobotOver = function () {
    };
    SceneGame.prototype.startRobot = function () {
    };
    SceneGame.prototype.startACT = function () {
        this.ani321Timer.repeatCount = 3;
        this.ctCount = 3;
        this.ani321Timer.addEventListener(egret.TimerEvent.TIMER, this.subTime, this);
        this.ani321Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeOver, this);
        this.ani321Timer.reset();
        this.ani321Timer.start();
        this.arrow.visible = true;
        egret.Tween.get(this.arrow, { loop: true }).set({ alpha: 1 }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    SceneGame.prototype.subTime = function () {
        if (this.ctCount == 0) {
            return;
        }
        this.ctCount -= 1;
        if (this.ctCount == 2) {
            this.aniNum.texture = RES.getRes('pic_2_png');
            // egret.Tween.get(this.ct321[1]).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineIn);
        }
        else if (this.ctCount == 1) {
            this.aniNum.texture = RES.getRes('pic_1_png');
            // egret.Tween.get(this.ct321[0]).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineIn);
        }
    };
    SceneGame.prototype.timeOver = function () {
        //请求开始游戏
        egret.Tween.removeTweens(this.arrow);
        this.arrow.visible = false;
        this.qiziLeft.visible = false;
        this.qiziRight.visible = false;
        this.aniNum.visible = false;
        this.tipL.visible = false;
        this.tipR.visible = false;
        this.tipHand.visible = false;
        this.tipHnadother.visible = false;
        console.log(1111111111111);
        // this.startGame();
    };
    SceneGame.prototype.fListen = function () {
        var _this = this;
        var self = this;
        EventManager.sub('playHitSound', function () {
            _this.hitsoundChannel = _this.hitBgm.play(0, 1);
        });
        EventManager.sub('oppMoveX', function (data) {
            oppCar.dirX = data.dirX;
        });
        EventManager.sub('startGame', function () {
            console.log('startGame');
            // this.init();
            _this.startinit();
            // self.startACT();
            _this.createTree(-800);
            _this.changeLayer(1);
            _this.startGame();
        });
        EventManager.sub('resetGame', function () {
            _this.init();
        });
        EventManager.sub('testCrash', function () {
            if (myCar.x <= 180 + 73 / 2 + UIConfig.offsetW) {
                // 撞到左侧跑道边缘
                myCar.dispatchEventWith('crash', false, { speedX: 10, speedY: 0, type: 'wall' });
                // Connection.sendMessage('crash', {
                //   speedX: 10, speedY: 0, type: 'wall'
                // })
            }
            else if (myCar.x >= 566 - 73 / 2 + UIConfig.offsetW) {
                // 撞到右侧跑道边缘
                myCar.dispatchEventWith('crash', false, { speedX: -10, speedY: 0, type: 'wall' });
                // Connection.sendMessage('crash', {
                //   speedX: -10, speedY: 0, type: 'wall'
                // })
            }
        });
        EventManager.sub('oppCrash', function (data) {
            oppCar.dispatchEventWith('crash', false, data);
        });
    };
    SceneGame.prototype.changeLayer = function (type) {
        if (type == 1) {
            //移除开始遮罩
            if (this.startLayer && this.contains(this.startLayer)) {
                this.removeChild(this.startLayer);
            }
        }
    };
    SceneGame.prototype.initStatus = function () {
        GameDataManager.oppIsReady = false;
        GameDataManager.mapData = [];
    };
    SceneGame.prototype.clearStage = function () {
    };
    SceneGame.prototype.clearTimer = function () {
        clearInterval(this.timer);
        this.timer = null;
        this.daojishi = 30 * 60;
    };
    SceneGame.prototype.gameOverInit = function () {
        console.log('游戏重新初始化');
        this.initStatus();
        this.clearTimer();
    };
    SceneGame.prototype.onEnter = function () {
        // this.gameStartInit();
        // this.isGameover = false;
    };
    SceneGame.prototype.onLeave = function () {
    };
    return SceneGame;
}(egret.DisplayObjectContainer));
__reflect(SceneGame.prototype, "SceneGame");
// /**
//  * 游戏开始界面
//  * 
//  */
// class SceneHall extends egret.DisplayObjectContainer {
//   bg: egret.Bitmap = new egret.Bitmap(RES.getRes('public_bg_jpg'))
//   private hLogo: Bitmap;
//   private hBtn: Button;
//   private hrBtn: Button;
//   private matchTip: Bitmap;
//   private matchBg: Bitmap;
//   private matchFDJ: Bitmap;
//   constructor() {
//     super();
//     this.init();
//     this.fListen();
//     EventManager.pub('tiki/onChangeType');
//   }
//   init() {
//     this && this.removeChildren();
//     this.bg.x = 0;
//     this.bg.y = -UIConfig.offsetH;
//     this.bg.width = UIConfig.stageW;
//     this.bg.height = UIConfig.stageH;
//     this.addChild(this.bg)
//     this.hLogo = new Bitmap({
//       source: 'pic_logo_png',
//       width: 497,
//       height: 254,
//       y: 203,
//     })
//     this.hLogo.x = (UIConfig.width - this.hLogo.width) / 2;
//     this.addChild(this.hLogo);
//     this.hBtn = new Button(0, 0);
//     this.hBtn.y = 513;
//     this.hBtn.x = (UIConfig.width - this.hBtn.width) / 2;
//     this.addChild(this.hBtn);
//     this.hBtn.touchEnabled = true;
//     this.hBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
//       if (this.hBtn.Bg == "btn_public_n_png") {
//          EventManager.pub('tiki/broadcastToAll','ready',{uid:GameDataManager.userID});
//         this.hBtn.Bg = 'btn_public_p_png';
//         this.hBtn.Type = 'btn_pic_dadf_png';
//       }
//       if (GameDataManager.robotId != null) {
//         EventManager.pub('tiki/stopTimerWaiting')
//       }
//     }, this)
//     this.hrBtn = new Button(1, 3);
//     this.hrBtn.y = 640;
//     this.hrBtn.x = (UIConfig.width - this.hrBtn.width) / 2;
//     this.addChild(this.hrBtn);
//     this.hrBtn.touchEnabled = true;
//     this.hrBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
//       console.log('开始匹配')
//       EventManager.pub('tiki/onChangeOpp')
//       // EventManager.pub('SceneHall/startMatch')
//       if (GameDataManager.robotId != null) {
//         EventManager.pub('tiki/stopTimerWaiting')
//       }
//     }, this)
//     this.matchTip = new Bitmap({
//       source: 'pic_jazai_png',
//     })
//     this.matchTip.y = 700;
//     this.matchTip.x = (UIConfig.stageW - this.matchTip.width) / 2;
//     this.matchTip.visible = false;
//     this.addChild(this.matchTip);
//     this.matchBg = new Bitmap({
//       source: 'pic_loding_png',
//       y: 500,
//     })
//     this.matchBg.x = (UIConfig.width - this.matchBg.width) / 2;
//     this.addChild(this.matchBg);
//     this.matchBg.visible = false;
//     this.matchFDJ = new Bitmap({
//       source: 'pic_loding2_png',
//       y: 650 + 45,
//     })
//     this.matchFDJ.anchorOffsetX = (this.matchFDJ.width) / 2;
//     this.matchFDJ.anchorOffsetY = (this.matchFDJ.height) / 2;
//     this.matchFDJ.x = (UIConfig.width - this.matchFDJ.width) / 2 + (this.matchFDJ.width) / 2;
//     this.addChild(this.matchFDJ);
//     this.matchFDJ.visible = false;
//     let plarMode = GameDataManager.gameType;
//     if (plarMode == 0) {
//       EventManager.pub('SceneHall/startMatch')
//     }
//     EventManager.pub('tiki/onChangeType');
//   }
//   fListen() {
//     EventManager.sub('tiki/onChangeType', () => {
//       let plarMode = GameDataManager.gameType;
//       console.warn('onChangeType', plarMode)
//       if (plarMode == 1) {
//         this.hBtn.y = 700;
//         this.hBtn.visible = true;
//         this.hrBtn.visible = false;
//       } else if (plarMode == 0) {
//         this.hBtn.y = 513;
//         this.hrBtn.visible = true;
//         this.hBtn.visible = true;
//       }
//     })
//     //玩家不准备，6s退出
//     EventManager.sub('tiki/judgeRobot', () => {
//       //机器人6s后自动断开
//       if (GameDataManager.robotId != null) {
//         EventManager.pub('tiki/startTimerWaiting')
//       }
//     })
//     //更新排名
//     EventManager.sub('updataScore', (oData) => {
//       if (oData.score != null && oData.rank != null) {
//       }
//     });
//     //显示匹配
//     EventManager.sub('SceneHall/startMatch', () => {
//       this.hBtn.visible = false;
//       this.hrBtn.visible = false;
//       this.matchTip.visible = true;
//       this.matchBg.visible = true;
//       this.matchFDJ.visible = true;
//       let point =new egret.Point(390,580);
//       AnimateManager.circleMove(this.matchFDJ,point,25)
//       this.hBtn.Bg = 'btn_public_n_png';
//       this.hBtn.Type = 'btn_pic_djzb_png';
//     })
//       // EventManager.pub('SceneHall/startMatch')
//     //关闭匹配
//     EventManager.sub('SceneHall/stopMatch', () => {
//       console.log('关闭匹配')
//       this.hBtn.visible = true;
//       this.hrBtn.visible = true;
//       this.matchTip.visible = false;
//       this.matchBg.visible = false;
//       this.matchFDJ.visible = false;
//     })
//   }
//   onLeave() {
//     this.init();
//   }
// } 
// /**
//  * 游戏結束界面
//  * 
//  */
// class SceneOver extends egret.DisplayObjectContainer {
//   public bg: egret.Bitmap = new egret.Bitmap(RES.getRes('pic_yx_bg_png'))
//   private mapBg: egret.Bitmap = new egret.Bitmap(RES.getRes('pic_qp_png'))
//   private oRePlayBtn: Button;
//   private ohuanrenBtn: Button;;
//   constructor() {
//     super();
//     this.init();
//     this.fListen();
//   }
//   init() {
//     this && this.removeChildren();
//     let relY = (185 / 959) * UIConfig.stageH;
//     let stdChessWH: number;
//     //选取长宽教小的进行适配
//     if (GameDataManager.chessBoardH >= GameDataManager.chessBoardW) {
//       stdChessWH = GameDataManager.chessBoardW;
//     } else if (GameDataManager.chessBoardH < GameDataManager.chessBoardW) {
//       stdChessWH = GameDataManager.chessBoardH;
//     }
//     this.mapBg.width = stdChessWH;
//     this.mapBg.height = stdChessWH;
//     this.mapBg.x = (UIConfig.stageW - this.mapBg.width) / 2;
//     this.mapBg.y = relY;
//     this.addChild(this.mapBg)
//     this.bg.x = 0;
//     this.bg.y = 0;
//     this.bg.width = UIConfig.stageW;
//     this.bg.height = UIConfig.stageH;
//     this.addChild(this.bg)
//     console.log('UIConfig.stageW;', UIConfig.stageW)
//     console.log('UIConfig.stageW;', UIConfig.stageW)
//     //再来一局
//     this.oRePlayBtn = new Button(0, 2);
//     this.oRePlayBtn.y = 620;
//     this.oRePlayBtn.x = (UIConfig.stageW - this.oRePlayBtn.width) / 2 - UIConfig.offsetW;
//     this.addChild(this.oRePlayBtn);
//     this.oRePlayBtn.touchEnabled = true;
//     this.oRePlayBtn.visible = true;
//     this.oRePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
//       if (this.oRePlayBtn.Type == "btn_pic_hdsy_png") {
//         EventManager.pub('tiki/broadcastToAll', 'ready', { uid: GameDataManager.userID });
//         this.oRePlayBtn.Bg = 'btn_public_p_png';
//         this.oRePlayBtn.Type = 'btn_pic_dadf_png';
//         if (GameDataManager.robotId != null) {
//           EventManager.pub('tiki/stopTimerWaiting')
//         }
//       }
//     }, this)
//     this.ohuanrenBtn = new Button(1, 4);
//     this.ohuanrenBtn.y = 750;
//     this.ohuanrenBtn.x = (UIConfig.stageW - this.ohuanrenBtn.width) / 2 - UIConfig.offsetW;
//     this.addChild(this.ohuanrenBtn);
//     this.ohuanrenBtn.touchEnabled = true;
//     this.ohuanrenBtn.visible = true;
//     this.ohuanrenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
//       UImanager.to('hall')
//       EventManager.pub('tiki/onChangeOpp')
//       if (GameDataManager.robotId != null) {
//         EventManager.pub('tiki/stopTimerWaiting')
//       }
//     }, this)
//     EventManager.pub('tiki/onChangeType');
//   }
//   fListen() {
//     EventManager.sub('tiki/onChangeType', () => {
//       let plarMode = GameDataManager.gameType;
//       if (plarMode == 1) {
//         this.oRePlayBtn.y = 750;
//         this.oRePlayBtn.visible = true;
//         this.ohuanrenBtn.visible = false;
//       } else if (plarMode == 0) {
//         this.oRePlayBtn.y = 620;
//         this.ohuanrenBtn.visible = true;
//         this.oRePlayBtn.visible = true;
//       }
//     })
//     EventManager.sub('carculateResult', () => {
//     })
//     EventManager.pub('tiki/onChangeType');
//     //更新排名
//     EventManager.sub('updataScore', (oData) => {
//       if (oData.score != null && oData.rank != null) {
//       }
//     });
//   }
//   onLeave() {
//     this.oRePlayBtn.Bg = 'btn_public_n_png';
//     this.oRePlayBtn.Type = 'btn_pic_hdsy_png';
//     this.oRePlayBtn.x = (UIConfig.stageW - this.oRePlayBtn.width) / 2 - UIConfig.offsetW;
//     this.ohuanrenBtn.Bg = 'btn_public_png';
//     this.ohuanrenBtn.Type = 'btn_gnds_png';
//     this.ohuanrenBtn.x = (UIConfig.stageW - this.oRePlayBtn.width) / 2 - UIConfig.offsetW;
//   }
// } 
var Util = (function () {
    function Util() {
    }
    Util.formatFloat = function (num, len) {
        // var weishu = Math.pow(10,len)
        // console.log(weishu)
        // return   ( (Math.round(num*weishu))/weishu);;    
        var sNum = parseInt(num);
        return sNum.toFixed(len);
    };
    Util.parseClock = function (s) {
        var min = this.clockNum(Math.floor(s / 60));
        var sec = this.clockNum(s % 60);
        return min + ":" + sec;
    };
    Util.clockNum = function (num) {
        return ("00" + num).slice(-2);
    };
    Util.RandomNumBoth = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
;window.Main = Main;