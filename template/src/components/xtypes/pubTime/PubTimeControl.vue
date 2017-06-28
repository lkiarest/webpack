<template>
    <div>
        <bh-radio :items='pubTypes' :value.sync='pubType' @change='typeChange'></bh-radio>
        <div class='bh-mt-4' v-show='showDate'>
            <bh-datetimepicker :options='dtoptions' :value.sync='dtval'></bh-datetimepicker>
        </div>
    </div>
</template>

<script>
    import BhRadio from 'bh-vue/dist/BhRadio'
    import BhDatetimepicker from 'bh-vue/dist/BhDatetimepicker'

    const PUB_TYPES = {
        NOW: 1,
        PLAN: 2
    }

    // 当天最近的一个整点
    const _planTime = () => {
        return moment().add(1, 'hour').format('YYYY-MM-DD HH') + ':00'
    }

    export default {
        data: () => ({
            pubType: PUB_TYPES.NOW,
            pubTypes: [{
                name: '立即发布',
                value: PUB_TYPES.NOW
            }, {
                name: '定时发布',
                value: PUB_TYPES.PLAN
            }],
            dtoptions: {
                // minDate: moment().format('YYYY-MM-DD'),
                format: 'yyyy-MM-dd HH:mm'
            },
            dtval: ''
        }),
        computed: {
            showDate () {
                return this.pubType === PUB_TYPES.PLAN
            }
        },
        methods: {
            getValue () {
                let showDate = this.showDate
                return {
                    publishNow: !showDate,
                    publishTime: showDate ? this.dtval : undefined
                }
            },
            setValue (val) {
                console.log('setTime: ', val)
                if (!val) {
                    return
                }

                this.pubType = val.publishNow ? PUB_TYPES.NOW : PUB_TYPES.PLAN
                this.dtval = val.publishTime
            },
            typeChange (newVal) {
                if (newVal === PUB_TYPES.PLAN) {
                    this.dtval = _planTime()
                }
            }
        },
        components: {BhRadio, BhDatetimepicker}
    }
</script>
