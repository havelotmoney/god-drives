var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UIConfig = (function () {
    function UIConfig() {
    }
    UIConfig.useTransition = true; //是否使用场景过度动画
    UIConfig.width = 750; //设计稿宽度
    UIConfig.height = 1334; //设计稿高度
    UIConfig.stageW = 0; //舞台宽度
    UIConfig.stageH = 0; //舞台高度
    UIConfig.offsetW = 0; //(舞台宽度-设计稿宽度)/2
    UIConfig.offsetH = 0; //(舞台高度-设计稿高度)/2
    UIConfig.sceneScaleWidth = 1;
    UIConfig.sceneScaleHeight = 1;
    UIConfig.deviceWidth = 0;
    UIConfig.deviceHeight = 0;
    return UIConfig;
}());
__reflect(UIConfig.prototype, "UIConfig");
var UIManager = (function () {
    // 顶层两个动画
    function UIManager(layer) {
        this.info = {};
        this.setContainer(layer);
        // this.barTop = new BarTop();
        // this.container.addChildAt(this.barTop, 1);
        // this.clock = new Clock();
        // this.container.addChildAt(this.clock,2);
        // this.barBottom = new BarBottom();
        // this.barBottom.x = (UIConfig.stageW - this.barBottom.width)/2;
        // this.barBottom.y = (UIConfig.stageH - this.barBottom.height);
        // this.container.addChildAt(this.barBottom, 1);
    }
    UIManager.prototype.fListen = function () {
        var _this = this;
        var self = this;
        EventManager.sub('modal/onShowModal', function (modalType, obj) {
            if (obj === void 0) { obj = {}; }
            self.showModal(modalType, obj);
        });
        EventManager.sub('modal/onModalClose', function () {
            if (_this.currentModal) {
                if (_this.currentModal.parent) {
                    egret.Tween.removeTweens(_this.currentModal);
                    egret.Tween.get(_this.currentModal).to({ alpha: 0 }, 200).call(function () {
                        if (_this.currentModal.parent) {
                            _this.container.removeChild(_this.currentModal);
                        }
                        _this.currentModal = undefined;
                    });
                }
                else {
                    _this.currentModal = undefined;
                }
            }
        });
        EventManager.sub('modal/onCloseOffline', function () {
            if (_this.modalOffline && _this.modalOffline.parent) {
                _this.container.removeChild(_this.modalOffline);
            }
        });
        EventManager.sub('modal/onShowOffline', function (obj) {
            if (obj === void 0) { obj = {}; }
            _this.modalOffline = _this.modalOffline || new OfflineModal();
            _this.modalOffline.spText.text = obj['text'];
            _this.container.addChildAt(_this.modalOffline, 50);
        });
    };
    UIManager.prototype.setContainer = function (layer) {
        this.container = layer;
        // 初始化舞台大小
        var stage = egret.MainContext.instance.stage;
        UIConfig.stageW = stage.stageWidth;
        UIConfig.stageH = stage.stageHeight;
        UIConfig.deviceHeight = egret.Capabilities.boundingClientHeight;
        UIConfig.deviceWidth = egret.Capabilities.boundingClientWidth;
        switch (UIConfig.deviceWidth) {
            case 320:
                UIConfig.deviceWidth *= 2;
                break;
            case 375:
                UIConfig.deviceWidth *= 2;
                break;
            case 414:
                UIConfig.deviceWidth *= 2;
                break;
        }
        UIConfig.offsetW = (stage.stageWidth - UIConfig.width) / 2;
        UIConfig.offsetH = (UIConfig.stageH - UIConfig.height) / 2;
        // 重排容器
        this.container.width = UIConfig.stageW;
        this.container.height = UIConfig.stageH;
        // this.container.y = UIConfig.stageW / 2 ;
        var oriRateWidth = 720 / 750;
        var oriRateHeight = 720 / 959;
        GameDataManager.chessBoardW = UIConfig.stageW * oriRateWidth;
        GameDataManager.chessBoardH = UIConfig.stageH * oriRateHeight;
        console.log('实际场景大小：', UIConfig.stageW, UIConfig.stageH);
        console.log('实际棋盘的宽高：', UIConfig.stageW * oriRateWidth, UIConfig.stageH * oriRateHeight);
        this.fListen();
    };
    UIManager.prototype.showModal = function (type, args) {
        if (args === void 0) { args = {}; }
        //   // 0个人信息,1设置
        var modal;
        switch (type) {
            case 0: {
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                break;
            }
            case 3: {
                break;
            }
        }
        if (this.currentModal) {
            this.container.removeChild(this.currentModal);
            this.currentModal = undefined;
        }
        if (modal) {
            this.currentModal = modal;
            this.container.addChildAt(modal, 50);
            if (args['type'] == 1) {
                EventManager.pub("startCT", 1);
            }
            else if (args['type'] == 2) {
                EventManager.pub("startCT", 2);
            }
        }
        else {
            console.warn('modal类型未定义');
        }
    };
    UIManager.prototype.to = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 清除所有已打开弹窗
                // EventManager.pub('modal/onModalClose');
                switch (name) {
                    case 'hall': {
                        // this.sceneHall = this.sceneHall || new SceneHall();
                        // this.add(this.sceneHall)
                        // break
                    }
                    case 'game': {
                        console.log('进入游戏场景');
                        this.sceneGame = this.sceneGame || new SceneGame();
                        // this.sceneGame.gameStartInit();
                        this.add(this.sceneGame);
                        break;
                    }
                    case 'over': {
                        // this.sceneOver = this.sceneOver || new SceneOver();
                        // this.add(this.sceneOver)
                        // EventManager.pub('clearReadyData');
                        // EventManager.pub('ResultBar/updataScore')
                        // this.barBottom.visible = true;
                        // //机器人再来一局逻辑
                        // this.robotReady();
                        // //机器人6s后强制自动断开
                        // if (GameDataManager.robotId != null) {
                        //   EventManager.pub('tiki/startTimerWaiting');
                        // }
                        // break;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    UIManager.prototype.add = function (scene) {
        return __awaiter(this, void 0, void 0, function () {
            var onEnter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentScene) return [3 /*break*/, 2];
                        // 跳转到当前场景时返回
                        if (this.currentScene == scene) {
                            this.currentScene.onLeave && this.currentScene.onLeave();
                            this.currentScene.onEnter && this.currentScene.onEnter();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.remove(this.currentScene)];
                    case 1:
                        _a.sent();
                        console.log('====原场景已移除====');
                        _a.label = 2;
                    case 2:
                        onEnter = scene.onEnter || new Function;
                        scene.once(egret.Event.ADDED_TO_STAGE, onEnter, scene);
                        // 加载新场景
                        this.container.addChildAt(scene, 0);
                        console.log('====加载新场景成功====');
                        this.currentScene = scene;
                        if (!UIConfig.useTransition) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.transform(scene)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.remove = function (scene) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.container.contains(scene)) return [3 /*break*/, 3];
                        if (!UIConfig.useTransition) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transform(scene, false)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // 执行场景中定义的onLeave方法
                        scene.onLeave && scene.onLeave();
                        scene && scene.parent && this.container.removeChild(scene);
                        this.currentScene = undefined;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.transform = function (ele, direction, duration) {
        if (direction === void 0) { direction = true; }
        if (duration === void 0) { duration = 300; }
        return __awaiter(this, void 0, void 0, function () {
            var start, end, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        start = {
                            alpha: 0
                        };
                        end = {
                            alpha: 1
                        };
                        if (!direction) {
                            // 调换start，end状态
                            _a = [end, start], start = _a[0], end = _a[1];
                        }
                        return [4 /*yield*/, (function () {
                                return new Promise(function (resolve, reject) {
                                    egret.Tween.get(ele).set(start).to(end, duration).call(function () {
                                        resolve();
                                    });
                                });
                            })()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.createFrames = function (sourceName) {
        var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(sourceName + '_json'), RES.getRes(sourceName + '_png'));
        var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData(sourceName));
        return mc;
    };
    UIManager.prototype.showResult = function (score) {
        this.layerResult = this.layerResult || new ResultLayer();
        this.layerResult.setScore(score);
        this.container.addChild(this.layerResult);
    };
    UIManager.prototype.hideResult = function () {
        if (this.layerResult && this.layerResult.parent) {
            this.container.removeChild(this.layerResult);
        }
    };
    UIManager.prototype.showRank = function () {
        this.layerRank = this.layerRank || new RankLayer();
        this.container.addChild(this.layerRank);
    };
    UIManager.prototype.hideRank = function () {
        if (this.layerRank && this.layerRank.parent) {
            this.container.removeChild(this.layerRank);
        }
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
// 注册全局管理器
var UImanager;
