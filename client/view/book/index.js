let {
  regeneratorRuntime
} = global;
let app = getApp();
Page({
  //小程序之间的跳转必须关联同一个公众号
  /**
   * 页面的初始数据
   */
  data: {
    searching: false,
    more: false,
    book: []
  },
  searchbook() {
    this.setData({
      searching: true
    })
  },
  cancel(event) {
    this.setData({
      searching: false
    })
  },
  random(n) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async getBooks() {
    let books = await app.$https.post('/books');
    console.log(books.data);
    this.setData({
      books: books.data
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    await this.getBooks()
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
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})