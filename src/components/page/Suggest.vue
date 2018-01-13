<template>
    <div class="suggest">
        <div class="baseTableContent width450">
            <div class="infoList-title">投诉建议</div>
            <el-form ref="suggestForm" :model="suggestForm">
                <el-form-item>
                    <el-input type="textarea" v-model="suggestForm.desc" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Suggest')
</script>
<style scoped>
    @import "../../../static/css/moreInfo.css";
</style>
