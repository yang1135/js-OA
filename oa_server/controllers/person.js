
const {PersonModel} = require('../db/model')

const moment = require('moment')

// 配置成中文
moment.locale('zh-cn')
const list = async (req,res) =>{
    const { current,pagesize,is_status,gender,search} = req.query
    const start = (current - 1) * pagesize
    const info = {
        nickname:new RegExp(search),
        gender: new RegExp(gender === 'all' ? '' :gender)
    }
    // console.log('接收到的req.query',req.query);
    // console.log('修改后的info',info)
    // console.log('要比对的is_status,应该是数值',is_status)
    if (is_status !== 'all') info.is_status = is_status - 0 ? true : false
    // if (is_status !== 'all') info.is_status = is_status - 0 ? true : false
    // console.log('要比对的is_status,应该是boolen',is_status)
    // 细细品这行数据库比对代码
    const result = await PersonModel.find(info).skip(start).limit(pagesize)
    // console.log('从数据库查找到的信息',result);
    const total = (await PersonModel.find(info)).length
    const list = []

    result.forEach(item =>{
        list.push({
            id: item._id,
            username: item.username,
            password: item.password,
            nickname: item.nickname,
            gender: item.gender,
            age: item.age,
            desc: item.desc,
            avatar: item.avatar,
            is_status: item.is_status,
            createTime: moment(item.createTime).format('LLLL')
    })
})
// console.log('整理完的list',list);
    res.send({
        code: 1,
        message: '获取用户列表成功',
        list: list,
        totalPage: Math.ceil(total / pagesize)
    })
    
   
    // const fn = (a,b) => Math.floor(Math.random() * (b - a + 1)) + a
    // const str = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨'
    // const str2 = '德允乾坤云震开启文章'
    // const str3 = '冉铭彬武东磊宣焱豪飞'
    // const g = ['男','女','保密']
    // for(let i = 0; i < 199; i++){
    //     PersonModel({
    //         username:'peach' + i,
    //         password:'123456',
    //         age: fn(18,35),
    //         gender: g[fn(0,2)],
    //         nickname: str[fn(0,15)] + str2[fn(0,9)] + str3[fn(0,9)]
    //     }).save()
    // }
}

// 修改用户状态
const status = async (req,res)=>{
    const{id,status} = req.body
    // console.log(id)
    await PersonModel.findByIdAndUpdate(id,{is_status:(status- 0 === 1 ? true : false)})
    res.send({
        code:1,
        message:'修改用户信息成功'
    })

}
// 添加用户
const add = async (req,res)=>{
 
    let avatar 
   if(req.file === undefined) 
     avatar = '/public/avatar/default.jpg' 
  else
     avatar = '/public/person/' + req.file.filename
   
    // 4. 为了后续路由处理函数使用方便
    // 把 avatar 也添加到 body 内
    req.body.avatar = avatar
    // console.log('走完add了，接下来需要处理一下用户添加,再打印一下img_url',avatar)
    // console.log('打印一下req.body',req.body)
    let {username, password, nickname, desc, age, gender, is_status } = req.body
    // console.log('***************');
    // console.log(username, password, nickname, desc, age, gender, is_status)
    age = age - 0
    if(is_status === '启用')
        is_status = true
        else
        is_status = false
    // console.log('is_status的类型',typeof(is_status))
      // 插入数据库
      let result = await PersonModel({username, password, nickname, desc, age, gender, is_status, avatar}).save()
    //   console.log('打印一下result',result)
      if(result) res.send({code:1,message:'添加新成员成功'})

}

// 删除用户
const remove = async (req,res) => {
    console.log('走进remove函数')
        // 拿到id
        const {id} = req.params
        console.log(id);
        // 删除操作
        await PersonModel.findByIdAndDelete(id)
    
        res.send({code:1, message:'删除成功'})
}

// 获取用户信息
const info = async(req,res) => {
    console.log('获取用户信息');
    const {id} = req.params
    // console.log(id)
    const result = await await PersonModel.findById(id)
    console.log('info的',result)
    res.send({
        code:1,
        message:'接收到用户信息',
        info:{
            id:result._id,
            username:result.username,
            password:result.password,
            nickname:result.nickname,
            age:result.age,
            gender:result.gender,
            desc:result.desc,
            avatar:result.avatar,
            is_status:result.is_status,
        }
    })
}
// 修改用户信息
const update = async(req,res)=> {
    console.log('走进update函数')
}
module.exports = {
    list,
    status,
    add,
    remove,
    update,
    info,
}