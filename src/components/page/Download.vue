<template>
    <div class="download">
        <div class="baseTableContent width100">
            <div class="infoList-title">MT4下载</div>
            <div class="downloadType">
                <img src="../../../static/img/windows.png"/>
                <p>Windows</p>
                <a :href="$store.state.companyInfo.mt4Win">点击下载</a>
            </div>
            <div class="downloadType">
                <img src="../../../static/img/mac.png"/>
                <p>IOS/iPad</p>
                <a :href="$store.state.companyInfo.mt4IOS">点击下载</a>
            </div>
            <div class="downloadType">
                <img src="../../../static/img/android.png"/>
                <p>Android/Pad</p>
                <a :href="$store.state.companyInfo.mt4An">点击下载</a>
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
