<template>
    <div class='person-list'>
        <person-item class='item' :class='clsPerson(person)' v-for='person in candidates' :key='person.userId' :user-info='person' :checkable='multiple' @click.native='onClick(person)'></person-item>
    </div>
</template>

<script>
    import {toast} from 'utils/sdk'
    import {getUserAvatars} from 'utils/avatar'
    import {get as getConf} from 'conf/global'
    import PersonItem from './personItem'

    export default {
        props: {
            value: { // 已选择人员数组，[v-mode]
                type: Array,
                default: () => ([])
            },
            limit: {
                type: Number, // 限制可选人数
                default: 10
            },
            multiple: Boolean,
            persons: {
                type: Array,
                require: true,
                default: () => ([])
            }
        },
        computed: {
            selectIds () {
                return this.value.map(v => v.userId) || []
            },
            candidates () {
                const persons = this.persons
                const selection = this.value

                if (persons.length < 0 || selection.length < 0) {
                    persons.forEach(person => {
                        person.checked = false
                        person.avatar = person.avatar || ''
                    })

                    return persons
                }

                const selectIds = this.selectIds
                persons.forEach(person => {
                    let id = person.userId
                    person.checked = selectIds.indexOf(id) >= 0
                    person.avatar = person.avatar || ''
                })

                return persons
            }
        },
        methods: {
            triggerChange (newVal) {
                this.$emit('input', newVal)
            },
            remove (id) {
                const selection = this.value
                this.triggerChange(selection.filter(person => {
                    return person.userId !== id
                }))
            },
            add (person) {
                const selection = this.value
                const limit = this.limit
                if (selection.length >= limit) {
                    this.$emit('exceed')
                    return
                }

                person.checked = true
                selection.push(person)

                this.triggerChange(selection)
            },
            onClick (person) {
                if (person.invalid) {
                    return
                }

                if (this.multiple) {
                    let id = person.userId
                    let selected = this.selectIds.indexOf(id) >= 0
                    if (selected) {
                        person.checked = false
                        this.remove(id)
                    } else {
                        this.add(person)
                    }
                } else {
                    this.$emit('select', person)
                }
            },
            updateAvatar (plist) {
                // 设置头像
                const cachedMap = {}
                const ids = []

                plist.forEach(person => {
                    const id = person.userId
                    ids.push(id)
                    cachedMap[id] = person
                })

                getUserAvatars(ids).then(data => {
                    for (let key in data) {
                        cachedMap[key] && (cachedMap[key].avatar = data[key])
                    }
                }).catch(e => {
                    toast(e.message)
                })
            },
            clsPerson (person) {
                const currentUser = getConf().user
                let invalid = person.userId === currentUser.studentNo
                person.invalid = invalid

                return {
                    'checked': person.checked,
                    'invalid': invalid
                }
            }
        },
        watch: {
            persons (plist) {
                this.updateAvatar(plist)
            }
        },
        mounted () {
            this.updateAvatar(this.persons)
        },
        components: {PersonItem}
    }
</script>

<style scoped lang="less">
    @import '../../statics/style/common.less';

    .person-list {
        padding: 0 1.0rem;
        transform: translateZ(0);
    }

    .item {
        .thin-line-bottom(#eee);

        &.invalid {
            opacity: 0.5;
        }
    }
</style>
