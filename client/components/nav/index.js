// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    last: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    prev: '/public/images/nav/prev@2x.png',
    prevfirst: '/public/images/nav/prevfist@2x.png',
    next: '/public/images/nav/next@2x.png',
    nextlast: '/public/images/nav/nextlast@2x.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event) {
      console.log('first');
      if(!this.data.first){
        this.triggerEvent('prev', {left:'left'}, {})
      }
    },
    onRight(event) {
      console.log('right');
      if(!this.data.last){
        this.triggerEvent('next', {right:'right'}, {})
      }
    }
  }
})