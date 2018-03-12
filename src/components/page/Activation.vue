<template>
    <div class="activation">
        <div>
            <img src="../../../static/img/activation_ok.png">
            <span>{{ tipVal }}</span>
        </div>
        <p><span>{{ countDownTime }}</span>{{ countDownTip }}</p>
    </div>
</template>
<script>
    module.exports = require('../pageJS/Activation')
</script>
<style type="text/css" rel="stylesheet">
    .activation {
        text-align: center;
        margin-top: 50px;
    }
    .activation > div {
        overflow: hidden;
        display: inline-block;
    }
    .activation > div span {
        display: block;
        float: left;
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
        margin-top: 5px;
    }
    .activation > div img {
        float: left;
    }
</style>
