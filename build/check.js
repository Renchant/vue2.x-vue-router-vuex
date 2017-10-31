var express = require('express')
var colors = require('colors')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('../webpack.dev.config').output

var app = express()

var fallback = require('connect-history-api-fallback')();

app.use( fallback )

app.use( '/dist', express.static('./dist') )

var config = require('../config')
var proxy = config.proxy
var port = config.port || 6001
var localhost = config.localhost || 'http://localhost'
var route = config.mainRoute || ''

Object.keys(proxy).forEach(function (k) {
    app.use(k, proxyMiddleware(proxy[k]))
})

module.exports = app.listen( port, function( err ) {
    if( err ) {
        console.log( err )
        return;
    } else {
        console.log( colors.yellow('\nListening at ' + localhost + ':' + port + '/dist/index.html' + route + '\n' ) )
    }
} )