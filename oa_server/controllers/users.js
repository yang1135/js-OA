// routes/users 内对应的路由处理函数
// 导入数据库操作
const {UserModel} = require('../db/model')
// 导入token
const jwt = require('jsonwebtoken')
// 导入配置信息
const {secret, expires} = require('../config/index')
const login = async (req,res) => {
    // 代码走到这里说明是符合格式且用户名和密码存在的
    const {username, password} = req.body

    // 去数据库进行匹配
   const result = await UserModel.findOne({username,password})

    //如果没有用户，就是null，如果有，就是用户信息 
    //console.log(result)
    if(!result) return res.send({code : 0, message:'登陆失败'})

    // 登陆成功，根据用户信息创建一个token
    const token ='Bearer ' +  jwt.sign({id : result._id},secret,{expiresIn:expires})

    // 返回给前端
    res.send({
        code:1,
        message:'登录成功',
        token,
        user_id:result._id,
    })

// 存一份
// UserModel({
//     username:'admin3',
//     password:'654321',
//     nickname:'管理员',
//     age:22,

// }).save()
}

// 获取用户个人信息
const info = async (req,res ) => {
    const {id} = req.params

    // 根据id获取个人信息
    const result = await UserModel.findById(id)
    console.log('根据id获取个人信息',result)
    res.send({
        code:1,
        message:'获取个人信息成功',
        info:{
            id:result._id,
            nickname:result.nickname,
            username:result.username,
            age:result.age,
            gender:result.gender,
            avatar:result.avatar,
            desc:result.desc,
            password:result.password,
        }
    })
}
const update = async (req,res) =>{
    console.log('进入用户更新的处理函数update')
    console.log('req.body',req.body)
    const {id,username,password,nickname,age,gender,desc} = req.body
    console.log(id,);
    await UserModel.findByIdAndUpdate(id,req.body)
    res.send({code:1 ,message:'修改成功'})
}
module.exports = {
    login,
    info,
    update,
}