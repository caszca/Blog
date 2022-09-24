//测试验证新增用户的输入要求

const joi = require('joi')

const schema = {
    username: joi.string().min(2).max(5).required().error(new Error('username未通过'))
}

async function run() {
    try {
        await joi.validate({ username: 'acaaaaa' }, schema)

    } catch (error) {

        console.log(error);
        return;
    }
    console.log('验证通过');

}
run()