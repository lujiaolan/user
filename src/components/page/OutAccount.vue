<template>
    <div class="subAccount">
        <div class="baseTableContent width450">
            <div class="infoList-title">转出操作</div>
            <el-form ref="outCashForm" :model="outCashForm" label-width="80px" :rules="outCashForm_rules">
                <el-form-item class="afterTag">
                    <label>转出账户</label>
                    <el-input class="balanceMoney" v-model="$store.state.user.userinfo.userEmail" disabled="true"></el-input>
                </el-form-item>
                <el-form-item class="afterTag">
                    <label>余额</label>
                    <el-input disabled="true" v-model="balance"></el-input>
                </el-form-item>
                <el-form-item class="afterTag" prop="outMoney">
                    <label>转出金额</label>
                    <el-input v-model="outCashForm.outMoney"></el-input>
                </el-form-item>
                <el-form-item prop="inAccount" >
                    <label>转入账户</label>
                    <el-input v-model="outCashForm.inAccount" @key.native.enter="crm2crm('outCashForm')" placeholder="请输入对方电子邮箱"></el-input>
                </el-form-item>
                <span class="noticeTag"><i></i><p>该操作将会从您的钱包转出至他人账户，一旦转出将无法追回，请谨慎操作。</p></span>
                <el-form-item>
                    <el-button type="primary" @click="crm2crm('outCashForm')">确认转账</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    module.exports = require('../pageJS/outAccount')
</script>
<style scoped>
    @import "../../../static/css/inTurnFund.css";
</style>
