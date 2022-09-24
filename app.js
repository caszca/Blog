const express = require('express')
// 处理路径
const path = require('path');

// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
require('./model/connect')//数据库连接

const session = require('express-session')

// 导入art-tempate模板引擎
const template = require('art-template');
// 导入moment第三方模块
const moment = require('moment')

const app = express()

//拦截请求，非登陆不得查看后台页面
//app.use('/admin', require('./middleware/loginGuard'))

app.use(session({
    resave: false,//注意此处报错添加
    saveUninitialized: false,//注意此处报错添加
    secret: 'sercet key',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))
// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));



// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

// 向模板内部导入dateFormate变量
template.defaults.imports.moment = moment;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));


const home = require('./route/home')
const admin = require('./route/admin')

app.use('/admin', admin)
app.use('/home', home)





//第一个中间件
app.use((err, req, res, next) => {
    const result = JSON.parse(err)
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);

})

app.listen(80, () => {
    console.log('server is working');
})