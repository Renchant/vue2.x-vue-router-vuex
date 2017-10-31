/**
 * @desc 常量映射集合(通用)
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-12-15
 * @return { Object }
 */

// 项目名
export const PROJECT = require('../../../../../package.json').label;

// 文案
import * as copywritings from '../copywritings';
export const COPYWRITINGS = copywritings;


// 购物车
export const CART = {
    // 带有此类名的元素，被点击时不会引起购物车自动收起
    slaveClass: 'cart__slave'
};
