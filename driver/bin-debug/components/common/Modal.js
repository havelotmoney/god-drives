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
