const Router = require("koa-router")
const router = new Router()

const article = require("./article")
const user = require("./user")

router.prefix('/api')

user(router)
article(router)

module.exports =  router
