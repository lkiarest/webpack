// import Vue from 'vue'
import langs from '../../../build/tmp/i18n.json'
import Hello from 'src/pages/hello/hello'

const LANG_CN = 'cn' // ÖÐÎÄ
const LANG_EN = 'en' // Ó¢ÎÄ

describe('ut suites with language [cn]', () => {
    before(() => {
        Vue.config.lang = LANG_CN
        Object.keys(langs).forEach(function (lang) {
            Vue.locale(lang, langs[lang])
        })
    })

    describe('hello', () => {
        it('should render correct contents', () => {
            const Constructor = Vue.extend(Hello)
            const vm = new Constructor().$mount()
            expect(vm.$el.querySelector('.btn')).to.be.ok
        })

        it('btn text correct', () => {
            const Constructor = Vue.extend(Hello)
            const vm = new Constructor().$mount()
            expect(vm.$el.querySelector('.btn').innerText).to.be.equal('ÇÐ»»ÓïÑÔ')
        })
    })
})

describe('ut suites with language [en]', () => {
    before(() => {
        Vue.config.lang = LANG_EN
        Object.keys(langs).forEach(function (lang) {
            Vue.locale(lang, langs[lang])
        })
    })

    describe('hello', () => {
        it('btn text correct', () => {
            const Constructor = Vue.extend(Hello)
            const vm = new Constructor().$mount()
            expect(vm.$el.querySelector('.btn').innerText).to.be.equal('Switch Language')
        })
    })
})
