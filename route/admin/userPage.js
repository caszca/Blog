//渲染用户列表页面
const { User } = require('../../model/user')
module.exports = async (req, res) => {

    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';


    let page = req.query.page || 1
    let pagesize = 10
    let count = await User.countDocuments({})
    let total = Math.ceil(count / pagesize)

    let start = (page - 1) * pagesize
    let users = await User.find({}).limit(pagesize).skip(start)

    users.total = users.length
    //let users = await User.find({})
    res.render('admin/user', {
        users,
        page,
        total,
    })
}