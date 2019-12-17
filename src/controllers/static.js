const request = require('request');
const getStaticResources = () => {
    return async (ctx, next) => {
        await new Promise(function (resolve, reject) {
            var req = request({
                method: 'GET',
                encoding: null,
                uri: 'http://localhost:5000/static/images/touxiang.jpg'
            }, function (err, response, body) {
                if (err) {
                    return reject(err);
                }
                resolve(body);
            });
        }).then((body) => {
            ctx.status = 200;
            ctx.type = 'jpg';
            console.log(Buffer.isBuffer(body));
            ctx.length = Buffer.byteLength(body);
            ctx.body = body;
        }).catch((err) => {
            console.error(err);
        });
    }
}

module.exports = { getStaticResources };