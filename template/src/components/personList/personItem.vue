<template>
    <div class='person-item'>
        <div v-if='checkable' class="icon-check"></div>
        <div class="avatar" :style="styleAv"></div>
        <div class="content">
            <div class="content__name">\{{userInfo.userName}}</div>
            <div v-if='userInfo.deptName' class="content__dept">\{{userInfo.deptName}}</div>
        </div>
    </div>
</template>

<script>
    const DEFAULT_ICON = '../statics/imgs/icon/avatar@2x.png'

    export default {
        props: {
            checkable: Boolean, // 是否允许选择
            userInfo: {
                type: Object,
                required: true
            }
        },
        computed: {
            styleAv () {
                // alert(this.userInfo.avatar)
                let icon = this.userInfo.avatar || DEFAULT_ICON
                return {
                    'background-image': `url(${icon})`
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .person-item {
        padding: 0.7rem 0;
        display: flex;
        align-items: center;
        overflow: hidden;

        .icon-check {
            width: 1.3rem;
            height: 1.3rem;
            line-height: 1.3rem;
            color: #fff;
            margin-right: 0.8rem;
            border: 1px solid #ccc;
            border-radius: 50%;
            text-align: center;
            flex-shrink: 0;
        }

        .avatar {
            width: 2.4rem;
            height: 2.4rem;
            margin-right: 0.5rem;
            background-color: #eee;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            flex-shrink: 0;
        }

        .content {
            flex: 1;
        }

        .content__name {
            font-size: 0.8rem;
            color: #333;
            line-height: 1.0rem;
        }

        .content__dept {
            margin-top: 0.5rem;
            font-size: 0.7rem;
            color: #999;
            line-height: 0.9rem;
            max-width: e("calc(100vw - 7.2rem)");
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.checked {
            .icon-check {
                border-color: transparent;
                background-color: #52C7CA;

                &:after {
                    font-family: iconMobile;
                    content: '\e610';
                }
            }
        }
    }
</style>
