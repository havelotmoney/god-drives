var egret=window.egret,__reflect=this&&this.__reflect||function(e,t,i){e.__class__=t,i?i.push(t):i=[t],e.__types__=e.__types__?i.concat(e.__types__):i},__extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);i.prototype=t.prototype,e.prototype=new i},Bitmap=function(e){function t(t){var i=e.call(this)||this,r=i;return"string"==typeof t?r.src=t:"object"==typeof t&&(void 0!=t.source&&(r.src=t.source),void 0!=t.width&&(r.width=t.width),void 0!=t.height&&(r.height=t.height),void 0!=t.x&&(r.x=t.x),void 0!=t.y&&(r.y=t.y),void 0!=t.rotation&&(r.rotation=t.rotation),t.anchorCenter?(r.anchorOffsetX=r.width/2,r.anchorOffsetY=r.height/2):(void 0!=t.anchorOffsetX&&(r.anchorOffsetX=t.anchorOffsetX),void 0!=t.anchorOffsetY&&(r.anchorOffsetY=t.anchorOffsetY)),void 0!=t.alpha&&(r.alpha=t.alpha),void 0!=t.visible&&(r.visible=t.visible),void 0!=t.touchEnabled&&(r.touchEnabled=t.touchEnabled)),i}return __extends(t,e),Object.defineProperty(t.prototype,"src",{get:function(){return this._src},set:function(e){this._src=e,this.texture=RES.getRes(e)},enumerable:!0,configurable:!0}),t}(egret.Bitmap);__reflect(Bitmap.prototype,"Bitmap");var ImageLoader=function(e){function t(t){var i=e.call(this)||this,r=i;return r.imgMask=t.mask||null,r.W=t.width||0,r.H=t.height||0,t.maskConfig&&(r.imgMask=new egret.Shape,r.imgMask.graphics.beginFill(13421772),r.imgMask.graphics.drawRoundRect(0,0,t.maskConfig[0]||0,t.maskConfig[1]||0,t.maskConfig[2]||0),r.imgMask.graphics.endFill()),r.src=t.src,i.x=t.x||i.x,i.y=t.y||i.y,i}return __extends(t,e),Object.defineProperty(t.prototype,"src",{get:function(){return this._src},set:function(e){this._src=e,this.setSrc(e)},enumerable:!0,configurable:!0}),t.prototype.setSrc=function(e){var t=this;if(e){var i=new egret.ImageLoader;i.once(egret.Event.COMPLETE,function(e){t.removeChildren();var i=e.currentTarget,r=new egret.Texture;r._setBitmapData(i.data),t.image=new egret.Bitmap(r),t.W&&(t.image.scaleX=t.W/t.image.width),t.H&&(t.image.scaleY=t.H/t.image.height),t.imgMask&&(t.addChild(t.imgMask),t.image.mask=t.imgMask),t.addChild(t.image)},this),i.load(e)}},t}(egret.Sprite);__reflect(ImageLoader.prototype,"ImageLoader");var Main=function(e){function t(){var t=e.call(this)||this;t.info={};var i=t;return wx.onMessage(function(e){"changeRank"==e.event?wx.getFriendCloudStorage({keyList:["rank"],success:function(e){console.log(e),t.runGame(e.data)},fail:function(e){console.log(e)},complete:function(){}}):"setInfo"==e.event&&(i.info=e.data)}),t.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){console.log("\u5b50\u57df\u8f93\u51fa\u70b9\u51fb")},t),t}return __extends(t,e),t.prototype.sort=function(e,t){return JSON.parse(t.KVDataList[0].value).wxgame.score-JSON.parse(e.KVDataList[0].value).wxgame.score},t.prototype.runGame=function(e){var t=this,i=egret.MainContext.instance.stage;this.wrap=this.wrap||new egret.Sprite,this.stage.addChild(this.wrap),this.wrap.removeChildren();var r=new egret.Sprite;e=e.sort(this.sort),e.forEach(function(e,i){var n=t.renderItem({rank:i+1,avatar:e.avatarUrl,name:e.nickname,score:JSON.parse(e.KVDataList[0].value).wxgame.score||0},i);n.y=100*i,n.x=50,r.addChild(n)});var n=new egret.ScrollView;n.width=i.stageWidth,n.height=i.stageHeight-154,n.y=22,n.horizontalScrollPolicy="off",this.wrap.addChild(n),n.setContent(r);var a=this.getMine(e),o=this.renderItem({name:a.nickname,rank:a.rank,avatar:a.avatarUrl,score:JSON.parse(a.KVDataList[0].value).wxgame.score},0);o.visible=!0,o.x=53,o.y=716,this.wrap.addChild(o)},t.prototype.getMine=function(e){var t=this,i={};return e.forEach(function(e,r){e.nickname==t.info.nickName&&(i=e,i.rank=r+1)}),i},t.prototype.renderItem=function(e,t){var i=egret.MainContext.instance.stage,r=new egret.Sprite;r.y=100*t;var n=new Bitmap({source:"bg-yellow_png",width:i.stageWidth,height:100});if(r.addChild(n),n.alpha=t%2==0?0:1,e.rank<4){var a=new ImageLoader({src:"resource/assets/rank-icon"+e.rank+".png",x:40,y:18});r.addChild(a)}else{var a=new TextField({bold:!0,size:40,x:45,width:57,textAlign:"center",height:100,verticalAlign:"middle",text:e.rank.toString(),color:0});r.addChild(a)}var o=new ImageLoader({width:60,height:60,src:e.avatar,x:170,y:20});r.addChild(o);var s=new TextField({size:32,color:0,text:e.name,x:240,height:100,verticalAlign:"middle"});r.addChild(s);var c=new TextField({size:40,color:0,text:e.score.toString(),x:430,width:220,textAlign:"center",height:100,verticalAlign:"middle",bold:!0});return r.addChild(c),r},t.prototype.cancelGame=function(){console.log("\u505c\u6b62\u5f00\u653e\u6570\u636e\u57df")},t}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var TextField=function(e){function t(t){var i=e.call(this)||this,r=i;return"string"==typeof t?r.text=t:"object"==typeof t&&(r.fontFamily=t.fontFamily||"PingFang SC,Microsoft YaHei",void 0!=t.text&&(r.text=t.text),void 0!=t.color&&(r.textColor=t.color),void 0!=t.size&&(r.size=t.size),void 0!=t.bold&&(r.bold=t.bold),void 0!=t.width&&(r.width=t.width),void 0!=t.height&&(r.height=t.height),void 0!=t.x&&(r.x=t.x),void 0!=t.y&&(r.y=t.y),t.rotation&&(r.rotation=t.rotation),void 0!=t.anchorCenter&&(r.anchorOffsetX=r.width/2),void 0!=t.anchorCenter&&(r.anchorOffsetY=r.height/2),void 0!=t.anchorOffsetX&&(r.anchorOffsetX=t.anchorOffsetX),void 0!=t.anchorOffsetY&&(r.anchorOffsetY=t.anchorOffsetY),void 0!=t.textAlign&&(r.textAlign=t.textAlign),void 0!=t.verticalAlign&&(r.verticalAlign=t.verticalAlign),void 0!=t.lineSpacing&&(r.lineSpacing=t.lineSpacing),void 0!=t.multiline&&(r.multiline=t.multiline)),i}return __extends(t,e),Object.defineProperty(t.prototype,"ID",{set:function(e){this.text="ID:"+e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"IP",{set:function(e){this.text="IP:"+e},enumerable:!0,configurable:!0}),t}(egret.TextField);__reflect(TextField.prototype,"TextField"),window.Main=Main;