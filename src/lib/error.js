class CodedError extends Error {
    constructor(message = '未知错误', code = -1) {
        super(message)
        this.code = code
    }
}

module.exports = {
    /**
     * 带有错误代码的错误类
     */
    CodedError,
    /**
     * 拒绝访问(1)
     */
    ForbiddenError: class ForbiddenError extends CodedError {
        constructor(message = '拒绝访问') {
            super(message, 1)
        }
    },
    /**
     * 无效的Query(2)
     */
    InvalidQueryError: class InvalidQueryError extends CodedError {
        constructor(message = '无效的Query') {
            super(message, 2)
        }
    }
}