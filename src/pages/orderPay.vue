<template>
    <div class="order-pay">
        <OrderHeader title="订单支付">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
            </template>
        </OrderHeader>
        <div class="wrapper">
            <div class="container">
                <div class="order-wrap">
                    <div class="item-order">
                        <div class="icon-succ"></div>
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯～</h2>
                            <p>
                                请在
                                <span>30分</span>内完成支付, 超时后将取消订单
                            </p>
                            <p>收货信息：{{addressInfo}}</p>
                        </div>
                        <div class="order-total">
                            <p>
                                应付总额：
                                <span>{{orderInfo.payment}}</span>元
                            </p>
                            <p>
                                订单详情
                                <em
                                    class="icon-down"
                                    :class="{'up':showDetail}"
                                    @click="showDetail=!showDetail"
                                ></em>
                            </p>
                        </div>
                    </div>
                    <div class="item-detail" v-show="showDetail">
                        <div class="item">
                            <div class="detail-title">订单号：</div>
                            <div
                                class="detail-info theme-color"
                            >{{orderInfo.orderNo}}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div class="detail-info">{{addressInfo}}</div>
                        </div>
                        <div class="item good">
                            <div class="detail-title">商品名称：</div>
                            <div class="detail-info">
                                <ul>
                                    <li
                                        v-for="(item,index) in orderInfo.orderItemVoList"
                                        :key="index"
                                    >
                                        <img v-lazy="item.productImage" />
                                        {{item.productName}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="item">
                            <div class="detail-title">发票信息：</div>
                            <div class="detail-info">电子发票 个人</div>
                        </div>
                    </div>
                </div>
                <div class="item-pay">
                    <h3>选择以下支付方式付款</h3>
                    <div class="pay-way">
                        <p>支付平台</p>
                        <div
                            class="pay pay-ali"
                            :class="{'checked':payType==1}"
                            @click="paySubmit(1)"
                        ></div>
                        <div
                            class="pay pay-wechat"
                            :class="{'checked':payType==2}"
                            @click="paySubmit(2)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
        <modal
            title="支付确认"
            btnType="3"
            sureText="查看订单"
            cancelText="取消订单"
            @cancel="showPayModal=false"
            @submit="goOrderList"
            @closw="showPayModal = false"
            :showModal="showPayModal"
        >
            <template v-slot:body>
                <p>您是否已完成支付？</p>
            </template>
        </modal>
    </div>
</template>

<script>
    import { getOrderDetail, orderPay } from '@/api/api.js'
    import OrderHeader from 'coms/OrderHeader.vue'

    import ScanPayCode from 'coms/ScanPayCode.vue'
    import Modal from 'coms/Modal.vue'
    import QRCode from 'qrcode'

    let timeId = null

    export default {
        data() {
            return {
                orderNo: this.$route.query.orderNo,
                addressInfo: '', // 收货地址等
                orderInfo: {},
                showDetail: false,
                payType: '',
                showPay: false,
                payImg: '',
                showPayModal: false
            }
        },
        methods: {
            getOrderDetail() {
                getOrderDetail(this.orderNo).then(res => {
                    let { shippingVo } = res,
                        addressInfo = `${shippingVo.receiverName} ${shippingVo.receiverMobile}${shippingVo.receiverProvince}${shippingVo.receiverCity}${shippingVo.receiverDistrict}`

                    this.addressInfo = addressInfo
                    this.orderInfo = res
                })
            },

            paySubmit(payType) {
                this.payType = payType
                if (payType == 1) {
                    // 支付宝支付
                    window.open(`/#/order/alipay?orderId=${this.orderNo}`, '_blank')
                } else {
                    this.orderPay()
                }
            },
            orderPay() {
                orderPay({
                    orderId: this.orderNo,
                    orderName: 'xiaomi',
                    amount: 0.01,
                    payType: 2
                }).then(res => {
                    QRCode.toDataURL(res.content)
                        .then(url => {
                            this.showPay = true
                            this.payImg = url
                            this.loopOrderState()
                        })
                        .catch(err => {
                            this.$message.error('二维码生成失败，请稍后再试！')
                        })
                })
            },
            // 关闭微信弹框
            closePayModal() {
                this.showPay = false
                this.showPayModal = true
                clearInterval(timeId)
            },
            goOrderList() {
                this.$router.push('/order/list')
            },
            loopOrderState() {
                // 轮询账单的状态，若轮询结果是已支付，就直接跳到订单列表页面
                timeId = setInterval(() => {
                    getOrderDetail(this.orderNo).then(res => {
                        console.log(res)
                        if (res.status == 20) {
                            clearInterval(timeId)
                            this.goOrderList()
                        }
                    })
                }, 1000)
            }
        },
        mounted() {
            // 1588047750016 orderNo
            this.getOrderDetail()
        },
        components: {
            ScanPayCode,
            Modal,
            OrderHeader
        }
    }
</script>

<style lang="scss">
    .order-pay {
        .wrapper {
            background-color: #f5f5f5;
            padding-top: 30px;
            padding-bottom: 61px;
            .order-wrap {
                padding: 62px 50px;
                background-color: #fff;
                font-size: 14px;
                margin-bottom: 30px;
                .item-order {
                    display: flex;
                    align-items: center;
                    .icon-succ {
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                        background: url('/imgs/icon-gou.png') #80c58a no-repeat
                            center;
                        background-size: 60px;
                        margin-right: 40px;
                    }
                    .order-info {
                        margin-right: 248px;
                        h2 {
                            font-size: 24px;
                            color: #333333;
                            margin-bottom: 20px;
                        }
                        p {
                            color: #666666;
                            span {
                                color: #ff6700;
                            }
                        }
                    }
                    .order-total {
                        & > p:first-child {
                            margin-bottom: 30px;
                        }
                        span {
                            font-size: 28px;
                            color: #ff6700;
                        }
                        .icon-down {
                            display: inline-block;
                            width: 14px;
                            height: 10px;
                            background: url('/imgs/icon-down.png') no-repeat center;
                            background-size: contain;
                            margin-left: 9px;
                            transition: all 0.5s;
                            cursor: pointer;
                            &.up {
                                transform: rotate(180deg);
                            }
                        }
                        .icon-up {
                            transform: rotate(180deg);
                        }
                    }
                }
                .item-detail {
                    border-top: 1px solid #d7d7d7;
                    padding-top: 47px;
                    padding-left: 130px;
                    font-size: 14px;
                    margin-top: 45px;
                    .item {
                        margin-bottom: 19px;
                        .detail-title {
                            float: left;
                            width: 100px;
                        }
                        .detail-info {
                            display: inline-block;
                            img {
                                width: 30px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
            .item-pay {
                padding: 26px 50px 72px;
                background-color: #ffffff;
                color: #333333;
                h3 {
                    font-size: 20px;
                    font-weight: 200;
                    color: #333333;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #d7d7d7;
                    margin-bottom: 26px;
                }
                .pay-way {
                    font-size: 18px;
                    .pay {
                        display: inline-block;
                        width: 188px;
                        height: 64px;
                        border: 1px solid #d7d7d7;
                        cursor: pointer;
                        &:last-child {
                            margin-left: 20px;
                        }
                        &.checked {
                            border: 1px solid #ff6700;
                        }
                    }
                    .pay-ali {
                        background: url('/imgs/pay/icon-ali.png') no-repeat center;
                        background-size: 103px 38px;
                        margin-top: 19px;
                    }
                    .pay-wechat {
                        background: url('/imgs/pay/icon-wechat.png') no-repeat
                            center;
                        background-size: 103px 38px;
                    }
                }
            }
        }
    }
</style>
