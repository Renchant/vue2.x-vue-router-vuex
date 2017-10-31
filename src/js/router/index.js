/**
 * @desc 路由初始化
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-09
 * @return {Object} Router
 */

import vue from 'vue';
import VueRouter from 'vue-router';
import VueCountdown from '../directives/countdown';
import Routes from './config/index';
import store from 'store/index';
import CONSTANTS from 'constants';

const { state: { account }, dispatch } = store;

const { ROLE_AUTHORITY, PROJECT } = CONSTANTS;
vue.use(VueRouter);

// 注册倒数指令
vue.use(VueCountdown);

const router = new VueRouter({
    // mode: 'history',
    routes: Routes
});

// const systems = Routes.filter(route => {
//     return !!route.name;
// });
// 
router.beforeEach(({ fullPath, meta }, from, next) => {
    const { role } = account;
    const checkAccess = (role) => {
        const access = ROLE_AUTHORITY[role];
        const result = !!access.filter(regexp => {
            return regexp.test(fullPath);
        }).length;

        result ? next() : next({ name: 'error', query: {t: 1} });
    };

    if (role >= 0) {
        // 已经获取用户信息
        checkAccess(role);
    } else {
        // 无用户信息
        dispatch('getCurrentAccount').then(roleVal => {
            checkAccess(roleVal);
        });
    }
    window.document.title = meta.title ? meta.desc ? `${PROJECT}${meta.title}-${meta.desc}` : `${PROJECT}-${meta.title}` : PROJECT;
});

export default router;

export const routes = Routes;

