const router = require('koa-router')();
const { getStaticResources } = require('@controllers/static')

//登录
router.get('/images/:name', getStaticResources());

module.exports = router;