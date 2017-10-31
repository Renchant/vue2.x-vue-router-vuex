/**
 * @desc 用户模块
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-17
 * @return {Object} 
 */

import * as types from '../mutation-types';
import API from 'common/api/index';

// 默认无用户角色

const state = {
    info: {},
    role: -1
};

const mutations = {
    [types.UPDATE_ACCOUNT](state, { info, role }) {
        state.info = info;
        state.role = Number(role);
    },

    [types.CLEAR_ACCOUNT](state) {
        state.info = {};
        state.role = -1;
    }
};

const getters = {
    getAccount(state) {
        return state;
    }
};

const actions = {
    getCurrentAccount({ commit }) {
        // 获取当前用户
        return new Promise((resolve, reject) => {
            API.common.currentuser()
                .done((res) => {
                    commit(types.UPDATE_ACCOUNT, {info: res.data, role: res.data.user_type });
                    resolve(1);
                })
                .fail(() => {
                    reject();
                });
        });
    },
    clearCurrentAccount({ commit }) {
        // 注销用户
        let status = {
            info: {},
            role: -1
        };
        commit(types.UPDATE_ACCOUNT, status);
    },
    setCurrentAccount({ commit }, account) {
        // 获取当前用户
        commit(types.UPDATE_ACCOUNT, {
            info: account,
            role: account.user_type
        });
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
