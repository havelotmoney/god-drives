var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.formatFloat = function (num, len) {
        // var weishu = Math.pow(10,len)
        // console.log(weishu)
        // return   ( (Math.round(num*weishu))/weishu);;    
        var sNum = parseInt(num);
        return sNum.toFixed(len);
    };
    Util.parseClock = function (s) {
        var min = this.clockNum(Math.floor(s / 60));
        var sec = this.clockNum(s % 60);
        return min + ":" + sec;
    };
    Util.clockNum = function (num) {
        return ("00" + num).slice(-2);
    };
    Util.RandomNumBoth = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
