const { query } = require('../module/DB');
const { result } = require('../module/utils');

const getUsers = () => {
    return async (ctx, next) => {
        let { name, password } = ctx.request.body;
        const sql = `SELECT name,password FROM users WHERE name="${name}"`;
        const usersData = await query(sql);
        ctx.status = 200;
        if (usersData[0]) {
            //返回响应状态吗和响应信息
            if (usersData[0].password === password) {
                ctx.body = result(1, 'success');
            } else {
                ctx.body = result(0, '密码错误')
            }

        } else {
            ctx.body = { code: 0, msg: '用户不存在' }
        }
    }
}
const checkName = () => {
    return async (ctx, next) => {
        let { name } = ctx.query;
        const sql = `SELECT name From users WHERE name="${name}"`;
        const usersData = await query(sql);
        ctx.status = 200;
        if (usersData[0]) {
            //返回响应状态吗和响应信息
            ctx.body = result(0, '昵称已被使用，换一个吧');

        } else {
            ctx.body = result(1, '昵称可用');
        }
    }
}

module.exports = { getUsers, checkName }