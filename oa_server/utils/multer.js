// 创建图片接收器
const multer = require('multer')
const path = require('path')

// 轮播图图片存储库
const bannerStorage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/banner/'))
  },
  filename (req, file, cb) {
    const { ext } = path.parse(file.originalname)
    console.log('ext',ext);
    const filename = `banner_${ Date.now() }_${ Math.random().toString().slice(2) }${ ext }`
    cb(null, filename)
  }
})
const personStorage = multer.diskStorage({
  destination(req,file,cb){
    cb(null, path.resolve(__dirname, '../public/person/'))
  },
  filename(req,file,cb){
    const { ext } = path.parse(file.originalname)
    const filename = `person_${ Date.now() }_${ Math.random().toString().slice(2) }${ ext }`
    cb(null, filename)
  }
})

// 导出文件接收器
module.exports = {
  bannerUpload: multer({ storage: bannerStorage}),
  personUpload: multer({ storage: personStorage}),
}
