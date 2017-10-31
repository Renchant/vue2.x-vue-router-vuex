/**
 * @desc 文案的映射集合
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-16
 * @return {Object} 
 */

export const api = {
    '-1': '请求失败，请检查网络连接',
    0: '请求成功',
    403: '账号登录过期或者失败',
    // 403: '身份验证失败',
    404: '找不到你访问的资源~',
    500: '服务器繁忙',
    503: '服务器繁忙'
};

// SEO 入口
export const SEO = {
    url: 'http://www.youxuanyun.com'
};

export const qiniu = {
    '-200': {
        0: '连接失败，请检查网络',
        400: '文件名要求是utf8字符～'
    },

    '-600': '上传文件的大小超出限制范围'
};

export const errorPage = {
    reasons: {
        0: '呃,访问的页面并不存在哟!',
        1: '你无法访问受限制页面～'
    }
};