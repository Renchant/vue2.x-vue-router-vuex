const build = require('./build')
const webpackConfig = require('./configs/webpack.prod')

build(webpackConfig, function () {})