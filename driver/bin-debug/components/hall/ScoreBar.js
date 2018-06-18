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
