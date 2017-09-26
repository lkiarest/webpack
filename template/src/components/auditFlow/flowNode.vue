<template>
    <div class='flow-node' :class='iconCls'>
        <div class="section datetime">
            <div class="time">{{dt[0]}}</div>
            <div class="date">{{dt[1]}}</div>
        </div>
        <div class="section icon"></div>
        <div class="section desc">
            <div class="status">{{value.statusText}}</div>
            <div v-if='value.comment' class="reason">{{value.comment}}</div>
            <div class="name">{{value.name}}</div>
            <div class="depart">{{value.dept}}</div>
        </div>
    </div>
</template>

<script>
    const FORMAT_TODAY = 'YYYYMMDD'

    export default {
        props: {
            value: {
                type: Object,
                required: true
            }
        },
        computed: {
            dt () {
                let datetime = this.value.datetime
                if (!datetime) {
                    return ['', '']
                }

                const m = moment(datetime)

                // 今天
                if (m.format(FORMAT_TODAY) === moment().format(FORMAT_TODAY)) {
                    datetime = m.format('HH:mm [今天]')
                } else if (m.year() === moment().year()) {
                    datetime = m.format('HH:mm M[月]d[日]')
                } else {
                    datetime = m.format('HH:mm YYYY-M-d')
                }

                return datetime.split(' ')
            },
            iconCls () {
                let status = this.value.status.toLowerCase()
                return {[status]: true}
            }
        }
    }
</script>

<style scoped lang="less">
    .innerIcon (@iconCode) {
        text-align: center;

        &:after {
            font-family: iconMobile;
            content: @iconCode;
            font-size: 0.7rem;
            color: #fff;
            line-height: 1.3rem;
        }
    }

    .flow-node {
        transform: translateZ(0);
    }

    .section {
        display: inline-block;
        vertical-align: top;
    }

    .datetime {
        width: 3.0rem;
        margin-top: -0.2rem;
        font-size: 0.6rem;
        line-height: 0.8rem;
        text-align: right;
        color: #1E2329;
    }

    .icon {
        width: 1.3rem;
        height: 1.3rem;
        margin: 0 0.5rem 0 0.8rem;
        border-radius: 50%;
        background-color: #eee;
    }

    .desc {
        max-width: e("calc(100% - 132px)");

        .status {
            font-family: PingFangSC-Medium;
            font-size: 0.85rem;
            color: #1E2329;
            margin-bottom: 0.3rem;
        }

        .reason {
            font-size: 0.7rem;
            color: #1E2329;
            line-height: 0.9rem;
            margin-bottom: 0.3rem;
        }

        .name {
            font-family: PingFangSC-Medium;
            font-size: 0.6rem;
            color: #999;
            line-height: 0.75rem;
        }

        .depart {
            font-size: 0.6rem;
            color: #999;
            line-height: 0.75rem;
        }
    }

    .submit {
        margin-top: 1.95rem;

        .datetime, .status, .name, .depart {
            color: #ccc;
        }

        .icon {
            background-color: #52C7CA;
            .innerIcon('\e610')
        }
    }

    .pass {
        .icon {
            background-color: #52C7CA;
            .innerIcon('\e610')
        }
    }

    .waiting {
        .icon {
            background-color: #FFBC1A;
            .innerIcon('\e610')
        }
    }

    .refuse {
        .icon {
            background-color: #FF4D4D;
            .innerIcon('\e610')
        }
    }
</style>
