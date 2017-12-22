import service from 'src/services/service.js'

describe('api test', () => {
    it('get data', (done) => {
        return service.getUser().then(user => {
            assert.ok(true)
        }).then(done)
    })
})
