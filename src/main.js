import Vue from 'vue'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';
import { Message } from 'element-ui';
import App from './App.vue'

Vue.use(VueLazyload, {
    loading: '/imgs/loading-svg/loading-bubbles.svg'
})
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

// if (process.env.NODE_ENV == 'development') {
//     require('./mock/api.js');
// }

Vue.config.productionTip = false
Vue.prototype.$message = Message;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
