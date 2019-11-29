const Koa = require('koa');

const router = require('koa-router')(); // 路由

const bodyParser = require('koa-bodyparser'); // body传值

const app = new Koa();

app.use(async (ctx, next) => {
    await next()
})

app.use(bodyParser());

//引入登录模块
const login = require('./routes/login')

router.use('/login', login.routes());

app.use(router.routes()).use(router.allowedMethods);

app.listen(5000);