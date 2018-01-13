<template>
    <div class="modifyLever">
        <div class="baseTableContent width450">
            <div class="infoList-title">账户信息</div>
            <el-form ref="modifyLeverForm" :model="form" label-width="80px">
                <el-form-item>
                    <label>账户</label>
                    <el-select v-model="modifyLeverForm.MT4_Number" placeholder="MT4账户">
                        <el-option label="123423" value="one"></el-option>
                        <el-option label="343451" value="two"></el-option>
                        <el-option label="345345" value="three"></el-option>
                        <el-option label="327567" value="four"></el-option>
                        <el-option label="455673" value="five"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="lever">
                    <label>杠杆</label><el-input class="balanceMoney" v-model="modifyLeverForm.MT4_Lever" disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="baseTableContent width450">
            <div class="infoList-title">修改杠杆</div>
            <el-form ref="changeLeverForm" :model="changeLeverForm" label-width="80px">
                <el-form-item>
                    <label>账户</label>
                    <el-select v-model="changeLeverForm.MT4_Number" placeholder="MT4账户">
                        <el-option label="123423" value="one"></el-option>
                        <el-option label="343451" value="two"></el-option>
                        <el-option label="345345" value="three"></el-option>
                        <el-option label="327567" value="four"></el-option>
                        <el-option label="455673" value="five"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <label>杠杆</label>
                    <el-select v-model="changeLeverForm.MT4_Lever" placeholder="杠杆">
                        <el-option label="1:20" value="one"></el-option>
                        <el-option label="1:50" value="two"></el-option>
                        <el-option label="1:100" value="three"></el-option>
                        <el-option label="1:200" value="four"></el-option>
                        <el-option label="1:400" value="five"></el-option>
                        <el-option label="1:600" value="six"></el-option>
                    </el-select>
                </el-form-item>
                <span class="noticeTag" style="padding-left: 0"><i></i><p style="width: auto">更改杠杆有可能导致账户保证金不足而强制平仓</p></span>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/ModifyLever')
</script>
<style scoped>
    @import "../../../static/css/applyChange.css";
</style>
