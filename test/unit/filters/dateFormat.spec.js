/**
 * @desc Util regexp处理工具 测试用例
 * @author xshaobaozi
 * @lastModify xshaobaozi
 * @date 2017-03-27
 */

 import {
        formatDate
    } from 'filters/dateFormat'

 describe('[ Until 时间过滤处理]', () => {

    it('== formatDate ==', () => {
        const _time = '1495682303280'

        expect( formatDate(_time) ).toBe('2017-05-25 11:18:23');
        expect( formatDate(_time, 'YYYY-MM-DD hh:mm') ).toBe('2017-05-25 11:18');
        expect( formatDate(_time, 'YYYY-MM-DD hh') ).toBe('2017-05-25 11');
        expect( formatDate(_time, 'YYYY-MM-DD') ).toBe('2017-05-25');
        expect( formatDate(_time, 'YYYY-MM') ).toBe('2017-05');
        expect( formatDate(_time, 'YYYY/MM/DD hh:mm') ).toBe('2017/05/25 11:18');
        expect( formatDate(null) ).toBe('未知');
        expect( formatDate() ).toBe('未知');
        //传输 非法值 返回当前时间 成功
        // expect( normalParseFDate(null) ).toBe('2017-03-29 09:58');
        
    })
 }) 