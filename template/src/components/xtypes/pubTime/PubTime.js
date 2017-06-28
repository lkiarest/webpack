/**
 * @module pubTime
 * 选择发布时间控件
 */
import PubTimeControl from './PubTimeControl'

Vue.component('xtype-pub-time', PubTimeControl)

const XTYPE_NAME = 'pubTime'

function register(vm, xtypeName) {
    // debugger
    WIS_EMAP_INPUT.extend({
        xtype: xtypeName || XTYPE_NAME,
        init: function (ele, params) {
            ele.html('<xtype-pub-time v-ref:pubtime></xtype-pub-time>')
            vm.$nextTick(() => {
                vm.$compile(ele[0])
            })
        },
        setValue: function (ele, name, val, root) {
            return vm.$refs.pubtime.setValue(val)
        },
        getValue: function (ele, formData) {
            return vm.$refs.pubtime.getValue()
        },
        disable: function (ele) {
        },
        enable: function (ele) {
        }
    })
}

export default {register}
