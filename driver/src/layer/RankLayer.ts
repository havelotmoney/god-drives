class RankLayer extends egret.DisplayObjectContainer {
  private wrap: egret.Sprite;
  private scroll: egret.ScrollView;
  private wraps: Array<egret.Sprite> = [];
  private menus: Array<Button> = [];
  private wrapMine: egret.Sprite;
  private wrapSelfData: egret.Sprite = new egret.Sprite;
  private currentMenu = 0;
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
    let bg2 = new Bitmap({
      source: 'bg-rank_png',
      width: 647,
      height: 134,
      y: 900,
      x: (UIConfig.stageW - 647) / 2
    })
    this.addChild(bg2);
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

    this.createMenus();
    this.createMine(null, 0)
    this.createRank();
    this.changeCnt(0)

    EventManager.sub('updateRankMine', (rank, score) => {
      this.createMine(rank, score)
    })
  }
  createMine(rank, score) {
    this.wrapMine = new egret.Sprite();
    this.wrapMine.x = (UIConfig.stageW - 647) / 2
    this.wrapMine.y = 900;
    this.addChild(this.wrapMine);
    if (rank == null) {
      return;
    }
    this.wrapSelfData.removeChildren();
    this.wrapSelfData = this.renderItem({ name: wxCenter.userInfo['nickName'], rank: '' + rank, avatar: wxCenter.userInfo['avatarUrl'], score: score }, 0)
    this.wrapSelfData.visible = this.currentMenu == 1;
    this.wrapSelfData.y = 17;
    this.wrapMine.addChild(this.wrapSelfData);
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
    btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      UImanager.hideRank()
      UImanager.hideResult()
      EventManager.pub('hideStartLayer')
    }, this);
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
      UImanager.hideRank();
      UImanager.hideResult();
      // EventManager.pub('resetGame')
      EventManager.pub('startGame')
    }, this);

    EventManager.sub('updateRank', () => {
      this.renderRank(1)
    });
  }
  renderRank(index, list = wxCenter.rankList) {
    this.wraps[index] = this.wraps[index] || new egret.Sprite;
    let wrap = this.wraps[index];
    wrap.removeChildren();
    list.forEach((item, index) => {
      console.log(item)
      let sp = this.renderItem({
        rank: item.sort, name: item.nickname, score: item.score, avatar: item.avatarUrl
      }, index);
      wrap.addChild(sp);
    })
    this.scroll.setContent(this.wraps[1]);
  }
  renderFriend() {
    this.wraps[0] = new egret.Sprite;
    let bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
    bitmapdata.$deleteSource = false;
    let texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    let bitmap = new egret.Bitmap(texture);
    bitmap.fillMode = egret.BitmapFillMode.SCALE;
    let ratio = this.wrap.width / bitmap.width;
    bitmap.width *= ratio;
    bitmap.height *= ratio;
    this.wraps[0].addChild(bitmap);

    egret.startTick((timeStarmp: number) => {
      egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
      bitmapdata.webGLTexture = null;
      return false;
    }, this);
    this.addChild(this.wraps[0]);
    this.wraps[0].y = 202;
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
    this.currentMenu = index;
    if (this.wrapSelfData) {
      this.wrapSelfData.visible = index == 1;
    }
    this.scroll.visible = index == 1;
    this.wraps[0].visible = index == 0;
    let openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({
      event: 'changeRank'
    });
  }
}