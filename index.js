const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const serve = require('koa-static')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');

module.exports = function (options) {

    if (options.mode == 'development') {
        app.use(logger())
    } else if (options.mode == 'production') {
        process.on('SIGINT', function () {
            // clear
            console.log('graceful stop')
            process.exit(0)
        })
    }
    app.use(bodyParser())

    router.get('/', serve('./public'))

    const routerDefine = require('./apis')
    const routers = Object.keys(routerDefine)
    for (const defineName of routers) {
        const {
            method,
            controller,
            path: _path
        } = routerDefine[defineName]
        let path = _path
        if (!path) {
            path = defineName
        }
        if (method && controller) {
            router[method.toLowerCase()](`/api/${path}`, controller)
        }
    }

    app
        .use(router.routes())
        .use(router.allowedMethods())

    if (options.mode == 'development') {
        app.listen(options.port, _ => {
            console.log("server started")
        })
    } else if (options.mode == 'production') {
        app.listen(options.port, () => {
            console.log("server started")
            process.send('ready')
        })
    }
    

}