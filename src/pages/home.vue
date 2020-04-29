<template>
    <!-- 
        home页面固定布局,头，底部固定，中间的随hash变化而变化。
        相似的页面都先定义一个主页面，固定主布局，变化的地方有router-view控制
    -->
    <div>
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader.vue'
    import NavFooter from '../components/NavFooter.vue'

    export default {
        data() {
            return {}
        },
        components: {
            NavHeader,
            NavFooter
        }
    }
</script>

<style scoped>
</style>
