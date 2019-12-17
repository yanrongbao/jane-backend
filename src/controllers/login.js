const { query } = require('@lib/db');
const { formatteResult, encrytoPwd, getIPAdress } = require('@utils');
const auth = require('@middlewares/auth');

const userLogin = () => {
    return async (ctx, next) => {
        let { name, password } = ctx.request.body;
        const sql = `SELECT name,password,avatar_url FROM users WHERE name="${name}"`;
        const usersData = await query(sql);
        if (usersData.err) {
            //查询错误
            ctx.body = formatteResult(false, err);
        } else if (!usersData[0]) {
            //用户不存在
            ctx.body = formatteResult(false, '用户不存在');

        } else if (usersData[0].password !== encrytoPwd(password)) {
            //密码错误
            ctx.body = formatteResult(false, '密码错误');
        } else {
            const token = auth.sign(ctx.request.body);
            const response = {
                token,
                name: usersData[0].name,
                avatar_url: `${getIPAdress()}${usersData[0].avatar_url}`
            }
            ctx.body = formatteResult(true, '登录成功', [response]);
        }
    }
}

module.exports = { userLogin };