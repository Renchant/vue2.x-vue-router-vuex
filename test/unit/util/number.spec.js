/**
 * @desc Util Number处理工具 测试用例
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2017-03-22
 */

import { fixDecimal } from 'common/util/number'

describe('[ Util 数字处理 ]', () => {
    const integer = 666
    const str = '6.666'
    const nan = 'IAmPureString'

    // fixDecimal方法
    it('== fixDecimal ==', () => {
        // 参数不合法
        expect(fixDecimal(integer, '3.j2', 'method')).toBe(666)

        // 输入一个能转化成数字的值
        expect(fixDecimal(str, 1, 'floor')).toBe(6.6)

        // 输入一个非数字的值
        expect(fixDecimal(nan, 2, 'round')).toBe(nan)
    })
})