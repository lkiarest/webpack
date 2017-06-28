const DEV_MODE = process.env.NODE_ENV === 'development'

let META_SERVER = '../statics/meta-info'
let DATA_SERVER = '/comapp/sys' // backend api base

if (!DEV_MODE) {
    META_SERVER = 'statics/meta-info'
}

const _metaPath = (url) => {
    return `${META_SERVER}/${url}`
}

const _dataPath = (url) => {
    return `${DATA_SERVER}/${url}`
}

export default {
    LIST_META: _metaPath('meta_file.json'), // meta ÎÄ¼þµØÖ·
    USER_INFO: _dataPath('xxx.do'),
    TEST_302: '/test302'
};
