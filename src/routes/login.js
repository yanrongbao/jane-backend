const router = require('koa-router')();
const { userLogin, checkName } = require('@controllers/login');

//登录
router.post('/', userLogin());

module.exports = router;