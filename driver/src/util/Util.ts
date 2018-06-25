interface AjaxConfig {
  type?: string; //post||get
  url: string; //地址
  data?: Object; //发送数据
  success?: Function; //发送成功的回调
  fail?: Function; //失败后回调
  dataType?: string,
  params?: Object;
  method?: string;
  headers?: Object;
  sendType?: string;
  parseType?: number;
}
class Util {
  static host: any = 'https://xcx.genghaojia.me';
  static parseData(obj) {
    obj = obj || {};
    let str = '';
    for (let key in obj) {
      if (typeof obj[key] == 'object') {
        obj[key] = JSON.stringify(obj[key])
      }
      str += `${key}=${obj[key]}`;
      str += '&';
    }
    return str ? str.slice(0, -1) : str;
  }
  static Ajax(obj: AjaxConfig) {
    obj.data = obj.data || obj.params || {};
    obj.type = obj.type || obj.method || 'get';
    obj.fail = obj.fail || function () { };
    obj.success = obj.success || function () { };
    // 将类型处理至小写
    obj.type = obj.type.toLowerCase();
    obj.method && (obj.method.toLowerCase())
    obj.sendType && (obj.sendType.toLowerCase())
    let method = (obj.type == 'post') ? egret.HttpMethod.POST : egret.HttpMethod.GET;
    let sendType = obj.sendType || obj.type;
    let url = ''
    if (obj.url.indexOf('http') > -1) {
      url = obj.url
    } else {
      url = Util.host + obj.url;
    }
    if (sendType == 'get') {
      url += `?${Util.parseData(obj.data)}`
    } else if (sendType == 'post') {
    }

    var request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(`${url}`, method);
    request.setRequestHeader('Accept', 'application/json, text/plain,*/*');
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (obj.headers) {
      if (obj.headers['Content-Type'] != undefined) {
        request.setRequestHeader('Content-Type', obj.headers['Content-Type']);
      }
    }
    if (sendType == 'get') {
      request.send();
    } else {
      request.send(obj.data);
    }

    return new Promise((rsv, rej) => {
      request.once(egret.Event.COMPLETE, (event: egret.Event) => {
        var request = <egret.HttpRequest>event.currentTarget;
        let data: { result, message, code } = JSON.parse(request.response);
        if (data.code == 1001) {
          obj.success(data['data'])
          rsv(data)
        } else {
          obj.fail(data)
          rej(data);
          console.log(data, '请求返回错误', url)
        }
      }, this);

      request.once(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
        obj.fail({ message: '网络错误，请重试！', code: 500 })
        rej({ message: '网络错误，请重试！', code: 500 });
      }, this);
    })


  }
  static formatFloat(num, len) {
    // var weishu = Math.pow(10,len)
    // console.log(weishu)
    // return   ( (Math.round(num*weishu))/weishu);;    
    var sNum = parseInt(num);
    return sNum.toFixed(len)
  }
  static parseClock(s) {
    let min = this.clockNum(Math.floor(s / 60));
    let sec = this.clockNum(s % 60);
    return `${min}:${sec}`
  }
  static clockNum(num) {
    return `00${num}`.slice(-2);
  }

  static RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  }
}