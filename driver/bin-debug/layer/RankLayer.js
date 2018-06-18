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
var testRank = [
    {
        rank: 1,
        name: 'aaaaa',
        score: 1111,
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717056030,451974468&fm=200&gp=0.jpg'
    }, {
        rank: 2,
        name: 'bbb',
        score: 1111
    }, {
        rank: 3,
        name: 'dsdad',
        score: 11
    }, {
        rank: 4,
        name: 'adawdad',
        score: 11
    }, {
        rank: 5,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }, {
        rank: 1,
        name: 'aaaaa',
        score: 1111
    }
];
var RankLayer = (function (_super) {
    __extends(RankLayer, _super);
    function RankLayer() {
        var _this = _super.call(this) || this;
        _this.wraps = [];
        _this.menus = [];
        var mask = new Mask(.6);
        _this.addChild(mask);
        _this.wrap = new egret.Sprite;
        _this.addChild(_this.wrap);
        var bg = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 800
        });
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
        _this.createRank();
        _this.createMenus();
        _this.createMine();
        return _this;
    }
    RankLayer.prototype.createMine = function () {
        this.wrapMine = new egret.Sprite();
        this.wrapMine.x = (UIConfig.stageW - 647) / 2;
        this.wrapMine.y = 900;
        this.addChild(this.wrapMine);
        var bg = new Bitmap({
            source: 'bg-rank_png',
            width: 647,
            height: 134
        });
        this.wrapMine.addChild(bg);
        var sp = this.renderItem({ name: '222', rank: 1, avatar: '', score: 222 }, 0);
        sp.y = 17;
        this.wrapMine.addChild(sp);
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
            EventManager.pub('resetGame');
            UImanager.hideRank();
        }, this);
    };
    RankLayer.prototype.renderRank = function (index, list) {
        var _this = this;
        if (list === void 0) { list = testRank; }
        this.wraps[index] = new egret.Sprite;
        var wrap = this.wraps[index];
        list.forEach(function (item, index) {
            var sp = _this.renderItem(item, index);
            wrap.addChild(sp);
        });
    };
    RankLayer.prototype.renderFriend = function () {
        this.wraps[0] = new egret.Sprite;
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        var bitmap = new egret.Bitmap(texture);
        var ratio = this.wrap.width / bitmap.width;
        bitmap.width *= ratio;
        bitmap.height *= ratio;
        this.wraps[0].addChild(bitmap);
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
            var spRank = new BitmapText({
                source: 'fnt-rankNum_fnt',
                x: 45,
                width: 57,
                textAlign: 'center',
                height: 100,
                verticalAlign: 'middle',
                text: item.rank.toString()
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
        var spScore = new BitmapText({
            source: 'fnt_rank_fnt',
            text: item['score'].toString(),
            x: 430,
            width: 220 / .5,
            textAlign: 'center',
            y: 50
        });
        spScore.scaleX = spScore.scaleY = .5;
        spScore.anchorOffsetY = spScore.height / 2;
        sp.addChild(spScore);
        return sp;
    };
    RankLayer.prototype.changeCnt = function (index) {
        // let wrap = this.wraps[index];
        // if (wrap) {
        //   this.wrap.addChild(this.wraps[index]);
        //   wrap.y = 142;
        // }
        this.scroll.setContent(this.wraps[index]);
    };
    return RankLayer;
}(egret.DisplayObjectContainer));
__reflect(RankLayer.prototype, "RankLayer");
