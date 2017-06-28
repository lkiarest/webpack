/**
 * 编译、打包参数配置
 */
/**
 * 全局参数配置
 */
var path = require('path');

const __DEBUG__ = process.env.NODE_ENV === 'development'; // 是否开发模式

// const VER = '100003'; // res库版本
const CDN_BASE = __DEBUG__ ? 'http://res.wisedu.com' : 'https://feres.cpdaily.com'
const BOWER_BASE = `${CDN_BASE}/bower_components`;
const FE_BASE = `${CDN_BASE}/fe_components`;

const _feLib = path => {
    return `${FE_BASE}/${path}`;
};

const _bowerLib = path => {
    return `${BOWER_BASE}/${path}`;
};

const _dynamicMin = url => { // 根据是否为开发模式确定是否引入 min 文件
    return __DEBUG__ ? `${url}.js` : `${url}.min.js`;
};

const BOWER_JS_LIBS = [
    _dynamicMin('vue/dist/vue'),
    'vue-i18n/vue-i18n.min.js',
    'vuex/dist/vuex.min.js',
    'vue-resource/vue-resource.min.js',
    'vue-router/dist/vue-router.min.js',
    'jquery/dist/jquery.min.js',
    'jquery.nicescroll/jquery.nicescroll.min.js',
    'moment/min/moment-with-locales.min.js',
    'bootstrap/dist/js/bootstrap.min.js', // support emap-editor
    'summernote-0.8.1/dist/summernote.js', // support emap-editor
    'axios/axios.min.js'
];

// support emap-editor
const BOWER_CSS_LIBS = [
    'bootstrap/dist/css/bootstrap.min.css',
    'summernote-0.8.1/dist/summernote.css'
]

const FE_JS_LIBS = [
    'bh_utils.js',
    _dynamicMin('bh-1.2'),
    _dynamicMin('emap-1.2'),
    // 'jqwidget/globalize.js',
    'jqwidget/jqxwidget.min.js',
    'mock/getmock.js'
];

const FE_CSS_LIBS = [
    'iconfont/iconfont.css',
    'jqwidget/blue/bh-1.2.min.css',
    'jqwidget/blue/bh-scenes-1.2.min.css'
];

const COMMON_LIB = _feLib('jqwidget/globalize.js')

module.exports = {
    proxy: { // DEV 模式下访问后端 api 时防止跨域使用的代理
        // '/wec-portal-nk': 'http://172.16.7.75:8000'
    },
    alias: { // 自定义webpack依赖的别名，默认已支持 src/pages/config/node_modules
        'components': 'src/components', // 公共组件
        'bh-vue': 'node_modules/bh-vue', // bh-vue 基础组件库
        'wec-vue': 'node_modules/wec-vue', // wec-vue (公有云业务)组件库
        'api': 'src/config/api', // 定义后端公共接口
        'services': 'src/services', // 公共服务层
        'utils': 'src/utils', // 通用处理模块
        'vuex': 'src/vuex', // 指向负责全局状态管理工具vuex
        'statics': 'src/statics', // 静态文件目录
        'res': 'src/statics/resources', // 静态资源
        'img': 'src/statics/resources/img', // 图片
        'conf': 'src/config' // 各种配置信息
    },
    babelDir: [/bh-vue/, /wec-vue/], // 指定允许使用babel-loader编译的文件目录或路径匹配，默认已支持src
    meta: {
        url: 'http://res.wisedu.com/WeCloud/emap-meta/wec-smmp/wec-smmp-sinfo/', // 远程服务器地址
        dir: 'src/statics/meta-info' // 本地保存位置
    },
    loaders: [], // 增加其他文件类型的loader，默认已支持 vue
    csslibs: BOWER_CSS_LIBS.map(item => _bowerLib(item)).concat(FE_CSS_LIBS.map(item => _feLib(item))),
    jslibs: [COMMON_LIB].concat(BOWER_JS_LIBS.map(item => _bowerLib(item))).concat(FE_JS_LIBS.map(item => _feLib(item))),
    distDir: path.resolve(__dirname, 'dist') // 执行 build 时发布的路径，可以指定其他路径比如 '../webapp'
};
