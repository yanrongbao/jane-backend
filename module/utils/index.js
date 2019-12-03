const result = (code = 1, msg = '', data = []) => {
    return {
        code,
        msg,
        data
    }
}
module.exports = {
    result
};