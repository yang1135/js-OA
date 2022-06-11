module.exports = {
    // 端口号
    port:8080,
    // token验证
    secret:'peach',
    // token不验证的数组
    pass:['/users/login'],
    // token过期时间
    expires: 60 * 60 * 24,
}