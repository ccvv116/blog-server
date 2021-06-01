const { 
  createArticle,
  getArticleList,
  getArticleListMeta,
  getArticleById,
  removeArticle,
  updateArticle } = require('../controller/article')
const { checkLogin } = require('../middleware/user')
const { successModal, failModal } = require('../utils/resultModal')
module.exports =  (router) => {

  // 文章列表
  router.get('/article/list', async function (ctx, next) {
    const { page, size } = ctx.request.query
    try {
      const result = await getArticleList(page, size)
      const metaData = await getArticleListMeta()
      if (result) {
        ctx.body = successModal({
          result,
          meta: {
            total: metaData[0].TOTAL,
            last_page: Math.ceil(metaData[0].TOTAL / size),
            current_page: page,
            size: size,
          }
        })
        return
      }
    } catch(error) {
      console.log(error)
      ctx.body = failModal({ error })
    }
  })

  // 新增文章
  router.post('/article/create', checkLogin, async function (ctx, next) {
    console.log(ctx.request.body)
    const { title, content } = ctx.request.body
    try {
      const result = await createArticle(title, content)
      if (result && result.affectedRows === 1) {
        ctx.body = successModal({})
      }
    } catch(error) {
      console.log(error)
      ctx.body = failModal({ error })
    }
  })

  // 文章详情
  router.get('/article/detail/:id', async function (ctx, next) {
    const { id } = ctx.params
    try {
      const result = await getArticleById(id)
      if (result && result[0]) {
        ctx.body = successModal({result: result[0]})
        return
      }
      ctx.body = failModal({})
    } catch (error) {
      ctx.body = failModal({ error })
    }
  })

  // 更新文章
  router.put('/article/detail/:id', checkLogin, async function (ctx, next) {
    const { id } = ctx.params
    const { title, content } = ctx.request.body
    try {
      const result = await updateArticle(id, title, content)
      if (result && result.affectedRows === 1) {
        ctx.body = successModal({})
        return
      }
      ctx.body = failModal({})
    } catch(error) {
      console.log(error)
      ctx.body = failModal({ error })
    }
  })

  // 删除文章
  router.delete('/article/detail/:id', checkLogin, async function (ctx, next) {
    const { id } = ctx.params
    try {
      const result = await removeArticle(id)
      if (result && result.affectedRows === 1) {
        ctx.body = successModal({})
        return
      }
      ctx.body = failModal({})
    } catch (error) {
      ctx.body = failModal({ error })
    }
  })

}