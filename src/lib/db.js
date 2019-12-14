
const mysql = require('mysql');
const { mysqlConfig } = require('../../config');
const pool = mysql.createPool({
    host: mysqlConfig.host,
    user: mysqlConfig.username,
    password: mysqlConfig.password,
    port: mysqlConfig.port,
    database: mysqlConfig.database
});
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

module.exports = {
    query
}