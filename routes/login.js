const router = require('koa-router')();
const { getUsers, checkName } = require('../apis/login')

//登录
router.post('/', getUsers());

/**
 * 校验用户名
 * name 用户名
 */
router.get('/checkname', checkName());


module.exports = router;