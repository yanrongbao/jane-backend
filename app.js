const Koa = require('koa');

const router = require('koa-router')(); // 路由

const bodyParser = require('koa-bodyparser'); // body传值

require('module-alias/register')// 路径别名

const auth = require('@middlewares/auth');

const { loggerMiddleware } = require('@middlewares/logger')

const { responseHandler, errorHandler } = require('@middlewares/response');

const staticServe = require('koa-static');

const path = require('path');

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

// 静态资源目录对于相对入口文件index.js的路径
app.use(staticServe(
    path.join(__dirname + '/static/')
))

//引入路由模块
const { login, user, public } = require('@routes');

//登录
router.use('/login', login.routes());
//用户注册
router.use('/user', user.routes());
//公共接口
router.use('/public', public.routes());


//加载路由
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;