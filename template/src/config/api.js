/**
 * backend apis
 */
const API_BASE = '//www.cpdaily.com/v3'

const _dataPath = (url) => {
    return `${API_BASE}/comapp-leave/${url}`
}

export default {
    USER_INFO: _dataPath('user')
}
