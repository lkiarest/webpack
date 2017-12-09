<template>
    <div class='btn-bottom' :class='btnCls' @click='onClick'>
        <div class='btn-bottom__inner'><slot></slot></div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: {
            name: String,
            small: Boolean,
            disabled: Boolean
        },
        computed: {
            btnCls () {
                return {
                    'btn-bottom-small': this.small,
                    'btn-bottom-disabled': this.disabled
                }
            }
        },
        methods: {
            onClick () {
                if (this.disabled) {
                    return
                }

                this.$emit('click')
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/style/color.less";

    .btn-bottom {
        position: fixed;;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        transform: translateZ(0);
    }

    .btn-bottom__inner {
        width: 100%;
        height: 100%;
        line-height: 2.25rem;
        text-align: center;
        color: #fff;
        background-color: @blue;

        &:active, &:focus {
            background-color: darken(@blue, 10%)
        }
    }

    .btn-bottom-small {
        padding: 0.3rem 0.5rem;

        .btn-bottom__inner {
            line-height: 1.8rem;
            border-radius: 0.2rem;
        }
    }

    .btn-bottom-disabled {
        .btn-bottom__inner {
            background-color: @grey-lv4;
        }
    }
</style>
