<template>
    <div class="ali-pay">
        <loading></loading>
        <div class="form" v-html="content"></div>
    </div>
</template>

<script>
    import { orderPay } from '@/api/api.js'
    import Loading from 'coms/Loading.vue'
    let timeId = null
    export default {
        data() {
            return {
                orderId: this.$route.query.orderId,
                content: ''
            }
        },
        methods: {
            orderPay() {
                orderPay({
                    orderId: this.orderId,
                    orderName: 'xiaomi',
                    amount: 0.01,
                    payType: 1
                }).then(res => {
                    this.content = res.content
                    timeId = setTimeout(() => {
                        document.forms[0].submit()
                    })
                })
            }
        },
        mounted() {
            this.orderPay()
        },
        components: {
            Loading
        }
    }
</script>

<style scoped>
</style>
