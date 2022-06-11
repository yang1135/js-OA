// routes/users.js 使用的路由处理函数
const {PersonModel} = require('../db/model')
const login = async (req,res) => {
    const {username, password} = req.body
    
    const result = await PersonModel.findOne({username,password})
   if(!result) return res.send({code:0,message:'登陆失败，用户名密码错误'})
   if(!result.is_status) return res.send({code:0, message:'登录失败，状态禁用'})

   req.session.info = {id:result.id, username:result.username,password:result.password,nickname:result.nickname}
   res.send({code:1, message:'登录成功'})
}

module.exports = {
    login,
}