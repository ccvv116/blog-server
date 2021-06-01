const exec = require("../db/mysql")
const { escape } = require("mysql")

// 登录
const login = (username, password) => {
  const sql = `SELECT * FROM user WHERE username = ${escape(username)} AND password = ${escape(password)}`
  return exec(sql)
}

module.exports = {
  login
}