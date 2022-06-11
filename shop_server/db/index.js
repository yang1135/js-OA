// 封装方法
const mongoose = require('mongoose')

const Mongo = {
    connect(){
        // 进行数据库连接
        mongoose.connect('mongodb://localhost:27017/gp30',err=>{
            if(err) return console.log('数据库连接失败');
            console.log('数据库连接成功');
        })
    }
}

module.exports = Mongo