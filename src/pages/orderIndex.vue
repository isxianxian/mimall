<template>
    <div>
        <router-view></router-view>
        <ServiceBar></ServiceBar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import ServiceBar from 'coms/ServiceBar.vue'
    import NavFooter from 'coms/NavFooter.vue'

    export default {
        data() {
            return {
                title: '',
                tip: ''
            }
        },
        mounted() {
            let path = this.$route.path
            if (path == '/order/confirm') {
                this.title = '订单确认'
                this.tip = '请认真填写收货地址'
            } else if (path == '/order/list') {
                this.title = '订单列表'
                this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>'
            } else if (path == '/order/pay') {
                this.title = '订单支付'
                this.tip = '请谨防钓鱼链接或诈骗电话，了解更多> '
            } else {
                this.title = '订单支付'
                this.tip = '请谨防钓鱼链接或诈骗电话，了解更多> '
            }
        },
        components: {
            NavFooter,
            ServiceBar
        }
    }
</script>

<style scoped>
</style>
