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
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(type, carType) {
        if (carType === void 0) { carType = 0; }
        var _this = _super.call(this) || this;
        // 加速时的加速度
        _this.a1 = .5;
        // 减速时的加速度
        _this.a2 = 1;
        // 横向匀速移动，该值不改变
        _this.speedX = 10;
        _this.speedY = 0;
        // 暂存左右移动方向 0不动1左2右
        _this.dirX = 0;
        // Y轴加速阈值
        _this.maxSpeedY = 60;
        _this.flagMove = true;
        _this.flagDown = false;
        // 1自己2对家3npc
        _this.carType = 0;
        if (carType == 0) {
            _this.maxSpeedY = 40;
        }
        _this.anistatus = 'normal';
        _this.carType = carType;
        var src;
        src = "pic_car_" + type + "_png";
        _this.bg = new Bitmap({
            source: src,
        });
        _this.addChild(_this.bg);
        _this.anchorOffsetX = _this.bg.width / 2;
        _this.anchorOffsetY = _this.bg.height / 2;
        var aniSrc = type == 2 ? 'hongche' : 'lanche';
        _this.aniCar = AnimateManager.createDragonBoneAni(aniSrc);
        _this.aniCar.visible = false;
        _this.aniCar.x = 36;
        _this.aniCar.y = 72;
        _this.addChild(_this.aniCar);
        _this.aniCar.addEvent(dragonBones.AnimationEvent.COMPLETE, function () {
            console.log('动画完成');
            // this.aniCar.animation.play('daiji', -1)
            _this.aniCar.visible = false;
            //复活后复位
            if (_this.anistatus == 'fuhuo') {
                _this.flagMove = true;
                _this.bg.visible = true;
                _this.anistatus = 'normal';
            }
        }, _this);
        // this.aniCar.addEvent(dragonBones.AnimationEvent., (e) => {
        //   console.log('动画完成',e)
        //   // this.aniCar.animation.play('daiji', -1)
        //   this.aniCar.visible = false;
        // }, this)
        _this.fListen();
        return _this;
    }
    Car.prototype.speedUp = function () {
        var flag = false;
        this.speedY += this.a1;
        if (this.speedY > this.maxSpeedY) {
            // 加速阈值限制
            this.speedY = this.maxSpeedY;
            flag = true;
        }
        this.y -= this.speedY;
        return flag;
    };
    Car.prototype.slowDown = function () {
        if (this.speedY <= 0) {
            // 减速至停止
            this.speedY = 0;
            return;
        }
        this.speedY -= this.a2;
        this.y -= this.speedY;
    };
    Car.prototype.moveLeft = function () {
        this.x -= this.speedX;
    };
    Car.prototype.moveRight = function () {
        this.x += this.speedX;
    };
    Car.prototype.moveX = function () {
        if (this.dirX == 0) {
        }
        else if (this.dirX == 1) {
            this.moveLeft();
        }
        else if (this.dirX == 2) {
            this.moveRight();
        }
    };
    Car.prototype.fListen = function () {
        var _this = this;
        this.addEventListener('crash', function (e) {
            var data = e.data;
            _this.getCrash(data.speedX, data.speedY, data.type);
        }, this);
    };
    Car.prototype.getCrash = function (speedX, speedY, type) {
        var _this = this;
        this.flagMove = false;
        var diedTime = 2200;
        if (this == myCar) {
            EventManager.pub('playHitSound');
        }
        else {
            diedTime = 2400;
        }
        if (type == 'wall') {
            //立即播放爆炸
            this.playBoom();
            setTimeout(function () {
                if (_this.anistatus == 'baozha') {
                    _this.x = 750 / 2 + UIConfig.offsetW;
                    _this.speedY = 0;
                    _this.playReview();
                }
            }, diedTime);
        }
        else if (type == 'npc') {
            // this.flagDown = true;
            this.playBoom();
            setTimeout(function () {
                if (_this.anistatus == 'baozha') {
                    _this.x = 750 / 2 + UIConfig.offsetW;
                    _this.speedY = 0;
                    _this.playReview();
                }
                // this.flagMove = true;
                // this.flagDown = false;
            }, diedTime);
        }
    };
    Car.prototype.testCrash = function () {
        var flagPass = false;
        var delY = this.y - myCar.y;
        if (delY < -UIConfig.stageH) {
            // 超出屏幕上方很远
            flagPass = true;
        }
        else if (delY > 400) {
            // 被超出400米
            flagPass = true;
        }
        else if (Math.abs(delY) <= myCar.height) {
            if (Math.abs(this.x - myCar.x) <= 73) {
                var speedX = myCar.speedX;
                if (this.x >= myCar.x) {
                    speedX = -speedX;
                }
                if (myCar.anistatus == 'normal') {
                    myCar.dispatchEventWith('crash', false, {
                        speedX: speedX,
                        speedY: this.speedY - myCar.speedY,
                        type: 'npc'
                    });
                }
            }
        }
        return flagPass;
    };
    Car.prototype.playBoom = function () {
        this.bg.visible = false;
        this.aniCar.visible = true;
        this.aniCar.animation.play('baozha', 1);
        this.anistatus = 'baozha';
        this.speedY = 0;
    };
    Car.prototype.playReview = function () {
        this.bg.visible = false;
        this.aniCar.visible = true;
        this.aniCar.animation.play('fuhuo', 1);
        this.anistatus = 'fuhuo';
    };
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
