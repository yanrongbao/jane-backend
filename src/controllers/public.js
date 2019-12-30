const { formatteResult, getIPAdress } = require('@utils');
const { query } = require('@lib/db');
const getWriteLists = () => {
    return async (ctx, next) => {
        const { pageSize = 6, page = 1 } = ctx.query;
        const sql = `SELECT * FROM write_list LIMIT ${(page - 1) * pageSize
            }, ${pageSize} `;
        const listData = await query(sql);
        listData.map(item => {
            if (item.desc_url) {
                item.desc_url = `${getIPAdress()}${item.desc_url}`
            } else {
                item.desc_url = ''
            }
        })
        ctx.body = formatteResult(true, '查询列表数据成功', listData);
    }
}

module.exports = {
    getWriteLists
}