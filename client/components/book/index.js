let {
  regeneratorRuntime
} = global;
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navToDetail() {
      let {
        id
      } = this.data.book;
      app.util.navigateTo({
        path: '/view/bookdetail/index',
        data: {
          id
        }
      })
    }
  }
})