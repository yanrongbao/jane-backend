const router = require('koa-router')();

//登录
router.get('/login', async ctx => {
    console.log(ctx)
})

module.exports = router.routes()