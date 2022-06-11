const router = require('express').Router()
// 导入相关文件接收器
const {personUpload} = require('../utils/multer')
const {testList,testStatus} = require('../middleware/person')

const {list, status, add, remove, info, update} = require('../controllers/person')
router.get('/list',testList,list)
router.patch('/status',testStatus,status)
router.put('/add',personUpload.single('person'),add)
router.delete('/remove/:id',remove)
// 获取用户信息
router.get('/info/:id',info)
module.exports = router