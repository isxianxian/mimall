<template>
    <div :class="['nav-bar' , {'is-fixed':isFixed}]">
        <div class="container">
            <div class="prod-name">{{name}}</div>
            <div class="prod-param">
                <a href="javascript:;">概述</a>
                <span class="line"></span>
                <a href="javascript:;">参数</a>
                <span class="line"></span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: String
        },
        data() {
            return {
                isFixed: false
            }
        },
        methods: {
            initHeight() {
                let scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop

                this.isFixed = scrollTop > 151 ? true : false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.initHeight)
        },
        destroyed() {
            window.removeEventListener('scroll', this.initHeight)
        }
    }
</script>

<style lang="scss" scoped>
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';
    .nav-bar {
        width: 100%;
        height: 70px;
        line-height: 70px;
        border-top: 1px solid $colorH;
        background-color: $colorG;
        &.is-fixed {
            position: fixed;
            z-index: 2;
            top: 0;
            left: 0;
        }
        .container {
            @include flex(space-between);
            .prod-name {
                font-size: $fontH;
                font-weight: bold;
                color: $colorB;
            }
            .prod-param {
                font-size: $fontJ;
                a {
                    color: $colorC;
                }
                .line {
                    margin: 0 10px;
                }
            }
        }
    }
</style>
