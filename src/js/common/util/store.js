/** *****************
 **  存储操作工具  ***
 *******************/

export const storage = {
    set: function(key, value, time) {
        var valid = time * 60 * 1e3;
        var data = {
            value: JSON.stringify(value),
            timestamp: (new Date()).getTime() + valid
        };
        return localStorage.setItem(key, JSON.stringify(data));
    },
    get: function(key) {
        var data = JSON.parse(localStorage.getItem(key));
        return data && data.value ? data.timestamp === null ? JSON.parse(data.value) : (new Date()).getTime() < data.timestamp && JSON.parse(data.value) : !1;
    },
    remove: function(key) {
        localStorage.removeItem(key);
    },
    clear: function() {
        localStorage.clear();
    }
};

export const session = {
    set: function(key, value) {
        const data = {
            value: value
        };
        window.sessionStorage.setItem(key, JSON.stringify(data));
    },
    get: function(key) {
        const data = JSON.parse(window.sessionStorage.getItem(key)) || {};
        return data.value;
    },
    remove: function(key) {
        window.sessionStorage.removeItem(key);
    },
    clear: function() {
        window.sessionStorage.clear();
    }
};

/**
 * @desc 获取cookies
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2016-09-29
 * @param {String} 需要获取的cookie字段名
 * @return {String} 返回cookie的值
 */
export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default {
    storage,
    session,
    getCookie
};
