const Koa = require('koa')
// const Router = require('koa-router')

const app = new Koa()
// const router = new Router()

// const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const session = require('koa-generic-session')

// const webRoutes = require('./routes/web')
// const adminRoutes = require('./routes/admin')

const routes = require('./routes')

const port = process.env.PORT || 3000

// error handler
onerror(app)

app.keys = ['zhaozhao']
// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(session({}))
  // .use(views(path.join(__dirname, '/views'), {
  //   options: {settings: {views: path.join(__dirname, 'views')}},
  //   map: {'njk': 'nunjucks'},
  //   extension: 'njk'
  // }))
  // .use(router.routes())
  // .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

// router.get('/', async (ctx, next) => {
//   // ctx.body = 'Hello World'
//   // ctx.state = {
//   //   title: 'Koa2'
//   // }
//   // await ctx.render('index', ctx.state)
//   await next()
// })

// 加载所有路由
app.use(routes.routes(), routes.allowedMethods())
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(3001, () => {
  console.log(`Listening on http://localhost:3001`)
})
