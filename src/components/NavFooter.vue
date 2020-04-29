<template>
    <div>
        <div class="footer">
            <div class="footer-logo">
                <img src="/imgs/logo-footer.png" />
                <h2>小米商城</h2>
            </div>
            <p
                class="copyright"
            >Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
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
    @import 'scss/config.scss';

    .footer {
        height: 234px;
        background-color: $colorB;
        border-top: 4px solid $colorA;
        text-align: center;
        color: $colorC;
        font-size: $fontI;
        .footer-logo {
            padding: 46px 0 31px;
            img {
                width: 53px;
                height: 36px;
                margin-bottom: 13px;
            }
            h2 {
                font-weight: normal;
            }
        }
        .copyright {
        }
    }
</style>
