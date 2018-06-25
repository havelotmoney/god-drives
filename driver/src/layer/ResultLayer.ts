class ResultLayer extends egret.DisplayObjectContainer {
  private wrap: egret.Sprite;
  private spScore: BitmapText;
  private tagNew: Bitmap;
  constructor() {
    super();
    let mask = new Mask(.5);
    this.addChild(mask);
    this.wrap = new egret.Sprite;
    this.addChild(this.wrap);
    let bg = new Bitmap({
      source: 'bg-rank_png',
      width: 647,
      height: 530
    })
    this.wrap.addChild(bg);
    this.wrap.x = (UIConfig.stageW - 647) / 2;
    this.wrap.y = 304;

    let title = new Bitmap({
      source: 'rank-title_png',
      x: 222,
      y: 70
    })
    this.wrap.addChild(title);

    this.spScore = new BitmapText({
      source: 'fnt_rank_fnt',
      text: '0',
      width: this.wrap.width,
      textAlign: 'center',
      y: 220
    })
    this.wrap.addChild(this.spScore);
    let spDec = new Bitmap({
      source: 'rank-dec_png',
      x: 50,
      y: 150
    })
    this.wrap.addChild(spDec);

    let bgBtm = new Bitmap({
      source: 'rank-yellow_png',
      width: this.wrap.width,
      height: 60
    })
    bgBtm.anchorOffsetX = bgBtm.width / 2;
    bgBtm.anchorOffsetY = bgBtm.height / 2;
    bgBtm.rotation = 180;
    bgBtm.x = this.wrap.width / 2;
    bgBtm.y = this.wrap.height - bgBtm.height / 2;
    this.wrap.addChild(bgBtm);

    let btnRank = new Button({
      default: 'sign-rank2_png',
      touchScale: .9,
      y: 500,
      x: this.wrap.width / 2
    })
    this.wrap.addChild(btnRank);
    btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      UImanager.showRank();
    }, this);

    this.tagNew = new Bitmap({
      source: 'tag-new_png',
      x: 221,
      y: -40
    })
    this.wrap.addChild(this.tagNew)

    let btnShare = new Button({
      default: 'btn-bg-org_png',
      x: UIConfig.stageW / 2,
      y: 950,
      touchScale: .9
    })
    let txtShare = new Bitmap({
      source: 'sign-share_png',
      x: 92,
      y: 30
    })
    btnShare.addChild(txtShare);
    this.addChild(btnShare);

    let btnAgain = new Button({
      default: 'btn-bg-red_png',
      x: UIConfig.stageW / 2,
      y: 1100,
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
      EventManager.pub('startGame')
      // EventManager.pub('resetGame')
      UImanager.hideResult()
    }, this);

  }
  setScore(score: number = 0, isNew = false) {
    this.spScore.text = score.toString()
    this.tagNew.visible = isNew;
  }
}