const Koa = require('koa');

const router = require('koa-router')(); // 路由

const bodyParser = require('koa-bodyparser'); // body传值

require('module-alias/register')// 路径别名

const auth = require('@middlewares/auth');

const { loggerMiddleware } = require('@middlewares/logger')

const { responseHandler, errorHandler } = require('@middlewares/response')

const app = new Koa();

app.use(bodyParser());

// Logger 日志打印
app.use(loggerMiddleware);

// Error Handler 错误描写
app.use(errorHandler);

// Response //接口回复格式定义
app.use(responseHandler);

//验证token是否有效
app.use(auth.validation());

//引入登录模块
const login = require('@routes/login');
//引入用户注册模块
const user = require('@routes/user');

//登录
router.use('/login', login.routes());

//用户注册
router.use('/user', user.routes());

//加载路由
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;