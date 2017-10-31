var express = require('express')
var webpack = require('webpack')
var colors = require('colors')
var webpackConfig = require('./configs/webpack.local')
var proxyMiddleware = require('http-proxy-middleware')
var opn = require('opn')

var app = express()
var compiler = webpack( webpackConfig )


// webpack-dev-middleware
var devMiddleware = require( 'webpack-dev-middleware')( compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
        colors: true,
        chunks: false,
        // modules: true,
        reasons: true,
        errorDetails: true
    }
} )

var config = require('./configs/custom')
var proxy = config.proxy
var localhost = config.localhost || 'http://localhost'
var port = config.port || 6001
var route = config.mainRoute || ''

devMiddleware.waitUntilValid(function () {
    var uri = localhost + ':' + port + '/index.html' + route
    console.log(colors.yellow('\nListening at ' + uri + '\n'))
    config.autoOpenBrowser && opn(uri)
})

// wdbpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

Object.keys(proxy).forEach(function (k) {
    app.use(k, proxyMiddleware(proxy[k]))
})

var fallback = require('connect-history-api-fallback')();

app.use( fallback )

app.use( '/src', express.static('./src') )

app.use( devMiddleware )

app.use( hotMiddleware )

module.exports = app.listen( port, function( err ) {
    if( err ) {
        console.log( err )
        return;
    }
} )