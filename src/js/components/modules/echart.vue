<!-- 
    * @desc yxy-echart
    * @author Ivan
    * @lastModify Ivan
    * @data 2016-12-20

    * @param {Object|Array} option echart配置（必填）[当有多种类型数据时应传递数组]
    * @param {Object|Array} data 配置数据
    * @param {String} title chart标题
    * @param {String} prompt 提示语
    * @param {Array} nav 数据类型切换选项卡

    * @methods {Function} 
 -->

<style lang="scss" scoped>
    @import '~scss/base';

    .yxy-echart {
        display: flex;
        flex-direction: column;
        align-self: stretch;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 11px 0;

        #{&} + #{&} {
            margin-left: 30px;
        }
    }
    .echart-style{
        border-radius: $b-radius;
        border: 1px solid $border-color;
        background-color: $aid-color__level-1;
    }

    .yxy-echart__header {
        padding: 0 30px;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        line-height: 30px;

        & + & {
            margin-top: 10px;
        }
    }

    .yxy-echart__select {
        width: 165px;
    }

    .yxy-echart__title {
        color: $special-fc;
        font-size: $special-fs;
        vertical-align: middle;
    }

    .yxy-echart__tooltip {
        margin-right: 15px;
        font-size: 1em;
        vertical-align: middle;
        cursor: pointer;
    }

    .yxy-echart__prompt {
        color: $hint-fc;
        font-size: $main-fs;
        vertical-align: middle;
    }

    .yxy-echart__chart {
        flex: 1;
    }
</style>

<template>
    <div 
        class="yxy-echart"
        :class="{ 'echart-style': hasStyle }">
        <div 
            v-if="title"
            class="yxy-echart__header">
            <p>
                <span 
                    v-if="title" 
                    class="yxy-echart__title"
                    :class="propclass">
                    {{ title }}
                </span>
                <el-popover
                    v-if="tooltip"
                    ref="tooltip"
                    pracement='bottom'
                    trigger='hover'
                    popper-class="el-popover-text" >
                    <div v-html="tooltip"></div>
                </el-popover>
                <i 
                    v-if="tooltip"
                    class="yxy-echart__tooltip el-icon-yxy-explain" v-popover:tooltip></i>
                <span class="yxy-echart__prompt">{{ prompt }}</span>
            </p>
        </div>
        <div v-if="typeList.length > 0" class="yxy-echart__header">
            <el-select 
                class="yxy-echart__select" 
                v-model="nowSelectedType" 
                placeholder="请选择"
                @change="toggleType">
                <el-option
                    v-for="item in typeList"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div :id="echartId" class="yxy-echart__chart"></div>
    </div>
</template>

<script>
    import util from 'common/util';
    import { Select, Option } from 'element-ui';

    const randomChar = util.string.randomChar;
    export default {
        props: {
            propclass: {
                type: String
            },
            hasStyle: {
                type: Boolean,
                default: true
            },
            // echart config
            option: {
                type: [Array, Object],
                default: function() {
                    return {};
                }
            },
            // echart 数据
            data: {
                type: [Object, Array],
                default: function() {
                    return {};
                }
            },
            title: {
                type: String,
                default: ''
            },

            // 问好里面的HTML内容
            tooltip: {
                type: String
            },
            // 问好右侧的内容
            prompt: {
                type: String
            },
            nav: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            typeList: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        },

        components: {
            elSelect: Select,
            elOption: Option
        },

        data() {
            return {
                echartId: randomChar(20),
                echartObj: null,
                nowIndex: 0,
                nowSelectedType: 0,
                isLoadData: false
            };
        },

        methods: {
            _toggleLoading(value) {
                value ? this.echartObj.showLoading() : this.echartObj.hideLoading();
            },

            _setDefaultSelectedType(value) {
                value = value || this.typeList;
                this.nowSelectedType = value[0] ? value[0].value : 0;
            },

            _init() {
                let option;
                this.echartObj = echarts.init(document.getElementById(this.echartId));
                if (this.option instanceof Array) {
                    option = this.option[this.nowIndex];
                } else {
                    option = this.option;
                }

                this.echartObj.setOption(option);

                this.isLoadData && this.setData(this.data);
            },

            toggleType() {
                this.setData(this.data);
            },

            toggleData(item, index) {
                this.nowIndex = index;
                this._init();
                this.setData(this.data);
                this._toggleLoading(this.loading);
            },

            setData(data) {
                this.isLoadData = true;

                if (this.typeList.length > 0) {
                    if (this.nav.length > 0) {
                        this.echartObj.setOption(data[this.nowSelectedType][this.nowIndex]);
                    } else {
                        this.echartObj.setOption(data[this.nowSelectedType]);
                    }
                } else {
                    if (this.nav.length > 0) {
                        this.echartObj.setOption(data[this.nowIndex]);
                    } else {
                        this.echartObj.setOption(data);
                    }
                }
            }
        },

        watch: {
            'data': function(newVal) {
                if (newVal) {
                    this.setData(newVal);
                }
            },

            'loading': function(newVal) {
                this._toggleLoading(newVal);
            },

            'typeList': function(newVal) {
                this._setDefaultSelectedType(newVal);
                this.$nextTick(() => {
                    this._init();
                });
            }
        },

        mounted() {
            this._init();
            this._toggleLoading(this.loading);
            this._setDefaultSelectedType();
        }
    };
</script>