/** *****************
 **  数值处理工具  ***
 *******************/

/**
 * @desc 对浮点数精准操作
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2017-01-18
 * @param {Number} num 需要精准操作的数字
 * @param {Number} len 精准到多少位小数
 * @param {String} method 精准的规则: 'round' -> 四舍五入; 'floor' -> '向下取整'; 'ceil' -> '向上取整';
 * @return {Number} 返回数字
 */
export function fixDecimal(num, len, method) {
    const val = Number(num);
    if (isNaN(val)) return num;

    const multiple = Math.pow(10, isNaN(len) ? 2 : len);
    const math = Math[ /round|floor|ceil/.test(method) ? method : 'round' ];
    return math(val * multiple) / multiple;
}

export default {
    fixDecimal
};
