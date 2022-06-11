// routers/banner.js 使用的路由处理函数

// 导出数据库模型
const { BannerModel} = require('../db/model')
// 获取轮播图列表
const list = async (req,res) =>{

    // BannerModel({
    //     title:'鬼灭之刃',
    //     img_url:'/public/banner/003.jpg',
    // }).save()
    const result = await BannerModel.find()
    // 对数据处理
    const list = []
    result.forEach(item =>{
        // console.log(item)
        list.push({
            title: item.title,
            img_url:item.img_url,
            link:item.link,
            id:item._id,
            createTime: item.createTime,
        })
    })
    res.send({
        code:1,
        message:'获取轮播图成功',
        list:result,
    })
}
// 增加一个轮播图
const add = async (req,res) =>{
    // 直接拿到参数即可
    const {title, link, img_url} = req.body

    // 向数据库添加
    // 检测数据库有多少
    const total = (await BannerModel.find()).length

    if(total >= 9)
    return res.send({code:0,message:'添加失败，轮播图数量已到达最大限度'})

    // 插入数据库
    const result = await BannerModel({title, link, img_url}).save()
    // console.log(result)
    if(result) res.send({code:1,message:'添加图片成功'})
}

// 删除一个轮播图
const remove = async (req,res) => {
    // 拿到id
    const {id} = req.params
    // 拿到当前轮播图总数
    const total = (await (BannerModel.find())).length
    if(total <= 3) return res.send({code: 0, message:'删除失败，轮播图数量已经最小了'})
    // 删除操作
    await BannerModel.findByIdAndDelete(id)

    res.send({code:1, message:'删除成功'})
}

// 获取一条信息
const info = async (req,res) => {
    const {id} = req.params
    // console.log(id)
    const result = await await BannerModel.findById(id)
    console.log('info的',result)
    res.send({
        code: 1,
        message: '获取轮播图信息成功',
        info: {
          id: result._id,
          img_url: result.img_url,
          title: result.title,
          link: result.link
        }
      })
}

// 更新一条信息
const update = async (req,res) => {
    console.log('进入update')
    const {id, title, link, img_url} = req.body
     console.log('update里的处理函数，得到的数据应该是修改后的数据，req.body和从中解构出来的东西',req.body,id, title, link, img_url);
     if(img_url === 'weixiugai')
     await BannerModel.findByIdAndUpdate(id,{title, link})
     else
    await BannerModel.findByIdAndUpdate(id,{title, link, img_url})
    res.send({code:1 ,message:'修改成功'})
}
module.exports = {
    list,
    add,
    remove,
    info,
    update,
}