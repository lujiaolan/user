<template>
    <div class="wrap">
        <div class="lo-container">
            <div>
                <div class="logo-wrap">
                    <img src="../../../static/img/logo.png"/>
                </div>
                <div class="lang-wrap">
                    <el-dropdown>
                        <el-button type="primary"><img src="../../../static/img/china.png"/>中<i
                            class="el-icon-arrow-down el-icon--right"></i></el-button>
                        <el-dropdown-menu slot="dropdown" class="lang-choice">
                            <el-dropdown-item>
                                <router-link to=""><img src="../../../static/img/china.png"/>英</router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="loginTab">
                <router-link to="login" class="back-login">返回登录</router-link>
                <div class="ms-login real-account">
                    <el-form :model="agentAccountForm" :rules="agentAccountRules" ref="agentAccountForm">
                        <el-form-item prop="referralCode">
                            <label class="label-point">推荐码</label>
                            <el-input v-model="agentAccountForm.referralCode" :disabled="disabledCode"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="IDName">
                            <label class="label-point"><i></i>姓名</label>
                            <el-input v-model="agentAccountForm.IDName"
                                      placeholder="输入真实姓名" @key.native.enter="agentAccountRegister('agentAccountForm')"></el-input>
                        </el-form-item>
                        <el-form-item prop="IDNumber">
                            <label class="label-point"><i></i>身份证</label>
                            <el-input v-model="agentAccountForm.IDNumber"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')" placeholder="请输入18位有效身份证"></el-input>
                        </el-form-item>
                        <el-form-item prop="userPhone">
                            <label class="label-point"><i></i>手机</label>
                            <el-input v-model="agentAccountForm.userPhone"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')" placeholder="输入手机号码"></el-input>

                        </el-form-item>
                        <el-form-item prop="userEmail">
                            <label class="label-point"><i></i>邮箱</label>
                            <el-input v-model="agentAccountForm.userEmail"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')" placeholder="输入邮箱">
                            </el-input>
                            <el-button @click="registerValidate" class="idcode"
                                       v-loading="getIdCodeLoading"
                                       element-loading-spinner="el-icon-loading"
                                       element-loading-background="rgba(0, 0, 0, 0.8)"
                                       :disabled="start">{{ timer + setCode }}</el-button>
                        </el-form-item>
                        <el-form-item prop="validCode">
                            <label class="label-point"><i></i>验证码</label>
                            <el-input v-model="agentAccountForm.validCode"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')"
                                      placeholder="请输入验证码"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <label class="label-point"><i></i>密码</label>
                            <el-input v-model="agentAccountForm.password"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="confirmPwd">
                            <label class="label-point"><i></i>确认密码</label>
                            <el-input v-model="agentAccountForm.confirmPwd"
                                      @key.native.enter="agentAccountRegister('agentAccountForm')" placeholder="再次确认密码"></el-input>
                        </el-form-item>
                        <el-checkbox-group v-model="agentAccountForm.checkDeal" @change="agentAccountDeal" class="confirm">
                            <el-checkbox v-for="item in checkDealList" :key="item.value"  :label="item.label" >
                                <span v-if="item.content"><a :href="item.content" target="_blank">{{item.value}}</a></span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form>
                    <el-button class="realRegister" @click="agentAccountRegister('agentAccountForm')"
                               v-loading="registerRealLoading"
                               element-loading-spinner="el-icon-loading"
                               element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="registerDisabled">接受以上协议并提交
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Agent-Account.js')
</script>
<style scoped="" lang="less">
    .account{
        .el-checkbox-group{
            margin: 16px 68px
        }
    }
</style>

