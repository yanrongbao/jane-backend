const path = require('path');

module.exports = {
    port: '5000',
    secret: 'secret',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, './logs/koa-template.log'),
    mysqlConfig: {
        database: 'jane_bacnend',
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
}