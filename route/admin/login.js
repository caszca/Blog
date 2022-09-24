const bcrypt = require('bcrypt')
const { User } = require('../../model/user')
module.exports = async (req, res) => {
    // 接收请求参数
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('邮件地址或者密码错误');

    let user = await User.findOne({ email });
    // 查询到了用户
    if (user) {

        let isValid = await bcrypt.compare(password, user.password);
        // 如果密码比对成功
        if (isValid) {
            req.session.username = user.username

            req.app.locals.userInfo = user;

            // 对用户的角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 重定向到博客首页
                res.redirect('/home/');
            }
        }
        else {
            res.status(400).send('邮件地址或者密码错误')
        }
    } else {
        // 没有查询到用户
        res.status(400).send('邮件地址或者密码错误')
    }

}

