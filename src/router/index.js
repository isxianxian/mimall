import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import Product from '../pages/product.vue'
import Detail from '../pages/detail.vue'
import Login from '../pages/login.vue'
import Cart from '../pages/cart.vue'
import OrderIndex from '../pages/orderIndex.vue'
import OrderList from '../pages/orderList.vue'
import OrderPay from '../pages/orderPay.vue'
import OrderConfrim from '../pages/orderConfrim.vue'
import Alipay from '../pages/aliPay.vue'

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
                    component: Product
                },
                {
                    path: 'detail/:id',
                    component: Detail
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/order',
            name: 'order',
            redirect: '/order/list',
            component: OrderIndex,
            children: [
                {
                    path: 'list',
                    name: 'order-list',
                    component: OrderList
                },
                {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: OrderConfrim
                },
                {
                    path: 'pay',
                    name: 'order-pay',
                    component: OrderPay
                },
                {
                    path: 'alipay',
                    name: 'alipay',
                    component: Alipay
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