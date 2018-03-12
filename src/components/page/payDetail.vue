<template>
    <div class="payDetail">
        <!--<p class="title_head">入金详情</p>-->
        <!--支付成功-->
        <!--<el-form :model="payDetail" :rules="payDetail_rules" ref="payDetail" label-width='100px'>-->
            <!--<el-form-item prop="memberid" label="商户ID">-->
                <!--<el-input v-model="payDetail.memberid" disabled=""></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item prop="orderid" label="订单号">-->
                <!--<el-input v-model="payDetail.orderid" disabled=""></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item prop="amount" label="交易金额">-->
                <!--<el-input v-model="payDetail.amount" disabled=""></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item prop="datetime" label="交易时间">-->
                <!--<el-input v-model="payDetail.datetime" disabled=""></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item prop="transaction_id" label="流水号">-->
                <!--<el-input v-model="payDetail.transaction_id" disabled=""></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item prop="returncode" label="交易状态">-->
                <!--<el-input v-model="payDetail.returncode" disabled=""></el-input>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <el-dialog :visible.sync="successPayVisible"  title="支付状态" :before-close="closePayDialog" size="tiny">
            <el-button class="title_head" @click="payFail">支付失败</el-button>
            <el-button class="title_head" @click="paySuccess">支付成功</el-button>
        </el-dialog>
    </div>
</template>
<script>
    module.exports = require('../pageJS/payDetail')
</script>
<style>
    .payDetail{
        width: 470px;
        margin-top: 9%;
        padding: 20px 40px;
        box-shadow: 0 0 10px 2px #f3f3f3;
        border: 1px solid #f3f3f3;
        box-sizing: border-box;
        margin-left: 41%;
        margin-bottom: 5px;
    }
    .title_head{
        text-align: center;
        margin: 13px 10px 25px;
    }
</style>
