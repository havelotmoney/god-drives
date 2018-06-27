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
        _this.btn_lookrank.visible = false;
        _this.addChild(_this.btn_lookrank);
        _this.btn_lookrank.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UImanager.showRank();
        }, _this);
        var txtAuthTip = new TextField({
            size: 28,
            color: 0xffffff,
            text: '登陆后才可以进行游戏哦~',
            y: 950 - 13 + UIConfig.offsetH,
            width: _this.width,
            textAlign: 'center'
        });
        txtAuthTip.visible = false;
        _this.addChild(txtAuthTip);
        EventManager.sub('togglePageAuth', function (flag) {
            _this.btn_start.visible = !flag;
            _this.btn_lookrank.visible = !flag;
            txtAuthTip.visible = flag;
        });
        return _this;
    }
    return StartLayer;
}(egret.Sprite));
__reflect(StartLayer.prototype, "StartLayer");
