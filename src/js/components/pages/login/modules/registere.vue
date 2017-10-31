<!--
 * @desc 注册
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
                    maxlength="11"
                    v-model="user.phone"
                    @change="phoneTip(user.phone)">
                        <template slot="prepend"><i class="el-icon-yxy-shouji"></i></template>
                        </el-input>
                </div>
                <div class="row row-code">
                    <div class="row-code-left">
                        <el-input placeholder="验证码" v-model="user.code">
                            <template slot="prepend"><i class="el-icon-yxy-anquan"></i></template>
                        </el-input>
                    </div>
                    <div class="row-code-right">
                        <el-button @click="getPhoneCode"  class="btn-main-blank btn-verify-code" v-countdown:60="showCountdown">发送验证码</el-button>
                    </div>
                </div>
                <div class="row">
                    <el-input placeholder="请输入密码" minlength="6" maxlength="16" v-model="user.pw" type="password">
                        <template slot="prepend"><i class="el-icon-yxy-mima"></i></template>
                        </el-input>
                </div>
                 <div class="row">
                    <el-input placeholder="请再次输入密码" minlength="6" 
                    maxlength="16" v-model="user.pwag" type="password">
                        <template slot="prepend"><i class="el-icon-yxy-mima"></i></template>
                        </el-input>
                </div>
            </div>
            <div class="flex-bottom">
                <div class="row">
                    <el-button @click="registere" class="btn-main">注册</el-button>
                </div>
                <div class="row">
                    <span>已有账号?</span><span @click="toggle" class="regest">{{lab}}登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tip } from 'common/modal';
    import { Input, Button } from 'element-ui';
    import { _verifyUser, _verifyPW, _verifyCode } from 'common/user-verification';
    import util from '@youyoufe/js-util';
    import Base64 from 'js-base64';
    import APIS from 'common/api';

    const storage = util.store.storage;
    const baseCode = Base64.Base64.encode;
    const API = APIS.common;

    export default {

        components: {
            elInput: Input,
            elButton: Button
        },

        computed: {
            lab() {
                let txt = null;
                if (this.$route.name.indexOf('ad') > -1) {
                    txt = '广告主';
                } else {
                    // 后续增加自媒体
                    txt = '广告主';
                }
                return txt;
            }
        },

        data() {
            return {
                user: {
                    phone: null,
                    pw: null,
                    pwag: null,
                    code: null
                },
                showCountdown: false
            };
        },

        methods: {
            // 注册验证手机号
            phoneTip(val) {
                let num = val + '';
                if (num.length !== 11) {
                    return false;
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
                        res.data.check && (
                            tip({
                                message: '已存在该用户' || res.data.message,
                                type: 'warning'
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
                }
                API.phonecode({
                    phone: phone
                })
                    .done(() => {
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

            // 用户注册
            registere() {
                let that = this;
                let user = that.user;
                let tag = false;
                // TODO: 用户注册

                tag =  _verifyUser(user.phone) && _verifyCode(user.code) && _verifyPW(user.pw, user.pwag);

                // 如果验证成功 允许注册
                if (tag) {
                    API.register({
                        username: user.phone,
                        password: baseCode(user.pw),
                        code: user.code
                    })
                        .done((res) => {
                            res.message && tip({
                                message: '注册成功',
                                type: 'success'
                            });
                            storage.set('token', res.data.token);
                            that.getCurrentUser();
                        })
                        .fail((res) => {
                            tip({
                                message: res.message,
                                type: 'error'
                            });
                        });
                }
            },

            // 如果用户已经验证登录 直接跳转商城页
            getCurrentUser() {
                let that = this;
                API.currentuser({

                })
                    .done((res) => {
                        if (res.data.user_type === -1) {
                            return false;
                        }
                        that.$router.push({name: 'ad.store'});
                    })
                    .fail((res) => {
                        tip({
                            message: res.message,
                            type: 'error'
                        });
                    });
            },

            // 跳转登录页
            toggle() {
                this.$router.push({name: 'ad.login.login'});
            }
        },

        mounted() {
            this.getCurrentUser();
        }
    };
</script>