<template>
    <div class="order-list">
        <OrderHeader title="订单确认">
            <template v-slot:tip>
                <span>请认真填写收货地址</span>
            </template>
        </OrderHeader>
        <Loading v-show="showLoading"></Loading>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div
                        class="order"
                        v-for="(order,index) in orderList"
                        :key="index"
                    >
                        <div class="order-title">
                            <div class="item-info">
                                {{order.createTime}}
                                <span>|</span>
                                {{order.receiverName}}
                                <span>|</span>
                                订单号：{{order.orderNo}}
                                <span>|</span>
                                {{order.paymentTypeDesc}}
                            </div>
                            <div class="item-money">
                                <span>应付金额：</span>
                                <span class="money">{{order.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="order-content">
                            <div class="good-box">
                                <div
                                    class="good-list"
                                    v-for="(item,i) in order.orderItemVoList"
                                    :key="i"
                                >
                                    <div class="good-img">
                                        <img v-lazy="item.productImage" alt />
                                    </div>
                                    <div class="good-name">
                                        <div class="p-name">{{item.productName}}</div>
                                        <div
                                            class="p-money"
                                        >{{item.totalPrice + 'X' + item.quantity}}元</div>
                                    </div>
                                </div>
                            </div>
                            <div class="good-state" v-if="order.status == 20">
                                <a href="javascript:;">{{order.statusDesc}}</a>
                            </div>
                            <div class="good-state" v-else>
                                <a
                                    href="javascript:;"
                                    @click="goPay(order.orderNo)"
                                >{{order.statusDesc}}</a>
                            </div>
                        </div>
                    </div>
                    <!-- 滚动加载 -->
                    <div
                        v-if="false"
                        class="scroll-more"
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="busy"
                        infinite-scroll-distance="410"
                    >
                        <img
                            v-show="showLoadMore"
                            src="/imgs/loading-svg/loading-spinning-bubbles.svg"
                        />
                    </div>
                    <el-pagination
                        class="pagination"
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="10"
                        :background="true"
                        :hide-on-single-page="true"
                        @current-change="handleChange"
                    ></el-pagination>
                    <no-data v-if="!showLoading && !orderList.length"></no-data>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderHeader from 'coms/OrderHeader'
    import Loading from 'coms/Loading'
    import NoData from 'coms/NoData'
    import infiniteScroll from 'vue-infinite-scroll'
    import { Pagination } from 'element-ui'
    import { getOrderList } from '@/api/api.js'

    export default {
        data() {
            return {
                showLoadMore: false,
                showLoading: true,
                orderList: [],
                total: 0,
                pageNum: 1,
                busy: false
            }
        },
        methods: {
            getOrderList(params) {
                this.busy = true
                getOrderList(params)
                    .then(res => {
                        console.log(res)
                        this.orderList = res.list
                        this.total = res.total
                    })
                    .finally(() => {
                        this.showLoading = false
                        this.busy = false
                    })
            },
            goPay(orderNo) {
                this.$router.push({
                    path: '/order/pay',
                    query: {
                        orderNo
                    }
                })
            },
            handleChange(pageNum) {
                this.pageNum = pageNum
                this.getOrderList({ pageNum })
            },
            loadMore() {
                console.log('loadMOre')
                this.busy = true
                this.pageNum += 1
                this.showLoadMore = true
                getOrderList({ pageNum: this.pageNum }).then(res => {
                    console.log(res)
                    this.orderList = this.orderList.concat(res.list)
                    this.showLoadMore = false
                    if (res.hasNextPage) {
                        this.busy = false
                    } else {
                        this.busy = true
                    }
                })
            }
        },
        mounted() {
            this.getOrderList()
        },
        components: {
            OrderHeader,
            Loading,
            NoData,
            [Pagination.name]: Pagination
        },
        directives: { infiniteScroll }
    }
</script>

<style lang="scss">
    @import 'scss/config.scss';
    @import 'scss/mixins.scss';
    .order-list {
        .wrapper {
            background-color: $colorJ;
            padding-top: 33px;
            padding-bottom: 110px;
            .order-box {
                .order {
                    @include border();
                    background-color: $colorG;
                    margin-bottom: 31px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .order-title {
                        @include height(74px);
                        @include flex(space-between);
                        background-color: $colorK;
                        padding: 0 43px;
                        font-size: 16px;
                        color: $colorC;
                        .item-info {
                            span {
                                margin: 0 9px;
                            }
                        }
                        .money {
                            font-size: 26px;
                            color: $colorB;
                        }
                    }
                    .order-content {
                        padding: 0 43px;
                        @include flex(space-between);
                        .good-box {
                            width: 88%;
                            .good-list {
                                display: flex;
                                align-items: center;
                                height: 145px;
                                .good-img {
                                    width: 112px;
                                    img {
                                        width: 100%;
                                    }
                                }
                                .good-name {
                                    font-size: 20px;
                                    color: $colorB;
                                }
                            }
                        }
                        .good-state {
                            @include height(145px);
                            font-size: 20px;
                            color: $colorA;
                            a {
                                color: $colorA;
                            }
                        }
                    }
                }
                .pagination {
                    text-align: right;
                }
                .el-pagination.is-background .el-pager li:not(.disabled) {
                    &:hover {
                        color: #ff6600;
                    }
                    &.active {
                        background-color: #ff6600;
                        &:hover {
                            color: #ffffff;
                        }
                    }
                }
                .el-button--primary {
                    background-color: #ff6600;
                    border-color: #ff6600;
                }
                .load-more,
                .scroll-more {
                    text-align: center;
                }
            }
        }
    }
</style>
