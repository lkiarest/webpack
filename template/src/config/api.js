/**
 * backend apis
 */
import {get as getConf} from 'conf/global'

const DEV_MODE = process.env.NODE_ENV === 'development'
const DEFAULT_API_BASE = DEV_MODE ? '//next.wisedu.com:8013/v3' : '//www.cpdaily.com/v3'

let apiBase = null

const _dataPath = (url) => {
    apiBase = apiBase || getConf().apiBase || DEFAULT_API_BASE
    return `${apiBase}/comapp-leave/${url}`
}

export default {
    USER_INFO: _dataPath('user')
}
