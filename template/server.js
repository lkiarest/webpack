var connect = require('connect')
var url = require('url')
var serveStatic = require('serve-static')
var proxy = require('proxy-middleware')
var path = require('path')

var config = require('./build.config')

var distDir = require('./build.config').distDir

var app = connect()

if (config.proxy) {
    for (var key in config.proxy) {
        var target = config.proxy[key]
        console.log('proxy [' + key + '] to ' + target)
        app.use(key, proxy(url.parse(target)))
    }
}

app.use(serveStatic(path.resolve(__dirname, distDir))).listen(3000, function () {
    console.log('Server running on 3000...')
})
