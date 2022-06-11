// //routers.banner.js 下使用的中间件
// const testAdd = (req,res,next) =>{
//     // res.send({
//     //     body:req.body,
//     //     file:req.file,
//     // })
//     // req.body里没东西，undefined
//     console.log('testAdd里的req.body',req.body);
//     const { title, link } = req.body
//     const img_url = '/public/banner/' + req.file.filename
//     // console.log('testAdd的',title,link,img_url);
//     // console.log('testAdd里的title',title)
  
   
//     // 验证参数
//     if(!title) return next(4)

//     // 格式验证，正则

//     // 为了后续使用路由处理函数使用方便，吧img_url也添加到body
//     req.body.img_url = img_url
    
//     next()
// }

const testAdd = (req, res, next) => {
    // 验证 title 必填
    // 验证 link 可有可无
    // 图片地址(哪里来的) ?
    // 1. 拿到各种信息
    const { title, link } = req.body
    console.log(title)
    console.log('testAdd的req.file',req.file)
    // 注意：不换图片，不能成功修改，这个问题可以问翔哥
    let img_url
   if(req.file === undefined) 
    img_url = 'weixiugai'
    // img_url = '/public/banner/000.png'
    else
     img_url = '/public/banner/' + req.file.filename
    console.log(title)
    // 2. 验证参数
    if (!title) return next(4)
  
    // 3. 格式验证
    // 正则验证 link 的 url 格式正确
  
    // 4. 为了后续路由处理函数使用方便
    // 把 img_url 也添加到 body 内
    req.body.img_url = img_url
  
    next()
  }

module.exports = {
    testAdd,
}