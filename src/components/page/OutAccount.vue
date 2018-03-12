<template>
    <div class="subAccount">
        <div class="baseTableContent">
            <div class="infoList-title">转出操作</div>
            <el-form ref="outCashForm" :model="outCashForm" label-width="80px" :rules="outCashForm_rules">
                <el-form-item label="转出账户">
                    <el-input class="balanceMoney bgW" v-model="$store.state.user.userinfo.userEmail" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="余额">
                    <el-input disabled="true" class="bgW" v-model="balance"></el-input>
                </el-form-item>
                <el-form-item label="转出金额" prop="outMoney">
                    <el-input v-model="outCashForm.outMoney"></el-input>
                </el-form-item>
                <el-form-item prop="inAccount" label="转入账户">
                    <el-input v-model="outCashForm.inAccount" @key.native.enter="crm2crm('outCashForm')" placeholder="请输入对方电子邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="noticeTag"><i></i><p>该操作将会从您的钱包转出至他人账户，一旦转出将无法追回，请谨慎操作。</p></span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="crm2crm('outCashForm')">确认转账</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    module.exports = require('../pageJS/OutAccount')
</script>
<style scoped>
    @import "../../../static/css/inTurnFund.css";
</style>
