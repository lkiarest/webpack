import http from 'utils/http'

let confPath = 'statics/global.conf.json'

let cached = null

export const getConf = () => {
    if (cached) {
        return Promise.resolve(cached)
    }

    return http.getJson(confPath).then(data => {
        cached = data
        return data
    })
}
