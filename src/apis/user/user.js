const { query } = require('@modules/DB');
const moment = require('moment');
const { encrytoPwd } = require('@modules/utils');

// 创建用户
class ManageUser {
    constructor(name, password, phone) {
        this.name = name;
        this.password = encrytoPwd(password);
        this.phone = phone;
        this.created_at = moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
    }
    save () {
        const sql = `INSERT INTO users (name,password,phone,created_at) VALUES ('${this.name}','${this.password}',${this.phone},'${this.created_at}')`;
        return query(sql);
    }
}

module.exports = {
    ManageUser
}