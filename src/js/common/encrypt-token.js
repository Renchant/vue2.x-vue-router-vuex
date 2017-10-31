/**
 * @desc token加密函数
 * @param {String} token 要加密的token
 * @param {Object} options 密文携带的参数
 * @return {String} 加密之后的token
 */

import Hashes from 'jshashes';
import { storage } from 'common/util/store';

export default function(options = {}, token = '', timestamp = '') {
    const
        optStr = Object
            .keys(options)
            .sort()
            .reduce((p, n) => {
                if (p === '') {
                    p += `${n}=${options[n]}`;
                } else {
                    p += `|${n}=${options[n]}`;
                }

                return p;
            }, '');

    token === '' && (token = storage.get('token'));
    return (new Hashes.SHA1()).hex(`${token}&${timestamp}&${optStr}`);
}
