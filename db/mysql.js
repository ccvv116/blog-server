const mysql = require('mysql2');
const MySQL_CONFIG = require('../conf/mysql')

// 连接数据库
const  connection = mysql.createConnection(MySQL_CONFIG);
 
connection.connect();

const exec = (query) => {
  return new Promise((reslove, reject) => {
    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error)
        return;
      }
      reslove(results)
    });
  }) 
}

module.exports = exec
 
// connection.end();