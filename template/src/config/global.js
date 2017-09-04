import {getUserInfo, gotoLoginPage} from 'utils/sdk'
import {getConf} from 'services/config.service'

let conf = {}

export const load = () => {
    return getConf().then(data => {
        Object.assign(conf, data)
        return conf
    }).then(getUserInfo).then(data => {
        if (conf.needLogin && !data) { // 需要登陆却未登录，跳转到登陆页面
            gotoLoginPage()
            throw new Error('not login')
        }

        Object.assign(conf, {user: data})
        return conf
    })
}

export const get = () => {
    return conf
}
