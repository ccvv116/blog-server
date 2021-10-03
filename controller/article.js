const exec = require("../db/mysql")
const { escape } = require("mysql2")

// 新建文章
const createArticle = (title, content) => {
  const sql = `INSERT INTO article (title,content,create_at) values (${escape(title)},${escape(content)},${new Date().getTime()});`
  return exec(sql)
}

// 修改文章
const updateArticle = (id, title, content) => {
  const updateTime = new Date().getTime()
  const sql = `UPDATE article SET title=${escape(title)}, content=${escape(content)}, update_at=${updateTime} WHERE id = ${escape(Number(id))}`
  return exec(sql)
}
// 文章列表
const getArticleList = (page = 1, size = 15) => {
  const offset = escape(Number((page-1) * size))
  const limetsize = escape(Number(size))
  const sql = `SELECT * FROM article WHERE deleted = 0 ORDER BY create_at DESC LIMIT ${offset},${limetsize};`
  return exec(sql)
}

// 文章详情
const getArticleById = (id) => {
  const sql = `SELECT * FROM article WHERE id = ${escape(Number(id))}`
  return exec(sql)
}

// 文章列表总数
const getArticleListMeta = (page = 1, size = 15) => {
  const offset = escape(Number((page-1) * size))
  const limetsize = escape(Number(size))
  const sql = `SELECT COUNT(*) AS TOTAL FROM article WHERE deleted = 0`
  return exec(sql)
}

// 删除文章 伪删除
const removeArticle = (id) => {
  const sql = `UPDATE article SET deleted=1 WHERE id = ${escape(Number(id))}`
  return exec(sql)
}

module.exports = {
  createArticle,
  getArticleList,
  getArticleListMeta,
  getArticleById,
  removeArticle,
  updateArticle
}