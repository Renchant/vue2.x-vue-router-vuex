const fs = require('fs');
const cheerio = require('cheerio')
const colors = require( 'colors' )

const regEx = /.\/src\/|src\//

function isRelativeUrl(url) {
    var r = new RegExp('^\\s*(?:[a-z0-9]+:)?//', 'i');

    return url && !r.test(url) ? 1: 0;
}

function fixPath (filePath, prefix) {
    const static = [
        {
            name: 'img',
            attr: 'src'
        },
        {
            name: 'link',
            attr: 'href'
        },
        {
            name: 'script',
            attr: 'src'
        }
    ];

    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            const $ = cheerio.load(data);

            console.log('fix the static resource path.\n')
            
            for (var i = 0; i < static.length; i++) {
                var obj = static[i],
                    attr = obj.attr,
                    $els = $(obj.name+'['+attr+']');

                console.log('tag:'.green,' <'+obj.name+'> ', 'total: '.green + $els.length);

                if($els.length) {

                    $els.map(function(i, el) {
                        var $el = $(el);
                        var attribute = $el.attr(attr);

                        if( isRelativeUrl(attribute) ) {
                            var path = attribute.replace(regEx, prefix);
                            console.log(attribute, ' -> ', path.cyan);
                            $el.attr(attr, path);
                        } else {
                            console.log(attribute, ' -> '+'No thanks!'.rainbow);
                        }
                    });
                }
            }

            console.log('\n')

            fs.writeFile(filePath, $.html().toString());

            resolve()
        })
    })
}

module.exports = fixPath

