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

module.exports = {
    formatteResult,
    encrytoPwd
};