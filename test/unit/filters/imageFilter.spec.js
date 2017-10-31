/**
 * @desc filters 其它工具 测试用例
 * @author Jazzy
 * @lastModify xshaobaozi
 * @date 2017-03-28
 */
import {imageFilter , imageView} from 'filters/imageFilter';

describe( '[ filters 七牛图片格式处理', () =>{
    it( '=== imageFilter ===',() =>{
        const url = 'http://h5img.yyyad.com/1570081-3090c6fbaa0725aa.png';
        const url1 = 'http://h5img.yyyad.com/1570081-3090c6fbaa0725aa.png?fagjsh=1';
        const url_right = 'http://h5img.yyyad.com/1570081-3090c6fbaa0725aa.png?imageMogr2/thumbnail/!638x270r/gravity/Center/crop/638x270/';

        expect(imageFilter(url,638,270,'Center')).toEqual(url_right);
        expect(imageFilter(url,638,270)).toEqual(url_right);
        expect(imageFilter()).not.toBeDefined();
        expect(imageFilter(url1,638,270)).toEqual(url_right);
        expect(imageFilter()).toEqual(undefined);
    })

    it( '=== imageView ===',() =>{
        const url = 'http://h5img.yyyad.com/1570081-3090c6fbaa0725aa.png';
        const url1 = 'http://fs.youxuanyun.com/cdn/1499928055843_b6t/th2.jpeg';
        const url_right = 'http://h5img.yyyad.com/1570081-3090c6fbaa0725aa.png?imageView2/2/w/638/h/270';
        const url1_right = 'http://fs.youxuanyun.com/cdn/1499928055843_b6t/th2.jpeg?imageView2/2/w/638/h/270';
        const url2_right = 'http://h5img.yyyad.com/1570081-3090c6fbaa0725aa.png?imageView2/1/w/638/h/270';
        const url3_right = 'http://fs.youxuanyun.com/cdn/1499928055843_b6t/th2.jpeg?imageView2/1/w/638/h/270';

        expect(imageView(url,638,270,2)).toEqual(url_right);
        expect(imageView(url1,638,270,2)).toEqual(url1_right);
        expect(imageView(url,638,270,1)).toEqual(url2_right);
        expect(imageView(url1,638,270,1)).toEqual(url3_right);
        expect(imageView()).toEqual(undefined);
    })

})