<template>
    <div class="myInfo">
        <div>
            <div class="box-card">
                <div>
                    <i class="fa fa-user"></i>
                </div>
                <div class="text">
                    <p>{{ transAccount }}</p>
                    <p>交易账户</p>
                </div>
            </div>
            <div class="box-card">
                <div>
                    <i class="fa fa-credit-card-alt"></i>
                </div>
                <div class="text">
                    <p>{{ bankNum }}</p>
                    <p>银行卡</p>
                </div>
            </div>
            <div class="box-card">
                <div>
                    <i class="fa fa-envelope"></i>
                    <!--<i class="fa fa-pencil" @click="openEmail"></i>-->
                </div>
                <div class="text">
                    <p>{{ baseInfo.userEmail }}</p>
                    <p>电子邮箱</p>
                </div>
            </div>
            <div class="box-card">
                <div>
                    <i class="fa fa-mobile"></i>
                    <!--<i class="fa fa-pencil" @click="openPhone"></i>-->
                </div>
                <div class="text">
                    <p>{{ baseInfo.userPhone }}</p>
                    <p>手机号码</p>
                </div>
            </div>
            <div class="baseListContent">
                <i class="fa fa-pencil addAccount" @click="newAccount" v-if="newAccountVisible">&nbsp;&nbsp;添加MT4账户</i>
                <el-tabs v-model="activeName" @tab-click="testTab">
                    <el-tab-pane label="基本信息" name="baseInfo" class="baseInfo">
                        <el-form labelPosition="top" label-width="80px" :model="baseInfo" ref="baseInfo" :rules="rules_userInfo">
                            <el-row>
                                <el-form-item label="姓名" class="item" prop="IDName">
                                    <el-input v-model="baseInfo.IDName"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="国籍" class="item" prop="country">
                                    <el-input v-model="baseInfo.country"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="生日" class="item" prop="birthDay">
                                    <el-date-picker type="date" placeholder="选择出生日期"  v-model="baseInfo.birthDay" class="pickerDate"
                                                    @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="证件号码" class="item" prop="IDNumber">
                                    <el-input v-model="baseInfo.IDNumber" @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="英文名" class="item" prop="userEngName">
                                    <el-input v-model="baseInfo.userEngName" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="城市" class="item" prop="addressSecond">
                                    <el-input v-model="baseInfo.addressSecond"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="持卡人" class="item" prop="cardHolder">
                                    <el-input v-model="baseInfo.cardHolder"  @key.native.enter="onSubmitMyInfo('baseInfo')" disabled=""></el-input>
                                </el-form-item>
                                <el-form-item label="开户行" class="item" prop="bankName">
                                    <el-input v-model="baseInfo.bankName"
                                              @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>

                            </el-row>
                            <el-row>
                                <el-form-item label="拼音" class="item" prop="spell">
                                    <el-input v-model="baseInfo.spell"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="省份" class="item" prop="addressOne">
                                    <el-input v-model="baseInfo.addressOne"@key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="手机" class="item" prop="userPhone">
                                    <el-input v-model="baseInfo.userPhone"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="开户支行" class="item" prop="bankBranch">
                                    <el-input v-model="baseInfo.bankBranch"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>

                            </el-row>
                            <el-row>
                                <el-form-item label="性别" class="item" prop="sex">
                                    <el-input v-model="baseInfo.sex"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="联系地址" class="item" prop="addressDetail">
                                    <el-input v-model="baseInfo.addressDetail"
                                              @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                    <!--<i class="fa fa-pencil" @click="openPhone"></i>-->
                                </el-form-item>

                                <el-form-item label="邮箱" class="item" prop="userEmail">
                                    <el-input v-model="baseInfo.userEmail"
                                              @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                                <el-form-item label="银行卡号" class="item" prop="bankCardNumbers">
                                    <el-input v-model="baseInfo.bankCardNumbers"  @key.native.enter="onSubmitMyInfo('baseInfo')" :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-row>
                            <div class="updateImg">
                                <div>
                                    <label class="upload-name">身份证正面照</label>
                                    <el-form-item prop="IDCardHeadPic">
                                        <el-input  style="display: none" v-model="baseInfo.IDCardHeadPic" @key.native.enter="onSubmitMyInfo('baseInfo')">
                                        </el-input>
                                        <el-upload
                                            class="upload-demo"
                                            drag
                                            :limit="1"
                                            :disabled="isDisabled"
                                            :before-upload="handleInfoUpload"
                                            :on-success="handleIHSuccessPic"
                                            action="http://120.77.55.98/crm/ap/img/upload"
                                            multiple
                                            :show-file-list="false">
                                            <i class="el-icon-upload" v-if="!imageUrl.IHimg"></i>
                                            <img v-if="imageUrl.IHimg" :src="imageUrl.IHimg" class="avatar">
                                            <div class="el-upload__text" v-if="!imageUrl.IHimg">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                                <div>
                                    <label class="upload-name">身份证反面照</label>
                                    <el-form-item prop="IDCardTailPic">
                                        <el-input  style="display: none"  v-model="baseInfo.IDCardTailPic" @key.native.enter="onSubmitMyInfo('baseInfo')">
                                        </el-input>
                                        <el-upload
                                            class="upload-demo"
                                            drag
                                            :disabled="isDisabled"
                                            :limit="1"
                                            :before-upload="handleInfoUpload"
                                            :on-success="handleITSuccessPic"
                                            action="http://120.77.55.98/crm/ap/img/upload"
                                            multiple
                                            :show-file-list="false">
                                            <i class="el-icon-upload" v-if="!imageUrl.ITimg"></i>
                                            <img v-if="imageUrl.ITimg" :src="imageUrl.ITimg" class="avatar">
                                            <div class="el-upload__text" v-if="!imageUrl.ITimg">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                                <div>
                                    <label class="upload-name">银行卡正面照</label>
                                    <el-form-item prop="bankCardHeadPic">
                                        <el-input  style="display: none" v-model="baseInfo.bankCardHeadPic" @key.native.enter="onSubmitMyInfo('baseInfo')">
                                        </el-input>
                                        <el-upload
                                            class="upload-demo"
                                            drag
                                            :disabled="isDisabled"
                                            :limit="1"
                                            :before-upload="handleInfoUpload"
                                            :on-success="handleBHSuccessPic"
                                            action="http://120.77.55.98/crm/ap/img/upload"
                                            :show-file-list="false">
                                            <i class="el-icon-upload" v-if="!imageUrl.BHimg"></i>
                                            <img v-if="imageUrl.BHimg" :src="imageUrl.BHimg" class="avatar">
                                            <div class="el-upload__text" v-if="!imageUrl.BHimg">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                                <div>
                                    <label class="upload-name">银行卡反面照</label>
                                    <el-form-item prop="bankCardTailPic">
                                        <el-input  style="display: none"  v-model="baseInfo.bankCardTailPic" @key.native.enter="onSubmitMyInfo('baseInfo')">
                                        </el-input>
                                        <el-upload
                                            class="upload-demo"
                                            drag
                                            :disabled="isDisabled"
                                            :limit="1"
                                            :before-upload="handleInfoUpload"
                                            :on-success="handleBTSuccessPic"
                                            action="http://120.77.55.98/crm/ap/img/upload"
                                            multiple
                                            :show-file-list="false">
                                            <i class="el-icon-upload" v-if="!imageUrl.BTimg"></i>
                                            <img v-if="imageUrl.BTimg" :src="imageUrl.BTimg" class="avatar">
                                            <div class="el-upload__text" v-if="!imageUrl.BTimg">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </div>
                            <el-form-item class="item-btn">
                                <el-button type="primary" @click="onChangeInfo" v-if="onchangeInfoShow">修改信息</el-button>
                                <el-button @click="onchangeCancel" v-if="!isDisabled">取消修改</el-button>
                                <el-button type="primary" @click="onSubmitMyInfo('baseInfo')" v-if="!isDisabled">提交信息</el-button>
                            </el-form-item>
                        </el-form>
                        <!--<div class="title"><span>证件信息</span><span @click="addBank" style="cursor: pointer">添加银行卡&nbsp;<i class="fa fa-pencil"></i></span></div>-->
                    </el-tab-pane>
                    <el-tab-pane label="我的MT4账户" name="MT4Count">
                        <el-table :data="myAllAccount" style="width: 100%">
                            <el-table-column prop="UserLoginID" label="MT4账户">
                            </el-table-column>
                            <el-table-column prop="UserLerverage" label="杠杆">
                            </el-table-column>
                            <el-table-column prop="UserBalance" label="余额"></el-table-column>
                            <!--<el-table-column label="货币类型">-->
                            <!--<template scope="scope">-->
                            <!--USA-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column prop="UserCredit" label="信用">
                            </el-table-column>
                            <!--<el-table-column prop="type" label="账户类型">-->
                            <!--<template scope="scope">-->
                            <!--<span v-if="scope.row.type==1">主账号</span>-->
                            <!--<span v-if="scope.row.type==0">标准账户</span>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column prop="UserEquit" label="净值">
                            </el-table-column>
                            <el-table-column prop="UserMargin" label="已用保证金">
                                <template></template>
                            </el-table-column>
                            <el-table-column prop="UserFreeMargin" label="可用保证金"></el-table-column>
                            <el-table-column prop="" label="预付款比例"></el-table-column>
                            <el-table-column prop="" label="浮动盈亏"></el-table-column>
                            <el-table-column label="操作" class-name="lastCol" width="380">
                                <template scope="scope">
                                    <el-button size="small" class="blue-button"
                                               @click="resetPwd(scope.row)">修改密码</el-button>
                                    <el-button size="small" class="yellow-button"
                                               @click="changeLever(scope.row)">修改杠杆</el-button>
                                    <el-button size="small" class="red-button"
                                               @click="inTurn(scope.row)">资金内转</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-dialog title="资金转账" :visible.sync="inTurnVisible" size="tiny" :before-close="closeDialog">
                <el-form :model="inTurnForm" label-width="100px" ref="inTurnForm" :rules="inTurnForm_rules">
                    <el-form-item prop="outAccount" label="转出账户">
                        <el-select v-model="inTurnForm.outAccount" @change="getBalance">
                            <el-option :value="item" :key="item" :label="item" v-for="item in accountCheckList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户余额">
                        <span>{{ accountBalance }}</span>
                    </el-form-item>
                    <el-form-item prop="inAccount" label="转入账户">
                        <el-select v-model="inTurnForm.inAccount">
                            <el-option :value="item" :key="item" :label="item" v-for="item in accountCheckList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="deposit" label="转入金额">
                        <el-input v-model="inTurnForm.deposit" @key.native.enter="inTurnConfirm('crmToMt4')" style="width: 217px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="inTurnConfirm('inTurnForm')"
                                   v-loading="inTurnLoading"
                                   element-loading-spinner="el-icon-loading"
                                   element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="inTurnLoading">确认</el-button>
                        <el-button @click="inTurnCancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog  >
            <el-dialog title="修改密码" :visible.sync="visibleResetPwd" size="tiny" :before-close="closeDialog">
                <el-form :model="resetPwdForm" label-width="80px" :rules="resetPWd_rules" ref="resetPwdForm">
                    <el-form-item label="账户" prop="UserLoginID">
                        <el-input v-model="resetPwdForm.UserLoginID" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="UserPwd">
                        <el-input v-model="resetPwdForm.UserPwd" placeholder="请输入密码" @key.native.enter="resetUserPwd('resetPwdForm')"></el-input>
                    </el-form-item>
                    <el-form-item label="更新" prop="UserInvestPwdCheck">
                        <el-radio-group v-model="resetPwdForm.UserInvestPwdCheck">
                            <el-radio :label='0'>主密码</el-radio>
                            <el-radio :label='1'>观摩密码</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetUserPwd('resetPwdForm')">确认修改</el-button>
                        <el-button type="" @click="visibleResetPwd=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="修改杠杆" :visible.sync="modifyLevelVisible" size="tiny" class="modifyLevel" :before-close="closeDialog">
                <el-form :model="modifyLevel" label-width="50px" ref="modifyLevel" :rules="modifyLevelRules">
                    <el-form-item label="账户" prop="mt4UserId">
                        <el-input v-model="modifyLevel.UserLoginID" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="杠杆" prop="UserLeverage">
                        <el-select v-model="modifyLevel.UserLeverage">
                            <el-option v-for="level in levelList" :key="level.value" :label="level.label" :value="level.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="noBottom">
                        <el-button type="info" @click="checkModifyLevel('modifyLevel')" :disabled="changeLeverVisible">修改杠杆</el-button>
                        <el-button type="" @click="cancelModifyLevel">取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="changeLeverVisible" class="noBottom">
                        <span style="font-size: 12px;color: #ff5353">等待杠杆修改审核成功</span>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="创建MT4交易账户" :visible.sync="mtDialogVisible" class="mt4Dialog" :before-close="closeDialog">
                <el-form :model="mt4ApplyInfo" label-width="100px" label-position="left" ref="mt4ApplyInfo" :rules="mt4ApplyInfo_rules">
                    <el-form-item label="杠杆" prop="UserLeverage">
                        <el-select v-model="mt4ApplyInfo.UserLeverage" @key.native.enter="confirmMT4Apply('mt4ApplyInfo')">
                            <el-option v-for="level in levelList" :key="level.value" :label="level.label" :value="level.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        总共可以开通5个账户,您还可以开通 <span style="color:red;">{{canApplyMt4}}</span>账户
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" @click="confirmMT4Apply('mt4ApplyInfo')"
                                   v-loading="MT4ApplyLoading"
                                   element-loading-spinner="el-icon-loading"
                                   element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="MT4ApplyLoading">确认申请</el-button>
                        <el-button size="small" type="" @click="cancelMT4Apply">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>


<script>
    module.exports = require('../pageJS/MyAgentInfo')
</script>

<style  scoped="" lang="less">
    .pickerDate
    {
        width: 100%!important;
    }
    @import "../../../static/css/myinfo.css";
</style>
