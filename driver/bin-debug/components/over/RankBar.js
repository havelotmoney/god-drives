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
