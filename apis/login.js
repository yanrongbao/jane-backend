const { query } = require('../module/DB');

const getUsers = () => {
    return async (ctx, next) => {
        let { name, password } = ctx.request.body;
        const sql = `SELECT name,password FROM users WHERE name="${name}"`;
        const usersData = await query(sql);
        if (usersData[0]) {
            //返回响应状态吗和响应信息
            ctx.status = 200;
            if (usersData[0].password === password) {
                ctx.body = { code: 1, msg: 'success' }
            } else {
                ctx.body = { code: 0, msg: '密码错误' }
            }

        } else {
            ctx.status = 200;
            ctx.body = { code: 0, msg: '用户不存在' }
        }
    }
}
const checkName = () => {
    return async (ctx, next) => {
        let { name } = ctx.query;
        const sql = `SELECT name From users WHERE name="${name}"`;
        const usersData = await query(sql);
        if (usersData[0]) {
            //返回响应状态吗和响应信息
            ctx.status = 200;
            ctx.body = { code: 0, msg: ' 昵称已被使用，换一个吧' }

        } else {
            ctx.status = 200;
            ctx.body = { code: 1, msg: '昵称可用' }
        }
    }
}

module.exports = { getUsers, checkName }