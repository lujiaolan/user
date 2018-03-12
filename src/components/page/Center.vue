<template>
    <div class="moreInfo">
        <div class="baseTableContent width100">
            <div class="infoList-title">客户中心</div>
            <el-form labelWidth="100px">
                <el-form-item label="公司官网 :">
                    <el-input v-model="$store.state.companyInfo.websiteEN" disabled></el-input>
                </el-form-item>
                <el-form-item label="联络邮箱 :">
                    <el-input v-model="$store.state.companyInfo.email" disabled></el-input>
                </el-form-item>
                <el-form-item label="在线QQ :">
                    <el-input v-model="$store.state.companyInfo.qq" disabled></el-input>
                </el-form-item>
                <el-form-item label="联络电话 :">
                    <el-input v-model="$store.state.companyInfo.tel" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司地址 :">
                    <el-input v-model="$store.state.companyInfo.apAddressCH" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Center')
</script>
<style scoped>
    @import "../../../static/css/moreInfo.css";
</style>
