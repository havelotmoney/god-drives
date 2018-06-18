/**
 * 生成位图
 * @config 配置信息，可单独传入图片src（string），也可传入完整配置对象（object）
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
