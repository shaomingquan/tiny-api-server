const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const serve = require('koa-static')

router.get('/', serve('./public'))

const routerDefine = require('./apis')

const routerUrls = Object.keys(routerDefine)

for (const routerUrl of routerUrls) {
  router.get(`/api/${routerUrl}`, routerDefine[routerUrl])
}

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000)