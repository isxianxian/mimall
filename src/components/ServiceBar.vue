<template>
    <div class="service">
        <div class="container">
            <div class="content">
                <span class="icon-setting"></span>
                预约维修服务
            </div>
            <div class="content">
                <span class="icon-7day"></span>
                7天无理由退货
            </div>
            <div class="content">
                <span class="icon-15day"></span>
                15天免费换货
            </div>
            <div class="content">
                <span class="icon-post"></span>
                满150元包邮
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import 'scss/mixins.scss';
    @import 'scss/config.scss';
    @import 'scss/base.scss';

    .service {
        line-height: 24px;
        padding: 33px 0;
        font-size: 16px;
        color: $colorC;
        text-align: center;

        background-color: #ffffff;
        .container {
            @include flex();
            .content {
                flex: 1;
                border-right: 1px solid $colorH;
                span {
                    vertical-align: middle;
                    margin-right: 8px;
                }
                .icon-setting {
                    @include bgImg(20px, 20px, '/imgs/icon-setting.png');
                }
                .icon-7day {
                    @include bgImg(20px, 20px, '/imgs/icon-7day.png');
                }
                .icon-15day {
                    @include bgImg(20px, 20px, '/imgs/icon-15day.png');
                }
                .icon-post {
                    @include bgImg(20px, 20px, '/imgs/icon-post.png');
                }
            }
        }
    }
</style>
