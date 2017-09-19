import http from 'utils/http'

let confPath = 'statics/global.conf.json'

let cached = null
const timestamp = new Date().getTime()

export const getConf = () => {
    if (cached) {
        return Promise.resolve(cached)
    }

    return http.getJson(confPath + '?_t=' + timestamp).then(data => {
        cached = data
        return data
    })
}
