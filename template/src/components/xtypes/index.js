/**
 * 自定义 emap-form 控件的 xtype;
 * 控件可以由此 index 文件统一引入，也可以有页面自由引入（可自定义xtype注册名称）
 */
WIS_EMAP_CONFIG.getOptionType = 'GET' // 设置下拉项使用 get 方式获取

import PubTime from './pubTime/PubTime'

const register = (vm) => {
    PubTime.register(vm)
}

export default {register}
