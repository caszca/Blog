const { User } = require('../../model/user')

module.exports = async (req, res) => {


    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    if (id) {
        let user = await User.findOne({ _id: id })
        res.render('admin/user-edit', {
            message,
            user,
            button: '修改',
            link: `/admin/user-modify?id=${id}`
        })
    }

    else {
        res.render('admin/user-edit', {
            message,
            button: '添加',
            link: '/admin/user-edit'
        })

    }



}