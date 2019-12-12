const crypto = require('crypto');
const formatteResult = (success = true, msg = '', data = []) => {
    return {
        success,
        msg,
        data
    }
}
// 对密码加密
const encrytoPwd = (pwd) => {
    const hmac = crypto.createHmac('md5', 'jane secret');
    hmac.update(pwd);
    return hmac.digest('hex');
}

//检验token
const isHasToken = () => {
    return async (ctx, next) => {
        return await next().catch(err => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = formatteResult(0, err.originalError ? err.originalError.message : err.message)
            } else {
                throw err;
            }
        })
    }
}

module.exports = {
    formatteResult,
    encrytoPwd,
    isHasToken
};