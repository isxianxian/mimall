<template>
    <div class="product">
        <div class="pro-params">
            <pro-param :name="proMes.name">
                <template v-slot:buy>
                    <button
                        class="btn"
                        @click="$router.push(`/detail/${proId}`)"
                    >立即购买</button>
                </template>
            </pro-param>
        </div>
        <div class="pro-resume">
            <h2>{{proMes.name}}</h2>
            <p class="resume-des">{{proMes.subtitle}}</p>
            <div class="resume-great">
                <span>全球首款双频 GP</span>
                <span class="line"></span>
                <span>骁龙845</span>
                <span class="line"></span>
                <span>AI 变焦双摄</span>
                <span class="line"></span>
                <span>红外人脸识别</span>
            </div>
            <p class="resume-price">
                ￥
                <span>{{proMes.price}}</span>
            </p>
        </div>
        <div class="pro-special container"></div>
        <div class="pro-img"></div>
        <div class="pro-swiper">
            <swiper :options="swiperOption">
                <swiper-slide>
                    <img src="/imgs/product/gallery-2.png" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-3.png" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-4.png" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-5.jpg" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-6.jpg" alt />
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="des">{{proMes.subtitle}}</div>
        </div>
        <div class="pro-video">
            <h2>60帧超慢动作摄影</h2>
            <h2>慢慢回味每一瞬间的精彩</h2>
            <p>
                后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
                <br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。
            </p>
            <div class="video-bg container" @click="slideClass='slideDown'"></div>
        </div>

        <!-- <div class="video-pla" @click="hide=false">视频占位</div> -->
        <div class="video-box" v-show="slideClass">
            <!-- muted 静音 -->
            <!-- transition动画 -->
            <!-- <div class="overlay" v-show="!hide"></div>
            <div class="video" :class="{'hide':hide}">
                <a href="javascript:;" class="close" @click="hide=true">X</a>
                <video src="/imgs/product/video.mp4" muted autoplay controls></video>
            </div>-->
            <!-- animation动画 -->
            <div class="overlay"></div>
            <div class="video" :class="slideClass">
                <a href="javascript:;" class="close" @click="stopPlay">X</a>
                <video src="/imgs/product/video.mp4" muted autoplay controls></video>
            </div>
        </div>
    </div>
</template>


<script>
    import ProParam from 'coms/ProParam.vue'
    import { getProDetail } from '@/api/api.js'
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    let timeId = null

    export default {
        data() {
            return {
                proId: '',
                hide: true,
                slideClass: '',
                swiperOption: {
                    autoplay: false,
                    slidesPerView: 3,
                    spaceBetween: 30,
                    freeMode: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                proMes: {}
            }
        },
        methods: {
            getProDetail() {
                getProDetail(this.proId).then(res => {
                    this.proMes = res
                })
            },
            stopPlay() {
                this.slideClass = 'slideUp'
                timeId = setTimeout(() => {
                    this.slideClass = ''
                    timeId = null
                }, 1000)
            }
        },
        mounted() {
            this.proId = this.$route.params.id
            this.getProDetail()
        },
        components: {
            ProParam,
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        }
    }
</script>


<style lang="scss" scoped>
    @import 'scss/mixins.scss';
    @import 'scss/config.scss';

    .product {
        .pro-params {
            height: 70px;
            button {
                margin-left: 10px;
            }
        }
        .pro-resume {
            height: 718px;
            text-align: center;
            background: url('/imgs/product/product-bg-1.png') no-repeat center;
            h2 {
                font-size: $fontA;
                padding-top: 55px;
            }
            .resume-des {
                font-size: $fontE;
                letter-spacing: 10px;
                font-weight: bold;
            }
            .resume-great {
                margin: 21px auto 40px;
                font-size: $fontI;
                span {
                    vertical-align: middle;
                }
                .line {
                    font-size: $fontK;
                    margin: 0 10px;
                }
            }
            .resume-price {
                font-size: 30px;
                span {
                    font-size: $fontB;
                }
            }
        }
        .pro-special {
            height: 480px;
            background: url('/imgs/product/product-bg-2.png') no-repeat center;
            background-size: 100%;
        }
        .pro-img {
            height: 638px;
            background: url('/imgs/product/product-bg-3.png') no-repeat center;
            background-size: cover;
        }
        .pro-swiper {
            margin: 36 0 52px;
            img {
                width: 100%;
            }
            .des {
                font-size: $fontH;
                color: $colorB;
                text-align: center;
            }
        }
        .pro-video {
            height: 1044px;
            padding-top: 48px;
            margin: 40px 0 76px;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            h2 {
                font-size: 60px;
            }
            p {
                font-size: $fontE;
                margin: 47px 0 58px;
            }
            .video-bg {
                height: 540px;
                background: url('/imgs/product/gallery-1.png') no-repeat center;
                background-size: contain;
                cursor: pointer;
            }
        }
        .video-box {
            .overlay {
                @include position(fixed, 0, 0, 100%, 100%);
                z-index: 2;
                background-color: $colorB;
                opacity: 0.4;
            }

            .video {
                @include position(fixed, -50%, 50%, 1000px, 536px);
                z-index: 2;
                opacity: 0;
                transform: translate(-50%, -50%);
                transition: all 0.6s;
                // &.hide {
                //     top: -50%;
                //     opacity: 0;
                // }

                &.slideDown {
                    animation: slideDown 0.6s linear 0s 1 normal both;
                }
                &.slideUp {
                    animation: slideUp 0.6s linear 0s 1 normal both;
                }
                @keyframes slideDown {
                    from {
                        top: -50%;
                        opacity: 0;
                    }
                    to {
                        top: 50%;
                        opacity: 1;
                    }
                }
                @keyframes slideUp {
                    from {
                        top: 50%;
                        opacity: 1;
                    }
                    to {
                        top: -50%;
                        opacity: 0;
                    }
                }
                .close {
                    @include position(absolute, 10px, 970px, 24px, 24px);
                    z-index: 1;
                    line-height: 24px;
                    text-align: center;
                    color: $colorE;
                    font-size: $fontH;
                    border-radius: 50%;
                    &:hover {
                        background-color: #f02929;
                    }
                }
                video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    outline: none;
                }
            }
        }
    }
</style>
