const express = require('express')
const { User } = require('../model/user')
const admin = express.Router()
const bcrypt = require('bcrypt')

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

//用户登陆
admin.post('/login', require('./admin/login'))


//渲染列表页面
admin.get('/user', require('./admin/userPage'))

//退出登陆
admin.get('/logout', require('./admin/logout'))


admin.get('/user-edit', require('./admin/user-edit'))

// 用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

//创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

// 用户删除功能路由
admin.get('/delete', require('./admin/user-delete'));



// 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))

// 文章删除功能路由
admin.get('/article_delete', require('./admin/article-delete'));

//admin.post('/user-modify', require('./admin/user-modify'))
module.exports = admin