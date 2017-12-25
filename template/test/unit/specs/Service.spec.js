/* eslint-disable */
/**
 * 本文件由工具自动生成，请勿随意改动！！！
 * @name WEC SMMP APP API
 * @description SaaS云管理平台 - 学校管理控制台 - 应用管理中心接口
 * @tutorial http://172.16.9.105:9000/platform/wec-smmp/yaml/wec-smmp-app.yaml
 */
import * as service from '@/services/index.service.js'

describe('获取信息管理中心菜单列表', () => {
    it('normal request', () => {
        expect.assertions(1)
        return service.listMenus().then(data => {
            expect(data.code).toBe(0)
        })
    })
})
