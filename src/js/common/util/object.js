/** *****************
 **  对象处理工具  ***
 *******************/

import { getBaseType } from './other';

/**
 * @desc 检测目标是否为对象
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {any} target 要检测的目标
 * @return {Boolean} 返回结果
 */
export function isObject(target) {
    return getBaseType(target) === 'Object';
}

/**
 * @desc 对象循环函数
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object} obj 要循环的对象
 * @param {Function} fn 操作函数
 * @return {Boolean} 返回原对象
 */
export function forEach(obj, fn) {
    if (!isObject(obj)) return obj;

    let keys = Object.keys(obj);

    keys.forEach((key) => {
        fn && fn(obj[key], key, obj);
    });

    return obj;
}

/**
 * @desc 对象遍历函数
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object} obj 要循环的对象
 * @param {Function} fn 操作函数
 * @return {Object} 返回结果对象，不影响原对象
 */
export function map(obj, fn) {
    if (!isObject(obj)) {
        return obj && typeof (obj) !== 'function'
            ? JSON.parse(JSON.stringify(obj))
            : obj;
    }

    let
        result = Object.assign({}, obj);

    forEach(obj, (...args) => {
        result[args[1]] = fn ? fn(...args) : args[0];
    });

    return result;
}

/**
 * @desc 对象过滤函数（返回新对象，影响远对象）
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object} obj 要循环的对象
 * @param {Function} fn 操作函数
 * @return {Object} 返回结果对象，不影响原对象
 */
export function filter(obj, fn) {
    if (!isObject(obj)) return obj;

    let
        result = Object.assign({}, obj);

    if (!fn) return result;

    forEach(obj, (...args) => {
        let value = fn(...args);
        value === '' && value === 0 || value ? (result[args[1]] = value) : delete result[args[1]];
    });

    return result;
}

/**
 * @desc 对象累加器函数
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object} obj 要迭代的对象
 * @param {Function} fn 操作函数
 * @param {any} initialValue 可选项，可选项，其值用于第一次调用 fn 的第一个参数。
 * @return {any} 操作结果，不影响原对象
 */
export function reduce(obj, fn, initialValue) {
    if (!isObject(obj) && !fn) return initialValue;

    let result = initialValue;

    forEach(obj, (...args) => {
        result = result == null
            ? args[0]
            : fn(result, ...args);
    });

    return result;
}

/**
 * @desc 检测目标对象是否满足条件
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object|String} item 要检测的目标
 * @param {Object|String} factor 满足的条件
 * @return {Boolean} 是否满足条件
 */
export function meetVerify(item, factor) {
    if (typeof item === 'object' && item) {
        return reduce(item, (p, n) => {
            n === factor && (p = true);
            return p;
        }, false);
    } else {
        return item === factor;
    }
}

/**
 * @desc 检测对象是否浅相同
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object} obj 对象(不定参)
 * @return {Boolean} 是否浅相同
 */
export function shallowEqual(...objs) {
    if (objs.length === 0 || !objs.reduce((p, n) => p && isObject(n), true)) { return false; }

    let reference;

    return objs
        .map((obj) => Object.keys(obj))
        .map((keys) => keys.sort())
        .reduce((result, keys, idx) => {
            if (idx === 0) {
                reference = keys;
                return result;
            };

            if (!result) return false;

            if (keys.join() === reference.join()) {
                keys.forEach((key) => {
                    if (objs[idx][key] !== objs[idx - 1][key]) {
                        result = false;
                    }
                });
                return result;
            } else {
                return false;
            }
        }, true);
}

/**
 * @desc 删除目标对象的空值key
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object} obj 要做处理的对象
 * @return {Object} 返回结果对象，不影响原对象
 */
export function delNullValue(obj) {
    if (!isObject(obj)) return obj;

    let
        result = Object.assign({}, obj);

    forEach(result, (value, key) => {
        (value == null || value === '') && delete result[key];
    });

    return result;
}

/**
 * @desc 检测目标对象是否为空对象
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {Object|Number} obj 要检测的目标
 * @return {Boolean} 是否满足条件
 */
export function isNullObject(obj) {
    return typeof obj === 'object' && obj
        ? Array.isArray(obj)
            ? obj.length === 0
            : Object.keys(obj).length === 0
        : false;
}

/**
 * @desc 优选云备注检测算法
 * @author milk
 * @lastModify milk
 * @date 2017-05-25, 14:31:19 GMTCST
 * @param {string} string 要转换的字符串
 * @return template 返回字符串模板
 */

export function templateAnalysis(string) {
    // 链接匹配[数据库](http:sgjhsg)或者[数据库](www:sgjhsg)
    // let reAtag = /\[(.*)\]\(((http:|https:)+.*)\)/g
    let re = /\[([^[\]()]+)\]\(((http:|https:)+[^[\]()]*)\)/g;
    // 着重文字匹配 **大公会**
    let reStrong = /\*\*([^**]+)\*\*/g;
    string = string.replace(re, (str1, str2, str3) => {
        return `<a class="remark-text-atag" href="${str3}" target="_blank">${str2}</a>`;
    });
    // 替换字符串
    string = string.replace(reStrong, ($1, $2) => {
        return `<span class="remark-strong">${$2}</span>`;
    });
    return string;
}

export default {
    isObject,
    forEach,
    map,
    filter,
    reduce,
    meetVerify,
    shallowEqual,
    delNullValue,
    isNullObject,
    templateAnalysis
};
