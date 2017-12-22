// polyfills
require('es6-promise').polyfill()
require('utils/polyfills')
require('assets/style/main.less')
const DEV_MODE = process.env.NODE_ENV === 'development'

{{#sdk}}
import { init, setBouncesEnabled } from 'utils/sdk'
{{/sdk}}
import {load} from 'conf/global'
import router from 'router'
import routes from 'src/pages/[PAGE_NAME]/routes'

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

{{#sdk}}
init().then(() => {
    {{/sdk}}load().then(function () {
    {{#sdk}}
    setBouncesEnabled(false) // 禁用webview弹簧效果
    {{/sdk}}
    router(routes, '#app')
    }).catch(e => {
        console.error(e.message)
    })
{{#sdk}}
})
{{/sdk}}
