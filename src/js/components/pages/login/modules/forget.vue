<!--
 * @desc 忘记密码
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-01-13
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
        .flex-btn-group{
            @include set_wh(100%,auto);
            .row{
                @include set_wh(100%, 50px);
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

                    // 发送验证码
                    .btn-verify-code {
                        padding-top: 0; 
                        padding-bottom: 0;
                        height: 34px;
                    }
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
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 14px;
                }
            }
        }
    }
</style>

<template>
    <div class="flex-friend-template">
        <!-- 用户注册 -->
        <div class="flex-template">
            <div class="flex-btn-group">
                <div class="row">
                    <el-input 
                        placeholder="请输入手机号" 
                        v-model="user.phone"
                        maxlength="11"
                        @change="phoneTip(user.phone)">
                        <template slot="prepend"><i class="el-icon-yxy-shouji"></i></template>
                        </el-input>
                </div>
                <div class="row row-code">
                    <div class="row-code-left">
                        <el-input placeholder="验证码" :maxlength="6" v-model="user.code">
                            <template slot="prepend"><i class="el-icon-yxy-anquan"></i></template>
                        </el-input>
                    </div>
                    <div class="row-code-right">
                        <el-button @click="getPhoneCode"  class="btn-main-blank btn-verify-code" v-countdown:60="showCountdown">发送验证码</el-button>
                    </div>
                </div>
                <div class="row">
                    <el-input 
                        placeholder="请输入密码" 
                        minlength="6" 
                        maxlength="16" 
                        v-model="user.pw" 
                        @copy.native="stopPaste"
                        @paste.native="stopPaste"
                        type="password">
                        <template slot="prepend"><i class="el-icon-yxy-mima"></i></template>
                        </el-input>
                </div>
                 <div class="row">
                    <el-input 
                        @paste.native="stopCopy($event)" 
                        @copy.native="stopPaste"
                        placeholder="请再次输入密码" 
                        minlength="6" 
                        maxlength="16" 
                        v-model="user.pwag" type="password">
                        <template slot="prepend"><i class="el-icon-yxy-mima"></i></template>
                        </el-input>
                </div>
            </div>
            <div class="flex-bottom">
                <div class="row">
                    <el-button @click="forget" class="btn-main">修改密码</el-button>
                </div>
                <div class="row">
                    <span>收不到验证码?</span>
                        <a 
                            target="_blank" 
                            :href="qqService" 
                            class="regest">联系客服</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tip } from 'common/modal';
    import { Input, Button } from 'element-ui';
    import { _verifyUser, _verifyPW, _verifyCode } from 'common/user-verification';
    import CONSTANTS from 'constants';
    import Base64 from 'js-base64';
    import APIS from 'common/api';

    const baseCode = Base64.Base64.encode;
    const API = APIS.common;

    export default {
        components: {
            elInput: Input,
            elButton: Button
        },
        props: [
            'pages'
        ],
        data() {
            return {
                user: {
                    phone: null,
                    pw: null,
                    pwag: null,
                    code: null
                },
                qqService: CONSTANTS.COPYWRITINGS.contactInfo.qqService,
                // 倒计时
                showCountdown: false
            };
        },
        methods: {
            // 禁止复制密码
            stopCopy(e) {
                e.preventDefault();
            },
            stopPaste(event) {
                event.preventDefault();
                return false;
            },
            // 验证手机是否已经注册
            phoneTip(val) {
                let num = val + '';
                if (num.length !== 11) {
                    return;
                }
                let typeNum = true;
                num.split('').forEach(v => {
                    if (isNaN(v)) {
                        typeNum = false;
                    }
                });
                if (!typeNum) {
                    tip({
                        message: '手机号码只能是数字',
                        type: 'error'
                    });
                    return;
                }
                API.checkusername({
                    username: val
                })
                    .done((res) => {
                        !res.data.check && (
                            tip({

                                message: '该手机号还未注册' || res.data.message,
                                type: 'error'
                            })
                        );
                    })
                    .fail((res) => {
                        tip({
                            message: res.message,
                            type: 'error'
                        });
                    });
            },

            // 获取手机验证码
            getPhoneCode() {
                let that = this;
                let phone = that.user.phone;
                if (!phone) {
                    tip({
                        message: '请输入手机号',
                        type: 'error'
                    });
                    return false;
                }
                // let localPhoneCode = window.localStorage.getItem("phoneCode");
                // if(new Date().getTime() - localPhoneCode < 70 * 1000) {
                //     tip({
                //         title: '',
                //         message: '请60秒后再发送验证码',
                //         type: 'success'
                //     })
                //     return false
                // } 

                API.phonecode({
                    phone: phone
                })
                    .done(() => {
                        // window.localStorage.setItem("phoneCode", new Date().getTime());
                        this.showCountdown = true;
                        setTimeout(() => {
                            this.showCountdown = false;
                        }, 60 * 1000);
                        tip({
                            message: '验证码已发送,请查收',
                            type: 'success'
                        });
                    })
                    .fail((res) => {
                        tip({
                            message: res.message,
                            type: 'error'
                        });
                    });
            },

            // 忘记密码
            forget() {
                let that = this;
                let user = that.user;
                let tag = false;

                tag =  _verifyUser(user.phone) && _verifyCode(user.code) && _verifyPW(user.pw, user.pwag);
                if (tag) {
                    API.forgetpassword({
                        username: user.phone,
                        password: baseCode(user.pw),
                        code: user.code
                    })
                        .done((res) => {
                            tip({
                                message: '修改密码成功',
                                type: 'success'
                            });
                            // 用户修改完密码后 跳转登录页
                            that.$router.push({name: 'ad.login.login'});

                        })
                        .fail((res) => {
                            tip({
                                message: res.message,
                                type: 'error'
                            });
                        });
                }
            }

            // 如果用户已经登录 直接跳转商店
            // getCurrentUser () {
            //     let that = this;
            //     API.currentuser({

            //     })
            //     .done( (res, xhr) => {
            //         if(res.data.user_type === -1) {
            //             return false;
            //         }
            //         that.$router.push({name: 'ad.store'})
            //     })
            //     .fail( (res, xhr, e) => {
            //         tip({
            //             title: '',
            //             message: res.message,
            //             type: 'error'
            //         })
            //     })
            // },

        },

        mounted() {
            // this.getCurrentUser();
        }
    };
</script>