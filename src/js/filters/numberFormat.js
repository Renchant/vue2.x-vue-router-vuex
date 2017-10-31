import util from 'common/util';

const fixDecimal = util.number.fixDecimal;

/**
 * @desc 数据格式 与最小值比较
 * @author Ivan
 * @lastModify Ivan
 * @data 2017-01-04
 */

export const remainderFun = function(num, point, min) {
    num *= 1;
    min *= 1;

    let result = (min || min === 0) ? (num >= min ? num : min) : num;

    return result.toFixed(point) * 1;
};

// 1,111,111
// 将数值转换为带有,符号的字符串
// export const formatNumber = function(number, rate = 1) {
// let result = parseFloat(number);

//     if (!isNaN(result)) {
//         const num = fixDecimal(result / rate, 2, 'floor'),
//             arr = num.toString().split('.'),
//             val = arr.shift().split('').reverse().reduce((p, n, i, {length}) => {
//                 p.push(n)
//                 if (i%3 === 2 && i < length - 1)  p.push(',')
//                 return p
//             }, []).reverse().join('')

//         arr.unshift(val)

//         return arr.join('.')
//     } else {
//         return number
//     }
// }
//  
export const formatNumber = function(number, rate = 1, format = '@') {
    let value = parseFloat(number);
    let regexp = /(\[[^[]*\])|@+/g;
    let result;

    if (!isNaN(value)) {
        const num = fixDecimal(value / rate, 2, 'floor');
        const arr = num.toString().split('.');
        const val = arr.shift().split('').reverse()
            .reduce((p, n, i, {length}) => {
                p.push(n);
                if (i % 3 === 2 && i < length - 1) p.push(',');
                return p;
            }, [])
            .reverse().join('');

        arr.unshift(val);

        result = arr.join('.');
        return format.replace(regexp, str => ~str.indexOf('[') ? str.slice(1, -1) : result);
    } else {
        return number;
    }
};

// 将数值转换为添加单位的量词
export const numberToUnitStr = function(num, point = 0, min) {
    let i = 0;
    let unitArr = [
        { unit: '亿', size: 100000000 },
        { unit: '万', size: 10000 },
        { unit: '', size: 1 }
    ];

    num = parseFloat(num);
    min = parseFloat(min);

    if (isNaN(num) || num === 0) return '未知';

    function fun(num) {
        let { unit, size } = unitArr[i];
        let n = num / size;
        let lastIndex = unitArr.length - 1;

        if (n < 1) {
            i++;
            // 判断i是否已经到达最后一个
            if (i === lastIndex) {
                return unitArr[lastIndex];
            } else {
                return fun(num);
            }
        }

        return {
            size,
            unit
        };
    }

    let max = (min || min === 0) && num <= min ? min : num;
    let resultUnit = fun(max);

    return `${remainderFun(max / resultUnit.size, point)}${resultUnit.unit}`;
};

// 将数值转换为百分比
export const numberToPercentage = function(num, point = 0, min) {
    num = parseFloat(num);

    if (isNaN(num)) return '0%';

    function fun(num) {
        let pointVal = Math.pow(10, point);

        return (~~(num * 100 * pointVal) / pointVal).toFixed(point);
    }

    return `${remainderFun(fun(num), point, fun(min))}%`;
};

// 金额转换
export const parseMoney = function(num, point) {
    if (point != null) {
        return (num / 100).toFixed(point);
    } else {
        return num / 100;
    }
};


/**
 * @desc 优选云所有价格转换
 * @author milk
 * @lastModify milk
 * @date 2017-02-10
 * @return {Object} 
 * @example 214560089.5 ==> 2,145,600.89(符合特定文案，如何'-1'为未知)
 * @options prize(要转换的金额),type(特定转换文案,是一个对象),rate确定保留几位小数默认100保留两位 
 */
// export const formatPrice = function(prize, type , rate=100) {
//     return type[prize] || formatNumber(prize,rate);
// }
export const formatPrice = function(prize, rate = 100, format = '@') {
    return prize < 0
        ? prize === -2
            ? '不接单'
            : '议价'
        : formatNumber(prize, rate, format);
};

export const formatPerson = function(prize, rate = 1, format = '@') {
    return prize === -1 || prize === 0
        ? '未知'
        : prize === -2
            ? '不接单'
            : formatNumber(prize, rate, format);
};
