// components/search/search-cmp.js
const paginationBev = require('../behavior.js');
let {
  regeneratorRuntime
} = global;
let app = getApp();
Component({
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // start:0,
    // count:20,
    historyKeys: [],
    hotKeys: [],
    finished: false,
    loading: false, //锁机制
    loadingCenter: false
  },

  async attached() {
    this.setData({
      historyKeys: this.getHistory()
    })
    let result = await app.$http.post('/gethotword')
    this.setData({
      hotKeys: result.data
    })
  },
  /**
   * 组件的方法列表
   * 
   */
  methods: {
    getHistory() {
      let words = wx.getStorageSync('key');
      if (!words) {
        return []
      }
      return words;
    },
    addToHistory(keyword) {
      let words = this.getHistory();
      const has = words.includes(keyword);
      if (!has) {
        if (words.length > 10) {
          words.pop();
        }
        words.unshift(keyword);
        wx.setStorageSync('key', words);
      }
    },
    async _loadMore() {
      if (!this.data.q) {
        return
      }
      let hasMore = this.hasMore()
      if (!hasMore) {
        return
      }
      this.setData({  // 锁机制 防止用户快速操作 后造成的问题
        loading: true
      })
      let params = {
        keyword: this.data.keyword,
        start: this.getCurrentStart()
      }
      let result = await app.$http.post('book/search?summary=1', params);
      this.setMoreData(data.books)
      this.setData({
        loading: false
      })
    },

    onCancel: function(event) {
      this.triggerEvent('cancel', {
        cancel: true
      }, {})
    },

    onDelete: function(event) {
      this.setData({
        finished: false,
        empty: false,
        keywords: ''
      })
    }, 
    async onConfirm(event) {
      // 首先切换状态，保持客户端流畅
      this.setData({
        finished: true,
        loadingCenter: true
      })

      this.initPagination()
      let keywords = event.detail.value || event.detail.text
      let params = {
        keyword: keyword,
        start: this.getCurrentStart()
      }
      let result = await app.$http.post('book/search?summary=1', params)
      if (!(result.data.books == false)) {
        this.addToHistory(keywords)
      }
      this.setMoreData(result.data.books)
      this.setData({
        keywords: keywords,
        loadingCenter: false
      })
    }
  }
})