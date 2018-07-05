class ShareDataManager {
  static shareConfig = ['老司机出发了，快上车吧', '看我天秀操作超神开车', '已经没人能追上我啦', '谁是本群漂移大神，看看你排第几']
  static showShare() {
    var id = Math.floor(Math.random() * this.shareConfig.length);
    let ratio = canvas.width / canvas.height > 500 / 400 ? 400 / canvas.height : 500 / canvas.width;
    let w = ratio * canvas.width;
    let h = ratio * canvas.height;
    let x = (canvas.width - w) / 2;
    let y = (canvas.height - h) / 2;
    let icon = canvas.toTempFilePathSync({
      x: x,
      y: y,
      width: w,
      height: h
    });
    console.log(w, h, x, y)
    wx.shareAppMessage({
      title: this.shareConfig[id], // 分享标题
      imageUrl: icon, // 分享图标
      query: '',
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      complete: function () {
        console.log('分享完成，失败或成功都是')
      }
    });
  }
}
window['ShareDataManager'] = ShareDataManager