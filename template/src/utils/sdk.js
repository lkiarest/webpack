const url = require('url')
import {init as sdkInit} from 'bh-mobile-sdk'

// const DEV_MODE = process.env.NODE_ENV === 'development'
const HTTPS = location.protocol === 'https:'
const BASE_PATH = location.protocol + '//' + location.host + location.pathname
let sdk = null

const resolve = (path) => {
    return url.resolve(location.href, path)
}

// 初始化
export const init = () => {
    return new Promise((resolve) => {
        sdkInit(function() {
            sdk = window.BH_MOBILE_SDK
            resolve()
        }, HTTPS)
    })
}

// 获取当前登陆用户信息
export const getUserInfo = () => {
    return new Promise(resolve => {
        if (!runInApp()) {
            resolve({
                name: 'qtx'
            })
        } else {
            sdk.cpdaily.getUserInfo(resolve)
        }
    })
}

// 获取当前租户信息
export const getTenantInfo = () => {
    return new Promise(resolve => {
        sdk.cpdaily.getTenantInfo(resolve)
    })
}

// 获取当前租户 id
export const getTenantId = () => {
    return new Promise(resolve => {
        sdk.cpdaily.getTenantId(resolve)
    })
}

/**
 * 批量获取用户信息
 * @param  {Array} ids 用户id列表 (userId)
 * @return {Array}     用户信息列表
 */
export const getUserBasicInfos = (ids) => {
    return new Promise(resolve => {
        sdk.cpdaily.getUserBasicInfos(ids, resolve)
    })
}

/**
 * 检查当前是否运行在今日校园 app 内
 */
export const runInApp = () => {
    return /wisedu/.test(navigator.userAgent)
}

// 打开新窗口
export const openWindow = (url, options) => {
    sdk.UI.openWebView(url, options)
}

// 关闭当前窗口
export const closeWindow = () => {
    return sdk.UI.closeWebView()
}

/**
 * 打开使用前端路由指定的页面
 */
export const openRoute = (path, options) => {
    sdk.UI.openWebView(`${BASE_PATH}#${path}`, options)
}

/**
 * 打开新的页面链接
 * @param  {String} path    新页面的相对路径
 */
export const openLink = (path, options) => {
    sdk.UI.openWebView(resolve(path), options)
}

/**
 * 重定向当前页面，清除历史记录（主要用于表单提交后的跳转）
 */
export const replaceLink = (path) => {
    window.location.replace(resolve(path))
}

// 页面切换回来后的回调
export const setResume = onResume => {
    sdk.UI.webviewOnResume(onResume)
}

// toast
export const toast = msg => {
    sdk.UI.showToast(msg)
}

/**
 * go to login page
 */
export const gotoLoginPage = () => {
    sdk.UI.closeWebView()
    sdk.cpdaily.showLoginView(false, true)
}

/**
 * 设置原生头部展示参数
 */
export const setNavHeader = (options) => {
    return sdk.UI.setNavHeader(options)
}

/**
 * header 右侧的按钮
 * @param  {Number}   type     按钮类型（ 1-分享 2-扫一扫 3-新增）
 */
export const setNavHeaderButton = (type, callback) => {
    return sdk.UI.showLimitedRightButton(type, callback)
}

/**
 * 选择操作项
 */
export const showActions = (title, actions, callback) => {
    return sdk.UI.actionSheet(title, actions, callback)
}

/**
 * 拍照
 */
export const takeCamera = (callback) => {
    return sdk.systemAbility.takeCamera(callback)
}

/**
 * 选择照片(可限制选择数量)
 */
export const takePhoto = (callback, limit) => {
    return sdk.systemAbility.takePhoto(callback, limit)
}

/**
 * 预览图片
 * @param  {Array} urls 图片 url 列表
 * @param  {Number}  index 默认查看图片的索引，从 0 开始
 */
export const previewImages = (urls, index) => {
    return sdk.UI.preViewImages(urls.map(url => {
        return {url}
    }), index)
}

/**
 * 打开用户详情页面
 * @param  {String} uid 用户 id
 */
export const openPersonalHome = (uid) => {
    return sdk.cpdaily.openPersonalHome(uid)
}
