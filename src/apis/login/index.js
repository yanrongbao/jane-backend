const { query } = require('@modules/DB');
const { formatteResult } = require('@modules/utils');
const { encrytoPwd } = require('@modules/utils');
const jwt = require('jsonwebtoken');

const userLogin = () => {
    return async (ctx, next) => {
        let { name, password } = ctx.request.body;
        const sql = `SELECT name,password FROM users WHERE name="${name}"`;
        const usersData = await query(sql);
        console.log(usersData)
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
            const token = jwt.sign({
                name: name,
                password: password
            }, 'my_token', { expiresIn: '2h' })
            ctx.body = formatteResult(true, '登录成功', [token]);
        }
    }
}

module.exports = { userLogin }