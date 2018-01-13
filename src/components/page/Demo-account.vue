<template>
    <div>
        <div class="ms-login">
            <el-form :model="demoAccountForm" :rules="demoAccountRules" ref="demoAccountForm">
                <el-form-item prop="IDName">
                    <el-input v-model="demoAccountForm.IDName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item prop="UserEmail">
                    <el-input placeholder="邮箱" v-model="demoAccountForm.UserEmail" @key.native.enter="demoAccountRegister('demoAccountForm')"></el-input>
                </el-form-item>
                <el-form-item prop="UserPhone">
                    <el-input v-model="demoAccountForm.UserPhone" placeholder="手机号"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="mt4register" @click="demoAccountRegister('demoAccountForm')"
                       v-loading="registerMt4Loading"
                       element-loading-spinner="el-icon-loading"
                       element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="registerMt4Loading">注册</el-button>
        </div>
        <div class="line">
            <span>其他</span>
        </div>
        <div class="user-register">
            <router-link v-if="agentRegisterShow" to="AgentAccount">申请成为代理</router-link>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Demo-account.js')
</script>

