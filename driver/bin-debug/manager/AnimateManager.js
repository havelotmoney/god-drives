/**
 * @author:qly
 */
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
var AnimateManager = (function () {
    function AnimateManager() {
    }
    // 圆动画，point圆心，r半径，(未调整anchor偏移，需自行调整以优化视觉效果)
    AnimateManager.circleMove = function (obj, point, r, angleStart, angleEnd, duration, isLoop) {
        if (angleStart === void 0) { angleStart = 360; }
        if (angleEnd === void 0) { angleEnd = 0; }
        if (duration === void 0) { duration = 2000; }
        if (isLoop === void 0) { isLoop = true; }
        return __awaiter(this, void 0, void 0, function () {
            var funcChange;
            return __generator(this, function (_a) {
                funcChange = function () {
                    this.x = point.x + r * Math.cos(this.angle * Math.PI / 180);
                    this.y = point.y - r * Math.sin(this.angle * Math.PI / 180);
                };
                egret.Tween.get(obj, { onChange: funcChange, onChangeObj: obj, loop: isLoop })
                    .set({
                    angle: angleStart,
                    x: point.x + r * Math.cos(angleStart * Math.PI / 180),
                    y: point.y - r * Math.sin(angleStart * Math.PI / 180)
                })
                    .to({
                    angle: angleEnd
                }, duration);
                return [2 /*return*/];
            });
        });
    };
    AnimateManager.createDragonBoneAni = function (sourceName, width, height, skeName) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (skeName === void 0) { skeName = ''; }
        skeName = skeName || sourceName;
        //定义dragonBones.EgretFactory对象
        var factory;
        factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(RES.getRes(sourceName + "_ske_json"));
        factory.parseTextureAtlasData(RES.getRes(sourceName + "_tex_json"), RES.getRes(sourceName + "_tex_png"));
        //直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
        var ar = factory.buildArmatureDisplay(skeName);
        width && (ar.scaleX = width / ar.width);
        height && (ar.scaleY = height / ar.height);
        return ar;
    };
    return AnimateManager;
}());
__reflect(AnimateManager.prototype, "AnimateManager");
