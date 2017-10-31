/**
 * @desc Util regexp处理工具 测试用例
 * @author xshaobaozi
 * @lastModify xshaobaozi
 * @date 2017-03-27
 */

 import regexp from 'common/util/regexp'

 describe('[ Until 正则处理]', () => {

    it('== mobiePhone ==', () => {
        const _number = 13539717574;
        const _string = '13539717574a'
        expect(regexp.mobiePhone(_number)).toBe(true)
        expect(regexp.mobiePhone(_string)).toBe(false)
    })

    it('== isNum ==', () => {
        const _number_1 = 123;
        const _number_2 = 1.23;
        expect(regexp.isNum(_number_1)).toBe(true)
        expect(regexp.isNum(_number_2)).toBe(false)
    })

    it('== isCNChar ==', () => {
        const _string_1 = '一二三四五';
        const _string_2 = '一二三四五213';
        expect(regexp.isCNChar(_string_1)).toBe(true)
        expect(regexp.isCNChar(_string_2)).toBe(false)
    })

    it('== addressReg ==', () => {
        const _string_1 = '一二三四五六';
        const _string_2 = '一二三四五';
        expect(regexp.addressReg(_string_1)).toBe(true)
        expect(regexp.addressReg(_string_2)).toBe(false)
    })

    it('== companyPhone ==', () => {
        const _string_1 = '84812345';
        const _string_2 = 'asdasd';
        const _string_3 = '阿萨达是213';
        expect(regexp.companyPhone(_string_1)).toBe(true)
        expect(regexp.companyPhone(_string_2)).toBe(false)
        expect(regexp.companyPhone(_string_3)).toBe(false)
    })

    it('== taxpayerReg ==', () => {
        const _number_1 = 123451234512345;
        const _number_2 = 12345123451234512345;
        const _number_3 = 123451234512345123451;
        const _number_4 = 12345123451234;
        expect(regexp.taxpayerReg(_number_1)).toBe(true)
        expect(regexp.taxpayerReg(_number_2)).toBe(true)
        expect(regexp.taxpayerReg(_number_3)).toBe(false)
        expect(regexp.taxpayerReg(_number_4)).toBe(false)
    })

    it('== password ==', () => {
        const _number_1 = 123;
        const _number_2 = 123456;
        const _number_3 = 123456;
        const _number_4 = 12345678901234567;
        expect(regexp.password(_number_1)).toBe(false)
        expect(regexp.password(_number_2)).toBe(true)
        expect(regexp.password(_number_3)).toBe(true)
        expect(regexp.password(_number_4)).toBe(false)
    })

    it('== positveInt ==', () => {
        const _number_1 = 123;
        const _number_2 = 123.1;
        expect(regexp.positveInt(_number_1)).toBe(true)
        expect(regexp.positveInt(_number_2)).toBe(false)
    })

    it('== positveNum ==', () => {
        const _number_1 = 123;
        const _number_2 = 123.1;
        const _number_3 = -123;
        expect(regexp.positveNum(_number_1)).toBe(true)
        expect(regexp.positveNum(_number_2)).toBe(true)
        expect(regexp.positveNum(_number_3)).toBe(false)
    })
    it('== integerInt ==', () => {
        const _number_1 = 123;
        const _number_2 = 123.1;
        const _number_3 = -123;
        expect(regexp.integerInt(_number_1)).toBe(true)
        expect(regexp.integerInt(_number_2)).toBe(false)
        expect(regexp.integerInt(_number_3)).toBe(true)
    })

    it('== cnChar ==', () => {
        const _number_1 = 123;
        const _number_2 = 123 + '一二三';
        expect(regexp.cnChar(_number_1)).toBe(false)
        expect(regexp.cnChar(_number_2)).toBe(true)
    })

    it('== email ==', () => {
        const _string_1 = '418348152@qq.com';
        const _string_2 = '418348152qq.com';
        expect(regexp.email(_string_1)).toBe(true)
        expect(regexp.email(_string_2)).toBe(false)
    })

    it('== empty ==', () => {
        const _string_1 = undefined;
        const _string_2 = null;
        const _string_3 = '';
        expect(regexp.empty(_string_1)).toBe(true)
        expect(regexp.empty(_string_2)).toBe(true)
        expect(regexp.empty(_string_3)).toBe(false)
    })

    it('== emptyNull ==', () => {
        const _string_1 = undefined;
        const _string_2 = null;
        const _string_3 = '';
        const _string_4 = '123';
        expect(regexp.emptyNull(_string_1)).toBe(true)
        expect(regexp.emptyNull(_string_2)).toBe(true)
        expect(regexp.emptyNull(_string_3)).toBe(true)
        expect(regexp.emptyNull(_string_4)).toBe(false)
    })

    it('== http ==', () => {
        const _string_1 = 'http://www.cnblogs.com/zhcncn/p/4330112.html';
        const _string_2 = 'www.cnblogs.com/zhcncn/p/4330112.html';
        expect(regexp.http(_string_1)).toBe(true)
        expect(regexp.http(_string_2)).toBe(false)
    })
 }) 