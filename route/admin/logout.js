module.exports = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')//清除指定的cookie
        res.redirect('/admin/login')

        req.app.locals.userInfo = null//消除userInfo，实时关注能否发布评论
    })
}