const router = require('koa-router')();
const { getUsers } = require('../apis/login')

//登录
router.post('/', getUsers())


module.exports = router;