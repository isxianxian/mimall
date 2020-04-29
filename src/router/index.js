import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import { getCart } from '@/api/api.js'
import store from '@/store'


Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: Home,
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    component: Index
                },
                {
                    path: 'product/:id',
                    component: () => import('../pages/product.vue')
                },
                {
                    path: 'detail/:id',
                    component: () => import('../pages/detail.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/login.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../pages/cart.vue')
        },
        {
            path: '/order',
            name: 'order',
            redirect: '/order/list',
            component: () => import('../pages/orderIndex.vue'),
            children: [
                {
                    path: 'list',
                    name: 'order-list',
                    component: () => import('../pages/orderList.vue')
                },
                {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: () => import('../pages/orderConfrim')
                },
                {
                    path: 'pay',
                    name: 'order-pay',
                    component: () => import('../pages/orderPay.vue')
                },
                {
                    path: 'alipay',
                    name: 'alipay',
                    component: () => import('../pages/aliPay')
                }
            ]
        }
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/index' && from.path == '/login') {
        getCart().then(res => {
            store.commit('setCartCount', res.cartTotalQuantity);
        })
    }
    next();
})

export default router;