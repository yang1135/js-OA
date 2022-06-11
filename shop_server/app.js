const express = require('express')
const body = require('body-parser')
const cors = require('cors')
const {empty,info,error} = require('./middleware/index')
const path = require('path')
const cookie = require('cookie-parser')
const session = require('express-session')
const {port, expires} = require('./config/index')
const router = require('./routes')
const {connect} = require('./db')



const app = express()
connect()
app.use(cors())

app.use('/static',express.static(path.resolve(__dirname,'../shop_client/')))
app.use('/public',express.static(path.resolve(__dirname,'./public')))

app.use(body({extended:false}))
app.use(body.json())

app.use(info)

// html渲染，需要express-art-template
app.engine('html',require('express-art-template'))
app.set('views',path.resolve(__dirname,'../shop_client/pages/'))


// 配置使用 session 空间
app.use(session({
    secret: 'ykm',
    resave: true,
    cookie: { maxAge: expires }
  }))
// 配置路由表
app.use(router) 
// 全局空路由配置
app.use(empty)
// 全局错误中间件
app.use(error)

app.listen(port,()=>{
    console.log(
        `
        开启服务器成功
        目前在监听 ${port} 端口
        shop 的服务器
        `
    )
})
