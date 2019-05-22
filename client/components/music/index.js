const behavior= require('../behavior.js')
let mMgr = wx.getBackgroundAudioManager();
Component({
  behaviors: [behavior],
  properties:{
    src:{
     type:String,
   },
   title:{
     type:String
   }
  },
  data: {
    playing:false,
    play: '/public/images/music/play.png',
    stop: '/public/images/music/stop.png',
    localImg: '/public/images/music/musictext.png'
  },
  attached(){
    this._recoverPlaying();
    this._monitorSwitch();
  },
  detached(){
    //只能在wx：if 条件下触发 hidden 生命周期onshow 可以触发onshow
    //  mMgr.stop();
  },
  methods: {
    onPlay(){
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        if (mMgr.src == this.properties.src) {
          mMgr.play()
        }
        else {
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },
    _recoverPlaying: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if (mMgr.src == this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },
    //音乐总控开关
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
        this._recoverPlaying()
      }),
        mMgr.onEnded(() => {
          this._recoverPlaying()
        })
    }
  }
})