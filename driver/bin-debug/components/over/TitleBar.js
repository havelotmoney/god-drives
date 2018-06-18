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
