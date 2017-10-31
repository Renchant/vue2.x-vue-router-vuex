require('shelljs/global')
var ora = require('ora')
var webpack = require('webpack')

var build = function (config, cb) {
    var spinner = ora( {
        text: '开始🐶 建项目...',
        spinner: {
            interval: 150,
            frames: [
                " 🐵 🐵 🐵 ",
                " 🙈 🐵 🐵 ",
                " 🐵 🙉 🐵 ",
                " 🐵 🐵 🙊 "
            ]
        }
    } )
    spinner.start()

    rm('-rf', 'dist')
    mkdir('-p', 'dist')
    mkdir('-p', 'dist/libs/')
    mkdir('-p', 'dist/static/')
    mkdir('-p', 'dist/images/')
    cp('-R', 'src/libs/', 'dist/')
    cp('-R', 'src/static/', 'dist/')
    
    webpack(config, function( err, stats ) {
        spinner.stop()

        process.stdout.write( stats.toString( {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        } ) + '\n' )

        if (err) {
            throw err
        } else {
            console.log('\n')
            cb && cb()
            cp('-R', 'src/images/favicon.ico', 'dist/images/')
        }
    })
}

module.exports = build
