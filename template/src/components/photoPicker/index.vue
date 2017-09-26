<template>
    <div>
        <div class='cell-photo choosen' v-for='(photo, index) in value'>
            <div class='cell-photo__img' :style='photoStyle(photo)' @click.stop='preview(index)'>
            </div>
            <div v-if='!readonly' class='del-bg' @click.stop='delImg(index, photo)'>
                <i class='del iconMobile icon-error'></i>
            </div>
        </div>
        <div v-if='canUpload && !readonly' class='cell-photo default' @click='selectPhoto'>
            <img src="./icon-photo.svg" class="cell-photo__icon"/>
            <div class='default-img__desc'>{{tip}}</div>
        </div>
    </div>
</template>

<script>
    import {showActions, takeCamera, takePhoto, previewImages} from 'utils/sdk'
    let apiBase = require('conf/global').get().apiBase
    apiBase = apiBase || (location.protocol + '//' + location.host)

    export default {
        data: () => ({
            // photos: [{base64: 'https://hapijs.com/public/img/logo.svg'}],
            actions: [{
                title: '拍照',
                action: 'takeCamera'
            }, {
                title: '从相册选择',
                action: 'takePhoto'
            }]
        }),
        props: {
            value: {
                type: Array,
                default: () => []
            },
            readonly: {
                type: Boolean,
                default: false
            },
            limit: {
                type: Number,
                default: 3
            }
        },
        computed: {
            canUpload () {
                let len = this.value.length
                return len < this.limit
            },
            tip () {
                let len = this.value.length
                if (len === 0) {
                    return '照片'
                } else {
                    let limit = this.limit
                    return `${len}/${limit}`
                }
            }
        },
        methods: {
            selectPhoto () {
                let self = this
                showActions('上传图片', self.actions.map(action => action.title), index => {
                    let actionName = self.actions[index].action
                    self[actionName]()
                })
            },
            takeCamera () {
                takeCamera(ret => {
                    this.value = this.value.concat(ret)
                    this.triggerSync()
                })
            },
            takePhoto () {
                let value = this.value

                takePhoto(ret => {
                    this.value = value.concat(ret)
                    this.triggerSync()
                }, this.limit - value.length)
            },
            delImg (index, photo) {
                this.value.splice(index, 1)
                this.$emit('del', photo)
                this.triggerSync()
            },
            photoStyle (photo) {
                let url = photo.base64 || `${apiBase}${photo.url}?type=m`

                return {
                    backgroundImage: `url(${url})`
                }
            },
            preview (index) {
                let urls = this.value.map(photo => {
                    return photo.base64 || `${apiBase}${photo.url}`
                })

                previewImages(urls, index)
            },
            triggerSync () {
                this.$emit('input', this.value)
            }
        }
    }
</script>

<style scoped lang="less">
    .cell-photo {
        font-size: 0;
        width: 4.0rem;
        height: 4.0rem;
        margin-right: 0.25rem;
        border-radius: 0.2rem;
        display: inline-block;
        float: left;

        img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
        }

        &.choosen {
            position: relative;
            overflow: hidden;

            .cell-photo__img {
                width: 4.0rem;
                height: 4.0rem;
                border-radius: 0.2rem;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }

            .del-bg {
                position: absolute;
                width: 2.0rem;
                height: 2.0rem;
                border-radius: 1.0rem;
                background-color: #666;
                top: -1rem;
                right: -1rem;
            }

            i.del {
                position: absolute;
                bottom: 5px;
                left: 7px;
                color: #fff;
                font-size: 0.5rem;
            }
        }

        &.default {
            color: #FFFFFF;
            background-color: #d8d8d8;
            text-align: center;

            img {
                margin-top: 0.8rem;
                width: 2.0rem;
                height: 1.7rem;
            }

            .default-img__desc {
                font-size: 11px;
                letter-spacing: 1px;
                line-height: 16px;
            }
        }
    }
</style>
