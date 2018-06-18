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
var LoadingLayer = (function (_super) {
    __extends(LoadingLayer, _super);
    function LoadingLayer() {
        var _this = _super.call(this) || this;
        _this.width = UIConfig.stageW;
        _this.height = UIConfig.stageH;
        // let shape = new Mask(.1);
        // this.addChild(shape);
        var wrap = new egret.Shape();
        wrap.graphics.beginFill(0x000000, .6);
        wrap.graphics.drawRoundRect(0, 0, 250, 250, 20);
        wrap.x = (_this.width - wrap.width) / 2;
        wrap.y = (_this.height - wrap.height) / 2;
        _this.addChild(wrap);
        return _this;
        // let loading = AnimateManager.createFrames('loading');
        // loading.frameRate = 8;
        // loading.gotoAndPlay('loading', -1);
        // loading.scaleX = 3;
        // loading.scaleY = 3;
        // loading.x = (this.width - loading.width * loading.scaleX) / 2;
        // loading.y = (this.height - loading.height * loading.scaleY) / 2;
        // this.addChild(loading);
    }
    return LoadingLayer;
}(egret.DisplayObjectContainer));
__reflect(LoadingLayer.prototype, "LoadingLayer");
