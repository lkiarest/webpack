<template>
    <div class='audit-flow'>
        <div class='title'>
            审批进度
        </div>
        <div class='line'></div>
        <flow-node v-for='auditInfo in auditList' :key='auditInfo.status' :value='auditInfo'></flow-node>
    </div>
</template>

<script>
    import FlowNode from './flowNode'

    export default {
        props: {
            auditList: {
                type: Array,
                default: () => []
            }
        },
        components: {FlowNode}
    }
</script>

<style scoped lang="less">
    @import '../../statics/style/common.less';

    .audit-flow {
        padding-bottom: 1.1rem;
        position: relative;
    }

    .line {
        position: absolute;
        width: 0.05rem;
        left: 5.65rem;
        top: 4.2rem;
        bottom: 3.0rem;
        background-color: #e8e8e8;
    }

    .title {
        font-size: 0.85rem;
        color: #333;
        line-height: 1.0rem;
        padding: 0.7rem 0;
        margin-bottom: 1.0rem;
        .thin-line-bottom(#e8e8e8);
    }
</style>
