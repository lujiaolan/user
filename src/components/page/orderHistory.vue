<template>
    <div class="history">
        <div class="title-card boxShadow">
            <div class="title-info-card width4">
                <p>{{ countData.TradeVolume }}</p>
                <p class="title-info-name">总交易手数</p>
            </div>
            <div class="title-info-card width4">
                <p>US {{ countData.TradeCommission }}</p>
                <p class="title-info-name">手续费</p>
            </div>
            <div class="title-info-card width4">
                <p>US {{ countData.TradeStorage }}</p>
                <p class="title-info-name">隔夜利息</p>
            </div>
            <div class="title-info-card width4">
                <p>US {{ countData.TradeProfit }}</p>
                <p class="title-info-name">盈亏</p>
            </div>
        </div>
        <div class="baseListContent">
            <el-tabs v-model="activeName" style="margin-bottom: 40px">
                <el-tab-pane label="记录查询" name="orderRecord">
                    <div class="recordSelect">
                        <el-form :model="orderSelect" ref="orderSelect" :rules="orderSelectRules">
                            <el-row>
                                <el-form-item>
                                    <span>查询条件</span>
                                </el-form-item>
                                <el-form-item prop="mt4UserId">
                                    <el-input placeholder="交易账户" v-model="orderSelect.mt4UserId" class="orderSelect"></el-input>
                                </el-form-item>
                                <el-form-item prop="orderRecordValue">
                                    <el-select v-model="orderSelect.orderRecordValue" placeholder="请选择" @change="changeDate">
                                        <el-option
                                            v-for="item in orderRecordOptions"
                                            :key="item.value"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="labelItem">
                                    <span>自定义</span>
                                </el-form-item>
                                <el-form-item prop="orderRecordDate0">
                                    <el-date-picker
                                        :disabled="datePickerVisible"
                                        placeholder="开始时间"
                                        :editable="editableDate"
                                        v-model="orderSelect.orderRecordDate0">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item prop="orderRecordDate1">
                                    <el-date-picker
                                        :disabled="datePickerVisible"
                                        :editable="editableDate"
                                        placeholder="结束时间"
                                        v-model="orderSelect.orderRecordDate1">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item prop="transCurrency">
                                    <el-select v-model="orderSelect.transCurrency" placeholder="请选择">
                                        <el-option
                                            v-for="item in transCurrencyOptions"
                                            :key="item.val"
                                            :value="item.val">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="searchOrderHistory('orderSelect')">搜索</el-button>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </div>
                    <el-table :data="orderHistoryData" style="width: 100%" @sort-change="sortColumn">
                        <el-table-column
                            prop="TradeID"
                            label="订单编号"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="IDName"
                            label="姓名"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="UserLoginID"
                            label="交易账户">
                        </el-table-column>
                        <el-table-column
                            prop="TradeOpenTime"
                            sortable
                            label="开仓时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            label="交易类型"
                            width="">
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
                            prop="TradeOpenPrice"
                            label="开仓价格">
                        </el-table-column>
                        <el-table-column prop="TradeSL/TradeTP" label="止盈/止损">
                            <template scope="scope">
                                <span>{{ scope.row.TradeTP }} / {{ scope.row.TradeSL }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="TradeCloseTime"
                            sortable
                            label="平仓时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="PriceClose"
                            label="平仓价格">
                        </el-table-column>
                        <el-table-column
                            prop="TradeCommission"
                            label="手续费">
                        </el-table-column>
                        <el-table-column
                            prop="TradeStorage"
                            label="隔夜利息">
                        </el-table-column>
                        <el-table-column
                            prop="TradeProfit"
                            label="浮动盈亏">
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="SizeChange" @current-change="currentChange"
                                       :current-page.sync="pageModel.page"
                                       :page-sizes="[10,20,30, 50]" :page-size="pageModel.pageSize"
                                       layout="total, sizes, prev, pager, next, jumper"  :total="totalData">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="货币对统计" name="currencyCount">
                    <el-table :data="currencyCountData" style="width: 100%">
                        <el-table-column
                            prop="TradeSymbol"
                            label="货币对名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            label="交易类型"
                            width="180">
                            <template scope="scope">
                                <span v-if="scope.row.TradeCmd === 0">buy</span>
                                <span v-if="scope.row.TradeCmd === 1">sell</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="TradeVolume"
                            label="交易手数"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="TradeCommission"
                            label="手续费">
                        </el-table-column>
                        <el-table-column
                            prop="TradeStorage"
                            label="隔夜利息">
                        </el-table-column>
                        <el-table-column
                            prop="TradeProfit"
                            label="浮动盈亏">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
module.exports = require('../pageJS/OrderHistory')
</script>

<style scoped>
    @import "../../../static/css/orderCenter.css";
</style>
