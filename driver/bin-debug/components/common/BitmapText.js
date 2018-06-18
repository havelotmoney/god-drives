/**
 * 生成位图文字
 * @config 配置信息,传入的可以是string，也可以是object
 * @author wangnan
 */
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
