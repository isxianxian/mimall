import { get, post, put, del } from './axios.js';

let getPros = (params) => {
    return get('/products', params);
}
let login = (params) => {
    return post('/user/login', params);
}
let getUserMes = () => {
    return get('/user');
}
let getCart = () => {
    return get('/carts');
}
let getProDetail = (productId) => {
    return get(`/products/${productId}`);
}
let addToCart = (params) => {
    return post('/carts', params);
}

let getCartList = () => {
    return get('/carts');
}
let selectAll = () => {
    return put('/carts/selectAll');
}
let unSelectAll = () => {
    return put('/carts/unSelectAll');
}
let changeProdCount = (productId, params) => {
    return put(`/carts/${productId}`, params);
}
let removePro = (productId) => {
    return del(`/carts/${productId}`);
}
let logout = () => {
    return post('/user/logout');
}
let getAddList = () => {
    return get('/shippings');
}
let addAddress = (params) => {
    return post('/shippings', params);
}
let editAddress = (shippingId, params) => {
    return put(`/shippings/${shippingId}`, params);
}
let delAddress = (shippingId) => {
    return del(`/shippings/${shippingId}`);
}
let createOrder = (params) => {
    return post('/orders', params);
}
let getOrderList = (params) => {
    return get(`/orders`, params)
}
let getOrderDetail = (orderNo) => {
    return get(`/orders/${orderNo}`)
}
let orderPay = (params) => {
    return post('/pay', params);
}

export {
    getPros,
    login,
    getUserMes,
    getCart,
    getProDetail,
    addToCart,
    getCartList,
    selectAll,
    unSelectAll,
    changeProdCount,
    removePro,
    logout,
    getAddList,
    addAddress,
    editAddress,
    delAddress,
    createOrder,
    getOrderDetail,
    orderPay,
    getOrderList
};