/* eslint-disable */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var logger = require('../../build.config.js').logger

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOGGER: logger ? {
    server: `"${logger.server}"`,
    username: `"${logger.username}"`,
    appname: `"${logger.appname}"`
  } : null
})
