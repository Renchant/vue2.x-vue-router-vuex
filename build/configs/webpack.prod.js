var path = require('path')

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var autoprefixer = require('autoprefixer')

const pkgName = require( '../../package.json' ).name
const cdnOrigin = require( './custom' ).qiniu.origin
const publicPath = cdnOrigin + '/' + pkgName + '/dist/'
const srcPath = path.resolve(__dirname, '../../src')

var webpackConfig = {

    entry: {
        index: './src/js/index.js'
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
                    },
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true
                                    }
                                },
                                'sass-loader'
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: {
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            },
                            fallback: 'vue-style-loader'
                        }),
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
            'images': path.resolve(srcPath, 'images'),
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

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../../src/libs/js/manifest_vendors.json'),
        }),

        //  提取css样式
        new ExtractTextPlugin('css/[name]_[contenthash:10].css'),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: 'src/images/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            showErrors: true,
        }),

        /* new addAssetHtmlPlugin([
            {
                typeOfAsset: 'css',
                filepath: path.resolve(srcPath, 'libs/css/icons/iconfont.css'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/css/icons',
                outputPath: 'libs/css/icons',
                hash: true
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/rainbow.min.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
                hash: true
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/qiniu/1.0.19/qiniu.min.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js'
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/vendors.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
                hash: true
            },
            {
                filepath: path.resolve(srcPath, 'libs/js/echarts-wordcloud.min.js'),
                includeSourcemap: false,
                publicPath: publicPath + 'libs/js',
                outputPath: 'libs/js',                
                hash: true
            }
        ]) */
    ]
}

module.exports = webpackConfig;