const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const static = require('koa-static');
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('koa-router')()
const jwtKoa = require('koa-jwt')
const staticCache = require('koa-static-cache');
const index = require('./routes/index')
const users = require('./routes/users')
const {setToken} =require('./libs');
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
let secret = 'test'
//除了登录和注册不叫校验  其他都需要做校验
app.use(jwtKoa({
  secret: 'test'
}).unless({
  path: [/^\/wx\/user\/wxf761c23deebccd44\/login/,/^\/images/]
}))
app.use(static(__dirname + '/public',{maxage :24*60*60}))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
//app.use(views(__dirname+'/views', { extension: 'ejs' })) 默认采用ejs结尾
//app.use(views(__dirname+'/views, {map: {html: 'ejs'}}))采用html结尾
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(async (ctx, next) => {
  ctx.state.baseUrl = 'https://tyson.mynatapp.cc/'
  console.log("ctx.fresh",ctx.fresh);
  await setToken(ctx);
  try {
    await next()
    if (ctx.status == 404) {
      ctx.body = '404';
    }
  } catch (err) {
    if (err.status == 401) {
      ctx.state.login=false;
      ctx.status = 401;
      ctx.body = {
        msg: 'tokenError'
      };
      // ctx.redirect('/admin/login');
    } else {
      throw err;
    }
  }

})


router.use(index)
router.use(users)
/**
 * .allowedMethods处理的业务是
 * 当所有路由中间件执行完成之后,
 * 若ctx.status为空或者404的时
 * 候,丰富response对象的header头.
 */
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

module.exports = app