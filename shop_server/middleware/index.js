const { query } = require("express")
const { config } = require("process")


const empty = (req,res) => {
    res.status(404).send({
        code:404,
        message:'您请求地址不存在，请核实后重新输入',
        tips:{
            url:req.url,
            method:req.method
        }
    })
}

//记录每一次访问信息     
const info = (req,res,next)=> {

    console.log(`
    当前服务接收到一个请求
    请求时间：${new Date()}
    请求地址：${req.url}
    请求的方式：${req.method}
    请求query：${JSON.stringify(req.query)}
    请求的params：${JSON.stringify(req.params)}
    请求的body：${JSON.stringify(req.body)}
    `)
    next()
}


const error = (err,req,res,next) => {
    if(err === 4) return res.send({
        code:4,
        message:'您传递参数不全，请查证后输入',
        query: req.query,
        params:req.params,
        body:req.body,
    })
    if(err === 5) return res.send({
        code:5,
        message:'输入不合规范，请查证后再试',
        query:req.query,
        params:req.params,
        body:req.body,
    })

}



module.exports = {
    empty,
    error,
    info,
}