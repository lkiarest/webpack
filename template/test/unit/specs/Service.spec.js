/* eslint-disable */
/**
 * ���ļ��ɹ����Զ����ɣ���������Ķ�������
 * @name WEC SMMP APP API
 * @description SaaS�ƹ���ƽ̨ - ѧУ�������̨ - Ӧ�ù������Ľӿ�
 * @tutorial http://172.16.9.105:9000/platform/wec-smmp/yaml/wec-smmp-app.yaml
 */
import * as service from '@/services/index.service.js'

describe('��ȡ��Ϣ�������Ĳ˵��б�', () => {
    it('normal request', () => {
        expect.assertions(1)
        return service.listMenus().then(data => {
            expect(data.code).toBe(0)
        })
    })
})
