/**
 * @desc Util Object处理工具 测试用例
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-24, 11:55:21 GMTCST
 */

import object from 'common/util/object';

describe('[ Util 对象处理 ]', () => {
	function baseDatasTest(callback) {
		let baseDatas = [null, void 0, 'str', {}, [], 0, () => {}];
		let 
			objectCb = Array.isArray(callback) && callback.length > 1 ? callback[0] : callback,
			otherCb = Array.isArray(callback) && callback.length > 1 ? callback[1] : callback;

		baseDatas.forEach((target) => {
			if (JSON.stringify(target) === '{}') {
				objectCb(target);
			} else {
				otherCb(target);
			}
		});
	}

	// isObject method test
	it('== isObject ==', () => {
		baseDatasTest([
			target => expect(object.isObject(target)).toBe(true),
			target => expect(object.isObject(target)).toBe(false)
		]);
	});

	// forEach method test
	it('== forEach ==', () => {
		baseDatasTest(target => expect(object.forEach(target)).toBe(target));

		let 
			i = 0,
			obj = { a: 1, b: 2 },
			keys = Object.keys(obj);

		object.forEach(obj, (...args) => {
			expect(args[0]).toBe(obj[keys[i]]);
			expect(args[1]).toBe(keys[i]);
			expect(args[2]).toBe(obj);

			i++;
		});

		expect(i).toBe(keys.length);
	});

	// map method test
	it('== map ==', () => {
		baseDatasTest(target => {
			if (typeof target === 'object' && target != null) {
				expect(object.map(target)).not.toBe(target);
			}

			if (target !== undefined) {
				expect(object.map(target)).toEqual(target);
			}
		})

		let 
			i = 0,
			obj = { a: 1, b: 2 },
			keys = Object.keys(obj);

		let result = object.map(obj, (...args) => {
			expect(args[0]).toBe(obj[keys[i]]);
			expect(args[1]).toBe(keys[i]);
			expect(args[2]).toBe(obj);

			i++;
		});
		expect(i).toBe(keys.length);

		Object.keys(result).forEach(key => expect(result[key]).toBeUndefined());

		expect(object.map(obj)).toEqual(obj);
	});

	// filter method test
	it('== filter ==', () => {
		baseDatasTest([
			target => expect(object.filter(target)).toEqual(target),
			target => expect(object.filter(target)).toBe(target)
		]);

		let 
			i = 0,
			obj = { a: 1, b: 2 },
			keys = Object.keys(obj);

		let result = object.filter(obj, (...args) => {
			expect(args[0]).toBe(obj[keys[i]]);
			expect(args[1]).toBe(keys[i]);
			expect(args[2]).toBe(obj);

			i++;
		});

		expect(i).toBe(keys.length);
		expect(Object.keys(result).length).toBeLessThanOrEqual(keys.length);
		expect(result).toEqual({});
		expect(object.filter(obj, value => value)).toEqual(obj);
		expect(object.filter(obj, value => '')).toEqual({});
		expect(object.filter(obj, value => value % 2)).toEqual({ a: 1 });
	});

	// reduce method test
	it('== reduce ==', () => {
		baseDatasTest(target => expect(object.reduce(target)).toBeUndefined());

		let 
			i = 0,
			obj = { a: 1, b: 2 },
			keys = Object.keys(obj);

		let result = object.reduce(obj, (...args) => {
			expect(args[1]).toBe(obj[keys[i]]);
			expect(args[2]).toBe(keys[i]);
			expect(args[3]).toBe(obj);

			i++;

			return args[0] + args[1];
		}, 0);

		expect(i).toBe(keys.length);
		expect(result).toBe(3);

		expect(object.reduce(obj, (initialValue, value) => initialValue + value)).toBe(3);
	});

	// meetVerify method test
	it('== meetVerify ==', () => {
		let obj = {
			a: 1,
			b: 2
		}
		expect(object.meetVerify(obj, 1)).toBe(true);
		expect(object.meetVerify(2, 2)).toBe(true);
	});

	// shallowEqual method test
	it('== shallowEqual ==', () => {
		let fun = object.shallowEqual;

		expect(fun({}, 1)).toBeFalsy();
		expect(fun()).toBeFalsy();
		expect(fun({a: 1}, {a: 1})).toBe(true);
		expect(fun({a: 1}, {b: 1}, {c: 1})).toBeFalsy();
		expect(fun({a: 1, b: 1}, {a: 1, b: 1}, {a: 2, c: 1})).toBeFalsy();
		expect(fun({a: 1, b: 1}, {a: 1, b: 2})).toBeFalsy();
	});

	// delNullValue method test
	it('== delNullValue ==', () => {
		let fun = object.delNullValue;

		baseDatasTest((target) => expect(fun(target)).toEqual(target));
		expect(fun({a: 1, b: '', c: void 0})).toEqual({a: 1});
	});

	// isNullObject method test
	it('== isNullObject ==', () => {
		let fun = object.isNullObject;

		baseDatasTest((target) => {
			if (target && typeof target === 'object') {
				expect(fun(target)).toBe(true);
			} else {
				expect(fun(target)).toBeFalsy();
			}
		})
		expect(fun({a: 1})).toBeFalsy();
		expect(fun([1])).toBeFalsy();
	});

	// templateAnalysis test
	it('== templateAnalysis ==', () => {
		let fun = object.templateAnalysis;

		expect(fun('[aa](http://aa)')).toBe('<a class="remark-text-atag" href="http://aa" target="_blank">aa</a>');
		expect(fun('**aa**')).toBe('<span class="remark-strong">aa</span>');
		expect(fun('[aa](http://bbbb)**cc**')).toBe('<a class="remark-text-atag" href="http://bbbb" target="_blank">aa</a><span class="remark-strong">cc</span>');
	});
})