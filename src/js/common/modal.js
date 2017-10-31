/**
 * @desc 弹窗操作工具类
 * @author Ivan
 * @lastModify Ivan
 * @data 2016-09-28
 */

import util from '@youyoufe/js-util';
import { Message } from 'element-ui';
import CONSTANTS from 'constants';

const regexp = util.regexp;
const API_ERROR_MES = CONSTANTS.COPYWRITINGS.api;

export const tip = function(msg = {title: 'title', message: 'message', type: 'success'}, cb) {
    Message({
        message: msg.message,
        customClass: `yxy-message yxy-message--${msg.type || 'error'}`,
        type: msg.type || 'error',
        showClose: true,
        onClose: cb || (() => {
            // do something
        })
    });

    return false;
};

export const message = function(options, type = 'error') {
    const baseMsg = {
        error: '错误',
        success: '成功',
        info: '通知',
        warning: '警告'
    };

    let msg = typeof options === 'string' ? options : options.message ||
        API_ERROR_MES[options.status] ||
        options.msg ||
        options.text ||
        baseMsg[type];

    tip(Object.assign(options, {
        type,
        message: msg
    }));
};

/**
 * @desc 验证提示条
 * 使用方式： verifyTip(  require.Placements, 'emptyNull', { message: '请选择投放位置'}, true)
    @return {string} 验证文本
    @return {string} 验证函数名
    @return {obj} 弹窗类型 提示文案 
    @return {bool} true弹出提示 还是false弹出提示 默认false

 */
export const verifyTip = function(
    str,
    verify = undefined,
    msg = { type: 'error', message: '请输入正确格式', duration: 1000},
    tipTag = false) {
    // 验证正确使用
    if (verify === undefined || str === undefined) {
        return false;
    } else if (!regexp[verify]) {
        console.log('查一下函数名先啦~');
        return false;
    }
    const notic = () => {
        Message({
            message: msg.message,
            type: msg.type || 'error',
            customClass: `yxy-message yxy-message--${msg.type || 'error'}`,
            showClose: true,
            duration: msg.duration || 1500
        });
    };

    // 验证匹配
    // 验证str是否符合 正则 
    let tag = regexp[verify](str);
    switch (tipTag) {
    case true:
        if (tag === true) {
            notic();
        }
        break;
    case false:
        if (tag === false) {
            notic();
        }
        break;
    }

    if (tag === tipTag) {
        return false;
    } else {
        return true;
    }
};
