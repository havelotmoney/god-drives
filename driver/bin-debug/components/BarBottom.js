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
var BarBottom = (function (_super) {
    __extends(BarBottom, _super);
    function BarBottom() {
        var _this = _super.call(this) || this;
        _this.shapeBg = new egret.Shape();
        _this.shapeBg.graphics.beginFill(0x000000, 0.2);
        _this.shapeBg.graphics.drawRect(0, 0, UIConfig.stageW + 100, 50);
        _this.shapeBg.graphics.endFill();
        _this.addChild(_this.shapeBg);
        _this.hScore = new ScoreBar(0);
        _this.hScore.x = 120;
        _this.hScore.y = 5;
        _this.addChild(_this.hScore);
        _this.hRank = new ScoreBar(1);
        _this.hRank.x = 430;
        _this.hRank.y = 5;
        _this.addChild(_this.hRank);
        //更新排名、分数
        EventManager.sub('bottomBar/updataScore', function () {
            _this.hScore.score = GameDataManager.score.toString();
            _this.hRank.score = GameDataManager.rank.toString();
        });
        EventManager.sub('changeButtomBar', function (data) {
            if (data == 0) {
                _this.hScore.visible = false;
                _this.hRank.visible = false;
            }
            else {
                _this.hScore.visible = true;
                _this.hRank.visible = true;
            }
        });
        EventManager.pub('bottomBar/updataScore');
        return _this;
    }
    return BarBottom;
}(egret.Sprite));
__reflect(BarBottom.prototype, "BarBottom");
