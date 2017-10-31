/**
 * @desc 正则匹配规则
 * @author minfive
 * @lastModify xshaobaozi
 * @data 2016-09-28
 */

export const phone = (str) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/g.test(str);
};
// 检测手机号码
export const mobiePhone = (str) => {
    return /^1(3[0-9]|5[0-9]|7[0678]|8[0-9]|4[57])\d{8}$/g.test(str);
    // return /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/g.test(str);
};

// 验证到纯数字 true
export const isNum = (str) => {
    return /^[0-9]*$/.test(str);
};

// 检测是否为中文
export const isCNChar = (str) => {
    return /^[\u4e00-\u9fa5]+$/.test(str);
};

// 地址规范
export const addressReg = (str) => {
    return str.length >= 6;
};

// 公司电话
export const companyPhone = (str) => {
    return /^[0-9|-]+$/.test(str);
};

// 纳税人识别号
export const taxpayerReg = (str) => {
    return /^[^\u4e00-\u9fa5]{15,20}$/.test(str);
};

// 检测密码是否符合规则
export const password = (str) => {
    return /^.{6,16}$/g.test(str);
};

// 检测是否正整数
export const positveInt = (str) => {
    return /^[0-9]*[1-9][0-9]*$/.test(str);
};
// 检测是否正数
export const positveNum = (str) => {
    return /^[0-9].*$/.test(str);
};
// 匹配整数
export const integerInt = (str) => {
    return /^-?\d+$/.test(str);
};

// 检测是否带有中文字符
export const cnChar = (str) => {
    return /[\u4e00-\u9fa5]+/.test(str);
};

// 检测是否是邮箱地址
export const email = (str) => {
    return /^\w+[@][\w.]+$/.test(str);
};

// 检测是否为null undefined 
export const empty = (str) => {
    if (str === undefined || str === null) {
        return true;
    } else {
        return false;
    }
};

// 检测是否为null undefined ''
export const emptyNull = (str) => {
    if (str === undefined || str === null || str === '') {
        return true;
    } else {
        return false;
    }
};

// 检测是否为http地址
export const http = (str) => {
    return /^((https|http)?:\/\/[^s]*)/g.test(str);
};

export default {
    phone,
    addressReg,
    taxpayerReg,
    companyPhone,
    email,
    isCNChar,
    isNum,
    mobiePhone,
    password,
    positveInt,
    positveNum,
    emptyNull,
    empty,
    integerInt,
    cnChar,
    http
};
