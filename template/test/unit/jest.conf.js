const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1', // 公共组件
        '^api$': '<rootDir>/src/config/api', // 定义后端公共接口
        '^services/(.*)$': '<rootDir>/src/services/$1', // 公共服务层
        '^utils/(.*)$': '<rootDir>/src/utils/$1', // 通用处理模块
        '^vuex/(.*)$': '<rootDir>/src/vuex/$1', // 指向负责全局状态管理工具vuex
        '^statics/(.*)$': '<rootDir>/src/statics/$1', // 静态文件目录
        '^res/(.*)$': '<rootDir>/src/statics/resources/$1', // 静态资源
        '^img/(.*)$': '<rootDir>/src/statics/resources/img/$1', // 图片
        '^conf/(.*)$': '<rootDir>/src/config/$1' // 各种配置信息
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    testPathIgnorePatterns: [
        '<rootDir>/test/e2e'
    ],
    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
    setupFiles: ['<rootDir>/test/unit/setup'],
    mapCoverage: true,
    coverageDirectory: '<rootDir>/test/unit/coverage',
    collectCoverageFrom: [
        'src/services/*.js',
        '!**/node_modules/**'
    ]
}
