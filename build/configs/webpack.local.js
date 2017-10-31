var path = require('path');

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var autoprefixer = require('autoprefixer')

const srcPath = path.resolve(__dirname, '../../src')

var config = {
    // 热更新
    entry: {
        index: ['./build/dev-client', path.resolve(srcPath, 'js/index.js')]
    },

    output: {
        path: '/',
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    postcss: {
                        plugins: [
                            autoprefixer({
                                browsers: [ 'Android >= 4', 'Chrome >= 30', 'iOS >= 6' ]
                            })
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: /src\/js/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
        ]
    },

    resolve: {
        alias: {
            'js': path.resolve( srcPath, 'js'),
            'components': path.resolve( srcPath, 'js/components'),
            'common': path.resolve( srcPath, 'js/common'),
            'filters': path.resolve( srcPath, 'js/filters'),
            'mixins': path.resolve( srcPath, 'js/mixins' ),
            'store': path.resolve( srcPath, 'js/store'),
            'images': path.resolve(srcPath, 'images'),
            'scss': path.resolve( srcPath, 'scss'),
            'constants': path.resolve( srcPath, 'js/common/constants/env/dev.js')
        }
    },

    externals: {
        qwest: 'qwest',
        Qiniu: 'Qiniu',
        echarts: 'echarts',
        Rainbow: 'Rainbow',
        TWEEN: 'TWEEN'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            showErrors: true,
        }),
        //将第三方资源添加到生成的HTML webFont/rainbow(websocket)/qiniu(sdk)/echarts
        /* new addAssetHtmlPlugin([
            {
                typeOfAsset: 'css',
                filepath: path.resolve(srcPath, 'libs/css/icons/iconfont.css'),
                includeSourcemap: false,
                publicPath: './src/libs/css/icons',
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/rainbow.min.js'),
                includeSourcemap: false,
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/qiniu/1.0.19/qiniu.min.js'),
                includeSourcemap: false,
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/echarts-wordcloud.min.js'),
                includeSourcemap: false,              
            },
        ]) */
    ]
}

module.exports = config;