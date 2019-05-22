let {
  regeneratorRuntime
} = global;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    classics: [],
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onShow(options) {
    // await this.getMyFavor()
    this.hasGottenUserInfo()
    // await this.getMyBookCount()
  },

  async getMyBookCount() {
    let result = await app.$http.post();
      this.setData({
        myBooksCount: data.count
      })
  },

  hasGottenUserInfo: function () {
    wx.getSetting({ //查看用户是否授权过 如果用户授权过 那么调用结果的authsetting有scope.userinfo:true 否则
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {

          wx.getUserInfo({ //获取用户信息 只有在用户授权了 在onload中调用这个func 才会得到结果
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })

        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo: function (event) {
    let userInfo = event.detail.userInfo ;
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },
  async getMyFavor() {
    await app.$http.getMyFavor((data) => {
      this.setData({
        classics: data
      })
    })
  },

  onPreviewTap: function (event) {
    wx.navigateTo({
      url: '/view/bookdetail/index?id=' + event.detail.id + '&type=' + event.detail.type
    })
  },
  onJumpToAbout: function (event) {
    wx.navigateTo({
      url: '/view/about/index',
    })
  },

  onStudy: function (event) {
    wx.navigateTo({
      url: '/view/course/index',
    })
  },

  onShareAppMessage() {

  }
})