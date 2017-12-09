// polyfills
require('es6-promise').polyfill()
require('utils/polyfills')
require('assets/style/main.less')
const DEV_MODE = process.env.NODE_ENV === 'development'

// logger
if (DEV_MODE && process.env.LOGGER) {
    const watcher = require('request-watcher')
    watcher.use(require('request-watcher-axios'))
    watcher.global.origin = process.env.LOGGER.server // default is 'http://0.0.0.0:2333'
    watcher.global.username = process.env.LOGGER.username // default is 'username'
    watcher.global.appname = process.env.LOGGER.appname // default is 'appname'
    const logger = watcher.logger()
    window.logger = logger

    // TODO: test console, please remove it
    logger('tag', 'real content')
} else {
    window.logger = function() {}
}

import {init} from 'utils/sdk'
import {load} from 'conf/global'
import router from 'router'
import routes from 'src/pages/[PAGE_NAME]/routes'
// import index from 'src/pages/[PAGE_NAME]/[ENTRY_NAME]';

{{#i18n}}
// 多语言支持
import langs from '../i18n.json'
const locale = '[LANG_NAME]' // 页面多语言定义
Vue.config.lang = locale
Object.keys(langs).forEach(function (lang) {
    Vue.locale(lang, langs[lang])
})
{{/i18n}}

// 启用 vue 开发者工具
if (DEV_MODE) {
    Vue.config.devtools = true
}

init().then(load).then(function(userInfo) {
    router(routes, '#app')
}).catch(e => {
    console.error(e.message)
})
