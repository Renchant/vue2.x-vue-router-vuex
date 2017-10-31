/**
 * @desc Util date处理工具 测试用例
 * @author milk
 * @lastModify milk
 * @date 2017-03-24
 */

 import { 
        parse , 
        parseDate, 
        parseDateToMillisecond, 
        getMidnightTS 
    } from 'common/util/date' 

 describe( 'test for [util 日期自定义格式化] date.js' , () => {
 	const expect6 = 1786550400000;
 	const expect7 = 1786464000000;


 	it( 'test for === parse ===' , () => {
        const dateNull = {
            date: "25",
            hours: "18",
            minutes: "30",
            month: "05",
            seconds: "25",
            year: "2017"
        }
        expect( parse(1495708225112) ).toEqual( dateNull )
 	})

    it( ' === parseDate ===', () => {
        const _time = 1495682303280;
        expect( parseDate(_time) ).toBe('2017-05-25 11:18:23');
        expect( parseDate(_time, 'YYYY-MM-DD hh:mm') ).toBe('2017-05-25 11:18');
        expect( parseDate(_time, 'YYYY-MM-DD hh') ).toBe('2017-05-25 11');
        expect( parseDate(_time, 'YYYY-MM-DD') ).toBe('2017-05-25');
        expect( parseDate(_time, 'YYYY-MM') ).toBe('2017-05');
        expect( parseDate(_time, 'YYYY-M') ).toBe('2017-5');
        expect( parseDate(_time, 'YYYY/MM/DD hh:mm') ).toBe('2017/05/25 11:18');
        expect( parseDate(_time, 'YYYY/MM/DD hh:mm') ).toBe('2017/05/25 11:18');
        expect( parseDate(_time, 'YYYY/MM/DD hh:mm[日]') ).toBe('2017/05/25 11:18日');
        expect( parseDate(_time, 'YYYYYY/MMMM/DD hh:mm[日]') ).toBe('2017/05/25 11:18日');
    })

 	it( 'test for === parseDateToMillisecond ===' , () => {
 		//默认不传入回调
        expect(parseDateToMillisecond('2026-08-12',true)).toBe(expect6)
        expect(parseDateToMillisecond('2026-08-12')).toBe(expect7)
    })

    it( '=== getMidnightTS ===' , () => {
        const 
            _time = 1495694341799,
            _timeParse = 1495641600000;

        expect( getMidnightTS(_time) ).toBe(_timeParse);
        expect( getMidnightTS( 'test' ) ).toBeNaN();
        
    })

 })