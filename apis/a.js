module.exports = {
    // default path is file name, if no path defined
    // path: 'your_another_custom_path',
    method: 'GET',
    controller: async ctx => {
        ctx.body = "hah"
    }
}