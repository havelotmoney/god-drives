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
