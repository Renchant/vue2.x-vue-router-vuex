var path = require('path')

var webpack = require('webpack')

var libsPath = path.resolve(__dirname, '../../src/libs/js')

var config = {
    entry : {
        vendors: ['vue', 'vue-router', 'vuex', 'element-ui', 'jshashes', 'js-base64'],
    },

    output: {
        path: libsPath,
        filename: '[name].js',
        library: '[name]_dll',
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.runtime.min',
            'vue-router': 'vue-router/dist/vue-router.min'
        }
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(libsPath, 'manifest_[name].json'),
            name: '[name]_dll',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
}

module.exports = config