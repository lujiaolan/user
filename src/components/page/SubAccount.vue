<template>
    <div class="subAccount">
        <div class="baseTableContent width450">
            <div class="infoList-title">转入操作</div>
            <el-form ref="inCashForm" :model="inCashForm" label-width="80px">
                <el-form-item class="beforeTag">
                    <label>转出账户</label>
                    <el-input class="balanceMoney" v-model="inCashForm.outAccount" disabled="true"></el-input>
                </el-form-item>
                <span class="balanceTag"><span>余额</span>：US $ {{ inCashForm.balance }}</span>
                <span class="availTag"><span>可用保证金</span>：US $ {{ inCashForm.available }}</span>
                <span class="netWorthTag"><span>净值</span>：US $ {{ inCashForm.netWorth }}</span>
                <span class="usedTag"><span>已用保证金</span>：US $ {{ inCashForm.used }}</span>
                <span class="drawTag"><span>本次可出金</span>：US $ {{ inCashForm.draw }}</span>
                <el-form-item class="afterTag">
                    <label>转出金额</label>
                    <el-input v-model="inCashForm.outMoney"></el-input>
                </el-form-item>
                <el-form-item>
                    <label>转入账户</label>
                    <el-input v-model="inCashForm.inAccount"></el-input>
                </el-form-item>
                <span class="noticeTag"><i></i><p>该方式仅限于钱包与个人MT4账户之间内转 , 不适用于客户钱包只见互转。</p></span>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认转账</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/subAccount')
</script>

<style scoped>
    @import "../../../static/css/inTurnFund.css";
</style>
