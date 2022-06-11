// routers/pages.js 文件专用中间件

const { BannerModel} = require('../db/model')
// 处理轮播图列表
const getBannerList = async (req,res,next) => {
// oa管理的数据库就是我要访问的数据库
const result = await BannerModel.find()

req.banner = result
next()
}

const getUserInfo = async (req,res,next) => {

    const {info} = req.session
    // 如果有info直接去下一步
    console.log(info); 
    if(!info) return next()  
    
    const {nickname} = info
    req.nickname = nickname
    console.log(req.nickname)
    next()
}
module.exports = {
    getBannerList, 
    getUserInfo,
}