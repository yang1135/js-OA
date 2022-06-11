// routes/users 内使用的中间件
// 验证登录
const testLogin = (req,res,next) => {
    const {username , password} = req.body
    console.log(req.body)
    console.log(username, password)
    // 非空验证
    if(!username || !password) return next(4)
    // 参数格式验证
    // 暂时简单验证长度
    if(username.length < 5 || username.length > 12 || password.length < 6 || password.length > 12)
    return next(5)
    next()
}

// 验证id
const testId = (req,res,next) => {
    console.log('testId,start')
    const id = req.params.id || req.body.id
    // 判断id是否符合规则
    if(id.length !== 24) return next(5)
    
    next()
}
module.exports = {
    testLogin,
    testId,
}