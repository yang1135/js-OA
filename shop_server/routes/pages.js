const router = require('express').Router()

const {getBannerList,getUserInfo} = require('../middleware/pages')
// 专门配置页面的各种请求
router.get('/index', getBannerList, getUserInfo, (req, res) => { res.render('index.html', { list: req.banner,nickname:req.nickname }) })
router.get('/login', (req, res) => res.render('login.html', {}))
router.get('/register', (req, res) => res.render('register.html', {}))
module.exports = router