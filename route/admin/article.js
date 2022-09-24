// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');

// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // page 显示当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(10).display(3).populate('author').exec();
    /* res.send(articles);
    return */
    //注意此处报错，先转换为字符串类型，再解析为对象类型
    articles = JSON.parse(JSON.stringify(articles))

    res.render('admin/article', {
        articles: articles
    })
}