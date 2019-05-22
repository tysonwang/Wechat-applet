const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const rp = require('request-promise');
router.post('/api', async (ctx, next) => {
  // await ctx.render('index', {
  ctx.body = {
    title: 'wwww',
    node: 0
  }


})

router.get('/wx/user/wxf761c23deebccd44/login', async (ctx, next) => {
  const user = ctx.query;
  console.log('user', user.code);


  var options = {
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      appid: 'wxf761c23deebccd44',
      secret: '0554069f296ff7c3220cba8249bd381d',
      js_code: user.code,
      grant_type: "authorization_code"
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  let res = await rp(options);
  console.log("res", res);
  if (res) {
    const token = jwt.sign({
      sesson_key: res.session_key,
      openid: res.openid
    }, 'test', {
      expiresIn: 60 * 60
    });

    ctx.state = {
      login: true
    }

    ctx.body = {
      message: 'success',
      code: 0,
      token: token,
      sesson_key: res.session_key,
      openid: res.openid,
      expireTime: new Date().getTime() + 60 * 60 * 1000
    }
  }
})
router.post('/like', async (ctx, next) => {
  ctx.body = 'success';
})

router.post('/gethotword', async (ctx, next) => {
  ctx.body = ['one','two','three'];
})
router.post('/dislike', async (ctx, next) => {
  let {
    art_id,
    type
  } = ctx.request.body;
  ctx.body = 'success';
})
router.post('/latest', async (ctx, next) => {
  console.log(ctx.state);
  ctx.body = {
    "content": "人生不能像做菜，把所有的料准备好才下锅",
    "fav_nums": 10, //点赞次数
    "id": 1,
    "image": `${ctx.state.baseUrl}images/aBriSumDay@2x.png`,
    "index": 3,
    "like_status": 1, //是否点赞
    "pubdate": "2018-06-22",
    "title": "李安《饮食男女》",
    "type": 100
  }
})
router.post('/:index/prev', async (ctx, next) => {
  if (ctx.params.index == 1) {
    ctx.body = {
      "content": "在变幻的生命力，岁月原来是最大的小偷",
      "fav_nums": 10, //点赞次数
      "id": 1,
      "image": `${ctx.state.baseUrl}images/shentou.png`,
      "index": 2,
      "like_status": 1, //是否点赞
      "pubdate": "2018-06-22",
      "title": "心上无垢 林间有风",
      "type": 100,
      "url":'http://www.170mv.com/kw/other.web.nb01.sycdn.kuwo.cn/resource/n2/0/48/3679996551.mp3'
    }
  }
  if (ctx.params.index == 2) {
    ctx.body = {
      "content": "人生不能像做菜，把所有的料准备好才下锅",
      "fav_nums": 10, //点赞次数
      "id": 1,
      "image": `${ctx.state.baseUrl}images/aBriSumDay@2x.png`,
      "index": 3,
      "like_status": 1, //是否点赞
      "pubdate": "2018-06-22",
      "title": "李安《饮食男女》",
      "type": 100
    }
  }
})
router.post('/:index/next', async (ctx, next) => {
  console.log(ctx.state);
  if (ctx.params.index == 3) {
    ctx.body = {
      "content": "在变幻的生命力，岁月原来是最大的小偷",
      "fav_nums": 10, //点赞次数
      "id": 1,
      "image": `${ctx.state.baseUrl}images/shentou.png`,
      "index": 2,
      "like_status": 1, //是否点赞
      "pubdate": "2018-06-22",
      "title": "不才《参商》",
      "type": 100,
      "url":'http://www.170mv.com/kw/other.web.nb01.sycdn.kuwo.cn/resource/n2/0/48/3679996551.mp3'
    }
  }
  if (ctx.params.index == 2) {
    ctx.body = {
      "content": "谁念过 千字文章 秋收冬已藏",
      "fav_nums": 10, //点赞次数
      "id": 1,
      "image": `${ctx.state.baseUrl}images/canshang.png`,
      "index": 1,
      "like_status": 1, //是否点赞
      "pubdate": "2018-06-22",
      "title": "心上无垢 林间有风",
      "type": 100
    }
  }

})

router.post('/books',async (ctx,next)=>{
  ctx.body =[{
    author:'保罗',
    fav_nums:9,
    id:7,
    image:"http://pic.downcc.com/upload/2016-5/2016521101557653750.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:8,
    image:"https://img3.doubanio.com/lpic/s4569557.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:9,
    image:"https://img3.doubanio.com/lpic/s4669554.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:10,
    image:"https://img3.doubanio.com/lpic/s4569557.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:11,
    image:"https://img3.doubanio.com/lpic/s4669554.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:12,
    image:"https://img3.doubanio.com/lpic/s4569557.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:13,
    image:"https://img3.doubanio.com/lpic/s4669554.jpg",
    like_status:0,
    title:"黑客与画家"
  },{
    author:'保罗',
    fav_nums:9,
    id:14,
    image:"https://img3.doubanio.com/lpic/s4569557.jpg",
    like_status:0, 
    title:"黑客与画家"
  }
  ]
})
router.post('/books/:index/detail',async (ctx,next)=>{
 let {index} =  ctx.params;
 ctx.body = {
author:['(美)(Nicholas C.Zakas)扎卡斯'],
binding:"平装",
category:"编程",
image:"http://pic.downcc.com/upload/2016-5/2016521101557653750.jpg",
bigimage:'https://baike.baidu.com/pic/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/10576650/0/b7003af33a87e9505bb120bc1a385343faf2b4b8?fr=lemma&ct=single#aid=0&pic=b7003af33a87e9505bb120bc1a385343faf2b4b8',
summary:"\\n本书从最早期Netscape浏览器中的JavaScript开始讲起，直到当前它对XML和Web服务的具体支持，内容主要涉及JavaScript的语言特点、JavaScript与浏览器的交互、更高级的JavaScript技巧，\\n以及与在Web应用程序中部署JavaScript解决方案有关的问题，如错误处理、调试、安全性、优化/混淆化、XML和Web服务，最后介绍应用所有这些知识来创建动态用户界面",
price:"99.00元",
pages:'616',
pubdate:"2006-9",
publisher:"人民邮电出版社"
 } 
})
router.post('/books/:index/comment',async (ctx,next)=>{
  ctx.body  ={
book_id:111,
comments:[{
  content:"javascript高级程序设计",nums:33
},{
  content:"设计模式",nums:33
},{
  content:"算法",nums:33
}]
  }
})
router.post('/books/:index/fav',async (ctx,next)=>{
  ctx.body  ={
    fav_nums:6,
    id:183,
    like_status:1
  }
})

router.post('/books/add/short_comment',async (ctx,next)=>{ //新增短评
  // let {book_id,cotent} = ctx.query;
  ctx.body  ={
    fav_nums:6,
    id:183,
    like_status:0
  }
})


router.get('/json/:id', async (ctx, next) => {
  console.log("ctx.params", ctx.params.id);
  console.log("ctx.params", ctx);
  ctx.body = {
    title: 'koa2 json'
  }

  // ctx.redirect('/admin/login');


})

module.exports = router.routes()