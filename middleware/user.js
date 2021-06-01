const { failModal } = require('../utils/resultModal')

const checkLogin = async (ctx, next) => {
  if(ctx.session.isLogined) {
    return await next()
  } else {
    ctx.body = failModal({ error: '请前往登录' })
  }
}

module.exports = {
  checkLogin,
}