/**
 * @desc 程序入口
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-06
 */

import polyfill from './common/polyfill';
polyfill();

import Vue from 'vue';
import router from './router';
import store from './store';
import App from 'components/app.vue';

// 全局组件
import {
    Row,
    Col,
    Loading,
    Tooltip,
    Button,
    Popover
} from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);
Vue.use(Tooltip);
Vue.use(Button);
Vue.use(Popover);
console.log(new Vue({
    store,
    router,
    ...App
}));

new Vue({
    store,
    router,
    ...App
}).$mount('#app');

console.log(4)
