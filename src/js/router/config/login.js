/**
 * @desc 路由配置 - 登录
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2016-12-16
 * @return { Object } routes
 */

// 布局组件
import Index from 'components/pages/login/login.vue';

// 广告主登录
import * as ad from 'components/pages/login/index';

const routes = {
    path: '/login',
    name: 'login',
    component: Index,
    redirect: { name: 'ad.login.login'},
    children: [
        {
            path: 'login',
            name: 'ad.login.login',
            meta: {
                title: '用户登录'
            },
            components: {
                default: ad.Login
            }
        },
        {
            path: 'forget',
            name: 'ad.login.forget',
            meta: {
                title: '忘记密码'
            },
            components: {
                default: ad.Forget
            }
        },
        {
            path: 'registere',
            name: 'ad.login.registere',
            meta: {
                title: '用户注册'
            },
            components: {
                default: ad.Registere
            }
        }
    ]
};

export default routes;
