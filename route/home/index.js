const { Article } = require('../../model/article')
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

    const page = req.query.page

    //多集合联合查询
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()
    result = JSON.parse(JSON.stringify(result))

    // res.send(result)

    res.render('home/default.art', {
        result
    })

}