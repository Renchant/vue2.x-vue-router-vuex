/**
 * @desc 路由配置集合
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-09
 * @return { Object } routes
 */

// 入口组件
import error from 'components/error.vue';

// import AD from './ad';

import Login from './login';

const basic = [
    {
        path: '/error',
        name: 'error',
        component: error
    },

    {
        path: '/',
        redirect: '/login'
    },

    {
        path: '*',
        redirect: '/error'
    }
];

const routes = [
    AD,
    Login
];

export default routes.concat(basic);
