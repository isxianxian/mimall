<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <!-- javascript:; a链接点击页面不会刷新 -->
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="#/order/list" v-if="username">我的订单</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a
                        href="javascript:;"
                        v-if="!username"
                        @click="$router.push('/login')"
                    >登陆</a>
                    <a class="my-cart" href="/#/cart">
                        <span class="icon icon-cart"></span>
                        购物车({{cartCount}})
                    </a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <!-- 下拉菜单   -->
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href target="_blank">
                                        <img
                                            class="pro-img"
                                            src="/imgs/nav-img/nav-1.png"
                                            alt
                                        />
                                        <div class="pro-name">小米C9</div>
                                        <div class="pro-price">￥1700</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href target="_blank">
                                        <img
                                            class="pro-img"
                                            src="/imgs/nav-img/nav-1.png"
                                            alt
                                        />
                                        <div class="pro-name">小米C9</div>
                                        <div class="pro-price">￥1700</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href target="_blank">
                                        <img
                                            class="pro-img"
                                            src="/imgs/nav-img/nav-1.png"
                                            alt
                                        />
                                        <div class="pro-name">小米C9</div>
                                        <div class="pro-price">￥1700</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href target="_blank">
                                        <img
                                            class="pro-img"
                                            src="/imgs/nav-img/nav-1.png"
                                            alt
                                        />
                                        <div class="pro-name">小米C9</div>
                                        <div class="pro-price">￥1700</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href target="_blank">
                                        <img
                                            class="pro-img"
                                            src="/imgs/nav-img/nav-1.png"
                                            alt
                                        />
                                        <div class="pro-name">小米C9</div>
                                        <div class="pro-price">￥1700</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href target="_blank">
                                        <img
                                            class="pro-img"
                                            src="/imgs/nav-img/nav-1.png"
                                            alt
                                        />
                                        <div class="pro-name">小米C9</div>
                                        <div class="pro-price">￥1700</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children">红米手机</div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">电视</div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wapper">
                        <input type="text" name="keyword" />
                        <span class="icon"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { logout, getCart } from '@/api/api.js'
    export default {
        data() {
            return {}
        },
        methods: {
            logout() {
                logout().then(res => {
                    this.$message.success('退出成功！')
                    this.$cookie.set('userId', '', { expires: -1 })
                    // { expires: -1 } 立即过期，浏览器立即删除
                    this.$store.commit('setUserName', '')
                    this.$store.commit('setCartCount', 0)
                })
            }
        },
        mounted() {
            // let { query } = this.$route
            // if (query && query.from == 'login') {
            //     getCart().then(res => {
            //         this.$store.commit('setCartCount', res.cartTotalQuantity)
            //     })
            // }
        },
        computed: {
            username() {
                return this.$store.state.username
            },
            cartCount() {
                return this.$store.state.cartCount
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';
    @import 'scss/base.scss';

    .header {
        .nav-topbar {
            height: 39px;
            line-height: 39px;
            background-color: #333333;
            color: #b0b0b0;
            .container {
                @include flex();
                a {
                    display: inline-block;
                    color: #b0b0b0;
                    margin-right: 17px;
                    &.my-cart {
                        width: 110px;
                        background-color: #666666;
                        text-align: center;
                        background-color: #ff6600;
                        color: #ffffff;
                        .icon {
                            display: inline-block;
                            background-color: red;
                            margin-right: 4px;
                            width: 16px;
                            height: 12px;
                        }
                    }
                }
            }
        }
        .nav-header {
            .container {
                height: 112px;
                position: relative;
                @include flex();
                .header-logo {
                    display: inline-block;
                    width: 55px;
                    height: 55px;
                    background-color: $colorA;
                    overflow: hidden;
                    a {
                        display: inline-block;
                        width: 110px;
                        height: 55px;
                        &::before {
                            content: '';
                            @include bgImg(
                                55px,
                                55px,
                                '/imgs/mi-logo.png',
                                100% 100%
                            );
                            transition: all 0.2s;
                        }
                        &::after {
                            content: '';
                            @include bgImg(
                                55px,
                                55px,
                                '/imgs/mi-home.png',
                                100% 100%
                            );
                        }
                        &:hover::before {
                            margin-left: -55px;
                        }
                    }
                }
                .header-menu {
                    margin-left: -67px;
                    .item-menu {
                        display: inline-block;
                        color: $colorB;
                        font-size: $fontI;
                        font-weight: 700;
                        line-height: 112px;
                        margin-right: 20px;
                        span {
                            cursor: pointer;
                            margin-right: 20px;
                        }
                        .children {
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            opacity: 0;
                            overflow: hidden;
                            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                            background-color: #ffffff;
                            transition: all 0.5s;
                            ul {
                                @include flex(flex-start, center);
                                text-align: center;
                                line-height: 12px;
                                font-size: 12px;
                                font-weight: bold;
                                li {
                                    flex: 1;
                                    position: relative;
                                    &::after {
                                        position: absolute;
                                        top: 28px;
                                        right: 0;
                                        display: block;
                                        content: '';
                                        width: 0;
                                        height: 100px;
                                        border-right: 1px solid $colorF;
                                    }
                                    &:nth-last-child(1)::after {
                                        border: none;
                                    }
                                }
                                a {
                                    display: block;
                                    padding-top: 26px;
                                    .pro-img {
                                        height: 117px;
                                    }
                                    .pro-name {
                                        margin: 19px 0 8px;
                                        color: $colorB;
                                    }
                                    .pro-price {
                                        color: $colorA;
                                    }
                                }
                            }
                        }
                        &:hover {
                            color: $colorA;
                            .children {
                                height: 220px;
                                opacity: 1;
                                border-top: 1px solid #e5e5e5;
                                z-index: 2;
                            }
                        }
                    }
                }
                .header-search {
                    width: 319px;
                    .wapper {
                        height: 50px;
                        border: 1px solid #e0e0e0;
                        @include flex(flex-start, center);
                        input {
                            border: none;
                            outline: none;
                            border-right: 1px solid #e0e0e0;
                            width: 264px;
                            // 文本框有默认高度
                            height: 50px;
                            padding-left: 14px;
                            box-sizing: border-box;
                        }
                        span {
                            width: 18px;
                            height: 18px;
                            margin: 0 auto;
                        }
                    }
                }
            }
        }
    }
</style>
