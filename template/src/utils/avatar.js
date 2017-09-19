/**
 * 用户头像后端无法提供，需要从今日校园 app 中获取，
 * 此模块提供获取接口和头像缓存
 */
import {getUserBasicInfos, runInApp} from 'utils/sdk'

const DEFAULT_ICON = '../statics/imgs/icon/avatar@2x.png'

const cached = {}

/**
 * 批量获取用户头像
 * @param  {Array} ids 用户id列表 (userId)
 * @return {Object}     用户头像 Map，key/value 分别为用户 id 和 头像地址
 */
export const getUserAvatars = (ids) => {
    if (!runInApp()) {
        return Promise.resolve({})
    }

    let avatars = {}

    if (!ids || ids.length === 0) {
        return Promise.resolve(avatars)
    }

    let uncached = []

    ids.forEach(id => {
        if (cached[id]) {
            avatars[id] = cached[id]
        } else {
            uncached.push(id)
        }
    })

    return getUserBasicInfos(uncached).then(users => {
        if (!users) {
            uncached.forEach(key => { // 全部使用默认头像
                cached[key] = avatars[key] = DEFAULT_ICON
            })

            return avatars
        }

        uncached.forEach(key => {
            let img = users[key] && users[key].img
            img = img ? img + '!small' : DEFAULT_ICON

            cached[key] = avatars[key] = img
        })

        return avatars
    }).catch(e => {
        return avatars
    })
}
