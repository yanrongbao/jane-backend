const router = require('koa-router')();
const { getWriteLists } = require('@controllers/public');

router.get('/list', getWriteLists());

module.exports = router;