let {
  regeneratorRuntime
} = global;
let app = getApp();
Page({

  /**
   * 页面的初始数据 这个时候会执行数据的初始化 这个非常重要 会影响到wxs的使用
   */
  data: {
    comments: [],
    detail: null,
    likeStatus: 0,
    likeCount: 0,
    posting: false,
    noComment: false
  },
  async postComment(comment) {
    let success = null;

    let result = await this.postComment('/books/add/short_comment', param);
    if (result.status==200){
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        noComment: false,
        posting: false
      })
    }else{
      wx.showToast({
        title: '接口数据有问题',
        icon: "none"
      })
    }
  },
  async onPost(event) {
    let comment = event.detail.value || event.detail.text
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none',
        duration: 3000
      })
      return
    }
    let param = {
      book_id,
      cotent
    }
    await this.postComment(comment);
  },
  onCancel: function(event) {
    this.setData({
      posting: false
    })
  },
  onFakePost: function() {
    this.setData({
      posting: true
    })
  },
  onLike: function(event) {
    let islike = event.detail.islike
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  async onLoad(options) {
    // wx.showLoading({
    //   title: '正在加载',
    // })
    // wx.hideLoading();
    let {
      id
    } = options;
    let book = await app.$https.post(`/books/${id}/detail`);
    let comments = await app.$https.post(`/books/${id}/comment`);
    let fav = await app.$https.post(`/books/${id}/fav`);

    // Promise.all([app.$https.post(`/books/${id}/fav`), app.$https.post(`/books/${id}/fav`)]) 所有的promise都执行完成  promise.race 
    // promise.race
    this.setData({
      book: book.data,
      comments: comments.data.comments,
      likeCount: fav.data.fav_nums,
      likeStatus: fav.data.like_status
    })
  },
  onReady: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  onPullDownRefresh: function() {
  },
  onReachBottom: function() {
  },
  onShareAppMessage: function() {
  }
})