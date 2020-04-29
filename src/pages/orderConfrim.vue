<template>
    <div class="order-confirm">
        <OrderHeader title="订单确认">
            <template v-slot:tip>
                <span>请认真填写收货地址</span>
            </template>
        </OrderHeader>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="item-address">
                        <h2 class="addr-title">收货地址</h2>
                        <div class="addr-list clearfix">
                            <div
                                class="addr-info"
                                :class="{'checked':index == addressIndex}"
                                v-for="(item,index) in addList"
                                :key="index"
                                @click="addressIndex = index"
                            >
                                <h2>{{item.receiverName}}</h2>
                                <div class="phone">{{item.receiverMobile}}</div>
                                <div class="street">
                                    {{item.receiverCity}} {{item.receiverProvince}} {{item.receiverDistrict}}
                                    <br />
                                    {{item.receiverAddress}}
                                </div>
                                <div class="action">
                                    <a
                                        href="javascript:;"
                                        class="icon"
                                        @click="changeModal('del' , item)"
                                    ></a>
                                    <a
                                        href="javascript:;"
                                        class="icon"
                                        @click="changeModal('edit' , item)"
                                    ></a>
                                </div>
                            </div>
                            <div class="addr-add" @click="changeModal('add')">
                                <div class="icon-add"></div>
                                <div>添加新地址</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-good">
                        <h2>商品</h2>
                        <ul>
                            <li v-for="(item,index) in orderList" :key="index">
                                <div class="good-name">
                                    <img v-lazy="item.productMainImage" alt />
                                    <span>{{item.productName}} {{item.productSubtitle}}</span>
                                </div>
                                <div
                                    class="good-price"
                                >{{item.productPrice}}元x{{item.quantity}}</div>
                                <div
                                    class="good-total"
                                >{{item.productTotalPrice}}元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <a href="javascript:;">电子发票</a>
                        <a href="javascript:;">个人</a>
                    </div>
                    <div class="detail">
                        <div class="item">
                            <span class="item-name">商品件数：</span>
                            <span class="item-val">{{orderCount}}件</span>
                        </div>
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                            <span class="item-val">{{orderPrice}}元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">优惠活动：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">运费：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item-total">
                            <span class="item-name">应付总额：</span>
                            <span class="item-val">{{orderPrice}}元</span>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a
                            href="/#/cart"
                            class="btn btn-default btn-large"
                        >返回购物车</a>
                        <a
                            href="javascript:;"
                            class="btn btn-large"
                            @click="orderSubmit"
                        >去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <modal
            title="删除确认"
            btnType="1"
            sureText="确认删除"
            :showModal="showDelModal"
            @submit="delAddress"
            @close="showDelModal=false"
        >
            <template v-slot:body>
                <p>您确认要删除此地址吗</p>
            </template>
        </modal>
        <modal
            btnType="1"
            sureText="保存"
            :title="title"
            :showModal="showAddModal"
            @submit="changeAddress"
            @close="showAddModal=false"
        >
            <template v-slot:body>
                <div class="edit-wrap">
                    <div class="item">
                        <input
                            type="text"
                            class="input"
                            placeholder="姓名"
                            v-model="checkedItem.receiverName"
                        />
                        <input
                            type="text"
                            class="input"
                            placeholder="手机号"
                            v-model="checkedItem.receiverMobile"
                        />
                    </div>
                    <div class="item">
                        <select
                            name="province"
                            v-model="checkedItem.receiverProvince"
                        >
                            <option value="北京">北京</option>
                            <option value="天津">天津</option>
                            <option value="河北">河北</option>
                        </select>
                        <select name="city" v-model="checkedItem.receiverCity">
                            <option value="北京">北京</option>
                            <option value="天津">天津</option>
                            <option value="河北">石家庄</option>
                        </select>
                        <select
                            name="district"
                            v-model="checkedItem.receiverDistrict"
                        >
                            <option value="北京">昌平区</option>
                            <option value="天津">海淀区</option>
                            <option value="河北">东城区</option>
                            <option value="天津">西城区</option>
                            <option value="河北">顺义区</option>
                            <option value="天津">房山区</option>
                        </select>
                    </div>
                    <div class="item">
                        <textarea
                            name="street"
                            v-model="checkedItem.receiverAddress"
                        ></textarea>
                    </div>
                    <div class="item">
                        <input
                            type="text"
                            class="input"
                            placeholder="邮编"
                            v-model="checkedItem.receiverZip"
                        />
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
    import OrderHeader from './../components/OrderHeader'
    import Modal from './../components/Modal'
    import {
        getAddList,
        getCartList,
        addAddress,
        editAddress,
        delAddress,
        createOrder
    } from '@/api/api.js'
    export default {
        name: 'order-confirm',
        data() {
            return {
                addList: [],
                orderList: [],
                orderCount: 0,
                orderPrice: 0,
                showDelModal: false,
                showAddModal: false,
                checkedItem: {},
                modalType: 'del',
                title: '',
                addressIndex: 0
            }
        },
        methods: {
            // 订单提交
            orderSubmit() {
                let item = this.addList[this.addressIndex]
                if (!item) {
                    this.$message.error('请先选择一个地址！')
                    return
                }
                createOrder({ shippingId: item.id }).then(res => {
                    this.$router.push({
                        path: '/order/pay',
                        query: {
                            orderNo: res.orderNo
                        }
                    })
                })
                // this.$router.push({
                //     path: '/order/pay',
                //     query: {
                //         orderNo: 123
                //     }
                // })
            },

            getAddList() {
                getAddList().then(res => {
                    this.addList = res.list
                })
            },
            getCartList() {
                getCartList().then(res => {
                    let orderCount = 0,
                        orderList = []

                    orderList = res.cartProductVoList.filter(
                        item => item.productSelected
                    )
                    orderList.forEach(item => {
                        orderCount += item.quantity
                    })
                    this.orderPrice = res.cartTotalPrice
                    this.orderCount = orderCount
                    this.orderList = orderList
                })
            },

            changeModal(type, item) {
                if (type == 'del') {
                    this.showDelModal = true
                    this.modalType = 'del'
                    this.checkedItem = item
                } else if (type == 'edit') {
                    this.showAddModal = true
                    this.modalType = 'edit'
                    this.checkedItem = item
                    this.title = '修改收货地址'
                } else {
                    this.showAddModal = true
                    this.modalType = 'add'
                    this.checkedItem = {}
                    this.title = '新增收货地址'
                }
            },
            changeAddress() {
                if (this.modalType == 'add') {
                    this.addAddress()
                } else {
                    this.editAddress()
                }
            },
            delAddress() {
                let { id } = this.checkedItem
                delAddress(id).then(() => {
                    this.showDelModal = false
                    this.getAddList()
                })
            },
            editAddress() {
                editAddress(this.checkedItem.id, this.checkedItem).then(res => {
                    this.showAddModal = false
                    this.getAddList()
                    this.checkedItem = {}
                })
            },
            addAddress() {
                let { checkedItem } = this,
                    {
                        receiverName,
                        receiverMobile,
                        receiverProvince,
                        receiverCity,
                        receiverDistrict,
                        receiverAddress,
                        receiverZip
                    } = checkedItem
                // 检验
                let errMsg = ''
                if (!receiverName) {
                    errMsg = '请输入名字'
                } else if (!receiverMobile && !/\d{11}/.test(receiverMobile)) {
                    errMsg = '情输入正确的电话号码'
                } else if (!receiverProvince) {
                    errMsg = '请选择省份'
                } else if (!receiverCity) {
                    errMsg = '请选择对应的城市'
                } else if (!receiverAddress || !receiverDistrict) {
                    errMsg = '请输入收货地址'
                } else if (!receiverZip && !/\d{6}/.test(receiverZip)) {
                    errMsg = '情输入正确的邮编'
                }

                errMsg
                    ? this.$message.error(errMsg)
                    : addAddress(checkedItem).then(res => {
                          this.getAddList()
                          this.showAddModal = false
                          this.checkedItem = {}
                      })
            }
        },
        mounted() {
            this.getAddList()
            this.getCartList()
        },
        components: {
            Modal,
            OrderHeader
        }
    }
</script>

<style lang="scss">
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';

    .order-confirm {
        .wrapper {
            background-color: #f5f5f5;
            padding-top: 30px;
            padding-bottom: 84px;
            .order-box {
                background-color: #ffffff;
                padding-left: 40px;
                padding-bottom: 40px;
                .addr-title {
                    font-size: 20px;
                    color: #333333;
                    font-weight: 200;
                    margin-bottom: 21px;
                }
                .item-address {
                    padding-top: 38px;
                    .addr-list {
                        .addr-info,
                        .addr-add {
                            box-sizing: border-box;
                            float: left;
                            width: 271px;
                            height: 180px;
                            border: 1px solid #e5e5e5;
                            margin-right: 15px;
                            padding: 15px 24px;
                            font-size: 14px;
                            color: #757575;
                        }
                        .addr-info {
                            cursor: pointer;
                            h2 {
                                height: 27px;
                                font-size: 18px;
                                font-weight: 300;
                                color: #333;
                                margin-bottom: 10px;
                            }
                            .street {
                                height: 50px;
                            }
                            .action {
                                height: 50px;
                                line-height: 50px;
                                @include flex(space-between);
                                .icon {
                                    width: 20px;
                                    height: 20px;
                                    vertical-align: middle;
                                    &:hover {
                                        color: $colorA;
                                    }
                                }
                            }
                            &.checked {
                                border: 1px solid #ff6700;
                            }
                        }
                        .addr-add {
                            text-align: center;
                            color: #999999;
                            cursor: pointer;
                            .icon-add {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: url('/imgs/icon-add.png') #e0e0e0
                                    no-repeat center;
                                background-size: 14px;
                                margin: 0 auto;
                                margin-top: 45px;
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
                .item-good {
                    margin-top: 34px;
                    border-bottom: 1px solid #e5e5e5;
                    padding-bottom: 12px;
                    h2 {
                        border-bottom: 1px solid #e5e5e5;
                        padding-bottom: 5px;
                    }
                    li {
                        display: flex;
                        align-items: center;
                        height: 40px;
                        line-height: 40px;
                        margin-top: 10px;
                        font-size: 16px;
                        color: #333333;
                        .good-name {
                            flex: 5;
                            img {
                                width: 30px;
                                height: 30px;
                                vertical-align: middle;
                            }
                        }
                        .good-price {
                            flex: 2;
                        }
                        .good-total {
                            padding-right: 44px;
                            color: #ff6600;
                        }
                    }
                }
                .item-shipping,
                .item-invoice {
                    margin-top: 31px;
                    line-height: 20px;
                    h2 {
                        display: inline-block;
                        margin-right: 71px;
                        font-size: 20px;
                        width: 80px;
                    }
                    span,
                    a {
                        font-size: 16px;
                        color: #ff6700;
                        margin-right: 23px;
                    }
                }
                .detail {
                    padding: 50px 44px 33px 0;
                    border-bottom: 1px solid #f5f5f5;
                    text-align: right;
                    font-size: 16px;
                    color: #666666;
                    .item-val {
                        color: #ff6700;
                    }
                    .item {
                        line-height: 15px;
                        margin-bottom: 12px;
                    }
                    .item-val {
                        display: inline-block;
                        width: 100px;
                    }
                    .item-total {
                        .item-val {
                            font-size: 28px;
                        }
                    }
                }
                .btn-group {
                    margin-top: 37px;
                    text-align: right;
                }
            }
        }
        .edit-wrap {
            font-size: 14px;
            .item {
                margin-bottom: 15px;
                .input {
                    display: inline-block;
                    width: 283px;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15px;
                    box-sizing: border-box;
                    border: 1px solid #e5e5e5;
                    & + .input {
                        margin-left: 14px;
                    }
                }
                select {
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #e5e5e5;
                    margin-right: 15px;
                }
                textarea {
                    height: 62px;
                    width: 100%;
                    padding: 13px 15px;
                    box-sizing: border-box;
                    border: 1px solid #e5e5e5;
                }
            }
        }
    }
</style>