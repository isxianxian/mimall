<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { getUserMes, getCart } from './api/api.js'
    export default {
        name: 'App',
        components: {},
        mounted() {
            let hasCookie = this.$cookie.get('userId')
            hasCookie ? (this.getUserMes(), this.getCartCount()) : ''
        },
        methods: {
            getUserMes() {
                getUserMes().then(res => {
                    this.$store.commit('setUserName', res.username)
                })
            },
            getCartCount() {
                getCart().then(res => {
                    this.$store.commit('setCartCount', res.cartTotalQuantity)
                })
            },
            ...mapMutations(['setUserName', 'setCartCount'])
        }
    }
</script>

<style lang='scss'>
    @import './assets/scss/reset.scss';
    @import './assets/scss/base.scss';
</style>
