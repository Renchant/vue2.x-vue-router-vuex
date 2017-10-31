<!--
 * @desc 广告主登录
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-01-11
 -->

<style lang="scss" scoped>
    @charset "utf-8";
    @import '~scss/base';
    @import '~scss/mixins/vertical_align';
    @import '~scss/mixins/features';
    ul{
    list-style: none;
    margin: 0;
    padding-left: 0;
    }
    p{
        margin:0;
    }
    .flex-friend-template{
        @include set_wh();
    }
    .flex-template{
        background-color: $aid-color__level-1;
        @include set_wh();
        padding: 20px 30px;
    }
    .flex-btn-group{
        @include set_wh(100%,auto);
        .row{
            @include set_wh(100%, 50px);
        }
    }
    .row-code{
        @include flex_center(flex-start, flex-start);
        .row-code-left{
            @include set_wh(120px,35px);
            margin-right: 20px;
        }
        .row-code-right{
            @include set_wh(100px,35px);
            .el-button{
                width: 100%;
            }
        }
    }
    .flex-center{
        @include set_wh(100%,30px);
        color: $main-fc;
        font-size: $main-fs;
    }
    .flex-bottom{
        @include set_wh(100%, 35px * 2);
        .row{
            @include flex_center(flex-start,flex-end);
            @include set_wh(100%,35px);
            .el-button{
                width:100%;
            }
            span{
                font-size: $main-fs;
                margin-right: 10px;
            }
            .regest{
                color: $main-color__light;
            }
        }
    }

    .pointer {
        cursor: pointer;
    }
</style>

<template>
    <div class="flex-friend-template">
        <!-- 用户登录 -->
        <div class="flex-template">
            <div class="flex-btn-group">
                <div class="row">
                    <el-input 
                        placeholder="请输入手机号"
                        type="number" 
                        v-model="user.phone">
                        <template slot="prepend"><i class="el-icon-yxy-shouji"></i></template>
                        </el-input>
                </div>
                <div class="row">
                    <el-input 
                        placeholder="请输入密码" 
                        :minlength="6" 
                        :maxlength="16" 
                        v-model="user.pw"
                        @copy.native="stopPaste"
                        @paste.native="stopPaste"
                        type="password">
                        <template slot="prepend"><i class="el-icon-yxy-mima"></i></template>
                        </el-input>
                </div>
                <div class="row row-code">
                    <div class="row-code-left">
                        <el-input @keyup.enter.native="login" :maxlength="6" placeholder="验证码" v-model="user.code">
                            <template slot="prepend"><i class="el-icon-yxy-anquan"></i></template>
                        </el-input>
                    </div>
                    <div @click="getCode" class="row-code-right" v-loading="loading">
                        <img :src="codeImg">
                    </div>
                </div>
            </div>
            <div class="flex-center">
                <p @click="forget"><span class="pointer">忘记密码?</span></p>
            </div>
            <div class="flex-bottom">
                <div class="row">
                    <el-button @click="login" class="btn-main">登入</el-button>
                </div>
                <div class="row">
                    <span>没有账号?</span><span @click="register" class="regest pointer">广告主注册</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tip } from 'common/modal';
    import { _verifyUser, _verifyPW, _verifyCode } from 'common/user-verification';
    import { mapActions } from 'vuex';
    import { Input, Button } from 'element-ui';
    import { store } from '@youyoufe/js-util';
    import Base64 from 'js-base64';
    import CONSTANTS from 'constants';
    import APIS from 'common/api';

    const storage = store.storage;
    const SEO = CONSTANTS.SEO;
    const baseCode = Base64.Base64.encode;
    const API = APIS.common;

    export default {

        components: {
            elInput: Input,
            elButton: Button
        },

        data() {
            return {
                loading: true,
                codeImg: null,
                user: {
                    phone: null,
                    pw: null,
                    code: null
                }
            };
        },
        methods: {
            ...mapActions(
                'cart',
                [
                    'refreshAllCart'
                ]
            ),

            stopPaste(event) {
                event.preventDefault();
                return false;
            },
            // 用户登录
            login() {
                let that = this;
                let user = that.user;
                let tag = false;

                tag = _verifyUser(user.phone) && _verifyPW(user.pw) && _verifyCode(user.code);
                if (tag) {
                    API.login({
                        username: user.phone,
                        password: baseCode(user.pw),
                        code: user.code
                    })
                        .done((res) => {
                            this.refreshAllCart();
                            that.$router.push({name: 'ad.store'});
                            storage.set('token', res.data.token);
                            tip({
                                message: '登录成功',
                                type: 'success'
                            });
                        })
                        .fail((res) => {
                            if (res.status === 9009) {
                                res.message && tip({
                                    message: '账户已停用',
                                    type: 'error'
                                });
                            } else {
                                res.message && tip({
                                    message: res.message,
                                    type: 'error'
                                });
                            }
                            // 登录失败再次请求验证码
                            that.getCode();
                        });
                }
            },

            // 获取验证码
            getCode() {
                let that = this;
                // 加载图片loading
                this.loading = true;
                API.captcha({
                    length: 4,
                    width: 100,
                    height: 35
                })
                    .done((res) => {
                        that.codeImg = res.data.img;
                        this.loading = false;
                    })
                    .fail(() => {
                        tip({
                            message: '获取验证码出错~',
                            type: 'error'
                        });
                    });
            },

            // 切换注册页面
            register() {
                window.open(SEO);
                // tip({
                //         message: '暂不开放注册~',
                //         type: 'warning'
                //     })
                // this.$router.push({name: 'ad.login.registere'})
            },

            // 切换忘记密码页面
            forget() {
                this.$router.push({name: 'ad.login.forget'});
            }
        },

        mounted() {
            this.getCode();
        }
    };
</script>