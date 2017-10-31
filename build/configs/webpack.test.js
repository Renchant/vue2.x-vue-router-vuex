var path = require('path');
var jsPath = path.resolve(__dirname, '../../src/js')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                // https://www.npmjs.com/package/istanbul-instrumenter-loader 
                loader: 'istanbul-instrumenter-loader',
                include: /src\/js/,
                query: {
                    esModules: true
                }
            }
        ]
    },

    resolve: {
        alias: {
            'js': path.resolve(jsPath),
            'common': path.resolve(jsPath, 'common'),
            'filters': path.resolve(jsPath, 'filters'),
        },
    }
}