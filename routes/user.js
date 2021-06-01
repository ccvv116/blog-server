const { login } = require('../controller/user')
const { checkLogin } = require('../middleware/user')
const { successModal, failModal } = require('../utils/resultModal')
module.exports =  (router) => {
  // 登录
  router.post('/user/login', async function (ctx, next) {
    const { username, password } = ctx.request.body
    try {
      const result = await login(username, password)
      if (result && result[0]) {
        ctx.session.isLogined = true
        ctx.body = successModal({})
        return
      }
      if (result && !result[0]) {
        ctx.body = failModal({
          error: '账号或密码错误'
        })
        return
      }
      ctx.body = failModal({
        error: '系统错误'
      })
    } catch(error) {
      console.log(error)
      ctx.body = failModal({ error })
    }
  })

  // 检查登录状态
  router.get('/user/checkLogin', checkLogin, async function(ctx, next) {
    ctx.body = successModal({ result: { isLogined: true }})
  })
}