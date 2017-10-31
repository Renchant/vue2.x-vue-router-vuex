/**
 * @desc filters 其它工具 测试用例
 * @author milk
 * @lastModify milk
 * @date 2017-10-24
 */
import { formatTBUrl } from 'filters/urlFormat.js';

describe( '[ filters 淘宝url处理', () => {
    it( '=== formatTBUrl ===', () => {
        const url = 'http://img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png';
        const o_url = 'https://img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png';
        const url1 = ' img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png';
        const url2 = 'http:// img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png';
        const url3 = 'http:// img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png ';
        const url4 = 'https:// img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png';
        const url5 = 'https:// img.alicdn.com/imgextra/i1/2934922814/TB27Sy2byFTMKJjSZFAXXckJpXa_!!2934922814.png ';

        expect(formatTBUrl(url1)).toEqual(url);
        expect(formatTBUrl(url2)).toEqual(url);
        expect(formatTBUrl(url3)).toEqual(url);
        expect(formatTBUrl(url4)).toEqual(o_url);
        expect(formatTBUrl(url5)).toEqual(o_url);
    });
})