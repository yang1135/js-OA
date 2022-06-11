const express = require('express')
// 导入body-parser
const body = require('body-parser')
// 导入cors第三方
const cors = require('cors')
// 导入全局中间件
const {  empty, info,error} = require('./middleware/index')
// 导入数据库连接
const {connect} = require('./db/index')
// 导入 jwt
const {expressjwt} = require('express-jwt')
// 配置端口信息
const { port,secret,pass } = require('./config/index')
// 导入路由总表
const router = require('./routers/index')
const path = require('path')

const app = express()
connect()
// 开启跨域
app.use(cors())
// 配置静态资源
app.use('/public',express.static(path.resolve(__dirname,'./public/')))




// 解析请求体
app.use(body({extended:false}))
app.use(body.json())

// 全局中间件，记录访问信息
app.use(info)

// 配置验证token
app.use(expressjwt({
    secret,
    algorithms: ['HS256']
}).unless({ path: pass }))

// 挂载路由总表
app.use(router)
// 全局空路由配置
app.use(empty)
// 全局错误中间件
app.use(error)






app.listen(port,()=>{console.log(`监听端口${port}成功,我是oa服务器`);})