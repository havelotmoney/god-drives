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
