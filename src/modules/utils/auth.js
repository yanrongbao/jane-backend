const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const AUTHORIZATION = 'Authorization';
const expiresIn = 60 * 60 * 24;//过期时间 单位：s
const tokenName = 'janeToken';//设置cookie 名称
const secret = 'secret';//加密token 密文
const unprotectedUrl = [/\/login/, /\/user/];//过滤验证token路径

const auth = {
    //生成token info：body传值
    sign: (ctx, info) => {
        const token = jwt.sign(info, secret, { expiresIn });
        ctx.set(AUTHORIZATION, `Bearer ${token}`)
        ctx.cookies.set(tokenName, token, {
            maxAge: expiresIn,
            httpOnly: true
        })
        return token;
    },
    //解析token
    verify: (ctx, decodeToken, token) => {
        let ret = true;
        try {
            const payload = jwt.verify(token, secret);
            ret = false;
        } catch (error) {
            console.log(error.name)
        }
        return ret;
    },
    //验证token中间件
    validation: () => {
        return koajwt({
            secret: secret,
            isRevoked: this.verify
        }).unless({
            path: unprotectedUrl
        })
    }
}
module.exports = auth;