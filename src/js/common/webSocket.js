/**
 * @desc webScoket单例
 * @author Ivan
 * @lastModify Ivan
 * @data 2016-09-26
 */

/* global Rainbow */
export default function(url, options) {
    let rainbow = new Rainbow(url);
    let onCbkArr = {};

    let init = function(options = {
        open: () => {
            // do nothing
        },
        message: () => {
            // do nothing
        },
        close: () => {
            // do nothing
        },
        error: () => {
            // do nothing
        }
    }) {
        rainbow
            .on('open', options.open)
            .on('message', (msgType, data) => {
                options.message(msgType, data);
                onCbkArr[msgType] &&
     (Array.isArray(onCbkArr[msgType])
         ? onCbkArr[msgType].forEach(item => { item(msgType, data); })
         : onCbkArr[msgType](msgType, data)
     );
            })
            .on('close', options.close)
            .on('error', options.error);

        rainbow.open();
        return rainbow;
    };

    let send = (...arg) => {
        rainbow.send.apply(arg);
    };

    let on = (msgType, cbk) => {
        onCbkArr[msgType] = cbk;
    };

    return {
        rainbow: init(options),
        send,
        on
    };
};
