/**
 * @desc 特定table-header渲染mixin
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-03-08
 * @return {Mixin} 混合对象
 */ 

import { randomChar } from 'common/util/string';

export default {
    methods: {
        // 详情内容
        _headerPopoverInnerHtml() {
            return '';
        },

        // 有详情图标
        renderHeader(h, { column, $index }) {
            const ref = randomChar(10);
            let addClassFlag = false;

            setTimeout(() => {
                let ele = document.getElementById(ref);

                if (!ele || addClassFlag) return;

                ele.parentNode.classList.add('table-column__cell--dir-rtl');
                addClassFlag = true;
            });

            return [
                h('el-popover', {
                    ref: ref,
                    attrs: {
                        placement: 'bottom',
                        trigger: 'hover',
                        'visible-arrow': false
                    }
                }, [
                    h('div', {
                        class: 'table__popover',
                        domProps: {
                            innerHTML: this._headerPopoverInnerHtml($index)
                        }
                    })
                ]),
                h('span', {
                    class: 'el-table-header-label',
                    attrs: {
                        id: ref
                    },
                    domProps: {
                        innerHTML: column.label
                    }
                }),
                h('i', {
                    class: 'el-icon-yxy-explain',
                    directives: [
                        {
                            name: 'popover',
                            arg: ref
                        }
                    ]
                })
            ];
        },
        // 无详情图标
        renderHeader2(h, { column }) {
            const ref = randomChar(10);
            let addClassFlag = false;

            setTimeout(() => {
                let ele = document.getElementById(ref);

                if (!ele || addClassFlag) return;

                ele.parentNode.classList.add('table-column__cell--dir-rtl');
                addClassFlag = true;
            });

            return [
                h('span', {
                    attrs: {
                        id: ref
                    },
                    domProps: {
                        innerHTML: column.label
                    }
                })
            ];
        },
        // 居中情况
        renderHeader3(h, { column, $index }) {
            const ref = randomChar(10);
            let addClassFlag = false;

            setTimeout(() => {
                let ele = document.getElementById(ref);

                if (!ele || addClassFlag) return;

                ele.parentNode.classList.add('table-column__cell--dir-rtl');
                addClassFlag = true;
            });

            return [
                h('el-popover', {
                    ref: ref,
                    attrs: {
                        placement: 'bottom',
                        trigger: 'hover',
                        'visible-arrow': false
                    }
                }, [
                    h('div', {
                        class: 'table__popover',
                        domProps: {
                            innerHTML: this._headerPopoverInnerHtml($index)
                        }
                    })
                ]),
                h('span', {
                    class: 'caret-wrapper show-wrap'
                }, [
                    h('i', {
                        class: 'sort-caret ascending'
                    }),
                    h('i', {
                        class: 'sort-caret descending'
                    })
                ]),
                h('span', {
                    class: 'el-table-header-label',
                    attrs: {
                        id: ref
                    },
                    domProps: {
                        innerHTML: column.label
                    }
                }),
                h('i', {
                    class: 'el-icon-yxy-explain',
                    directives: [
                        {
                            name: 'popover',
                            arg: ref
                        }
                    ]
                })
            ];
        }
    }
};
