/**
 * @description 购物车微博模块
 * @author minfive
 * @date 2017-08-30, 17:39:37 GMTCST
 * @lastModify minfive
 * @lastDate 2017-08-30, 17:39:37 GMTCST
 */

import * as types from '../../mutation-types';
import { message } from 'common/modal';
import APIS from 'common/api';

// 格式化数据
function formatData(data) {
    let info = { ...data };
    let list = data.shoppingcart_list || [];
    let tag = data.shoppingcart_info;

    delete info.shoppingcart_list;
    delete info.shoppingcart_info;

    return {
        info,
        list,
        tag
    };
}

const API = APIS.ad.cart;

const defaultState = {
    list: null,
    info: null,
    opening: false
};

const state = { ...defaultState };

const mutations = {
    // 购物车开关控制
    [types.OPENING_CART](state, opening) {
        state.opening = opening;
    },

    // 清空购物车
    [types.CLEAR_CART](state) {
        Object.assign(state, defaultState);
    },

    // 更新购物车
    [types.UPDATE_CART](state, { list, info }) {
        Object.assign(state, {
            list,
            info
        });
    },

    // 添加进购物车
    [types.ADD_IN_CART](state, { list, info }) {
        Object.assign(state, {
            list,
            info
        });
    },

    // 从购物车删除
    [types.DELETE_FROM_CART](state, { list, info }) {
        Object.assign(state, {
            list,
            info
        });
    },

    // 编辑购物车
    [types.MODIFY_AT_CART](state, { info, tag }) {
        if (tag) {
            const { index, price } = tag;

            state.list[index].price = price;
        }

        state.info = info;
    }
};

const getters = {
    cartList(state) {
        return state.list || [];
    },

    cartInfo(state) {
        return state.info || {};
    },
    opening(state) {
        return state.opening;
    }
};

const actions = {
    // 获取购物车列表
    getCartList({ state, commit }, opts) {
        return new Promise((resolve, reject) => {
            if (state.list && state.info) {
                resolve({
                    ...state.info,
                    shoppingcart_list: state.list
                });
            } else {
                API.getWbList(opts)
                    .done(res => {
                        let { info, list } = formatData(res.data);

                        commit(types.UPDATE_CART, {
                            info,
                            list
                        });

                        resolve(res.data);
                    })
                    .fail(err => reject(err));
            }
        });
    },

    // 添加进购物车
    addInCart({ state, commit }, opts) {
        return new Promise((resolve, reject) => {
            let item = state.list.find(item => opts.mid * 1 === item.mid * 1);

            if (state.list && item) {
                resolve(item);
            } else {
                API.addWbItem(opts)
                    .done(res => {
                        let { info, list } = formatData(res.data);

                        commit(types.ADD_IN_CART, {
                            info,
                            list
                        });

                        resolve(res.data);
                    })
                    .fail(err => {
                        message(err, 'warning');
                        reject(err);
                    });
            }
        });
    },

    // 从购物车删除
    delFromCart({ commit }, opts) {
        return new Promise((resolve, reject) => {
            API.deleteWb(opts)
                .done(res => {
                    let { info, list } = formatData(res.data);

                    commit(types.DELETE_FROM_CART, {
                        info,
                        list
                    });
                })
                .fail(err => {
                    message(err, 'warning');
                    reject(err);
                });
        });
    },

    // 编辑购物车
    modifyCart({ commit }, params) {
        return new Promise((resolve, reject) => {
            API.modifyWb(params)
                .done(res => {
                    let { info, tag } = formatData(res.data);

                    tag.index = params.index;

                    commit(types.MODIFY_AT_CART, {
                        info,
                        tag
                    });
                })
                .fail(err => reject(err));
        });
    },

    // 批量修改购物车
    modifyBatchCart({ commit }, params) {
        return new Promise((resolve, reject) => {
            API.batchWbModify(params)
                .done(res => {
                    let { info, list } = formatData(res.data);

                    commit(types.UPDATE_CART, {
                        info,
                        list
                    });

                    resolve(res.data);
                })
                .fail(err => reject(err));
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
