var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.parseData = function (obj) {
        obj = obj || {};
        var str = '';
        for (var key in obj) {
            if (typeof obj[key] == 'object') {
                obj[key] = JSON.stringify(obj[key]);
            }
            str += key + "=" + obj[key];
            str += '&';
        }
        return str ? str.slice(0, -1) : str;
    };
    Util.Ajax = function (obj) {
        var _this = this;
        obj.data = obj.data || obj.params || {};
        obj.type = obj.type || obj.method || 'get';
        obj.fail = obj.fail || function () { };
        obj.success = obj.success || function () { };
        // 将类型处理至小写
        obj.type = obj.type.toLowerCase();
        obj.method && (obj.method.toLowerCase());
        obj.sendType && (obj.sendType.toLowerCase());
        var method = (obj.type == 'post') ? egret.HttpMethod.POST : egret.HttpMethod.GET;
        var sendType = obj.sendType || obj.type;
        var url = '';
        if (obj.url.indexOf('http') > -1) {
            url = obj.url;
        }
        else {
            url = Util.host + obj.url;
        }
        if (sendType == 'get') {
            url += "?" + Util.parseData(obj.data);
        }
        else if (sendType == 'post') {
        }
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("" + url, method);
        request.setRequestHeader('Accept', 'application/json, text/plain,*/*');
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (obj.headers) {
            if (obj.headers['Content-Type'] != undefined) {
                request.setRequestHeader('Content-Type', obj.headers['Content-Type']);
            }
        }
        if (sendType == 'get') {
            request.send();
        }
        else {
            request.send(obj.data);
        }
        return new Promise(function (rsv, rej) {
            request.once(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                var data = JSON.parse(request.response);
                if (data.code == 1001) {
                    obj.success(data['data']);
                    rsv(data);
                }
                else {
                    obj.fail(data);
                    rej(data);
                    console.log(data, '请求返回错误', url);
                }
            }, _this);
            request.once(egret.IOErrorEvent.IO_ERROR, function (event) {
                obj.fail({ message: '网络错误，请重试！', code: 500 });
                rej({ message: '网络错误，请重试！', code: 500 });
            }, _this);
        });
    };
    Util.getScore = function () {
        return Math.abs(Math.floor(myCar.y / 10));
    };
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
    Util.host = 'https://xcx.genghaojia.me';
    return Util;
}());
__reflect(Util.prototype, "Util");
