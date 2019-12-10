const { query } = require('@modules/DB');
const moment = require('moment');
const { encrytoPwd } = require('@modules/utils');

// 创建用户
class ManageUser {
    constructor(name, password, phone) {
        this.name = name;
        this.password = encrytoPwd(password);
        this.phone = phone;
        this.created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }
    save () {
        const sql = `INSERT INTO users set ?`;
        console.log(sql)
        return query(sql, { name: this.name, password: this.password, phone: this.phone, created_at: this.created_at });
    }
}

module.exports = {
    ManageUser
}