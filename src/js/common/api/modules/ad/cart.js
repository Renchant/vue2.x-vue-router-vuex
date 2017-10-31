/**
 * @desc 后端API 购物车模块;
 *       文档 http://showdoc.yyyad.com/index.php?s=/1&page_id=30
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-01-17
 * @return {Object}
 */

// api的url前缀, 对应规则可以查看根目录的 config.js 里的 proxy
const PREFIX = '/api';

let url = {
    // 添加到购物车
    add: `${PREFIX}/member/addshoppingcart/`,

    // 获取购物车列表
    getList: `${PREFIX}/member/shoppingcart/`,

    // 修改购物车内容
    modify: `${PREFIX}/member/modifyshoppingcart/`,

    // 删除购物车内容
    delete: `${PREFIX}/member/delshoppingcart/`,

    // 提交购物车订单
    order: `${PREFIX}/member/submitorder/`,
    //批量修改
    batchModify: `${PREFIX}/member/batchmodifyshoppingcart/`,

    // 获取微博购物车列表
    getWbList: `${PREFIX}/weibo/member/shoppingcart/`,
    // 添加微博购物车
    addWbItem: `${PREFIX}/weibo/member/addshoppingcart/`,
    // 删除微博购物车内容
    deleteWb: `${PREFIX}/weibo/member/delshoppingcart/`,
    // 修改微博购物车内容
    modifyWb: `${PREFIX}/weibo/member/modifyshoppingcart/`,
    //提交微博购物车订单
    orderWb: `${PREFIX}/weibo/member/submitorder/`,
    //批量修改
    batchWbModify: `${PREFIX}/weibo/member/batchmodifyshoppingcart/`,
}

export default {
    // 获取购物车列表
    getList(data, options) {
        /* return this.mock({
            status: 0,
            data: {
                count:500,
                all_page: 1,
                history_list:[
                    {
                        id:1,
                        mpid:"maimai",
                        icon:"http://o9hnmhk6k.bkt.clouddn.com/Fk3kDyLVuYSE0EIXs7wJfSSwB66l",
                        name:"讲啊水电费就开始的",
                        create_time:1300000000000
                    },
                    {
                        id:2,
                        mpid:"wanxingren01",
                        icon:"http://o9hnmhk6k.bkt.clouddn.com/Fk3kDyLVuYSE0EIXs7wJfSSwB66l",
                        name:"讲啊水电费就开始的",
                        create_time:1300000000000
                    },
        })*/
        return this.fetch('get', url.getList, data, options);
    },

    // 删除购物车内容
    delete(data, options) {
        return this.fetch('post', url.delete, data, options);
    },

    // 修改购物车内容
    modify(data, options) {
        return this.fetch('post', url.modify, data, options);
    },

    // 提交购物车订单
    order(data, options) {
        return this.fetch('post', url.order, data, options);
    },

    batchModify (data, options) {
        return this.fetch('post', url.batchModify, data, options)
    },

    // 添加到购物车
    add(data, options) {
        return this.fetch('post', url.add, data, options);
    },

    getWbList(data, options) {
        return this.fetch('get', url.getWbList, data, options);
    },
    addWbItem(data, options) {
        return this.fetch('post', url.addWbItem, data, options);
    },
    deleteWb(data, options) {
        return this.fetch('post', url.deleteWb, data, options);
    },
    modifyWb(data, options) {
        return this.fetch('post', url.modifyWb, data, options);
    },
    batchWbModify (data, options) {
        return this.fetch('post', url.batchWbModify, data, options)
    },
    orderWb(data, options) {
        return this.fetch('post', url.orderWb, data, options);
    }
}
