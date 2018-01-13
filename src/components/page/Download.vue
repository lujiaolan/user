<template>
    <div class="download">
        <div class="baseTableContent width450">
            <div class="infoList-title">MT4下载</div>
            <div class="downloadType">
                <img src="../../../static/img/windows.png"/>
                <p>Windows</p>
                <el-button>点击下载</el-button>
            </div>
            <div class="downloadType">
                <img src="../../../static/img/mac.png"/>
                <p>IOS/iPad</p>
                <el-button>点击下载</el-button>
            </div>
            <div class="downloadType">
                <img src="../../../static/img/android.png"/>
                <p>Android/Pad</p>
                <el-button>点击下载</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Download')
</script>
<style scoped>
    @import "../../../static/css/moreInfo.css";
</style>
