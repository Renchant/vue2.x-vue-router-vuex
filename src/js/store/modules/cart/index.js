/**
 * @description 购物车模块
 * @author Ivan
 * @date 2017-08-30, 15:34:59 GMTCST
 * @lastModify Ivan
 * @lastDate 2017-08-30, 15:34:59 GMTCST
 */

import we from './we';
import wb from './wb';
import * as types from '../../mutation-types';

export default {
    namespaced: true,
    actions: {
        // 刷新所有购物车
        refreshAllCart({ state, commit, dispatch }) {
            let modules = Object.keys(state);
            let specialModules = ['aliv'];

            modules.forEach(module => {
                specialModules.find(sm => module === sm)
                    ? dispatch(`${module}/clearCart`)
                    : commit(`${module}/${types.CLEAR_CART}`);
            });
        }
    },
    modules: {
        we,
        wb
    }
};
