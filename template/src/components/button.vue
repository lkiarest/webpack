<template>
    <div class='btn' :type='type'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            type: String
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/style/color.less";

    .btn {
        border: none;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        color: #fff;
        background-color: @blue;
        cursor: pointer;
        user-select: none;
        text-align: center;

        &:active, &:focus {
            background-color: darken(@blue, 10%);
        }

        &[type=danger] {
            background-color: @danger-lv1;

            &:active, &:focus {
                background-color: darken(@danger-lv1, 10%);
            }
        }
    }
</style>
