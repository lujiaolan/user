<template>
        <div class="baseListContent comPart">
            <el-tabs v-model="activeName" @tab-click="activeChange">
                <el-tab-pane label="结算佣金" name="countCom">
                    <div class="recordSelect">
                        <el-form :model="commissionHandle" ref="commissionHandle" :rules="commissionHandleRules">
                            <el-form-item>
                                <!--<span>查询条件</span>-->
                                <span>交易账户:</span>
                            </el-form-item>
                            <el-form-item prop="mt4Account">
                                <el-input placeholder="交易账户" v-model="commissionHandle.mt4Account"></el-input>
                            </el-form-item>
                            <el-form-item><span style="padding-left: 20px">起始时间:</span></el-form-item>
                            <el-form-item prop="startTime">
                                <el-date-picker
                                    type="date"
                                    v-model="commissionHandle.startTime"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item><span style="padding-left: 20px">结束时间:</span></el-form-item>
                            <el-form-item prop="endTime">
                                <el-date-picker
                                    type="date"
                                    v-model="commissionHandle.endTime"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="searchApplyList('commissionHandle')" style="margin-left: 30px">搜索</el-button>
                                <el-button @click="refreshApplyList">刷新</el-button>
                            </el-form-item>
                            <el-form-item><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列表排序</span></el-form-item>
                            <el-form-item prop="orderValue">
                                <el-select v-model="commissionHandle.orderValue" @change="orderData">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="applyTableData"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @select-all="selectAllVisible"
                        @select="selectVisible">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                type="index"
                                label="序号"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="_id"
                                label="订单编号"
                                width="300">
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
                                    <span v-if="scope.row.TradeCmd ==1">sell</span>
                                    <span v-else>buy</span>
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
                                prop="time"
                                label="时间"
                                width="190">
                            </el-table-column>
                        </el-table>

                    <div class="leftPart">
                        总计：
                        <br/>
                        金额：<span>{{ applyTableData.moneyAmount }}</span>
                        返佣：<span>{{ applyTableData.recordsNum }}</span>笔
                    </div>
                    <div class="leftPart" style="margin-left: 28%;margin-top: 30px">
                        <el-button type="primary" @click="allApply">全部订单申请</el-button>
                        <el-button type="primary" @click="partApply">部分订单申请</el-button>
                    </div>
                    <div class="rightPart">
                        <div>共 {{ applyTableData.totalCountApply }} 页</div>
                        <el-pagination @current-change="applyCurrentChange"
                                       @size-change="applySizeChange"
                                       :current-page.sync="applyPaginationData.page"
                                       :page-count="applyTableData.totalCountApply"
                                       :page-size="applyPaginationData.pageSize"
                                       :page-sizes="[10, 20, 30, 50]"
                                       layout="prev, pager, next,sizes">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <!--<el-tab-pane label="结算记录" name="MT4Count" class="MT4Count">-->
                    <!--<el-tabs v-model="activeName2" type="card" @tab-click="dealStatusChange">-->
                        <!--<el-tab-pane label="等待处理" name="1">-->
                            <!--<el-table :data="dealTableData">-->
                                <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--label="序号"-->
                                    <!--width="80">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="_id"-->
                                    <!--label="订单编号"-->
                                    <!--width="280">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="srcUserLoginID"-->
                                    <!--label="交易账户">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="所属账户"-->
                                    <!--width="230">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.srcUserEmail}} - -->
                                        <!--<span v-if="scope.row.role=='agent'">代理</span>-->
                                        <!--<span v-if="scope.row.role=='commonUser'">直客</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易类型">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.TradeCmd ==1">sell</span>-->
                                        <!--<span v-else>buy</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易情况"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.symbolType}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.volume}}手-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="返佣规则"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.ruleType ==1">固定金额</span>-->
                                        <!--<span v-else>极差返佣</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="money"-->
                                    <!--label="返佣金额">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="applyTime"-->
                                    <!--label="申请时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="handleTime"-->
                                    <!--label="处理时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="状态">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.status==1">审核成功</span>-->
                                        <!--<span v-if="scope.row.status==2">等待审核</span>-->
                                        <!--<span v-if="scope.row.status==-1">审核失败</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                            <!--<div class="leftPart">-->
                                <!--总计：-->
                                <!--<br/>-->
                                <!--金额：<span>{{ dealTableData.moneyAmount }}</span>$-->
                                <!--返佣：<span>{{ dealTableData.recordsNum }}</span>笔-->
                            <!--</div>-->
                            <!--<div class="rightPart">-->
                                <!--<div>共 {{ dealTableData.totalCountApply }} 页</div>-->
                                <!--<el-pagination @current-change="dealCurrentChange"-->
                                               <!--@size-change="dealSizeChange"-->
                                               <!--:current-page.sync="dealPaginationData.page"-->
                                               <!--:page-count="dealTableData.totalCountApply"-->
                                               <!--:page-size="dealPaginationData.pageSize"-->
                                               <!--:page-sizes="[10, 20, 30, 50]"-->
                                               <!--layout="prev, pager, next,sizes">-->
                                <!--</el-pagination>-->
                            <!--</div>-->
                        <!--</el-tab-pane>-->
                        <!--<el-tab-pane label="已完成" name="2">-->
                            <!--<el-table :data="dealTableData">-->
                                <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--label="序号"-->
                                    <!--width="80">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="_id"-->
                                    <!--label="订单编号"-->
                                    <!--width="280">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="srcUserLoginID"-->
                                    <!--label="交易账户">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="所属账户"-->
                                    <!--width="230">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.srcUserEmail}} - -->
                                        <!--<span v-if="scope.row.role=='agent'">代理</span>-->
                                        <!--<span v-if="scope.row.role=='commonUser'">直客</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易类型">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.TradeCmd ==1">sell</span>-->
                                        <!--<span v-else>buy</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易情况"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.symbolType}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.volume}}手-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="返佣规则"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.ruleType ==1">固定金额</span>-->
                                        <!--<span v-else>极差返佣</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="money"-->
                                    <!--label="返佣金额">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="applyTime"-->
                                    <!--label="申请时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="handleTime"-->
                                    <!--label="处理时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="状态">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.status==1">已完成</span>-->
                                        <!--<span v-if="scope.row.status==2">等待处理</span>-->
                                        <!--<span v-if="scope.row.status==-1">失败</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                            <!--<div class="leftPart">-->
                                <!--总计：-->
                                <!--<br/>-->
                                <!--金额：<span>{{ dealTableData.moneyAmount }}</span>$-->
                                <!--返佣：<span>{{ dealTableData.recordsNum }}</span>笔-->
                            <!--</div>-->
                            <!--<div class="rightPart">-->
                                <!--<div>共 {{ dealTableData.totalCountApply }} 页</div>-->
                                <!--<el-pagination @current-change="dealCurrentChange"-->
                                               <!--@size-change="dealSizeChange"-->
                                               <!--:current-page.sync="dealPaginationData.page"-->
                                               <!--:page-count="dealTableData.totalCountApply"-->
                                               <!--:page-size="dealPaginationData.pageSize"-->
                                               <!--:page-sizes="[10, 20, 30, 50]"-->
                                               <!--layout="prev, pager, next,sizes">-->
                                <!--</el-pagination>-->
                            <!--</div>-->
                        <!--</el-tab-pane>-->
                        <!--<el-tab-pane label="失败" name="3">-->
                            <!--<el-table :data="dealTableData">-->
                                <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--label="序号"-->
                                    <!--width="80">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="_id"-->
                                    <!--label="订单编号"-->
                                    <!--width="280">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="srcUserLoginID"-->
                                    <!--label="交易账户">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="所属账户"-->
                                    <!--width="230">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.srcUserEmail}} - -->
                                        <!--<span v-if="scope.row.role=='agent'">代理</span>-->
                                        <!--<span v-if="scope.row.role=='commonUser'">直客</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易类型">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.TradeCmd ==1">sell</span>-->
                                        <!--<span v-else>buy</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易情况"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.symbolType}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.volume}}手-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="返佣规则"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.ruleType ==1">固定金额</span>-->
                                        <!--<span v-else>极差返佣</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="money"-->
                                    <!--label="返佣金额">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="applyTime"-->
                                    <!--label="申请时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="handleTime"-->
                                    <!--label="处理时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="状态">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.status==1">已完成</span>-->
                                        <!--<span v-if="scope.row.status==2">等待处理</span>-->
                                        <!--<span v-if="scope.row.status==-1">失败</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                            <!--<div class="leftPart">-->
                                <!--总计：-->
                                <!--<br/>-->
                                <!--金额：<span>{{ dealTableData.moneyAmount }}</span>$-->
                                <!--返佣：<span>{{ dealTableData.recordsNum }}</span>笔-->
                            <!--</div>-->
                            <!--<div class="rightPart">-->
                                <!--<div>共 {{ dealTableData.totalCountApply }} 页</div>-->
                                <!--<el-pagination @current-change="dealCurrentChange"-->
                                               <!--@size-change="dealSizeChange"-->
                                               <!--:current-page.sync="dealPaginationData.page"-->
                                               <!--:page-count="dealTableData.totalCountApply"-->
                                               <!--:page-size="dealPaginationData.pageSize"-->
                                               <!--:page-sizes="[10, 20, 30, 50]"-->
                                               <!--layout="prev, pager, next,sizes">-->
                                <!--</el-pagination>-->
                            <!--</div>-->
                        <!--</el-tab-pane>-->
                        <!--<el-tab-pane label="全部" name="4">-->
                            <!--<el-table :data="dealTableData">-->
                                <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--label="序号"-->
                                    <!--width="80">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="_id"-->
                                    <!--label="订单编号"-->
                                    <!--width="280">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="srcUserLoginID"-->
                                    <!--label="交易账户">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="所属账户"-->
                                    <!--width="230">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.srcUserEmail}} - -->
                                        <!--<span v-if="scope.row.role=='agent'">代理</span>-->
                                        <!--<span v-if="scope.row.role=='commonUser'">直客</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易类型">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.TradeCmd ==0">buy</span>-->
                                        <!--<span v-if="scope.row.TradeCmd ==1">sell</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="交易情况"-->
                                <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--{{scope.row.symbolType}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.volume}}手-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="返佣规则"-->
                                    <!--width="120">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.ruleType ==1">固定金额</span>-->
                                        <!--<span v-else>极差返佣</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="money"-->
                                    <!--label="返佣金额">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="applyTime"-->
                                    <!--label="申请时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--prop="handleTime"-->
                                    <!--label="处理时间"-->
                                    <!--width="190">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--label="状态">-->
                                    <!--<template scope="scope">-->
                                        <!--<span v-if="scope.row.status==1">已完成</span>-->
                                        <!--<span v-if="scope.row.status==2">等待处理</span>-->
                                        <!--<span v-if="scope.row.status==-1">失败</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                            <!--<div class="leftPart">-->
                                <!--总计：-->
                                <!--<br/>-->
                                <!--金额：<span>{{ dealTableData.moneyAmount }}</span>$-->
                                <!--返佣：<span>{{ dealTableData.recordsNum }}</span>笔-->
                            <!--</div>-->
                            <!--<div class="rightPart">-->
                                <!--<div>共 {{ dealTableData.totalCountApply }} 页</div>-->
                                <!--<el-pagination @current-change="dealCurrentChange"-->
                                               <!--@size-change="dealSizeChange"-->
                                               <!--:current-page.sync="dealPaginationData.page"-->
                                               <!--:page-count="dealTableData.totalCountApply"-->
                                               <!--:page-size="dealPaginationData.pageSize"-->
                                               <!--:page-sizes="[10, 20, 30, 50]"-->
                                               <!--layout="prev, pager, next,sizes">-->
                                <!--</el-pagination>-->
                            <!--</div>-->
                        <!--</el-tab-pane>-->
                    <!--</el-tabs>-->
                <!--</el-tab-pane>-->
            </el-tabs>
        </div>
</template>

<script>
    module.exports = require('../pageJS/commissionSettlement')
</script>

<style >
    @import "../../../static/css/inTurnFund.css";
</style>
