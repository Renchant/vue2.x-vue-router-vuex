/**
 * @desc Util 其它工具 测试用例
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2017-03-22
 */

import other from 'common/util/other'

describe('[ Util 其它处理 ]', () => {
    it('== getPosition ==', () => {
        const body = document.body
        const div = document.createElement('div')
        const p = document.createElement('p')
        const ul = document.createElement('ul')
        const li = document.createElement('li')

        // 添加样式
        body.setAttribute(
            'style',
            [
                'position: relative',
                'width: 300px',
                'height: 50px',
                'margin: 10px',
                'padding: 10px'
            ].join(';')
        )
        div.setAttribute(
            'style',
            [
                'width: 300px',
                'height: 50px',
                'margin: 20px',
                'padding: 10px'
            ].join(';')
        )
        p.setAttribute(
            'style',
            [
                'width: 150px',
                'height: 50px',
                'margin: 10px'
            ].join(';')
        )
        ul.setAttribute(
            'style',
            [
                'position: relative',
                'width: 100px',
                'height: 20px',
                'padding: 5px'
            ].join(';')
        )
        li.setAttribute(
            'style',
            [
                'width: 50px',
                'height: 10px'
            ].join(';')
        )

        div.appendChild(p)
        ul.appendChild(li)
        body.appendChild(div)
        body.appendChild(ul)

        expect(other.getPosition(p)).toEqual( { x: 50, y: 50 } )

        expect(other.getPosition(li)).toEqual( { x: 15, y: 125 } )

        expect(other.getPosition({})).toEqual( { x: null, y: null } )
    });

    it('== getQueryString ==', () => {
        let newObj = {
            window: {
                location: {
                    search: '?refer=FrontendMagazine'
                }
            }
        };

        let fun = other.getQueryString.bind(newObj);
        expect(fun('refer')).toEqual('FrontendMagazine');
        expect(fun('other')).toBeFalsy();
    });

    it('== getBaseType ==', () => {
        let baseDataArr = [
            {
                value: {},
                type: 'Object'
            },
            {
                value: '',
                type: 'String'
            },
            {
                value: [],
                type: 'Array'
            },
            {
                value: null,
                type: 'Null'
            },
            {
                value: void 0,
                type: 'Undefined'
            },
            {
                value: 0,
                type: 'Number'
            }
        ];

        baseDataArr.forEach(baseData => {
            expect(other.getBaseType(baseData.value)).toBe(baseData.type);
        });
    });
});