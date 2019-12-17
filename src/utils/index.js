const crypto = require('crypto');
const config = require('../../config')
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
//获取本机ip地址
const getIPAdress = () => {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return `http://${alias.address}:${config.port}`;
            }
        }
    }
}

module.exports = {
    formatteResult,
    encrytoPwd,
    isHasToken,
    getIPAdress
};