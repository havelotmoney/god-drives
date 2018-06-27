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
var RankLayer = (function (_super) {
    __extends(RankLayer, _super);
    function RankLayer() {
        var _this = _super.call(this) || this;
        _this.wraps = [];
        _this.menus = [];
        _this.wrapSelfData = new egret.Sprite;
        _this.currentMenu = 0;
        var mask = new Mask(.6);
        _this.addChild(mask);
        _this.wrap = new egret.Sprite;
        _this.addChild(_this.wrap);
        var bg = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 800
        });
        var bg2 = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 134,
            y: 900,
            x: (UIConfig.stageW - 647) / 2
        });
        _this.addChild(bg2);
        var shape = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 800,
            x: (UIConfig.stageW - 647) / 2,
            y: 80
        });
        _this.addChild(shape);
        _this.wrap.mask = shape;
        _this.wrap.x = (UIConfig.stageW - 647) / 2;
        _this.wrap.y = 80;
        _this.wrap.addChild(bg);
        _this.scroll = new egret.ScrollView();
        _this.scroll.width = _this.wrap.width;
        _this.scroll.height = _this.wrap.height - 142;
        _this.scroll.y = 142;
        _this.scroll.horizontalScrollPolicy = 'off';
        _this.wrap.addChild(_this.scroll);
        _this.createMenus();
        _this.createMine(null, 0);
        _this.createRank();
        _this.changeCnt(0);
        EventManager.sub('updateRankMine', function (rank, score) {
            _this.createMine(rank, score);
        });
        return _this;
    }
    RankLayer.prototype.createMine = function (rank, score) {
        this.wrapMine = new egret.Sprite();
        this.wrapMine.x = (UIConfig.stageW - 647) / 2;
        this.wrapMine.y = 900;
        this.addChild(this.wrapMine);
        if (rank == null) {
            return;
        }
        this.wrapSelfData.removeChildren();
        this.wrapSelfData = this.renderItem({ name: wxCenter.userInfo['nickName'], rank: '' + rank, avatar: wxCenter.userInfo['avatarUrl'], score: score }, 0);
        this.wrapSelfData.visible = this.currentMenu == 1;
        this.wrapSelfData.y = 17;
        this.wrapMine.addChild(this.wrapSelfData);
    };
    RankLayer.prototype.createMenus = function () {
        var _this = this;
        var wrapMenu = new egret.Sprite;
        wrapMenu.x = 61.5;
        wrapMenu.y = 20;
        this.wrap.addChild(wrapMenu);
        var bg = new Bitmap({
            source: 'rank-menu0_png',
            width: 524
        });
        wrapMenu.addChild(bg);
        ['好友排行榜', '世界排行榜'].forEach(function (name, index) {
            var bg = new Bitmap({
                source: 'rank-menu1_png',
                x: 262 * index,
                width: 262
            });
            var txt = new TextField({
                size: 31,
                color: 0xffffff,
                width: 262,
                textAlign: 'center',
                height: 64,
                verticalAlign: 'middle',
                text: name,
                x: 262 * index
            });
            wrapMenu.addChild(bg);
            wrapMenu.addChild(txt);
            wrapMenu.addEventListener('changeMenu', function (e) {
                var i = e.data;
                bg.visible = i == index;
                txt.textColor = i == index ? 0xffffff : 0xf9a200;
            }, _this);
            txt.touchEnabled = true;
            txt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                wrapMenu.dispatchEventWith('changeMenu', false, index);
                _this.changeCnt(index);
            }, _this);
        });
        wrapMenu.dispatchEventWith('changeMenu', false, 0);
    };
    RankLayer.prototype.createRank = function () {
        var _this = this;
        var spTitle = new egret.Sprite;
        this.wrap.addChild(spTitle);
        spTitle.x = 50;
        spTitle.y = 100;
        var bg = new Bitmap({
            source: 'bg-yellow_png',
            x: -50,
            width: this.wrap.width
        });
        spTitle.addChild(bg);
        var txt = new TextField({
            size: 32,
            color: 0xf9a200,
            text: '排名                名称                 距离(米)',
            y: 2
        });
        spTitle.addChild(txt);
        this.renderFriend();
        this.renderRank(1);
        var btnBack = new Button({
            default: 'btn-bg-org_png',
            x: UIConfig.stageW / 2,
            y: 1110,
            touchScale: .9
        });
        var txtBack = new Bitmap({
            source: 'txt-fhdt_png',
            x: 92,
            y: 30
        });
        btnBack.addChild(txtBack);
        this.addChild(btnBack);
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UImanager.hideRank();
            UImanager.hideResult();
            EventManager.pub('hideStartLayer');
        }, this);
        var btnAgain = new Button({
            default: 'btn-bg-red_png',
            x: UIConfig.stageW / 2,
            y: 1230,
            touchScale: .9
        });
        var txtAgain = new Bitmap({
            source: 'txt-zlyj_png',
            x: 92,
            y: 30
        });
        btnAgain.addChild(txtAgain);
        this.addChild(btnAgain);
        btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UImanager.hideRank();
            UImanager.hideResult();
            // EventManager.pub('resetGame')
            EventManager.pub('startGame');
        }, this);
        EventManager.sub('updateRank', function () {
            _this.renderRank(1);
        });
    };
    RankLayer.prototype.renderRank = function (index, list) {
        var _this = this;
        if (list === void 0) { list = wxCenter.rankList; }
        this.wraps[index] = this.wraps[index] || new egret.Sprite;
        var wrap = this.wraps[index];
        wrap.removeChildren();
        list.forEach(function (item, index) {
            console.log(item);
            var sp = _this.renderItem({
                rank: item.sort, name: item.nickname, score: item.score, avatar: item.avatarUrl
            }, index);
            wrap.addChild(sp);
        });
        this.scroll.setContent(this.wraps[1]);
    };
    RankLayer.prototype.renderFriend = function () {
        this.wraps[0] = new egret.Sprite;
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        var bitmap = new egret.Bitmap(texture);
        bitmap.fillMode = egret.BitmapFillMode.SCALE;
        var ratio = this.wrap.width / bitmap.width;
        bitmap.width *= ratio;
        bitmap.height *= ratio;
        this.wraps[0].addChild(bitmap);
        egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
        this.addChild(this.wraps[0]);
        this.wraps[0].y = 202;
    };
    RankLayer.prototype.renderItem = function (item, index) {
        var sp = new egret.Sprite;
        sp.y = 100 * index;
        var bg = new Bitmap({
            source: 'bg-yellow_png',
            width: this.wrap.width,
            height: 100
        });
        sp.addChild(bg);
        bg.alpha = index % 2 == 0 ? 0 : 1;
        if (item.rank < 4) {
            var spRank = new Bitmap({
                source: 'rank-icon' + item.rank + '_png',
                x: 40,
                y: 18
            });
            sp.addChild(spRank);
        }
        else {
            var spRank = new TextField({
                bold: true,
                size: 40,
                x: 45,
                width: 57,
                textAlign: 'center',
                height: 100,
                verticalAlign: 'middle',
                text: item.rank.toString(),
                color: 0x000000
            });
            sp.addChild(spRank);
        }
        var avatar = new ImageLoader({
            width: 60,
            height: 60,
            src: item['avatar'],
            x: 170,
            y: 20
        });
        sp.addChild(avatar);
        var spName = new TextField({
            size: 32,
            color: 0x000000,
            text: item['name'],
            x: 240,
            height: 100,
            verticalAlign: 'middle'
        });
        sp.addChild(spName);
        var spScore = new TextField({
            size: 40,
            color: 0x000000,
            text: item['score'].toString(),
            x: 430,
            width: 220,
            textAlign: 'center',
            height: 100,
            verticalAlign: 'middle',
            bold: true
        });
        sp.addChild(spScore);
        return sp;
    };
    RankLayer.prototype.changeCnt = function (index) {
        this.currentMenu = index;
        if (this.wrapSelfData) {
            this.wrapSelfData.visible = index == 1;
        }
        this.scroll.visible = index == 1;
        this.wraps[0].visible = index == 0;
        var openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            event: 'changeRank'
        });
    };
    return RankLayer;
}(egret.DisplayObjectContainer));
__reflect(RankLayer.prototype, "RankLayer");
