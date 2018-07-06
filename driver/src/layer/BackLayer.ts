class BackLayer extends egret.Sprite {

    btn_restart: Button;

    btn_backtohall: Button;

    constructor() {
        super();

        this.width = UIConfig.stageW;
        this.height = UIConfig.stageH;


        let shape = new egret.Shape();
        shape.graphics.beginFill(0x000000, 0.5);
        shape.graphics.drawRect(0, 0, UIConfig.stageW, UIConfig.stageH);
        shape.graphics.endFill();
        this.addChild(shape);

        let bg = new Bitmap({
            source: 'bg-rank_png',
            width: 597,
            height: 513,
        })
        bg.x = (UIConfig.stageW - bg.width) / 2;
        bg.y = (UIConfig.stageH - bg.height) / 2;
        bg.scale9Grid = new egret.Rectangle(18, 19, 18, 20)

        this.addChild(bg);

        let bgtop = new Bitmap({
            source: 'modal-yellow_png',
        })
        bgtop.x = bg.x;
        bgtop.y = bg.y;
        this.addChild(bgtop);


        let title = new Bitmap({
            source: 'logo-tip_png',
        })
        title.x = (UIConfig.stageW - title.width) / 2;
        title.y = bg.y + 25;
        this.addChild(title);

        let closebtn = new Bitmap({
            source: 'sceneclose_png',
        })
        closebtn.x = bg.x + 510;
        closebtn.y = bg.y + 10;
        this.addChild(closebtn);

        closebtn.touchEnabled = true;
        closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            EventManager.pub('optBackLayer', false)
        }, this)





        this.btn_restart = new Button({
            default: 'btn-bg-red_png',
            touchScale: .9,
        })
        this.btn_restart.y = bg.y + 375;
        this.btn_restart.x = (UIConfig.stageW) / 2;
        this.addChild(this.btn_restart)

        let start_sign = new Bitmap({
            source: 'text-cxks2_png',
        })
        start_sign.x = (this.btn_restart.width - start_sign.width) / 2;
        start_sign.y = (this.btn_restart.height - start_sign.height) / 2;
        this.btn_restart.addChild(start_sign);


        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            EventManager.pub('backtohall')
            EventManager.pub('startGame')
            EventManager.pub('optBackLayer', false)
        }, this)

        this.btn_backtohall = new Button({
            default: 'btn-bg-org_png',
            touchScale: .9,
        })
        this.btn_backtohall.y = bg.y + 225;
        this.btn_backtohall.x = (UIConfig.stageW) / 2;
        this.btn_backtohall.visible = false;
        this.addChild(this.btn_backtohall)

        let back_sign = new Bitmap({
            source: 'text-fhdt2_png',
        })
        back_sign.x = (this.btn_restart.width - back_sign.width) / 2;
        back_sign.y = (this.btn_restart.height - back_sign.height) / 2;
        this.btn_backtohall.addChild(back_sign);


        this.btn_backtohall.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            // UImanager.showRank()
            EventManager.pub('backtohall')
            UImanager.hideRank()
            UImanager.hideResult()
            EventManager.pub('hideStartLayer')
            EventManager.pub('optBackLayer', false)
        }, this)

        let txtAuthTip = new TextField({
            size: 28,
            color: 0xffffff,
            text: '登陆后才可以进行游戏哦~',
            y: 950 - 13 + UIConfig.offsetH,
            width: this.width,
            textAlign: 'center'
        })
        txtAuthTip.visible = false;
        this.addChild(txtAuthTip);

        EventManager.sub('togglePageAuth', (flag) => {
            this.btn_restart.visible = !flag;
            this.btn_backtohall.visible = !flag;
            txtAuthTip.visible = flag;
        })
    }
}