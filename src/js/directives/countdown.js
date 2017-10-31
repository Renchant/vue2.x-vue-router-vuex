/**
 * @desc 倒计时指令
 * @author minfive
 * @lastModify minfive
 * @date 2017-03-03
 * @return {Object}
 */

function randomChar(l) {
    const x = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let tmp = '';
    for (let i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
}

;(function() {
    let vueCountdown = {};

    vueCountdown.install = function(Vue) {
        Vue.directive('countdown', {
            deep: true,
            acceptStatement: true,
            update(el, binding) {
                let { name, value, oldValue, arg } = binding;

                if (value !== oldValue && value) {
                    if (!el._countdownId) el._countdownId = randomChar(10);

                    let parent = el.parentNode;
                    let floatLayer = document.createElement('div');
                    let querySelect = parent.querySelector(`.v-${name}-float-layer-${el._countdownId}`);

                    if (querySelect) {
                        floatLayer = querySelect;
                    } else {
                        window.getComputedStyle(parent).position === 'static' && (parent.style.position = 'relative');

                        Object.assign(floatLayer.style, {
                            width: el.offsetWidth + 'px',
                            height: el.offsetHeight + 'px',
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 0, 0, .6)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: '#fff',
                            fontSize: '12px',
                            lineHeight: el.offsetHeight + 'px',
                            textAlign: 'center',
                            top: el.offsetTop + 'px',
                            left: el.offsetLeft + 'px'
                        });

                        floatLayer.className = `v-${name}-float-layer-${el._countdownId}`;
                        floatLayer = parent.appendChild(floatLayer);
                    }
                    floatLayer.innerHTML = `${arg--}秒后重新获取`;
                    window.clearInterval(el._countdownTimer);
                    el._countdownTimer = window.setInterval(() => {
                        floatLayer.innerHTML = `${arg--}秒后重新获取`;
                        if (arg === -1) {
                            window.clearInterval(el._countdownTimer);
                            parent.removeChild(floatLayer);
                        }
                    }, 1000);
                }
            }
        });
    };

    /* global Vue define */
    // 当前环境检测与配置
    if (typeof exports === 'object') {
        module.exports = vueCountdown;
    } else if (typeof define === 'function' && define.amd) {
        define([], function() { return vueCountdown; });
    } else if (window.Vue) {
        window.vueCountdown = vueCountdown;
        Vue.use(vueCountdown);
    }
})();
