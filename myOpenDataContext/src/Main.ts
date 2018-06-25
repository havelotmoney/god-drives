class Main extends egret.DisplayObjectContainer {
  private wrap: egret.Sprite;
  private info = {};
  constructor() {
    super();
    let self = this;
    wx.onMessage(data => {
      if (data.event == 'changeRank') {
        //获取小游戏开放数据接口 --- 开始
        wx.getFriendCloudStorage({
          keyList: ['rank'],
          success: res => {
            console.log(res);
            this.runGame(res.data);
          },
          fail: err => {
            console.log(err);
          },
          complete: () => {

          }
        });
        //监听消息 isDisplay
      } else if (data.event == 'setInfo') {
        self.info = data.data;
      }
    });

    //获取小游戏开放数据接口 --- 结束        

    //测试点击
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
      console.log('子域输出点击');
    }, this);
  }


  /**
   * 便于演示数据，这里使用家数据
   * 有关获取还有的接口参考：https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/open-data.html?t=2018323
   */
  private sort(a, b) {
    return JSON.parse(b['KVDataList'][0]['value'])['wxgame']['score'] - JSON.parse(a['KVDataList'][0]['value'])['wxgame']['score']
  }
  private runGame(list: Array<any>) {
    let stage: egret.Stage = egret.MainContext.instance.stage;
    this.wrap = this.wrap || new egret.Sprite;
    this.stage.addChild(this.wrap)
    this.wrap.removeChildren();
    let wrap2 = new egret.Sprite;
    list = list.sort(this.sort);
    list.forEach((config, index) => {
      let sp = this.renderItem({
        rank: index + 1,
        avatar: config.avatarUrl,
        name: config.nickname,
        score: JSON.parse(config['KVDataList'][0]['value'])['wxgame']['score'] || 0
      }, index);
      sp.y = index * 100;
      sp.x = 50;
      wrap2.addChild(sp);
    })

    let scroll = new egret.ScrollView();
    scroll.width = stage.stageWidth;
    scroll.height = stage.stageHeight - 154;
    scroll.y = 22;
    scroll.horizontalScrollPolicy = 'off';

    this.wrap.addChild(scroll);
    scroll.setContent(wrap2);

    let infoMine = this.getMine(list)
    let spMine = this.renderItem({
      name: infoMine['nickname'], rank: infoMine['rank'], avatar: infoMine['avatarUrl'], score: JSON.parse(infoMine['KVDataList'][0]['value'])['wxgame']['score']
    }, 0);
    spMine.visible = true;
    spMine.x = 53;
    spMine.y = 716;
    this.wrap.addChild(spMine);
  }
  private getMine(list: Array<Object>) {
    let target = {};
    list.forEach((item, index) => {
      if (item['nickname'] == this.info['nickName']) {
        target = item;
        target['rank'] = index + 1;
      }
    })
    return target;
  }
  renderItem(item, index) {
    let stage: egret.Stage = egret.MainContext.instance.stage;
    let sp = new egret.Sprite;
    sp.y = 100 * index;
    let bg = new Bitmap({
      source: 'bg-yellow_png',
      width: stage.stageWidth,
      height: 100
    })
    sp.addChild(bg);
    bg.alpha = index % 2 == 0 ? 0 : 1;
    if (item.rank < 4) {
      let spRank = new ImageLoader({
        src: 'resource/assets/rank-icon' + item.rank + '.png',
        x: 40,
        y: 18
      })
      sp.addChild(spRank);
    } else {
      let spRank = new TextField({
        bold: true,
        size: 40,
        x: 45,
        width: 57,
        textAlign: 'center',
        height: 100,
        verticalAlign: 'middle',
        text: item.rank.toString(),
        color: 0x000000
      })
      sp.addChild(spRank);
    }
    let avatar = new ImageLoader({
      width: 60,
      height: 60,
      src: item['avatar'],
      x: 170,
      y: 20
    })
    sp.addChild(avatar);
    let spName = new TextField({
      size: 32,
      color: 0x000000,
      text: item['name'],
      x: 240,
      height: 100,
      verticalAlign: 'middle'
    })
    sp.addChild(spName);
    let spScore = new TextField({
      size: 40,
      color: 0x000000,
      text: item['score'].toString(),
      x: 430,
      width: 220,
      textAlign: 'center',
      height: 100,
      verticalAlign: 'middle',
      bold: true
    })
    sp.addChild(spScore);
    return sp;
  }
  private cancelGame(): void {
    console.log('停止开放数据域');
  }
}
