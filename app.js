const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
    ctx.body = '你好 koa2.x'
})

//引入模块
// const admin = require('')

app.listen(5000);