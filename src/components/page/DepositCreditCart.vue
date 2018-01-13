<template>
    <div>
        <div class="infoList-title">电汇银行信息详情</div>
        <div class="pay-content">
            <div class="content-left">
             <el-row>
                 <el-col :offset="2" :span="6" >
                     <el-form :model="teleBankName" label-width="120px">
                         <el-form-item label="Bank Name：">
                             <el-input v-model="teleBankName.bankName"></el-input>
                         </el-form-item>
                         <el-form-item label="Account Name：">
                             <el-input v-model="teleBankName.accountName"></el-input>
                         </el-form-item>
                         <el-form-item label="Bank Account：">
                             <el-input v-model="teleBankName.bankAccount"></el-input>
                         </el-form-item>
                         <el-form-item label="Swift Code：">
                             <el-input v-model="teleBankName.swiftCode"></el-input>
                         </el-form-item>
                         <el-form-item label="汇款凭证：">
                             <el-input v-model="teleBankName.paymentDocument"></el-input>
                         </el-form-item>
                         <el-form-item>
                             <el-button @click="creditCartpay" type="info">提交信息</el-button>
                         </el-form-item>
                     </el-form>
                 </el-col>
                 <el-col :span="10" class="preTips">
                        <pre>
                        重要事项:

                        我们会把您转账的净额数值注入到您的钱包。净额数值是您转账最初金额减去银行间的手续费。

                        我们不收取任何电汇手续费。单笔最低数额是100美元或其他货币等值金额。

                        我们不接受现金至银行汇款方式，请您使用您的银行账户进行入金操作，我们不接收第三方入金。

                        电汇完成后请您保留好您的汇款单上传到我们平台。

                        这会缩短您的电汇入金处理时间，并以最准确快速的方式入账到您在我们的账户中。

                        通常电汇入金需要3-7个工作日，请您耐心等待。
                    </pre>
                 </el-col>
             </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = require('../pageJS/DepositCreditCart')
</script>
<style lang="less" scoped="">

        .preTips{
            color: #0b1418;
            font-size: 18px;
        }
    .content-left{
        .el-form{
            margin-top: 50px;
        }
    }
</style>
