const testRank = [
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
]
class RankLayer extends egret.DisplayObjectContainer {
  private wrap: egret.Sprite;
  private scroll: egret.ScrollView;
  private wraps: Array<egret.Sprite> = [];
  private menus: Array<Button> = [];
  private wrapMine: egret.Sprite;
  constructor() {
    super();
    let mask = new Mask(.6);
    this.addChild(mask);

    this.wrap = new egret.Sprite;
    this.addChild(this.wrap);
    let bg = new Bitmap({
      source: 'bg-rank_png',
      width: 647,
      height: 800
    })
    let shape = new Bitmap({
      source: 'bg-rank_png',
      width: 647,
      height: 800,
      x: (UIConfig.stageW - 647) / 2,
      y: 80
    })
    this.addChild(shape);
    this.wrap.mask = shape;
    this.wrap.x = (UIConfig.stageW - 647) / 2;
    this.wrap.y = 80;
    this.wrap.addChild(bg);

    this.scroll = new egret.ScrollView();
    this.scroll.width = this.wrap.width;
    this.scroll.height = this.wrap.height - 142;
    this.scroll.y = 142;
    this.scroll.horizontalScrollPolicy = 'off';
    this.wrap.addChild(this.scroll)

    this.createRank();
    this.createMine()
    this.createMenus();
    this.changeCnt(0)
  }
  createMine() {
    this.wrapMine = new egret.Sprite();
    this.wrapMine.x = (UIConfig.stageW - 647) / 2
    this.wrapMine.y = 900;
    this.addChild(this.wrapMine);
    let bg = new Bitmap({
      source: 'bg-rank_png',
      width: 647,
      height: 134
    })
    this.wrapMine.addChild(bg);
    let sp = this.renderItem({ name: '222', rank: 1, avatar: '', score: 222 }, 0)
    sp.y = 17;
    this.wrapMine.addChild(sp);
  }
  createMenus() {
    let wrapMenu = new egret.Sprite;
    wrapMenu.x = 61.5;
    wrapMenu.y = 20;
    this.wrap.addChild(wrapMenu);
    let bg = new Bitmap({
      source: 'rank-menu0_png',
      width: 524
    });
    wrapMenu.addChild(bg);
    ['好友排行榜', '世界排行榜'].forEach((name, index) => {
      let bg = new Bitmap({
        source: 'rank-menu1_png',
        x: 262 * index,
        width: 262
      })
      let txt = new TextField({
        size: 31,
        color: 0xffffff,
        width: 262,
        textAlign: 'center',
        height: 64,
        verticalAlign: 'middle',
        text: name,
        x: 262 * index
      })
      wrapMenu.addChild(bg);
      wrapMenu.addChild(txt);
      wrapMenu.addEventListener('changeMenu', e => {
        let i = e.data;
        bg.visible = i == index;
        txt.textColor = i == index ? 0xffffff : 0xf9a200;
      }, this);
      txt.touchEnabled = true;
      txt.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        wrapMenu.dispatchEventWith('changeMenu', false, index)
        this.changeCnt(index);
      }, this);
    })
    wrapMenu.dispatchEventWith('changeMenu', false, 0)
  }
  createRank() {
    let spTitle = new egret.Sprite;
    this.wrap.addChild(spTitle);
    spTitle.x = 50;
    spTitle.y = 100;
    let bg = new Bitmap({
      source: 'bg-yellow_png',
      x: -50,
      width: this.wrap.width
    })
    spTitle.addChild(bg);
    let txt = new TextField({
      size: 32,
      color: 0xf9a200,
      text: '排名                名称                 距离(米)',
      y: 2
    })
    spTitle.addChild(txt);

    this.renderFriend()
    this.renderRank(1)

    let btnBack = new Button({
      default: 'btn-bg-org_png',
      x: UIConfig.stageW / 2,
      y: 1110,
      touchScale: .9
    })
    let txtBack = new Bitmap({
      source: 'txt-fhdt_png',
      x: 92,
      y: 30
    })
    btnBack.addChild(txtBack);
    this.addChild(btnBack);
    let btnAgain = new Button({
      default: 'btn-bg-red_png',
      x: UIConfig.stageW / 2,
      y: 1230,
      touchScale: .9
    })
    let txtAgain = new Bitmap({
      source: 'txt-zlyj_png',
      x: 92,
      y: 30
    })
    btnAgain.addChild(txtAgain);
    this.addChild(btnAgain);
    btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      EventManager.pub('resetGame')
      UImanager.hideRank();
    }, this);
  }
  renderRank(index, list = testRank) {
    this.wraps[index] = new egret.Sprite;
    let wrap = this.wraps[index];
    list.forEach((item, index) => {
      let sp = this.renderItem(item, index);
      wrap.addChild(sp);
    })
  }
  renderFriend() {
    this.wraps[0] = new egret.Sprite;
    let bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
    bitmapdata.$deleteSource = false;
    let texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    let bitmap = new egret.Bitmap(texture);
    let ratio = this.wrap.width / bitmap.width;
    bitmap.width *= ratio;
    bitmap.height *= ratio;
    this.wraps[0].addChild(bitmap);

    egret.startTick((timeStarmp: number) => {
      egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
      bitmapdata.webGLTexture = null;
      return false;
    }, this);
  }
  renderItem(item, index) {
    let sp = new egret.Sprite;
    sp.y = 100 * index;
    let bg = new Bitmap({
      source: 'bg-yellow_png',
      width: this.wrap.width,
      height: 100
    })
    sp.addChild(bg);
    bg.alpha = index % 2 == 0 ? 0 : 1;
    if (item.rank < 4) {
      let spRank = new Bitmap({
        source: 'rank-icon' + item.rank + '_png',
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
  changeCnt(index) {
    console.log(1)
    this.scroll.setContent(this.wraps[index]);
    let openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({
      isDisplay: true,
      text: 'hello',
      year: (new Date()).getFullYear()
    });

  }
}