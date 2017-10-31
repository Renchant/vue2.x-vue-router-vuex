/**
 * @desc 项目配置文件
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-01-12
 * @return {Object} config
 */ 

var colors = require( 'colors' )

const config = {
    // 七牛配置
    qiniu: {
        accessKey: '******',
        secretKey: '******',
        bucket: '******',
        origin: '******',
        uploadURL: '******'
    },

    // 设置代理
    proxy: {
        /* 以key-value形式, key表示path, value表示options
         * 更多options查看
         * https://github.com/nodejitsu/node-http-proxy#options
         * http://npm.taobao.org/package/http-proxy-middleware#options
         */
        '/api': {
            target: '******',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            },
            logLevel: 'debug'
        }
    },

    // 本地测试域名
    localhost: 'http://localhost',

    // 本地服务器端口
    port: 80,

    // 入口路由, 仅用于显示提醒
    mainRoute: '',

    // 启动本地调试时，是否自动打开浏览器
    autoOpenBrowser: true,

    // 测试配置
    test: {
       unit: {
           port: 6050
       } 
    }

}

try {
    /* 可在本地同级目录下创建 custom.local.js
     * eg: {
     *   port: 6001,  // 本地测试端口
     *   mainRoute: '#!/index',  // 入口路由, 仅用于显示提醒
     * }
     */
    const localConfig = require('./custom.local')

    Object.assign(config, localConfig)
}
catch (e) {
    console.warn('> ' + 'Local Warn'.yellow + ' : ' + e.message + '\n')
}

module.exports = config