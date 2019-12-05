const router = require('koa-router')();
const { userLogin, checkName } = require('@apis/login')

//登录
router.post('/', userLogin());

module.exports = router;