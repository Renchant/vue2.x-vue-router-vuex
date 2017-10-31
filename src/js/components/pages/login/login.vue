<!--
 * @desc 登录首页
 * @author xshaobaozi
 * @lastModify xshaobaozi
 * @date 2017-01-11
 -->

<style lang="scss" scoped>
    @charset "utf-8";
    @import '~scss/base';
    @import '~scss/mixins/vertical_align';
    @import '~scss/mixins/features';
    @import '~scss/mixins/img';
    $filePath: '~images/';
    ul{
    list-style: none;
    margin: 0;
    padding-left: 0;
    }
    p{
        margin:0;
    }
    .flex-template{
        position: fixed;
        @include set_wh();
        background-color: rgba(0,0,0,.6);
        @include flex_center(flex-start);
        flex-direction: column;
    }
    .youxuanyun{
        width: 100%;
        min-height: 1000px;
        background-color: #a1d9f2;
        display: flex;
        flex-direction: column;
    }

    /*头部*/
    .yy-header{
        background-color: #fff;
        height: 80px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px 15px 15px;
    }

    .yy-header-title{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }
    .yy-header-logo{
        height: 48px;
        color: #37516c;
        font-size: 25px;
        // padding: 10px;
        font-weight: bold;
        position: relative;
    }
    .yy-header-text{
        height: 48px;
        line-height: 48px;
        border-left: 1px solid #ddd;        
        font-weight: normal;
        margin: 0 0 0 15px;
        padding-left: 15px;
        font-size: 18px;
    }
    .yy-header-login{
        display: inline-block;
        cursor: pointer;
        width: 80px;
        height: 30px;
        background-color: $btn-main-bgc;
        color: $btn-main-fc;
        line-height: 28px;
        text-align: center;
        border: 1px solid $btn-main-bc;
        border-radius: 6px;
        margin-right: 10px;
        font-size: $main-fs;
    }
    .yy-header-login:hover{
        color: $btn-main-fc--hover;
        border-color: $btn-main-bc--hover;
        background-color: $btn-main-bgc--hover;
    }
    .yy-header-register{
        display: inline-block;
        cursor: pointer;
        width: 80px;
        height: 30px;
        border-radius: 4px;
        background-color: $btn-main-blank-bgc;
        color: $btn-main-blank-fc;
        border: 1px solid $btn-main-blank-bc;
        line-height: 28px;
        text-align: center;
        border-radius: 6px;
        font-size: $main-fs;
    }
    .yy-header-register:hover{
        color: $btn-main-blank-fc--hover;
        border-color: $btn-main-blank-bc--hover;
        background-color: $btn-main-blank-bgc--hover;
    }
    .flex-template-content{
        @include set_wh();
        @include bg( './../../../../images/yxy-index-bg.jpg');
        background-size: cover;
        background-position: center;
        @include flex_center();
    }
    .flex-content{
        @include set_wh(300px, auto);
        @include flex_center(flex-start);
        flex-direction: column;
        background-color: #fff;
        border-radius: $b-radius;
        overflow: hidden;
        border: 1px solid $tool-color__level-6;

        // 坑
        padding: 20px 0 10px; 
        
        &>.flex-top-list{
            @include set_wh(100%, 40px);
            ul{
                @include set_wh();
                @include flex_center();
                flex-wrap: nowrap;
                li{
                    @include flex_center();
                    @include set_wh(150px, 40px);
                    border-radius: $b-radius;
                    background-color:  $as-bg-deep-hover;
                    p{
                        font-size: $special-fs;
                    }
                    color: $tool-color__level-6;
                    &.active {
                        color: $special-fc;
                        background-color: $bg-fc !important;
                        font-weight: 500;
                    }
                    &:hover{
                        background-color:  $as-bg-deep-hover;
                    }
                    &.noacitve{
                        border: 1px solid $tool-color__level-5;
                        cursor: not-allowed;
                    }
                }
            }
        }
        &>.flex-center{
            @include set_wh(100%, auto);
        }
    }
</style>

<template>
    <div class="flex-template">
        <div class="yy-header">
            <!-- 头部 -->  
            <div class="yy-header-title">
                <a :href="indexPage"><img class="yy-header-logo" :src="logo" alt="优选云"></a>
                <h3 class="yy-header-text">专注效果的自媒体优选平台</h3>
            </div>
            <div class="yy-header-log">
                <span @click="pushEvent(0)" class="yy-header-login">登录</span>
                <span @click="pushEvent(1)" class="yy-header-register">注册</span>
            </div>
        </div>
        <div class="flex-template-content">
            <div class="flex-content">
                <!-- <div class="flex-top-list">
                    <ul>
                        <li v-for="(item, index) in pages" :class="item.active?'active':'noacitve'" @click="toggle(item)">
                            <p>{{item.lab}}</p>
                        </li>
                    </ul>
                </div> -->
                <div class="flex-center">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import CONSTANTS from 'constants';

    const SEO = CONSTANTS.SEO;
    const logo = require('../../../../images/logo.png');

    export default {
        data() {
            return {
                pages: [
                    {
                        lab: '广告主',
                        active: true,
                        type: 1
                    },
                    {
                        lab: '自媒体',
                        active: false,
                        type: 2
                    }
                ],
                isregister: 0,
                logo,
                indexPage: CONSTANTS.INDEX_PAGE
            };
        },

        computed: {
            ...mapGetters([
                'getAccount'
            ])
        },

        methods: {
            // 切换媒体类型
            // 1为广告主 2为自媒体
            toggle(item) {
                if (item.type !== 1) {
                    // 目前只有自媒体
                    return false;
                }
                // 所以设置为false 然后把当前点击的设置为true
                this.pages.forEach((items) => {
                    items.active = false;
                });
                item.active = true;
            },

            // 切换登录 注册 忘记密码页面
            pushEvent(val) {
                switch (val) {
                case 0:
                    this.$router.push({name: 'ad.login.login'});
                    break;
                case 1:
                    // TODO
                    // tip({
                    //     message: '暂不开放注册~',
                    //     type: 'warning'
                    // })
                    // this.$router.push({name: 'ad.login.registere'})
                    window.open(SEO);
                    break;
                case 2:
                    this.$router.push({name: 'ad.login.forget'});
                    break;
                }
            }
        },

        mounted() {
            // 如果用户已经登录 跳转到媒体商店 
            // -1为 没有登录
            if (this.getAccount.role !== -1) {
                this.$router.push({name: 'ad.store'});
            }
        }
    };
</script>