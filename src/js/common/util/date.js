/** ******************
 **  时间格式化工具  ***
 ********************/

function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

/**
 * @desc 格式化时间
 * @param {Object} value 时间戳 或者时间格式 1786542452200/ 1997,03,05,12,20,58/ Fri Mar 24 2017 15:28:42 GMT+0800 (CST)
 * @return {Object} {
	year: 年份,
	month: 月份,
	date: 日期,
	hours: 小时（24小时制）,
	minutes: 分钟,
	seconds: 秒
 }

 */
export function parse(value) {
    let d = value ? new Date(value * 1) : new Date();

    return {
        year: d.getFullYear().toString(),
        month: fix(d.getMonth() + 1, 2),
        date: fix(d.getDate(), 2),
        hours: fix(d.getHours(), 2),
        minutes: fix(d.getMinutes(), 2),
        seconds: fix(d.getSeconds(), 2)
    };
}

/**
 * @desc 格式化时间
 * @param {String} value 要格式的时间字符串
 * @param {String} format 格式
 * @return {String} 格式化的结果
 *
 * format 说明：
 * ----------------------
 * YY || YYYY 年
 * MM || M 月
 * DD || D 日
 * hh || h 小时
 * mm || m 分钟
 * ss || s 秒
 * 使用[]包裹不处理的字符，如：'YYYY[这是YYYY格式的年]'
 * ----------------------
 */
export function parseDate(value, format = 'YYYY-MM-DD hh:mm:ss') {
    const regexp = /(\[[^[]*\])|Y{2,}|M+|D+|h+|m+|s+/g;

    function pattern(value, len, extra) {
        return extra
            ? value.substr(len * -1)
            : len === value.length
                ? value
                : value * 1;
    }

    let date = parse(value);

    const maps = {
        Y: 'year',
        M: 'month',
        D: 'date',
        h: 'hours',
        m: 'minutes',
        s: 'seconds'
    };

    return format.replace(regexp, str => {
        if (~str.indexOf('[')) return str.slice(1, -1);

        const extra = str[0] === 'Y';
        const len = extra
            ? str.length > 4
                ? 4
                : Math.ceil(str.length / 2) * 2
            : str.length > 2
                ? 2
                : str.length;

        return pattern(date[maps[str[0]]], len, extra);
    });
}

/**
 * @desc 将时间字符串格式化为毫秒数
 * @param {String} str 要格式的时间字符串 1993-07-04/1993,07,04/`1993${string}07${string}04${string}` ${string}为任意字符串
 * @param {Boolean} next 是否向下一天
 * @return {Number} 毫秒数
 */
export function parseDateToMillisecond(str, next) {
    let date;
    date = new Date(str.substring(0, 4), (str.substring(5, 7) - 1), str.substring(8, 10));

    /* if (str.length === 10) {
	    date = new Date(str.substring(0, 4), (str.substring(5, 7) - 1), str.substring(8, 10));
	} else {
	    date = next ? new Date(parseInt(str) + (1000 * 60 * 60 * 24)) : new Date(str);
	}*/
    return next ? (date.getTime() + (1000 * 60 * 60 * 24)) : date.getTime();

}

/**
 * @desc 获取输入时间当天的午夜（当天的开始）时间戳
 * @param {String|Number} 时间格式的字符串 或者 时间戳
 * @return {Number} 毫秒数的时间戳
 */
export function getMidnightTS(param) {
    const date = new Date(param);
    const r = (
        date.setHours(0),
        date.setMinutes(0),
        date.setSeconds(0),
        date.setMilliseconds(0)
    );
    if (isNaN(r)) {
        console.warn(`参数 ${param} 无法转为合法Date对象`);
        return NaN;
    } else {
        return date.getTime();
    }
}

export default {
    parse,
    parseDate,
    parseDateToMillisecond,
    getMidnightTS
};
