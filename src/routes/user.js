const router = require('koa-router')();

const { createUser, checkUserExits } = require('@apis/user');

//注册用户
router.post('/', createUser());

/**
 * 校验用户名
 * name 用户名
 */
router.get('/checkname', checkUserExits());


module.exports = router;