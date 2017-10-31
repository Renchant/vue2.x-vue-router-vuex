/** *****************
 **  其它操作工具  ***
 *******************/

/**
 * @desc 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
 * @author minfive
 * @lastModify Jazzy
 * @date 2016-10-20
 * @param {Element} element 目标节点
 * @return {Object} 返回与document文档x轴及y轴的距离
 */
export function getPosition(element) {
    let x = 0;
    let y = 0;

    if (!element.tagName) {
        console.warn('element must be a HTML element object');
        return {
            x: null,
            y: null
        };
    }

    while (element !== document.body) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }

    return {
        x: x,
        y: y
    };
}

/**
 * @desc 获取url参数
 * @author xshaobaozi
 * @lastModify xshaobaozi
 * @date 2016-10-16
 * @param {name} 参数
 * @return {Number} 返回参数值
 */
export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = this.window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/* @desc 返回目标基本数据类型
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:37:19 GMTCST
 * @param {any} target 目标
 * @return {String} 基本类型
 */
export function getBaseType(target) {
    const typeStr = Object.prototype.toString.apply(target);

    return typeStr.slice(8, -1);
}

export default {
    getPosition,
    getQueryString,
    getBaseType
};
