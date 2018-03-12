<template>
    <div style="color: red">
        登录超时,请重新<a @click="reEntry">登录</a>
    </div>
</template>
<script>
    module.exports = require('../pageJS/loginExpires')
</script>
