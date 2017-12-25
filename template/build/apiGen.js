const path = require('path')
const sts = require('swagger-to-service')
const config = require('../build.config')
const url = config.yaml

if (url) {
    sts({
        url,
        apiPath: config.apiPath || path.resolve(__dirname, '../src/config/api.js'),
        servicePath: config.servicePath || path.resolve(__dirname, '../src/services/index.service.js'),
        utPath: config.utPath || path.resolve(__dirname, '../test/unit/specs/Service.spec.js')
    })
}
