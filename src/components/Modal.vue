<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a
                        href="javascript:;"
                        class="icon"
                        @click="$emit('close')"
                    >X</a>
                </div>
                <div class="modal-body">
                    <!-- 插槽slot -->
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <a
                        v-if="btnType=='1'"
                        href="javascript:;"
                        class="btn"
                        @click="$emit('submit')"
                    >{{sureText}}</a>
                    <a
                        v-else-if="btnType=='2'"
                        href="javascript:;"
                        class="btn"
                        @click="$emit('cancel')"
                    >{{cancelText}}</a>
                    <div class="btn-group" v-else>
                        <a
                            href="javascript:;"
                            class="btn"
                            @click="$emit('submit')"
                        >{{sureText}}</a>
                        <a
                            href="javascript:;"
                            class="btn btn-default"
                            @click="$emit('cancel')"
                        >{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            // 弹框类型：小small，中middle，大large，表单form
            modalType: {
                type: String,
                default: 'form'
            },
            title: String,
            // 按钮类型：1确定，2取消，3确定取消
            btnType: String,
            sureText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            showModal: Boolean
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss">
    @import 'scss/mixins.scss';
    @import 'scss/config.scss';
    @import 'scss/modal.scss';
</style>
