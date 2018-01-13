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
            <el-tabs v-model="activeName" class="loginTab">
                <el-tab-pane label="登录" name="first">
                    <div class="ms-login">
                        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="demo-ruleForm">
                            <el-form-item prop="username">
                                <label class="label-icon ion-email"></label>
                                <el-input v-model="loginForm.username" placeholder="请输入邮箱或手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <label class="label-icon ion-lock"></label>
                                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"
                                          @keyup.enter.native="Login('loginForm')"></el-input>
                            </el-form-item>
                            <div class="confirm">
                                <el-checkbox v-model="remumber.remumber_flag" :checked="remumber.remumber_flag">记住密码</el-checkbox>
                                <router-link to="forget" class="lo-forget">忘记密码？</router-link>
                            </div>
                            <div class="login-btn">
                                <el-button class="lo-submit" type="primary" @click="Login('loginForm')"
                                           v-loading="loginLoading"
                                           element-loading-spinner="el-icon-loading"
                                           element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="loginLoading">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                    <div class="line">
                        <span>其他</span>
                    </div>
                    <div class="user-register">
                        <router-link v-if="/(0)/.test(this.$store.state.domain.domain.domain.openAccountType)" to="AgentAccount">申请成为代理</router-link>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册MT4模拟账户" name="second" v-if="this.$store.state.domain.domain.domain.demoMt4Status==1">
                    <demo-Account></demo-Account>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Login.js')
</script>

