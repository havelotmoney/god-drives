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
var totalLen = 100000;
// const totalLen = 5000;
var myCar, oppCar;
var npcCars = [];
var trees = [];
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Bitmap(RES.getRes('bg_png'));
        _this.stageCenter = 0;
        _this.treePlantY = 0;
        _this.robotDir = 'left';
        _this.timer = null;
        _this.daojishi = 30 * 60;
        var self = _this;
        _this.init();
        // this.initLayer();
        _this.fListen();
        return _this;
    }
    SceneGame.prototype.initLayer = function () {
        this.startLayer = new StartLayer();
        this.addChild(this.startLayer);
    };
    SceneGame.prototype.init = function () {
        var self = this;
        this && this.removeChildren();
        this.ani321Timer = new egret.Timer(1000, 3);
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.width = UIConfig.stageW;
        this.bg.height = UIConfig.stageH;
        this.addChild(this.bg);
        this.timeBar_btm = new Bitmap({
            source: 'bar-time-bule_png',
            width: 530,
            height: 23,
        });
        this.timeBar_btm.scale9Grid = new egret.Rectangle(12, 10, 20, 3);
        this.barWrap = new egret.Sprite();
        this.barWrap.height = 636;
        this.barWrap.x = (UIConfig.stageW - this.barWrap.width) / 2;
        this.barWrap.addChild(this.timeBar_btm);
        this.timeBar_top = new Bitmap({
            source: 'bar-time-yellow_png',
            width: 530,
            height: 23,
        });
        this.timeBar_top.scale9Grid = new egret.Rectangle(12, 10, 20, 3);
        this.barWrap.addChild(this.timeBar_top);
        this.timeBar_btm.x = 78 + UIConfig.offsetW;
        this.timeBar_btm.y = -310;
        this.timeBar_top.x = 78 + UIConfig.offsetW;
        this.timeBar_top.y = -310;
        var timeSign = new Bitmap({
            source: 'bar-time-sign_png',
        });
        timeSign.x = this.timeBar_btm.x - timeSign.width / 2 + UIConfig.offsetW;
        timeSign.y = -325;
        this.barWrap.addChild(timeSign);
        this.distance = new BitmapText({
            source: 'white1_fnt',
            text: '0M',
            width: 500,
            textAlign: 'center',
            y: -280
        });
        this.distance.x = 90 + UIConfig.offsetW;
        this.barWrap.addChild(this.distance);
        this.barWrap.x = 35;
        this.barWrap.y = UIConfig.stageH - 950;
        this.stageCenter = UIConfig.stageH / 2;
        this.streetWrap = new egret.Sprite();
        this.streetWrap.width = UIConfig.stageW;
        // this.streetWrap.anchorOffsetX= this.streetWrap.width/2;
        this.addChild(this.streetWrap);
        this.streetWrap.y = UIConfig.stageH;
        var streetPic = new Bitmap({
            source: 'bg_png',
            width: UIConfig.stageW,
            height: totalLen + 2 * UIConfig.stageH,
            x: UIConfig.offsetW
        });
        streetPic.fillMode = egret.BitmapFillMode.REPEAT;
        streetPic.y = UIConfig.stageH - streetPic.height;
        this.streetWrap.addChild(streetPic);
        var overLine = new Bitmap({
            source: 'pic_xian_png',
        });
        overLine.x = (UIConfig.stageW - overLine.width) / 2;
        overLine.y = -totalLen;
        this.streetWrap.addChild(overLine);
        // let pic_star = new Bitmap({
        //   source: 'pic_star_png',
        // })
        // pic_star.y = - pic_star.height;
        // this.streetWrap.addChild(pic_star);
        // this.prgRed = new Bitmap({
        //   source: 'pic_bar_car_1_png',
        // })
        // this.prgRed.anchorOffsetY = this.prgRed.height / 2;
        // this.barWrap.addChild(this.prgRed);
        // this.prgRed.x = 25;
        // this.prgBlue = new Bitmap({
        //   source: 'pic_bar_car_2_png',
        // })
        // this.prgBlue.anchorOffsetY = this.prgBlue.height / 2;
        // this.barWrap.addChild(this.prgBlue);
        // this.prgBlue.x = - 40;
        this.touchLayer = new egret.Shape;
        this.touchLayer.graphics.beginFill(0xffffff, 0);
        this.touchLayer.graphics.drawRect(0, 0, UIConfig.stageW, UIConfig.stageH);
        this.touchLayer.graphics.endFill();
        this.touchLayer.touchEnabled = true;
        this.addChild(this.touchLayer);
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            if (e.localX <= UIConfig.stageW / 2) {
                myCar.dirX = 1;
            }
            else {
                myCar.dirX = 2;
            }
            // Connection.sendMessage('moveX', {
            //   dirX: myCar.dirX
            // })
        }, this);
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            myCar.dirX = 0;
            // Connection.sendMessage('moveX', {
            //   dirX: 0
            // })
        }, this);
        this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            myCar.dirX = 0;
            // Connection.sendMessage('moveX', {
            //   dirX: 0
            // })
        }, this);
        this.addChild(this.barWrap);
        // this.pan = new Bitmap({
        //   source: 'pic_biao_png',
        // })
        // this.pan.y = UIConfig.stageH - this.pan.height;
        // this.pan.x = (UIConfig.stageW - this.pan.width) / 2;
        // this.addChild(this.pan);
        // this.zhen = new Bitmap({
        //   source: 'pic_biao_zhen_png',
        // })
        // this.zhen.anchorOffsetX = this.zhen.width - 35;
        // this.zhen.anchorOffsetY = this.zhen.height / 2;
        // this.addChild(this.zhen);
        // this.zhen.x = UIConfig.stageW / 2 + this.zhen.width / 2 - 68;
        // this.zhen.y = UIConfig.stageH - 20;
        var startLine = new Bitmap({
            source: 'pic_xian_png',
        });
        startLine.x = (UIConfig.stageW - startLine.width) / 2;
        startLine.y = -290;
        this.streetWrap.addChild(startLine);
        // this.qiziLeft = new Bitmap({
        //   source: 'pic_qz_png',
        // })
        // this.qiziLeft.anchorOffsetX = this.qiziLeft.width;
        // this.qiziLeft.anchorOffsetY = this.qiziLeft.height;
        // this.qiziLeft.x = UIConfig.stageW / 2 + 70;
        // this.qiziLeft.y = 800;
        // this.addChild(this.qiziLeft);
        // this.qiziRight = new Bitmap({
        //   source: 'pic_qz2_png',
        // })
        // this.qiziRight.anchorOffsetY = this.qiziRight.height;
        // this.qiziRight.x = UIConfig.stageW / 2 - 70;
        // this.qiziRight.y = 800;
        // this.addChild(this.qiziRight);
        // this.aniNum = new Bitmap({
        //   source: 'pic_3_png',
        // })
        // this.aniNum.x = (UIConfig.stageW - this.aniNum.width) / 2;
        // this.aniNum.y = 400;
        // this.addChild(this.aniNum);
        // this.tipL = new Bitmap({
        //   source: 'tip-left_png',
        //   y: UIConfig.stageH - 300,
        // })
        // this.tipL.x = (UIConfig.stageW / 2) - 335;
        // this.addChild(this.tipL);
        // this.tipR = new Bitmap({
        //   source: 'tip-right_png',
        //   y: UIConfig.stageH - 300,
        // })
        // this.tipR.x = (UIConfig.stageW / 2) + 200;
        // this.addChild(this.tipR);
        // this.tipHand = new Bitmap({
        //   source: 'tip-hand_png',
        //   y: UIConfig.stageH - 200,
        // })
        // this.tipHand.x = (UIConfig.stageW / 2) + 200;
        // this.addChild(this.tipHand);
        // this.tipHnadother = new Bitmap({
        //   source: 'tip-hand_png',
        //   y: UIConfig.stageH - 200,
        // })
        // this.tipHnadother.scaleX = -1;
        // this.tipHnadother.x = (UIConfig.stageW / 2) - 200;
        // this.addChild(this.tipHnadother);
        // this.arrow = new Bitmap({
        //   source: 'jiantou_png',
        //   x: 244 + UIConfig.offsetW,
        //   y: 900,
        // })
        // this.addChild(this.arrow);
        myCar = new Car(2, 1);
        // oppCar = new Car(1, 2);
        this.streetWrap.addChild(myCar);
        // this.streetWrap.addChild(oppCar);
        // if (GameData.number == 1) {
        //   myCar.x = 276 + UIConfig.offsetW;
        // } else {
        //   myCar.x = 482 + UIConfig.offsetW;
        // }
        myCar.x = UIConfig.stageW / 2;
        myCar.y = -130;
        //模拟机器人
        // this.startRobot();
        this.hitBgm = RES.getRes("carcrash_mp3");
        this.startLayer = new StartLayer();
        this.addChild(this.startLayer);
    };
    SceneGame.prototype.startinit = function () {
        this.streetWrap.y = UIConfig.stageH;
        myCar.x = UIConfig.stageW / 2;
        myCar.y = -130;
    };
    SceneGame.prototype.createTree = function (start) {
        if (start === void 0) { start = 0; }
        // 出现景物，超出后删除
        var treeMax = 8;
        var startY = start || myCar.y - UIConfig.stageH + 200;
        for (var i = 0; i < treeMax; i++) {
            var random = Util.RandomNumBoth(1, 9);
            var treeTypeIsHouse = (random <= 4) ? true : false;
            var tree = new Bitmap("pic_lb_" + random + "_png");
            tree.y = startY - UIConfig.stageH * i / treeMax;
            var dirX = Math.random() < .5 ? 1 : -1;
            var x = 0;
            if (dirX == -1) {
                x = Util.RandomNumBoth(0, 180 - 127 + UIConfig.offsetW);
                tree.scaleX = -1;
                x += tree.width;
                if (treeTypeIsHouse) {
                    x = tree.width;
                }
            }
            else {
                x = Util.RandomNumBoth(566 + UIConfig.offsetW, UIConfig.stageW - 127);
                if (treeTypeIsHouse) {
                    x = UIConfig.stageW - tree.width;
                }
            }
            tree.x = x;
            this.streetWrap.addChild(tree);
            trees.push(tree);
        }
    };
    SceneGame.prototype.testTreePass = function () {
        var flag = trees.length != 0;
        trees.forEach(function (tree) {
            if (tree.y - myCar.y <= 500) {
                flag = false;
            }
        });
        if (flag) {
            trees.forEach(function (tree) {
                tree.parent && tree.parent.removeChild(tree);
            });
            trees = [];
        }
    };
    SceneGame.prototype.shuffle = function (arr) {
        for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x)
            ;
        return arr;
    };
    ;
    SceneGame.prototype.createNpcCar = function () {
        // 一次出现3辆车，全部甩开后刷新新车
        var carLen1 = 3;
        var carLen2 = 3;
        var maxDelY = UIConfig.stageH * 1.4;
        var arr = this.shuffle([0, 1, 2, 3]);
        for (var i = 0; i < carLen1; i++) {
            var npc = new Car(Util.RandomNumBoth(4, 7));
            var startY = myCar.y - UIConfig.stageH + 200;
            npc.y = Util.RandomNumBoth(startY, startY - maxDelY / 2 + 200);
            npc.speedY = Util.RandomNumBoth(2 * npc.maxSpeedY / 3, npc.maxSpeedY);
            var blank = 6;
            npc.x = 180 + myCar.width / 2 + (576 - 180) * arr[i] / 4 + UIConfig.offsetW;
            this.streetWrap.addChild(npc);
            npcCars.push(npc);
        }
        var arr2 = this.shuffle([0, 1, 2, 3]);
        for (var i = 0; i < carLen2; i++) {
            var npc = new Car(Util.RandomNumBoth(4, 7));
            var startY = myCar.y - UIConfig.stageH + 200;
            npc.y = Util.RandomNumBoth(startY - maxDelY / 2, startY - maxDelY);
            npc.speedY = Util.RandomNumBoth(2 * npc.maxSpeedY / 3, npc.maxSpeedY);
            var blank = 6;
            npc.x = 180 + myCar.width / 2 + (576 - 180) * arr2[i] / 4 + UIConfig.offsetW;
            this.streetWrap.addChild(npc);
            npcCars.push(npc);
        }
    };
    SceneGame.prototype.npcAutoMove = function () {
        var flagClear = npcCars.length != 0;
        npcCars.forEach(function (car) {
            car.speedUp();
            var flag = car.testCrash();
            if (!flag) {
                flagClear = false;
            }
        });
        if (flagClear) {
            npcCars.forEach(function (car) {
                car.parent && car.parent.removeChild(car);
            });
            npcCars = [];
        }
    };
    SceneGame.prototype.startGame = function () {
        var _this = this;
        this.clearTimer();
        this.timer = setInterval(function () {
            _this.enterFrame();
            if (_this.daojishi > 0) {
                _this.daojishi--;
                _this.setProcess();
            }
            else {
                //游戏结束
                var score = Math.abs(Math.floor(myCar.y));
                _this.gameOverInit();
                UImanager.showResult(score);
                wxCenter.updateScore(score);
            }
        }, 33);
    };
    SceneGame.prototype.enterFrame = function () {
        if (this.treePlantY - myCar.y > UIConfig.stageH) {
            this.treePlantY = myCar.y;
            this.createTree();
        }
        this.testTreePass();
        this.npcAutoMove();
        //我方小车移动
        if (myCar.flagMove) {
            var speedYMax = myCar.speedUp();
            if (speedYMax && npcCars.length == 0) {
                // 如果已经是最大速度且前方没有待超的npc车，添加npc车辆
                this.createNpcCar();
            }
            else {
                // 有待超车辆
            }
            myCar.moveX();
            // 移动容器，使小车总是显示在屏幕中
            this.streetWrap.y = -myCar.y + UIConfig.stageH - 300;
            if (myCar.y <= -totalLen) {
                // Connection.broadCast('sendResult', { winId: GameDataManager.userID })
                myCar.flagMove = false;
            }
            EventManager.pub('testCrash');
        }
        else if (myCar.flagDown) {
            //降速
            myCar.slowDown();
            myCar.moveX();
            this.streetWrap.y = -myCar.y + UIConfig.stageH - 300;
            if (myCar.y <= -totalLen) {
                // Connection.broadCast('sendResult', { winId: GameData.nId })
                myCar.flagMove = false;
            }
        }
        // if (oppCar.flagMove) {
        //   //10s 撞一次  1/300的概率
        //   if (GameDataManager.robotId != null) {
        //     if (oppCar.y <= -1000) {
        //       if (Math.floor(Math.random() * 500) == 299) {
        //         oppCar.dispatchEventWith('crash', false, { speedX: 10, speedY: 0, type: 'wall' })
        //       }
        //     }
        //   }
        //   oppCar.speedUp();
        //   oppCar.moveX();
        //   if (oppCar.y <= -totalLen) {
        //     Connection.broadCast('sendResult', { winId: GameDataManager.oppID })
        //     oppCar.flagMove = false;
        //   }
        //   this.oppHroMove();
        // }
        // this.setProgress();
    };
    SceneGame.prototype.oppHroMove = function () {
        var changeDir = Math.random() > 0.95 ? true : false;
        if (changeDir) {
            this.robotDir = (this.robotDir == 'left' ? 'right' : 'left');
        }
        if (this.robotDir == 'left') {
            if (oppCar.x <= 180 + 73 / 2 + UIConfig.offsetW) {
                oppCar.x += 1;
            }
            else {
                oppCar.x -= 1;
            }
        }
        else {
            if (oppCar.x >= 566 - 73 / 2 + UIConfig.offsetW) {
                oppCar.x -= 1;
            }
            else {
                oppCar.x += 1;
            }
        }
    };
    SceneGame.prototype.setProcess = function () {
        // this.zhen.rotation = (myCar.speedY / 60) * 135;
        this.timeBar_top.width = (this.daojishi / 1800) * 530;
        this.distance.text = '' + Math.abs(Math.floor(myCar.y)) + 'M';
    };
    SceneGame.prototype.checkOver = function () {
    };
    SceneGame.prototype.checkRobotOver = function () {
    };
    SceneGame.prototype.startRobot = function () {
    };
    SceneGame.prototype.startACT = function () {
        this.ani321Timer.repeatCount = 3;
        this.ctCount = 3;
        this.ani321Timer.addEventListener(egret.TimerEvent.TIMER, this.subTime, this);
        this.ani321Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeOver, this);
        this.ani321Timer.reset();
        this.ani321Timer.start();
        this.arrow.visible = true;
        egret.Tween.get(this.arrow, { loop: true }).set({ alpha: 1 }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    SceneGame.prototype.subTime = function () {
        if (this.ctCount == 0) {
            return;
        }
        this.ctCount -= 1;
        if (this.ctCount == 2) {
            this.aniNum.texture = RES.getRes('pic_2_png');
            // egret.Tween.get(this.ct321[1]).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineIn);
        }
        else if (this.ctCount == 1) {
            this.aniNum.texture = RES.getRes('pic_1_png');
            // egret.Tween.get(this.ct321[0]).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineIn);
        }
    };
    SceneGame.prototype.timeOver = function () {
        //请求开始游戏
        egret.Tween.removeTweens(this.arrow);
        this.arrow.visible = false;
        this.qiziLeft.visible = false;
        this.qiziRight.visible = false;
        this.aniNum.visible = false;
        this.tipL.visible = false;
        this.tipR.visible = false;
        this.tipHand.visible = false;
        this.tipHnadother.visible = false;
        console.log(1111111111111);
        // this.startGame();
    };
    SceneGame.prototype.fListen = function () {
        var _this = this;
        var self = this;
        EventManager.sub('playHitSound', function () {
            _this.hitsoundChannel = _this.hitBgm.play(0, 1);
        });
        EventManager.sub('oppMoveX', function (data) {
            oppCar.dirX = data.dirX;
        });
        EventManager.sub('startGame', function () {
            console.log('startGame');
            // this.init();
            _this.startinit();
            // self.startACT();
            _this.createTree(-800);
            _this.changeLayer(1);
            _this.startGame();
        });
        EventManager.sub('resetGame', function () {
            _this.init();
        });
        EventManager.sub('testCrash', function () {
            if (myCar.x <= 180 + 73 / 2 + UIConfig.offsetW) {
                // 撞到左侧跑道边缘
                myCar.dispatchEventWith('crash', false, { speedX: 10, speedY: 0, type: 'wall' });
                // Connection.sendMessage('crash', {
                //   speedX: 10, speedY: 0, type: 'wall'
                // })
            }
            else if (myCar.x >= 566 - 73 / 2 + UIConfig.offsetW) {
                // 撞到右侧跑道边缘
                myCar.dispatchEventWith('crash', false, { speedX: -10, speedY: 0, type: 'wall' });
                // Connection.sendMessage('crash', {
                //   speedX: -10, speedY: 0, type: 'wall'
                // })
            }
        });
        EventManager.sub('oppCrash', function (data) {
            oppCar.dispatchEventWith('crash', false, data);
        });
    };
    SceneGame.prototype.changeLayer = function (type) {
        if (type == 1) {
            //移除开始遮罩
            if (this.startLayer && this.contains(this.startLayer)) {
                this.removeChild(this.startLayer);
            }
        }
    };
    SceneGame.prototype.initStatus = function () {
        GameDataManager.oppIsReady = false;
        GameDataManager.mapData = [];
    };
    SceneGame.prototype.clearStage = function () {
    };
    SceneGame.prototype.clearTimer = function () {
        clearInterval(this.timer);
        this.timer = null;
        this.daojishi = 30 * 60;
    };
    SceneGame.prototype.gameOverInit = function () {
        console.log('游戏重新初始化');
        this.initStatus();
        this.clearTimer();
    };
    SceneGame.prototype.onEnter = function () {
        // this.gameStartInit();
        // this.isGameover = false;
    };
    SceneGame.prototype.onLeave = function () {
    };
    return SceneGame;
}(egret.DisplayObjectContainer));
__reflect(SceneGame.prototype, "SceneGame");
