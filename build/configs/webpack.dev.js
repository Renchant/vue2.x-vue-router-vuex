var path = require('path')

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var autoprefixer = require('autoprefixer')

const config = require('./custom')
const publicPath = [config.localhost, ':', config.port, '/dist/'].join('')
const srcPath = path.resolve(__dirname, '../../src')

var webpackConfig = {

    entry: {
        index: path.resolve(srcPath, 'js/index.js')
    },

    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name]_[chunkhash:10].js',
        publicPath: publicPath
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: /src\//,
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
                include: /src\/js/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                include: /src\//,
                query: {
                    limit: 5000,
                    name: 'images/[name]_[hash:10].[ext]'
                }
            },
            {
                test: /favicon.ico/i,
                loader: 'url-loader',
                include: /src\//,
            }
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
            'images': path.resolve( srcPath, 'images'),
            'scss': path.resolve( srcPath, 'scss'),

            'constants': path.resolve( srcPath, 'js/common/constants/env/prod.js'),
            
            'vue': 'vue/dist/vue.runtime.min',
            'vue-router': 'vue-router/dist/vue-router.min',
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
                NODE_ENV: '"production"'
            }
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../../src/libs/js/manifest_vendors.json'),
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: 'src/images/favicon.ico',
            showErrors: true,
        }),

        /* new addAssetHtmlPlugin([
            {
                typeOfAsset: 'css',
                filepath: path.resolve(srcPath, 'libs/css/icons/iconfont.css'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/css/icons',
                outputPath: 'libs/css/icons',
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/rainbow.min.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/qiniu/1.0.19/qiniu.min.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/vendors.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/echarts-wordcloud.min.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
            }
        ]) */
    ]
}

module.exports = webpackConfig;