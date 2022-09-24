//新增用户模块
const bcrypt = require('bcrypt')

const { User, validateUser } = require('../../model/user')
module.exports = async (req, res, next) => {

    try {
        await validateUser(req.body)
    } catch (error) {

        //return res.redirect(`/admin/user-edit?message=${error.message}`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }))
        //调用next方法，触发错误处理中间件,参数就是错误中间件的err
    }

    let user = await User.findOne({ email: req.body.email })
    console.log(user);
    if (user) {

        //return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已被占用' }))
    }

    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');


}