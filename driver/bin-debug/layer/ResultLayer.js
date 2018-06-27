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
            EventManager.pub('startGame');
            // EventManager.pub('resetGame')
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
