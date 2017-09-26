<template>
    <div class='person_list'>
        <div v-for='(person, index) in value' class="person" @click.stop='viewPerson(person)'>
            <div class="avatar" :style='personStyle(person)'></div>
            <div class="name">\{{person.userName}}</div>
            <div v-if='!readonly' class="icon-del" @click.stop='remove(index)'></div>
        </div>
        <div v-if='canAdd && !readonly' class="person add" @click='toAdd'>
            <div class="add_bg">
                <i class='iconMobile icon-add'></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {openPersonalHome} from 'utils/sdk'

    const DEFAULT_ICON = '../statics/imgs/icon/avatar@2x.png'

    export default {
        props: {
            value: {
                type: Array,
                default: () => []
            },
            limit: {
                type: Number,
                default: 10
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            canAdd () {
                return this.value.length < this.limit
            }
        },
        watch: {
            value (val) {
                this.$emit('input', val)
            }
        },
        methods: {
            personStyle (person) {
                let icon = person.avatar || DEFAULT_ICON
                return {
                    'background-image': `url(${icon}`
                }
            },
            remove (index) {
                this.value.splice(index, 1)
            },
            toAdd () {
                this.$emit('toadd')
            },
            viewPerson (person) {
                openPersonalHome(person.userId)
            }
        }
    }
</script>

<style scoped lang="less">
    @size: 2.4rem;

    .person_list {
        transform: translateZ(0);
    }

    .person {
        width: @size;
        margin: 0 0.6rem 0.6rem 0.6rem;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        position: relative;

        .avatar {
            width: 100%;
            height: @size;
            border-radius: @size / 2;
            background-color: #eee;
            background-size: cover;
            background-position: center;
        }

        .name {
            margin-top: 0.1rem;
            font-size: 12px;
            color: #333333;
        }

        .icon-del {
            position: absolute;
            width: 1.0rem;
            height: 1.0rem;
            top: -0.25rem;
            right: -0.25rem;
            border: 1px solid #FFFFFF;
            border-radius: 50%;
            color: #fff;
            background: #FF4D4D;
            line-height: 0.9rem;
            font-weight: bold;
            box-sizing: border-box;

            &:after {
                content: '';
                width: 0.4rem;
                height: 0.1rem;
                background-color: #fff;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        &.add {
            .add_bg {
                width: 100%;
                height: @size;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: @size / 2;
                background-color: #d8d8d8;
            }

            i {
                color: #fff;
                font-size: 0.9rem;
            }
        }
    }
</style>
