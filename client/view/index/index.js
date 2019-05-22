// view/index/index.js page.js 生命周期执行顺序 onload -> onshow  -> onready  -> onhide  -> onunload
let {
  regeneratorRuntime
} = global;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    isInited: false,
    classic: null,
    first: true,
    last: false
  },
  chooseaddress(){
    wx.chooseAddress({
      success(res){ //选择收货地址
console.log(res)
      }
    })
  },
  async prev(event) { 
    let left = event.detail.left;
    let result = wx.getStorageSync('class' + this.data.classic.index);
    if (this.data.classic.index != this.data.latestIndex&&!result) {
      let result = await app.$https.post(`/${this.data.classic.index}/prev`);
      this.setData({
        isInited: true,
        first: result.data.index == this.data.latestIndex ? true : false,
        classic: result.data,
        last:false
      })
    } else if(result && this.data.classic.index != this.data.latestIndex){
      console.log(this.data.classic.index);
      console.log(this.data.latestIndex);
      this.setData({
        isInited: true,
        first: result.data.index == this.data.latestIndex ? true : false,
        classic: wx.getStorageSync('class' + this.data.classic.index).data,
      })
    }else{
      await this.getClass();
    }
  },
  async next(event) {
    let right = event.detail.right;
    let result =  wx.getStorageSync('class'+this.data.classic.index);
    if(this.data.classic.index !=1&&!result){
      let result = await app.$https.post(`/${this.data.classic.index}/next`);
      wx.setStorageSync('class'+this.data.classic.index, result);
      this.setData({
        isInited: true,
        first: false,
        classic: result.data,
        last:result.data.index == 1 ? true : false
      })
    }else{
      this.setData({
        isInited: true,
        first: false,
        classic: wx.getStorageSync('class' + this.data.classic.index).data,
        last: result.data.index == 1 ? true : false
      })
    }
  },
  async onlike(event) {
    this.data.like = event.detail.islike;
    let like = this.data.like ? true : false;
    let url = like ? '/like' : '/dislike';
    let result = await app.$https.post(url, {
      art_id: this.data.classic.id,
      type: this.data.classic.type
    })
  },
  async getClass() {
    let latest = await app.$https.post('/latest');
    this.setData({
      isInited: true,
      classic: latest.data,
      latestIndex:latest.data.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    await this.getClass()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})