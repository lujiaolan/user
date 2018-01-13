<template>
    <div class="position">
        <div class="title-card">
            <div class="title-info-card width5">
                <p>US {{ countData.UserBalance }}</p>
                <p class="title-info-name">余额</p>
            </div>
            <div class="title-info-card width5">
                <p>US {{ countData.UserEquit }}</p>
                <p class="title-info-name">净值</p>
            </div>
            <div class="title-info-card width5">
                <p>US {{ countData.UserMargin }}</p>
                <p class="title-info-name">已用保证金</p>
            </div>
            <div class="title-info-card width5">
                <p>US {{ countData.UserFreeMargin }}</p>
                <p class="title-info-name">可用保证金</p>
            </div>
            <div class="title-info-card width5">
                <p>{{ countData.MarginScale }} %</p>
                <p class="title-info-name">保证金比例</p>
            </div>
        </div>
        <div class="baseListContent">
            <el-tabs v-model="activeName"  style="margin-bottom: 60px">
                <el-tab-pane label="当前持仓" name="positionOrder">
                    <div class="recordSelect">
                        <el-input placeholder="交易账户" v-model="mt4UserId" class="orderSelect"></el-input>
                        <el-button @click="searchPosition">搜索</el-button>
                    </div>
                    <el-table :data="positionOrderData" style="width: 100%;" :show-summary="true"
                              :summary-method="getSummaries">
                        <el-table-column
                            prop="TradeID"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="UserLoginID"
                            label="交易账户">
                        </el-table-column>
                        <el-table-column
                            prop="TradeOpenTime"
                            label="开仓时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            label="交易类型">
                            <template scope="scope">
                                <span v-if="scope.row.TradeCmd === 0">buy</span>
                                <span v-if="scope.row.TradeCmd === 1">sell</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="TradeVolume"
                            label="交易手数">
                        </el-table-column>
                        <el-table-column
                            prop="TradeSymbol"
                            label="交易品种">
                        </el-table-column>
                        <el-table-column
                            prop="Price"
                            label="开仓价格">
                        </el-table-column>
                        <el-table-column
                            prop="TradeSL"
                            label="止损">
                        </el-table-column>
                        <el-table-column
                            prop="TradeTP"
                            label="止盈">
                        </el-table-column>
                        <el-table-column
                            prop="TradeCommission"
                            label="手续费">
                        </el-table-column>
                        <el-table-column
                            prop="TradeStorage"
                            label="隔夜利息">
                        </el-table-column>
                    </el-table>
                    <!--<div class="position-total">-->
                        <!--<span>盈亏合计</span>-->
                        <!--<span>-100</span>-->
                        <!--<span>-10</span>-->
                        <!--<span>1983</span>-->
                    <!--</div>-->
                </el-tab-pane>
            </el-tabs>
        </div>
        <div style="width: 100%;height: 100px;"></div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/position')
</script>
<style>
    @import "../../../static/css/orderCenter.css";
</style>
