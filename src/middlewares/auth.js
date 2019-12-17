const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const config = require('../../config')
const expiresIn = 60 * 60 * 24;//过期时间 单位：s
const unprotectedUrl = [/\/login/, /\/user/, /^\/images/, /^\/public/];//过滤验证token路径

const auth = {
    //生成token info：body传值
    sign: (info) => {
        const token = jwt.sign(info, config.secret, { expiresIn });
        return token;
    },
    //解析token
    verify: (ctx, decodeToken, token) => {
        let ret = true;
        try {
            const payload = jwt.verify(token, config.secret);
            ret = false;
        } catch (error) {
            console.log(error.name)
        }
        return ret;
    },
    //验证token中间件
    validation: () => {
        return koajwt({
            secret: config.secret,
            isRevoked: this.verify
        }).unless({
            path: unprotectedUrl
        })
    }
}
module.exports = auth;