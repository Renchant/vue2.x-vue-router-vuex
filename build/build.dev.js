const build = require('./build')
const webpackConfig = require('./configs/webpack.dev')

build(webpackConfig, function () {})