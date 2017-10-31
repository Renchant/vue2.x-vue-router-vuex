/**
 * @desc filters 其它工具 测试用例
 * @author Jazzy
 * @lastModify milk
 * @date 2017-03-28
 */
import {
    remainderFun,
    formatNumber, 
    formatPrice,
    numberToUnitStr,
    numberToPercentage,
    parseMoney
} from 'filters/numberFormat';

describe( '[ filters 数值格式处理过滤器' ,() =>{
    // remainderFun method test
    it('== remainderFun ==', () => {
        const numArr = [
            {
                num: 123453400.46,
                point: 2,
                min: void 0,
                real: 123453400.46
            },
            {
                num: 1234.4444,
                point: 2,
                min: 1300.5555,
                real: 1300.56
            },
            {
                num: 123453400.46,
                point: 2,
                min: 0,
                real: 123453400.46
            }
        ];

        numArr.forEach((target) => {
            expect(remainderFun(target.num, target.point, target.min)).toBe(target.real);
        });
    });

    // formatNumber filter test
    it('== formatNumber ==', () => {
        const numArr = [
            {
                num: 123453400.46,
                rate: 100,
                format: '￥@',
                real: '￥1,234,534'
            },
            {
                num: 4517620.56,
                rate: 10,
                format: '@元',
                real: '451,762.05元'
            },
            {
                num: 451762000.56,
                rate: 1000,
                format: '@',
                real: '451,762'
            },
            {
                num: '4517620.56px',
                rate: 10,
                real: '451,762.05'
            },
        ];

        numArr.forEach((target) => {
            expect(formatNumber(target.num, target.rate, target.format)).toBe(target.real);
        });

        expect(formatNumber({})).toEqual({});
    });

    // numberToUnitStr filter test
    it('== numberToUnitStr ==', () => {
        let numArr = [
            {
                num: 4321432143,
                point: void 0,
                min: void 0,
                real: '43亿'
            },
            {
                num: 4321432143,
                point: 0,
                min: void 0,
                real: '43亿'
            },
            {
                num: 4321432143,
                point: 2,
                min: void 0,
                real: '43.21亿'
            },
            {
                num: 11099,
                point: 1,
                min: void 0,
                real: '1.1万'
            },
            {
                num: 1299.183,
                point: 1,
                min: void 0,
                real: '1299.2'
            },
            {
                num: 0,
                point: void 0,
                min: void 0,
                real: '未知'
            },
            {
                num: 1,
                point: 0,
                min: void 0,
                real: '1'
            },
            {
                num: 1,
                point: 0,
                min: 5.6,
                real: '6'
            }
        ];

        numArr.forEach((target) => {
            expect(numberToUnitStr(target.num, target.point, target.min)).toBe(target.real);
        });
    });

    // numberToPercentage filter test
    it('== numberToPercentage ==', () => {
        const numArr = [
            {
                num: 0.4214214,
                point: 2,
                min: void 0,
                real: '42.14%'
            },
            {
                num: 0.4214214,
                point: 2,
                min: 0.22,
                real: '42.14%'
            },
            {
                num: 0.4214214,
                point: 2,
                min: 0.55,
                real: '55%'
            },
            {
                num: void 0,
                point: void 0,
                min: void 0,
                real: '0%'
            }
        ];

        numArr.forEach((target) => {
            expect(numberToPercentage(target.num, target.point, target.min)).toBe(target.real);
        });
    });

    // parseMoney filter test
    it('== parseMoney ==', () => {
        expect(parseMoney(321332, 2)).toBe('3213.32');
        expect(parseMoney(321332)).toBe(3213.32);
    });

    // formatPrice filter test
    it('== formatPrice ==', ()=>{
        const 
            rate_1 = 100,
            prize_1 = 123453400.46,
            prize_real1 = '1,234,534';
        expect(formatPrice( prize_1, rate_1 )).toEqual( prize_real1 );
        expect(formatPrice( -1, rate_1 )).toEqual('议价');
        expect(formatPrice( -2, rate_1 )).toEqual('不接单');
    });
});