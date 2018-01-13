<template>
    <div>
        <el-card class="comCard1">
            <div>
                <h4>佣金统计</h4>
                <el-table :data="tableData">
                    <el-table-column
                        prop="monthStat"
                        label="月份">
                    </el-table-column>
                    <el-table-column
                        label="返佣">
                        <template scope="scope">
                            {{ scope.row.commissionAmount }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.amount }}笔
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <div class="chart-wrap">
                    <IEcharts :option="pancake" style="height: 350px"></IEcharts>
                </div>
            </div>
        </el-card>
        <el-card class="comCard2">
            <h4>佣金明细</h4>
                <div class="recordSelect">
                    <el-form :model="commissionSelect" ref="commissionSelect" :rules="commissionSelectRules">
                        <el-form-item prop="mt4Account">
                            <el-input placeholder="MT4账户名" v-model="commissionSelect.mt4Account" style="display: inline-block;width: 196px"></el-input>
                        </el-form-item>
                        <el-form-item><span>结算状态：</span></el-form-item>
                        <el-form-item prop="statusValue">
                            <el-select v-model="commissionSelect.statusValue" placeholder="请选择">
                                <el-option
                                    v-for="item in options1"
                                    :key="item.statusValue"
                                    :label="item.label"
                                    :value="item.statusValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="timeType">
                            <el-select v-model="commissionSelect.timeType">
                                <el-option
                                    v-for="item in options2"
                                    :key="item.timeType"
                                    :label="item.label"
                                    :value="item.timeType">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="commHistoryDate0">
                            <el-date-picker
                                v-model="commissionSelect.commHistoryDate0" placeholder="年-月-日">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="commHistoryDate1">
                            <el-date-picker
                                v-model="commissionSelect.commHistoryDate1" placeholder="年-月-日">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchCommHistory('commissionSelect')">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table :data="commHistoryData" style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="_id"
                        label="订单编号"
                        width="280">
                    </el-table-column>
                    <el-table-column
                        prop="srcUserLoginID"
                        label="交易账户">
                        <template scope="scope">
                            <span>{{scope.row.srcUserLoginID}} -</span>
                            <span>{{scope.row.srcIDName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="交易类型">
                        <template scope="scope">
                            <span v-if="scope.row.TradeCmd==0">buy</span>
                            <span v-if="scope.row.TradeCmd==1">sell</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="symbolType"
                        label="交易种类">
                    </el-table-column>
                    <el-table-column
                        prop="volume"
                        label="交易手数">
                    </el-table-column>
                    <el-table-column
                        width="120"
                        label="返佣规则">
                        <template scope="scope">
                            <span v-if="scope.row.ruleType==1">固定 - {{ scope.row.commissionMoney }} / 手</span>
                            <span v-else>极差 - {{ scope.row.commissionMoney }} / 手</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="返佣金额">
                    </el-table-column>
                    <el-table-column
                        prop="applyTime"
                        width="190"
                        label="申请时间">
                    </el-table-column>
                    <el-table-column
                        prop="handleTime"
                        width="190"
                        label="处理时间">
                    </el-table-column>
                    <el-table-column
                        label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.status==1">已结算</span>
                            <span v-if="scope.row.status==2">等待处理</span>
                            <span v-if="scope.row.status==-1">结算失败</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="rightPart" style="margin: 20px 0">
                    <div>共 {{ commHistoryData.totalCountApply }} 页</div>
                    <el-pagination @current-change="historyCurrentChange"
                               @size-change="historySizeChange"
                               :current-page.sync="historyPaginationData.page"
                               :page-count="commHistoryData.totalCountApply"
                               :page-size="historyPaginationData.pageSize"
                               :page-sizes="[10, 20, 30, 50]"
                               layout="sizes, prev, pager, next, jumper">
                    </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    module.exports = require('../pageJS/commissionHistory')
</script>

<style >
    @import "../../../static/css/inTurnFund.css";
</style>
