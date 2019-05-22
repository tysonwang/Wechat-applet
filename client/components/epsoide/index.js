// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { //properties 会覆盖掉data中的同名属性
    index: {
      type: String,
      observer(newval, oldval, changedpath) {
        // let val = newval < 10 ? `0${newval}` : newval;
        // this.setData({
        //   index: val
        // }) 会造成内存泄漏 原因是 数据发生变化 后会自动调用observer

        let val = newval < 10 ? `0${newval}` : newval;
        this.setData({
          _index: val
        }) 
      }
    }
  }, 

  /**
   * 组件的初始数据
   */
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    year: 0,
    month: '',
    _index:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  created() {
    //不能用setdata
  },
  attached() {
let date = new Date();
let year =date.getFullYear();
let month = date.getMonth();
this.setData({
  year,
  month:this.data.months[month]
})
  },
  ready() {

  },
  moved() {},
  detached() {
    //
  },

})