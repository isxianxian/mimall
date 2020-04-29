<template>
    <div class="detail">
        <pro-param :name="proMes.name"></pro-param>
        <div class="detail-wrapper container">
            <div class="detail-img">
                <swiper :options="swiperOption">
                    <swiper-slide>
                        <img src="/imgs/detail/phone-1.jpg" alt />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="/imgs/detail/phone-2.jpg" alt />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="/imgs/detail/phone-3.jpg" alt />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="/imgs/detail/phone-4.jpg" alt />
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="detail-info">
                <div class="item-des">
                    <h2>{{proMes.name}}</h2>
                    <p class="item-spe">
                        相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
                        外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
                    </p>
                    <p class="store">小米自营</p>
                    <p class="unit-price">
                        {{proMes.price}}元
                        <del>2999元</del>
                    </p>
                </div>
                <div class="item-addr">
                    <span class="icon"></span>
                    <p class="addr">北京 北京市 朝阳区 安定门街道</p>
                    <div class="stock">有现货</div>
                </div>
                <div class="item-version">
                    <h4>选择版本</h4>
                    <div class="btn-list">
                        <button
                            class="btn"
                            :class="{'active':version==1}"
                            @click="version=1"
                        >6GB+64GB 全网通</button>
                        <button
                            class="btn"
                            :class="{'active':version==2}"
                            @click="version=2"
                        >4GB+64GB 移动4G</button>
                    </div>
                </div>
                <div class="item-color">
                    <h4>选择颜色</h4>
                    <button class="btn">
                        <span class="color"></span> 深灰色
                    </button>
                </div>
                <div class="item-total">
                    <div class="total-info">
                        <span>{{proMes.name}} {{version==1?'6GB+64GB 全网通':'4GB+64GB 移动4G'}}</span>
                        <span>{{proMes.price}}元</span>
                    </div>
                    <div class="total-price">总计：{{proMes.price}}元</div>
                </div>
                <button class="btn item-add" @click="addToCart">加入购物车</button>
            </div>
        </div>
        <div class="price-info">
            <div class="container">
                <h2>价格说明</h2>
                <div class="des">
                    <img src="/imgs/detail/item-price.jpeg" />
                </div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>

<script>
    import ProParam from 'coms/ProParam.vue'
    import ServiceBar from 'coms/ServiceBar.vue'
    import { getProDetail, addToCart } from '@/api/api.js'
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    export default {
        data() {
            return {
                proId: '',
                proMes: {},
                version: 1,
                swiperOption: {
                    autoplay: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        },
        methods: {
            getProDetail() {
                getProDetail(this.proId).then(res => {
                    this.proMes = res
                })
            },
            addToCart() {
                addToCart({ productId: this.proId, selected: true }).then(res => {
                    this.$store.commit('setCartCount', res.cartTotalQuantity || 0)
                    this.$router.push('/cart')
                })
            }
        },
        mounted() {
            this.proId = this.$route.params.id
            this.getProDetail()
        },
        components: {
            ProParam,
            ServiceBar,
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        }
    }
</script>

<style lang="scss" scoped>
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';
    .detail {
        .detail-wrapper {
            @include flex(flex-start, flex-start);
            .detail-img {
                width: 642px;
                height: 612px;
                padding-top: 5px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .detail-info {
                width: 584px;
                .item-des {
                    border-bottom: 1px solid $colorF;
                    h2 {
                        font-size: $fontC;
                        padding-top: 30px;
                    }
                    .item-spe {
                        font-size: $fontJ;
                        margin: 12px 0 24px;
                    }
                    .store {
                        color: $colorA;
                        font-size: $fontI;
                    }
                    .unit-price {
                        font-size: $fontG;
                        color: $colorA;
                        margin: 14px 0 25px;
                        del {
                            font-size: $fontI;
                            color: $colorE;
                        }
                    }
                }
                .item-addr {
                    height: 108px;
                    background-color: #fafafa;
                    border: 1px solid $colorF;
                    padding: 31px 0 0 64px;
                    box-sizing: border-box;
                    margin: 28px 0 30px;
                    position: relative;
                    font-size: $fontJ;
                    color: $colorC;
                    .icon {
                        @include position(absolute, 27px, 34px, 20px, 20px);
                    }
                    .stock {
                        color: $colorA;
                        margin-top: 5px;
                    }
                }
                .item-version,
                .item-color {
                    margin-bottom: 30px;
                    h4 {
                        font-size: $fontH;
                        margin-bottom: 20px;
                    }
                    .btn-list {
                        @include flex(space-between);
                    }
                    .btn {
                        width: 285px;
                        height: 50px;
                        line-height: 50px;
                        background-color: #ffffff;
                        color: #000000;
                        border: 1px solid $colorF;
                        font-size: $fontI;
                        &.active {
                            border-color: $colorA;
                            color: $colorA;
                        }
                    }
                }
                .item-color {
                    .color {
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        background-color: $colorD;
                        margin-right: 5px;
                    }
                }
                .item-total {
                    padding: 24px 33px 20px 30px;
                    margin: 10px 0 20px;
                    background-color: #fafafa;
                    .total-info {
                        @include flex(space-between);
                        font-size: $fontJ;
                        margin-bottom: 15px;
                    }
                    .total-price {
                        font-size: $fontE;
                        color: $colorA;
                    }
                }
                .item-add {
                    width: 300px;
                    height: 54px;
                    line-height: 54px;
                    font-size: $fontJ;
                    margin-bottom: 30px;
                }
            }
        }
        .price-info {
            background-color: #f3f3f3;
            height: 340px;
            padding: 38px;
            box-sizing: border-box;
            h2 {
                font-size: $fontE;
                color: $colorB;
                margin-bottom: 30px;
            }
            .des {
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
