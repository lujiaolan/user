<template>
    <div>
        <div class="title-card boxShadow">
            <div class="title-info-card width3">
                <p>$ {{ this.accounting.formatMoney($store.state.balance.money,'',2) }}</p>
                <p class="title-info-name">账户余额</p>
            </div>
            <div class="title-info-card width3">
                <p>V {{ baseInfo.cur_position_hand_num }}</p>
                <p class="title-info-name">当前持仓手数</p>
            </div>
            <div class="title-info-card width3">
                <p>V {{ baseInfo.all_trans_hand_num }}</p>
                <p class="title-info-name">总交易手数</p>
            </div>
        </div>
        <div class="agentContent">
            <el-card class="card-box boxShadow">
                <div class="card-title">
                    <i class="el-icon-date"></i>
                    <span>推广开户</span>
                </div>
                <div class="card-info no-border">
                    <div>
                        <div class="card-info-img"></div>
                        <p>直客</p>
                        <p v-if="$store.state.user.userinfo.recommendUrl">{{$store.state.user.userinfo.recommendUrl.commonUrl}}</p>
                        <br/>
                        <p>代理</p>
                        <p v-if="$store.state.user.userinfo.recommendUrl">{{$store.state.user.userinfo.recommendUrl.agentUrl}}</p>
                    </div>

                </div>
            </el-card>
            <!--<el-card class="card-box boxShadow">-->
                <!--<div class="card-title">-->
                    <!--<i class="el-icon-date"></i>-->
                    <!--<span>通知公告</span>-->
                <!--</div>-->
                <!--<div class="card-info no-border">-->
                    <!--<div class="news-info"><p>啊是的不是都怪乎UU呀是德国的风格回复哪个环节而要让它有如一日体育台</p><span class="news-date">2017/9/4</span></div>-->
                    <!--<div class="news-info"><p>啊是的不是都怪乎UU呀是德国的风格回复哪个环节而要让它有如一日体育台</p><span class="news-date">2017/9/5</span></div>-->
                    <!--<div class="news-info"><p>啊是的不是都怪乎UU呀是德国的风格回复哪个环节而要让它有如一日体育台</p><span class="news-date">2017/9/6</span></div>-->
                    <!--<div class="news-info"><p>啊是的不是都怪乎UU呀是德国的风格回复哪个环节而要让它有如一日体育台</p><span class="news-date">2017/9/6</span></div>-->
                    <!--<div class="news-info"><p>啊是的不是都怪乎UU呀是德国的风格回复哪个环节而要让它有如一日体育台</p><span class="news-date">2017/9/6</span></div>-->
                <!--</div>-->
            <!--</el-card>-->
        </div>
        <div class="chart-wrap boxShadow chart-one">
            <IEcharts :option="line"></IEcharts>
        </div>
        <div class="chart-wrap boxShadow">
            <IEcharts :option="pie" ></IEcharts>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Home')
</script>
<style scoped lang="less">
</style>
