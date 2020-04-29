import axios from 'axios';
import { Message } from 'element-ui';

let baseURL = '';
process.env.NODE_ENV == 'development' ? baseURL = '/api' : '';

// axios的通用设置
axios.defaults.baseURL = baseURL;
// 设置请求超时时间 8s
axios.defaults.timeout = 8000;
// 响应拦截
//      统一处理返回的数据，若404，报错等信息都在这里一起处理，只允许返回正确的数据
axios.interceptors.response.use(response => {
    // http请求成功，但请求的东西可能失败
    let res = response.data,
        status = res.status,
        hash = window.location.hash;
    if (status == 0) {
        return res.data || 'ok';
    } else if (status == 10) {
        // 未登录就跳转到登录页 , 没有return，请求会发生什么
        hash == '#/index' ? '' : window.location.href = '/#/login';
    } else {
        // 其余直接显示错误
        return Promise.reject(res.msg);
    }
}, error => {
    // http请求直接失败
    Message.error(error.response.data.message);
})

let get = function (url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: { ...params }, ...config })
            .then(res => {
                res ? resolve(res) : '';
            })
            .catch(err => {
                Message.error(err);
            })
    })
}

let del = function (url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { params: { ...params }, ...config })
            .then(res => {
                res ? resolve(res) : '';
            })
            .catch(err => { Message.error(err); })
    })
}


let post = function (url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, { ...params }, { ...config })
            .then(res => {
                res ? resolve(res) : '';
            })
            .catch(err => Message.error(err))
    })
}

let put = function (url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, { ...params }, { ...config })
            .then(res => {
                res ? resolve(res) : '';
            })
            .catch(err => Message.error(err))
    })
}

export { get, post, put, del }
