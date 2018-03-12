<template>
    <div class="drawWrap">
        <div>
            <el-dialog :visible.sync="addbankConfigShow"  :title="titleAddbank" class="addBankConfig" :before-close="addBankClose">
                <div class="tipsAddBankCard">提示：每人限绑定5张银行卡</div>
                <el-form :model="bankConfigData" label-width="120px" ref="bankConfigData" :rules="bankConfigData_rules" class="addBank">
                    <el-row>
                        <el-col :span="8 ">
                            <el-form-item label="持卡人姓名：" >
                                <el-input v-model="bankConfigData.cardHolder" disabled class="bgW" @key.native.enter="sumitBankAdd('bankConfigData')"></el-input>
                            </el-form-item>
                            <el-form-item label="开户银行名称：" prop="bankName">
                                <el-input v-model="bankConfigData.bankName" @key.native.enter="sumitBankAdd('bankConfigData')"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行支行：" prop="bankBranch">
                                <el-input v-model="bankConfigData.bankBranch" @key.native.enter="sumitBankAdd('bankConfigData')"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号：" prop="bankCardNumbers">
                                <el-input v-model="bankConfigData.bankCardNumbers" @key.native.enter="sumitBankAdd('bankConfigData')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="15" :offset="1">
                            <el-col :span="10">
                                <label class="bank-img">银行卡正面</label>

                                <el-upload
                                    class="upload-demo"
                                    drag
                                    :before-upload="handleBankUpload"
                                    :on-success="addBankHeadSuccess"
                                    :action="bankCardHeadPicUpload"
                                    multiple
                                    :show-file-list="false">
                                    <i class="el-icon-upload" v-if="!BankimageUrl.BHimg"></i>
                                    <img v-if="BankimageUrl.BHimg" :src="BankimageUrl.BHimg" class="avatar">
                                    <div class="el-upload__text" v-if="!BankimageUrl.BHimg">将文件拖到此处，或<em>点击上传</em></div>
                                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <el-form-item prop="bankCardHeadPic">
                                    <el-input style="display: none;" v-model="bankConfigData.bankCardHeadPic"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <label class="bank-img">银行卡反面</label>

                                <el-upload
                                    class="upload-demo"
                                    drag
                                    :action="bankCardTailPicUpload"
                                    :before-upload="handleBankUpload"
                                    :on-success="addBankTailSuccess"
                                    multiple
                                    :show-file-list="false">
                                    <i class="el-icon-upload" v-if="!BankimageUrl.BTimg"></i>
                                    <img v-if="BankimageUrl.BTimg" :src="BankimageUrl.BTimg" class="avatar">
                                    <div class="el-upload__text" v-if="!BankimageUrl.BTimg">将文件拖到此处，或<em>点击上传</em></div>
                                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <el-form-item prop="bankCardTailPic">
                                    <el-input style="display: none;" v-model="bankConfigData.bankCardTailPic"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button @click="sumitBankAdd('bankConfigData')" type="primary">{{bankAddOrEdit?'修改':'保存'}}</el-button>
                                <el-button @click="cancelBankadd" type="primary">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
        <div class="baseTableContent drawContent">
            <div class="infoList-title">银行卡信息</div>
            <!--<button v-if="!$store.state.myInfoStatus.successFlag" class="succStatus" :disabled="true">无</button>-->
            <el-radio-group v-model="allBank" @change="changeSelectBank" class="addplus" >
                <el-radio-button v-for="item in bankInfo" :label="item.bankCardNumbers" class="bgGray" :class="{ bgBule:item.bgBule }" :disabled="item.bankCardStatus==0||item.bankCardStatus==2">
                    <p class="card-name">{{ item.bankName }}
                        <span v-if="item.bankCardStatus==0" class="Notsuccess">&nbsp;&nbsp;待审核&nbsp;&nbsp;</span>
                        <span v-if="item.bankCardStatus==1" class="oksucces">&nbsp;&nbsp;已通过&nbsp;&nbsp;</span>
                        <span v-if="item.bankCardStatus==2" class="nosuccess">&nbsp;&nbsp;未通过&nbsp;&nbsp;</span>
                    </p>
                    <p class="card-number">{{ item.bankCardNumbers }}</p>
                    <p class="card-owner">{{ item.cardHolder }}</p>
                    <el-button type="warning" class="drawW" @click="delBankCard(item)" v-if="item.importantCard!==1">删除</el-button>
                    <el-button type="primary" class="drawP" @click="modifyBanKCard(item)"
                               v-if="item.importantCard!==1">修改</el-button>

                </el-radio-button>
            </el-radio-group>
            <button v-if="bankCardTotal<5" class="succStatus" style="margin-top: 50px" @click="addbankConfig">
                <i class="el-icon-plus"></i>添加银行卡</button>
        </div>
        <div class="baseTableContent">
            <div class="infoList-title">出金申请表</div>
            <el-form ref="drawForm" :model="drawForm" :rules="drawFormRules"  label-width="120px">
                <el-form-item label="钱包余额">
                    <el-input class="bgW" disabled="disabled" v-model="drawForm.balance"></el-input>
                </el-form-item>
                <el-form-item label="出金方式">
                    <el-select v-model="drawForm.minusType" placeholder="请选择出金方式">
                        <el-option v-for="item in minusTypeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出金金额($)" prop="amount">
                    <el-input v-model.number="drawForm.amount" @key.native.enter="drawMoneySumbit('drawForm')"></el-input>
                </el-form-item>
                <el-form-item label="当前汇率">
                    <el-input class="bgW" v-model="drawForm.currentRate" disabled></el-input>
                </el-form-item>
                <el-form-item label="等值人民币(￥)" prop="flowMoney">
                    <el-input v-model="drawForm.flowMoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名" prop="IDName">
                    <el-input v-model="drawForm.IDName" @key.native.enter="drawMoneySumbit('drawForm')" disabled></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="bankName">
                    <el-input v-model="drawForm.bankName" @key.native.enter="drawMoneySumbit('drawForm')" disabled></el-input>
                </el-form-item>
                <el-form-item label="开户支行" prop="bankBranch">
                    <el-input v-model="drawForm.bankBranch" @key.native.enter="drawMoneySumbit('drawForm')" disabled></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankCardNo">
                    <el-input v-model="drawForm.bankCardNo" @key.native.enter="drawMoneySumbit('drawForm')" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="drawMoneySumbit('drawForm')">确认提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/DrawMoney')
</script>
<style scoped>
    @import "../../../static/css/fundAccess.css";
</style>
