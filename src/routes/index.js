//引入登录模块
const login = require('./login');
//引入用户注册模块
const user = require('./user');
//引入静态资源
const static = require('./static');
//引入静态资源
const public = require('./public');

module.exports = {
    login,
    user,
    static,
    public
}