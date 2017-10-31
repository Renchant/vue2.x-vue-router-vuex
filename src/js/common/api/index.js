/**
 * @desc Ajax方法的封装
 * @author Ivan
 * @lastModify Ivan
 * @date 2016-09-09
 * @return {Object}
 */

import q from 'qwest';
import CONSTANTS from 'constants';
import apis from './list';
import { getCookie } from '../util/store';
import router from '../../router/index';
const PHRASES = CONSTANTS.COPYWRITINGS.api;

function fixMsg(data, status) {
    data.message = PHRASES[status] || data.message || data.msg || '';
    data.msg = data.message;
    return data;
}

function checkApiStatus(status) {
    let result = false;
    const code = [9000, 403];

    if (status instanceof Array) {
        // 多请求
        result = code.reduce((p, n) => {
            !p && (p = code.indexOf(n) > -1);
            return p;
        }, result);
    } else {
        // 单请求
        result = code.indexOf(status) > -1;
    }

    if (result) {
        // 清除用户信息
        router.app.clearCurrentAccount();
        // 跳转到登录页面
        router.replace({ name: 'login' });
    }
}

function Ajax(apis) {
    let obj = {
        requests: [],
        mocks: [],
        strictMode: true
    };

    const deal = function(name) {
        return function(fn) {
            const callback = {};
            const requests = this.requests;
            const strictMode = this.strictMode;
            const mocks = this.mocks;

            if (requests.length || mocks.length) {
                callback[name] = fn;

                this.reset();

                return requests.length ? new Process(requests, callback, strictMode) : new Mock(mocks, callback, strictMode);
            } else {
                return this;
            }
        };
    };

    obj.reset = function() {
        // 重置属性
        this.requests = [];
        this.mocks = [];
        this.strictMode = true;
    };

    obj.setStrictMode = function(bool) {
        this.strictMode = !!bool;
        return this;
    };

    obj.fetch = function(method, url, data, options) {
        const arr = url.split('#');
        let d = data || {};
        const _url = arr.map(function(v) {
            const val = d[v] || v;
            d[v] && delete d[v];
            return val;
        }).join('');
        let opts = options || {};
        opts = Object.assign(opts, {
            cache: true
        });
        method === 'post' && (opts.dataType || (opts.dataType = 'json'));

        this.requests.push({
            method: method,
            url: _url,
            data: d,
            options: opts,
            before: function(xhr) {
                // 执行before回调
                opts.before && opts.before();

                // GET HEAD OPTIONS TRACE 这类方法不需要增加"X-CSRFToken"头
                if (!(/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method))) {
                    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
                }
            }
        });

        return this;
    };

    obj.mock = function(data, delay) {
        this.mocks.push({
            data: data,
            delay: delay || 0
        });

        return this;
    };

    obj.done = deal('done');
    obj.fail = deal('fail');
    obj.always = deal('always');

    Object.assign(obj, apis);

    return obj;
}

function Process(requests, callback, strictMode) {
    let obj = {
        q: undefined,
        callback: {
            done: () => {
                // do nothing
            },
            fail: () => {
                // do nothing
            },
            always: () => {
                // do nothing
            }
        }
    };

    Object.assign(obj.callback, callback);

    obj.done = function(fn) {
        let cb = this.callback;
        cb.done = fn;

        if (requests.length > 1) {
            // 多请求
            this.q.then(function(values) {
                const status = values.reduce(function(p, n) {
                    [].reverse.call(n);

                    let res = fixMsg(n[0], resStatus);
                    let resStatus = res.status;

                    p.push(resStatus);

                    return p;
                }, []);

                checkApiStatus(status);
                if (!strictMode || status.reduce((n, p) => n + p) === 0) {
                    // 只有当所有请求的status为0时，才进入成功处理方法
                    fn(values);
                } else {
                    cb.fail(values);
                }
            });
        } else {
            // 单请求
            this.q.then(function(xhr, response) {
                let res = response;
                const status = res.status;
                res = fixMsg(res, status);

                checkApiStatus(status);
                if (!strictMode || status === 0) {
                    // 只有当status为0时，才进入成功处理方法
                    fn(res, xhr);
                } else {
                    cb.fail(res, xhr);
                }
            });
        }

        return this;
    };

    obj.fail = function(fn) {
        let cb = this.callback;
        cb.fail = fn;

        this.q.catch(function(e, xhr) {
            let res = {message: e};
            const status = xhr.status === 0 ? '-1' : xhr.status;
            res = fixMsg(res, status);
            status !== undefined && checkApiStatus(status);

            fn(res, xhr, e);
        });

        return this;
    };

    obj.always = function(fn) {
        let cb = this.callback;
        cb.always = fn;

        this.q.complete(function() {
            fn();
        });

        return this;
    };

    requests.forEach(function(v) {
        if (obj.q) {
            obj.q = obj.q[v.method](v.url, v.data, v.options, v.before);
        } else {
            obj.q = q[v.method](v.url, v.data, v.options, v.before);
        }
    });

    Object.keys(callback).forEach(function(name) {
        obj[name](callback[name]);
    });

    return obj;
}

// 模拟请求
function Mock(mockslist, callback, strictMode) {
    let obj = {
        callback: {
            done: () => {
                // do nothing
            },
            fail: () => {
                // do nothing
            },
            always: () => {
                // do nothing
            }
        }
    };
    let values = [];
    let delay = 0;
    let status = mockslist.reduce(function(p, n) {
        let res = n.data;
        let resStatus = res.status;
        res = fixMsg(res, resStatus);

        delay += n.delay;

        values.push([res, {}]);

        p.push(resStatus);

        return p;
    }, []);

    Object.assign(obj.callback, callback);

    function timeout(fn, delay) {
        delay > 0 ? setTimeout(fn, delay) : fn();
    }

    obj.done = function(fn) {
        let cb = this.callback;
        cb.done = fn;

        if (!strictMode || status.reduce((n, p) => n + p) === 0) {
            const data = values.length > 1 ? values : values[0][0];
            timeout(function() {
                fn(data, {});
            }, delay);
        }

        return this;
    };

    obj.fail = function(fn) {
        let cb = this.callback;
        cb.fail = fn;

        if (strictMode && status.reduce((n, p) => n + p) !== 0) {
            const data = values.length > 1 ? values : values[0][0];
            timeout(function() {
                fn(data, {});
            }, delay);
        }

        return this;
    };

    obj.always = function(fn) {
        let cb = this.callback;
        cb.always = fn;

        timeout(fn, delay);

        return this;
    };

    Object.keys(callback).forEach(function(name) {
        obj[name](callback[name]);
    });

    return obj;
}

const instantiate = (api) => {
    return Object.keys(api).reduce(function(prev, key) {
        const modules = api[key];
        const terminal = Object.keys(modules).reduce((p, k, index) => {
            return index === 0 ? typeof modules[k] === 'function' : p;
        }, false);

        prev[key] = terminal ? new Ajax(modules) : instantiate(modules);

        return prev;
    }, {});
};

export default instantiate(apis);
