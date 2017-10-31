/** ******************
 **  字符串处理工具  ***
 ********************/

import { forEach } from './object';

export function sliceStr(str, maxLen) {
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    var realStr = '';
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
        if (realLength <= maxLen) realStr += str[i];
        else break;
    }
    return realStr;
};

export function strlen(str) {
    if (typeof str !== 'string') return;
    var arr = str.split('');
    return arr.reduce(function(p, n) {
        var charCode = n.charCodeAt(0);
        return p + (charCode >= 0 && charCode <= 128 ? 1 : 2);
    }, 0);
}

/**
 * @desc 生成随机字符串
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2016-09-29
 * @param {Number} 指定返回字符串的长度
 * @return {String} 返回随机的字符串
 */
export function randomChar(l) {
    const x = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let tmp = '';
    for (let i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
}

/**
 * @desc 截取长度
 * @author xshaobaozi
 * @lastModify xshaobaozi
 * @date 2016-10-16
 * @param {str} 字符
 * @param {len} 长度
 * @return {Number} 截取指定文字长度
 */
export function intereption(str, len) {
    if (strlen(str) > len) {
        return sliceStr(str, len);
    }
    return str;
}

/**
 * @desc 解析字符串
 * @author minfive
 * @lastModify Jazzy
 * @date 2017-01-17
 * @param {String} str 需要解析的字符串
 * @return {String} 返回html
 */
export const parseStringToHtml = str => {
    return str.replace(/\n/g, '<br/>');
};

/**
 * @desc url增加参数
 * @author minfive
 * @lastModify minfive
 * @date 2017-05-10, 11:01:24 GMTCST
 * @param {String} url 需要处理的url字符串
 * @return {String} 返回处理后的url字符串
 */
export const addUrlQuery = (url, options = {}, ignores = []) => {
    forEach(options, (value, key) => {
        let symbol = ~url.indexOf('?') ? '&' : '?';

        if (value !== '' && !ignores.find(ignore => key === ignore)) url += `${symbol}${key}=${value}`;
    });

    return url;
};

export default {
    sliceStr,
    randomChar,
    intereption,
    parseStringToHtml,
    addUrlQuery
};
