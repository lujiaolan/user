<template>
    <div class="depositWrap">
        <div>选择支付的方式</div>
        <el-tabs type="border-card">
            <el-tab-pane label="在线入金">
                <deposit-online></deposit-online>
            </el-tab-pane>
            <el-tab-pane label="电汇">
                <deposit-creditCart></deposit-creditCart>
            </el-tab-pane>
            <el-tab-pane label="信用卡">
                <deposit-tele></deposit-tele>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    module.exports = require('../pageJS/Deposit.js')
</script>

<style>
    @import "../../../static/css/fundAccess.css";
</style>
