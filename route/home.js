const express = require('express')

const home = express.Router()


home.get('/', require('./home/index'))

home.get('/article', require('./home/article'))

// 创建评论功能路由
home.post('/comment', require('./home/comment'));

module.exports = home