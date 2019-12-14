const { query } = require('@lib/db');
const { formatteResult, encrytoPwd } = require('@utils');
const moment = require('moment');

const createUser = () => {
    return async (ctx, next) => {
        let { name, password, phone, verificationCode } = ctx.request.body;
        const user = new ManageUser(name, password, phone)
        const data = await user.save();
        ctx.body = formatteResult(true, '注册成功');
    }
}
const checkUserExits = () => {
    return async (ctx, next) => {
        let { name } = ctx.query;
        const sql = `SELECT name From users WHERE name="${name}"`;
        const usersData = await query(sql);
        if (usersData[0]) {
            //返回响应状态吗和响应信息
            ctx.body = formatteResult(false, '昵称已被使用，换一个吧');

        } else {
            ctx.body = formatteResult(true, '昵称可用');
        }
    }
}

const userLogout = () => {

}

module.exports = {
    createUser,
    checkUserExits
}
class ManageUser {
    constructor(name, password, phone) {
        this.name = name;
        this.password = encrytoPwd(password);
        this.phone = phone;
        this.created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }
    save () {
        const sql = `INSERT INTO users set ?`;
        return query(sql, { name: this.name, password: this.password, phone: this.phone, created_at: this.created_at });
    }
}