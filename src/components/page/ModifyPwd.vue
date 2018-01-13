<template>
    <div class="modifyPwd">
        <div class="baseTableContent width450">
        <div class="infoList-title">修改CRM密码</div>
            <el-form ref="resetCRMPwdForm" :model="resetCRMPwdForm" :rules="resetCRMPwdForm_rule"  label-width="60px">
                <el-form-item prop="currentPwd">
                    <label>当前密码</label>
                    <el-input v-model="resetCRMPwdForm.currentPwd" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="setPwd">
                    <label>设置密码</label>
                    <el-input v-model="resetCRMPwdForm.setPwd" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <label>确认密码</label>
                    <el-input v-model="resetCRMPwdForm.password" placeholder="请再次输入新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="modifyPWD('resetCRMPwdForm')">修改密码</el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/ModifyPwd')
</script>
<style scoped>
    @import "../../../static/css/applyChange.css";
</style>
