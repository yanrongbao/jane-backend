const { logger } = require('./logger');

// 这个middleware用于将ctx.result中的内容最终回传给客户端
const responseHandler = async (ctx, next) => {
    //先去执行路由
    if (ctx.request.url.indexOf('/images') !== -1) {
        await next();
    } else {
        await next();
        const { success, msg, data = [] } = ctx.body;
        //如果有返回数据，将返回数据添加到data中
        ctx.type = 'json'
        ctx.body = {
            success,
            msg,
            data
        }
    }

}
// 这个middleware处理在其它middleware中出现的异常
const errorHandler = (ctx, next) => {
    return next().catch(err => {
        if (err.code == null) {
            logger.error(err.stack)
        }
        ctx.body = {
            success: false,
            message: err.message.trim()
        }
        ctx.status = 200 // 保证返回状态是 200, 这样前端不会抛出异常
        return Promise.resolve()
    })
}
module.exports = {
    responseHandler,
    errorHandler
}