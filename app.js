const Koa = require('koa');

const router = require('koa-router')(); // 路由

const bodyParser = require('koa-bodyparser'); // body传值

require('module-alias/register')// 路径别名

const app = new Koa();

app.use(async (ctx, next) => {
    await next()
})

app.use(bodyParser());

//引入登录模块
const login = require('@routes/login');
//引入用户注册模块
const user = require('@routes/user')

//登录
router.use('/login', login.routes());

//用户注册
router.use('/user', user.routes());

app.use(router.routes()).use(router.allowedMethods);

app.listen(5000);