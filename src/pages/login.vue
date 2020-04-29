<template>
    <div class="login">
        <div class="container">
            <a href="/#/index">
                <img src="/imgs/login-logo.png" />
            </a>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <div class="header">
                        <a class="active" href="javascript:;">账号登陆</a>
                        <span class="line"></span>
                        <a href="javascript:;">扫码登陆</a>
                    </div>
                    <div class="body">
                        <input
                            class="account"
                            type="text"
                            placeholder="请输入账号"
                            v-model="username"
                        />
                        <input
                            class="password"
                            type="password"
                            placeholder="请输入密码"
                            v-model="password"
                        />
                        <div class="btn btn-bg" @click="login">登陆</div>
                        <div class="tips">
                            <div class="pho">手机短信登录/注册</div>
                            <div class="reg">
                                <a href="javascript:;">立即注册</a>
                                <span>|</span>
                                <a href="javascript:;">忘记密码</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="link">
                <a href="javascript:;">简体</a>
                <span class="line"></span>
                <a href="javascript:;">繁体</a>
                <span class="line"></span>
                <a href="javascript:;">English</a>
                <span class="line"></span>
                <a href="javascript:;">常见问题</a>
                <span class="line"></span>
                <a href="javascript:;">隐私政策</a>
            </div>
            <div
                class="copyright"
            >小米公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号</div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { login } from '@/api/api.js'

    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                let { username, password } = this
                login({ username, password }).then(res => {
                    // 注册成功后用户id设置到cookie中--应该是后端要求
                    this.$cookie.set('userId', res.id, { expires: 'Session' })
                    this.setUserName(res.username)
                    this.$router.push('/index?from=login')
                })
            },
            ...mapMutations(['setUserName'])
        }
    }
</script>

<style lang="scss" scoped>
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';

    .login {
        font-size: $fontJ;
        & > .container {
            height: 98px;
            a {
                display: block;
                width: 200px;
                height: 100%;
                font-size: $fontK;
                color: $colorD;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .wrapper {
            height: 588px;
            background: url('https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/12c02030ee73caa35a19be59c5b1ec78.jpg')
                no-repeat center center;
            .container {
                position: relative;
                height: 100%;
                .login-form {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    width: 380px;
                    padding: 0 31px;
                    box-sizing: border-box;
                    background-color: $colorG;

                    .header {
                        height: 83px;
                        line-height: 83px;
                        padding-bottom: 15px;
                        text-align: center;
                        a {
                            font-size: $fontE;
                            color: $colorC;
                            vertical-align: middle;
                            &.active,
                            &:hover {
                                color: $colorA;
                            }
                        }
                        .line {
                            width: 0;
                            height: 24px;
                            line-height: 24px;
                            vertical-align: middle;
                            margin: 0 36px;
                            font-size: 24px;
                        }
                    }
                    .body {
                        input {
                            width: 100%;
                            height: 48px;
                            padding: 13px 14px 16px;
                            box-sizing: border-box;
                            margin-bottom: 20px;
                            border: 1px solid $colorH;
                        }
                        .btn {
                            width: 100%;
                            margin: 15px 0;
                        }
                        .tips {
                            @include flex(space-between);
                            margin-bottom: 150px;
                            .pho {
                                color: $colorA;
                            }
                            .reg {
                                a {
                                    vertical-align: middle;
                                    color: $colorD;
                                    &:hover {
                                        color: $colorA;
                                    }
                                }
                                span {
                                    vertical-align: middle;
                                    color: $colorD;
                                    padding: 0 5px;
                                }
                            }
                        }
                    }
                    .form-footer {
                    }
                }
            }
        }
        .footer {
            height: 80px;
            padding-top: 100px;
            text-align: center;
            font-size: $fontJ;
            color: $colorD;
            .link {
                margin-bottom: 10px;
                a {
                    color: $colorD;
                }
                .line {
                    vertical-align: middle;
                    padding: 0 10px;
                }
            }
        }
        .container {
            width: 1130px;
        }
    }
</style>
