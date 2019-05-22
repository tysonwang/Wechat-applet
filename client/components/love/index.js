Component({
  properties: { //组件外部的数据，通常是从外部接受的变化的数据 properties 会覆盖data中的同名数据
    islike: {
      type: Boolean, //必填 
      value: false, //选填
      observer() { //选填

      }
    },
    count: {
      type: Number,
      value: 9
    }
  },
  data: { //组件内部数据 通常是不变化的数据
    imglike: "/public/images/like/like@2x.png",
    imgdislike: '/public/images/like/dislike@2x.png'

  },
  methods: {
    isLikes() {
      let islike = this.properties.islike; //这里properties 的属性 与 data的属性是相同的
      this.setData({
        islike: !islike,
        count: islike ? this.properties.count - 1 : this.properties.count + 1
      });
      this.data.like;
      this.triggerEvent('like', {
        islike: this.data.islike
      }, {
        bullles: false, //是否冒泡 非必填
          composed: false, //是否事件是否可以穿越 非必填
          capturePhase: false //事件是否拥有捕获阶段  非必填
      })
    }
  }
})