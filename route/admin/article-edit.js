const { Article } = require('../../model/article')

module.exports = async (req, res) => {
    const { id } = req.query
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    if (id) {
        let article = await Article.findOne({ _id: id })
        res.render('admin/article-edit', {
            article,
            button: '修改'
        });

    }
    else {
        res.render('admin/article-edit', {
            button: '发布'
        });

    }
}
