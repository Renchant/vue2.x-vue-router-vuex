/**
 * @desc 用户状态管理
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-12
 * @return {Object} 
 */

import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';
import cart from './modules/cart/index';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        cart,
        notice
    }
});
