{{#sdk}}
import {getUserInfo, gotoLoginPage} from 'utils/sdk'
{{/sdk}}
import {getConf} from 'services/config.service'

let conf = {}

export const load = () => {
    return getConf().then(data => {
        Object.assign(conf, data)
        return conf
    }){{#sdk}}
    .then(getUserInfo)
    .then(data => {
        if (conf.needLogin && !data) { // 需要登陆却未登录，跳转到登陆页面
            gotoLoginPage()
            throw new Error('not login')
        }

        Object.assign(conf, {user: data})
        return conf
    }){{/sdk}}
}

export const get = () => {
    return conf
}
