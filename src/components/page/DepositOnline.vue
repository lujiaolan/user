<template>
    <div class="depositePayWay">
        <el-row>
            <el-col :span="6">
                <el-form :model="depositForm" :rules="depositFormRules" ref="depositForm"
                         label-width="130px">
                    <el-form-item label="支付通道" prop="payWay">
                        <el-select v-model="depositForm.payWay">
                            <el-option v-for="item in payWayList" :label="item.label" :key="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="nameThreePaPay" label="支付方式">
                        <el-cascader
                            placeholder="请选择支付通道"
                            :options="threePartyNameList"
                            v-model="depositForm.nameThreePaPay">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="当前钱包余额" prop="balance">
                        <el-input v-model="depositForm.balance" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="入金金额($)" prop="amount">
                        <el-input v-model.number="depositForm.amount" @key.native.enter="submitForm('depositForm')"></el-input>
                    </el-form-item>
                    <el-form-item label="当前汇率" prop="currentRate">
                        <el-input v-model="depositForm.currentRate" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="等值人民币" prop="order_amount">
                        <el-input v-model="depositForm.order_amount" disabled=""></el-input>
                    </el-form-item>
                    <!--汇潮支付-->
                    <el-form-item prop="bankCode" label="选择银行" v-if="HCInfoShow=='HC'"  @key.native.enter="submitForm('depositForm')">
                        <el-select v-model="depositForm.bankCode" placeholder="请选择银行">
                            <el-option v-for="bank in bankCodeList" :value="bank.value" :key="bank.value" :label="bank.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('depositForm')" class="formBtn">
                            去支付
                        </el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>
<script>
    module.exports = require('../pageJS/DepositOnline')
</script>
<style scoped="" lang="less">
    .depositePayWay{
        .el-select{
            width: 100%;
        }
        .el-radio{
            margin: 20px 10px;
        }
    }

</style>
