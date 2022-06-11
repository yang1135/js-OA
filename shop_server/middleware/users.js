// router/users.js 的中间件
// 用户登录
const testLogin = (req,res,next) => {
   
    const {username,password} = req.body
    console.log('打印!username',!username);
    
    if(!username || !password) {
        console.log('走进来没')
        return next(4)
    }

    if (username.length < 5 || username.length > 12 || password.length < 5 || password.length > 12) return next(5)
    next()
}

module.exports = {
    testLogin,
}