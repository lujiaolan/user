<template>
    <div>
        <div class="modify baseTableContent width450">
            <div class="modify-title infoList-title">申请操作</div>
            <el-form ref="modifyForm" :model="modifyForm" label-width="80px">
                <el-form-item>
                    <label>申请账户</label><el-input class="balanceMoney" v-model="modifyForm.applyAccount" disabled="true"></el-input></el-form-item>
                <el-form-item>
                    <label>推介人</label>
                    <el-input v-model="modifyForm.Recommender"></el-input>
                </el-form-item>
                <el-form-item>
                    <label>代理级别</label>
                    <el-select v-model="modifyForm.agentLever" placeholder="代理级别">
                        <el-option label="一级代理" value="one"></el-option>
                        <el-option label="二级代理" value="two"></el-option>
                        <el-option label="三级代理" value="three"></el-option>
                        <el-option label="四级代理" value="four"></el-option>
                        <el-option label="五级代理" value="five"></el-option>
                    </el-select>
                </el-form-item>
                <span class="noticeTag"><i></i><p>代理级别是数字越大级别越高</p></span>
                <el-form-item>
                    <el-button type="primary">正在开发，敬请期待</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Modify')
</script>

<style scoped>
    @import "../../../static/css/applyChange.css";
</style>
