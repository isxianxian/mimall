<template>
    <div class="index">
        <div>
            <div class="swiper-container">
                <div class="container">
                    <div class="nav-menu">
                        <ul class="menu-wrap">
                            <li class="menu-item">
                                <a href="javascript:;">手机 电话卡</a>
                                <div class="children-box">
                                    <div class="children">
                                        <ul
                                            v-for="(menuItem,menuIndex) in menuList"
                                            :key="menuIndex"
                                        >
                                            <li
                                                v-for="(item,index) in menuItem"
                                                :key="index"
                                            >
                                                <a
                                                    :href="`/#/product/${item.id}`"
                                                >
                                                    <!-- item.id -->
                                                    <img :src="item.img" alt />
                                                    {{item.name}} {{item.id}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">电视 盒子</a>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">笔记本 平板</a>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">家电 插电板</a>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">出行 穿戴</a>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">智能 路由器</a>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">电源 配件</a>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">生活 箱包</a>
                            </li>
                        </ul>
                    </div>
                    <swiper
                        class="swiper-wrapper"
                        ref="mySwiper"
                        :options="swiperOptions"
                    >
                        <swiper-slide
                            v-for="(item,index) in slideList"
                            :key="index"
                        >
                            <a :href="`/#/product/${item.id}`">
                                <img :src="item.img" />
                            </a>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                    <div class="swiper-button-prev swiper-button-white"></div>
                    <div class="swiper-button-next swiper-button-white"></div>
                </div>
            </div>
            <div class="ads-box">
                <div class="container">
                    <a v-for="(item,index) in adsList" :key="index">
                        <!-- item.id -->
                        <img v-lazy="item.img" alt />
                    </a>
                </div>
            </div>
            <div class="banner">
                <div class="container">
                    <a href="/#/product/30">
                        <img src="/imgs/banner-1.png" alt />
                    </a>
                </div>
            </div>
            <div class="product-box">
                <div class="container">
                    <h2>手机</h2>
                    <div class="wrapper">
                        <div class="prod-left">
                            <a href="/#/product/35">
                                <img src="/imgs/mix-alpha.jpg" alt />
                            </a>
                        </div>
                        <div class="prod-list">
                            <div
                                class="list"
                                v-for="(phoItem , phoIndex) in phoneList"
                                :key="phoIndex"
                            >
                                <a
                                    :href="`/#/product/${item.id}`"
                                    class="item"
                                    v-for="(item,index) in phoItem"
                                    :key="index"
                                >
                                    <span
                                        :class="['tip',{'new':item.status}]"
                                    >{{item.status?'新品':''}}</span>
                                    <img v-lazy="item.mainImage" alt />
                                    <h3 class="name">{{item.name}}</h3>
                                    <p class="des">{{item.subtitle}}</p>
                                    <p class="price">
                                        ￥{{item.price}}元
                                        <span
                                            class="icon"
                                            @click.prevent="addCart(item.id)"
                                        ></span>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <Modal
            title="提示"
            sureText="查看购物车"
            btnType="1"
            modalType="middle"
            :showModal="showModal"
            @close="closeModal"
            @submit="goToCart"
            @cancel="closeModal"
        >
            <template v-slot:body>
                <p>商品添加成功</p>
            </template>
        </Modal>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import { getPros, addToCart } from '@/api/api.js'
    import ServiceBar from 'coms/ServiceBar.vue'
    import Modal from 'coms/Modal.vue'

    export default {
        data() {
            return {
                swiperOptions: {
                    effect: 'cube',
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                slideList: [
                    {
                        id: '42',
                        img: '/imgs/slider/slide-1.jpg'
                    },
                    {
                        id: '45',
                        img: '/imgs/slider/slide-2.jpg'
                    },
                    {
                        id: '46',
                        img: '/imgs/slider/slide-3.jpg'
                    },
                    {
                        id: '42',
                        img: '/imgs/slider/slide-4.jpg'
                    },
                    {
                        id: '42',
                        img: '/imgs/slider/slide-5.jpg'
                    },
                    {
                        id: '42',
                        img: '/imgs/slider/slide-1.jpg'
                    },
                    {
                        id: '45',
                        img: '/imgs/slider/slide-2.jpg'
                    }
                ],
                menuList: [
                    [
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        },
                        {
                            id: '32',
                            img: '/imgs/item-box-3.jpg',
                            name: 'Redmi K20 Pro'
                        },
                        {
                            id: '33',
                            img: '/imgs/item-box-1.png',
                            name: '移动4G专区'
                        },
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        }
                    ],
                    [
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        },
                        {
                            id: '32',
                            img: '/imgs/item-box-3.jpg',
                            name: 'Redmi K20 Pro'
                        },
                        {
                            id: '33',
                            img: '/imgs/item-box-1.png',
                            name: '移动4G专区'
                        },
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        }
                    ],
                    [
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        },
                        {
                            id: '32',
                            img: '/imgs/item-box-3.jpg',
                            name: 'Redmi K20 Pro'
                        },
                        {
                            id: '33',
                            img: '/imgs/item-box-1.png',
                            name: '移动4G专区'
                        },
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        }
                    ],
                    [
                        {
                            id: '30',
                            img: '/imgs/item-box-1.png',
                            name: '小米CC9'
                        },
                        {
                            id: '31',
                            img: '/imgs/item-box-2.png',
                            name: '小米8青春版'
                        },
                        {
                            id: '32',
                            img: '/imgs/item-box-3.jpg',
                            name: 'Redmi K20 Pro'
                        }
                    ]
                ],
                adsList: [
                    {
                        id: 33,
                        img: '/imgs/ads/ads-1.png'
                    },
                    {
                        id: 48,
                        img: '/imgs/ads/ads-2.jpg'
                    },
                    {
                        id: 45,
                        img: '/imgs/ads/ads-3.png'
                    },
                    {
                        id: 47,
                        img: '/imgs/ads/ads-4.jpg'
                    }
                ],
                phoneList: [],
                showModal: false
            }
        },
        methods: {
            init() {
                // 获取商品手机
                getPros({
                    categoryId: 100012,
                    pageSize: 14
                }).then(res => {
                    let list = res.list.slice(6, 14),
                        phoneList = []
                    phoneList[0] = list.slice(0, 4)
                    phoneList[1] = list.slice(4)
                    this.phoneList = phoneList
                })
            },
            closeModal() {
                this.showModal = false
            },
            addCart(proId) {
                addToCart({ productId: proId, selected: true }).then(res => {
                    this.showModal = true
                    this.$store.commit('setCartCount', res.cartTotalQuantity || 0)
                })
            },
            goToCart() {
                this.$router.push('/cart')
            }
        },
        components: {
            Swiper,
            SwiperSlide,
            ServiceBar,
            Modal
        },
        directives: {
            swiper: directive
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            // console.log('Current Swiper instance object', this.swiper)
            // this.swiper.slideTo(3, 1000, false)
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';
    // @import 'scss/base.scss';

    .index {
        background-color: $colorJ;
        .swiper-container {
            --swiper-navigation-size: 30px;
            background-color: #ffffff;
            .nav-menu {
                position: absolute;
                z-index: 3;
                width: 264px;
                height: 451px;
                padding-top: 26px;
                box-sizing: border-box;
                font-size: 14px;
                background-color: rgba(105, 101, 101, 0.6);
                .menu-item {
                    line-height: 50px;
                    & > a {
                        position: relative;
                        display: block;
                        padding: 0 0 0 30px;
                        color: #ffffff;
                        &::after {
                            content: '';
                            position: absolute;
                            right: 30px;
                            top: 17.5px;
                            @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
                        }
                    }
                    .children-box {
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 264px;
                        width: 962px;
                        height: 451px;
                        background-color: #ffffff;
                        .children {
                            width: 100%;
                            @include flex(flex-start, flex-start);
                            ul {
                                flex: 1;
                                a {
                                    display: block;
                                    line-height: 75px;
                                    color: $colorB;
                                    font-size: $fontJ;
                                    padding-left: 30px;
                                    img {
                                        width: 42px;
                                        height: 35px;
                                        margin-right: 15px;
                                        vertical-align: middle;
                                    }
                                    &:hover {
                                        color: $colorA;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        & > a {
                            color: #ffffff;
                            background-color: $colorA;
                        }
                        .children-box {
                            display: block;
                        }
                    }
                }
            }
            .swiper-wrapper {
                height: 451px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .swiper-button-prev {
                left: 274px;
            }
            .swiper-button-prev,
            .swiper-button-next {
                outline: none;
                z-index: 2;
            }
        }
        .ads-box {
            background-color: #ffffff;
            padding: 14px 0 31px;
            .container {
                @include flex(space-between, flex);
            }

            a {
                display: block;
                img {
                    width: 296px;
                    height: 167px;
                }
            }
        }
        .banner {
            padding-bottom: 50px;
            background-color: #ffffff;
            a {
                display: block;
                img {
                    width: 100%;
                }
            }
        }
        .product-box {
            margin-bottom: 50px;
            h2 {
                font-size: $fontF;
                font-weight: bold;
                color: $colorB;
                line-height: 60px;
            }
            .wrapper {
                height: 619px;
                @include flex(flex-start, stretch);
                .prod-left {
                    width: 224px;
                    margin-right: 16px;
                    a {
                        display: block;
                        img {
                            width: 224px;
                            height: 619px;
                        }
                    }
                }
                .prod-list {
                    flex: 1;
                    @include flex(space-between, stretch);
                    flex-direction: column;
                    .list {
                        @include flex(space-between, center);
                        .item {
                            height: 302px;
                            text-align: center;
                            background-color: #ffffff;
                            .tip {
                                display: block;
                                width: 67px;
                                line-height: 24px;
                                height: 24px;
                                font-size: $fontJ;
                                margin: 0 auto;
                                color: #ffffff;
                                background-color: #ffffff;
                                &.new {
                                    background-color: #7ecf68;
                                }
                            }
                            img {
                                width: 236px;
                                height: 195px;
                            }
                            .name {
                                color: $colorB;
                                font-size: $fontJ;
                                font-weight: bold;
                            }
                            .des {
                                color: $colorD;
                                font-size: $fontK;
                                line-height: 13px;
                                margin: 6px 0 12px;
                            }
                            .price {
                                color: $colorA;
                                font-size: $fontJ;
                                font-weight: bold;
                                .icon {
                                    width: 22px;
                                    height: 22px;
                                }
                            }
                        }
                    }
                }
                a {
                    display: block;
                    height: 100%;
                    transition: all 0.2s;
                    &:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
</style>
