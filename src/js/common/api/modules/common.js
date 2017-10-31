/**
 * @desc 后端API 公共模块;
 *       文档 http://showdoc.yyyad.com/index.php?s=/1&page_id=12
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-16
 * @return {Object}
 */

// api的url前缀, 对应规则可以查看根目录的 config.js 里的 proxy
const PREFIX = '/api';
// const PREFIX = '';

let url = {
    login: `${PREFIX}/member/login/`,
    logout: `${PREFIX}/member/logout/`

};

export default {
    // 登录
    login(data, options) {
        return this.fetch('post', url.login, data, options);
    },
    logout(data, options) {
        // return this.mock({status: 0, data: {}}, 2000);
        return this.fetch('get', url.logout, data, options);
    }
};
