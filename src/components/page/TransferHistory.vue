<template>
    <div class="baseListContent">
        <el-tabs v-model="transActiveName">
            <el-tab-pane label="记录查询" name="transComplete">
                <div class="recordSelect">
                    <el-form :model="recordSelect" ref="recordSelect" :rules="recordSelectRules">
                        <el-row>
                            <el-form-item>
                                <span>查询条件</span>
                            </el-form-item>
                            <el-form-item prop="transCompValue">
                                <el-select v-model="recordSelect.transCompValue" @change="changeDate">
                                    <el-option
                                        v-for="item in transCompOptions"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="labelItem">
                                <span>订单编号</span>
                            </el-form-item>
                            <el-form-item prop="billNum">
                                <el-input class="orderNum" v-model="recordSelect.billNum"></el-input>
                            </el-form-item>
                            <el-form-item class="labelItem">
                                <span>自定义</span>
                            </el-form-item>
                            <el-form-item prop="transCompDate0">
                                <el-date-picker
                                    :disabled="datePickerVisible"
                                    :editable="editableDate"
                                    placeholder="开始时间"
                                    v-model="recordSelect.transCompDate0">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="transCompDate1">
                                <el-date-picker
                                    :disabled="datePickerVisible"
                                    placeholder="结束时间"
                                    :editable="editableDate"
                                    v-model="recordSelect.transCompDate1">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="selectBtn" @click="searchTransHistory('recordSelect')">搜索</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
                <el-table :data="transCompTableData" style="width: 100%">
                    <el-table-column
                        prop="_id"
                        label="订单编号"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        label="转账方式"
                        width="">
                        <template scope="scope">
                            <span v-if="scope.row.type == 7">CRM账户转账</span>
                            <span v-else>子账户转账</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="转出账户"
                        width="">
                        <template scope="scope">
                            <span v-if="scope.row.type == 4">我的钱包</span>
                            <span v-if="scope.row.type == 5">{{ scope.row.mt4UserId }}</span>
                            <span v-if="scope.row.type == 6">{{ scope.row.mt4UserId }}</span>
                            <span v-if="scope.row.type == 7">
                                    <span v-if="scope.row.userEmail == $store.state.user.userinfo.userEmail">我的钱包</span>
                                    <span v-else>{{ scope.row.userEmail }}</span>
                                </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="收款账户"
                        width="">
                        <template scope="scope">
                            <span v-if="scope.row.type == 4">{{ scope.row.mt4UserId }}</span>
                            <span v-if="scope.row.type == 5">我的钱包</span>
                            <span v-if="scope.row.type == 6">{{ scope.row.relMt4UserId }}</span>
                            <span v-if="scope.row.type == 7">
                                    <span v-if="scope.row.relUserEmail == $store.state.user.userinfo.userEmail">我的钱包</span>
                                    <span v-else>{{ scope.row.relUserEmail }}</span>
                                </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="billMoney"
                        label="金额($)"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="完成时间"
                        width="">
                    </el-table-column>
                    <el-table-column
                        label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.status == 1">成功</span>
                            <span v-if="scope.row.status == -100">待审核</span>
                            <span v-if="scope.row.status == -1">失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="desc"
                        label="备注">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-pagination @size-change="transCompSizeChange" @current-change="currentChangeTransComp"
                               :current-page.sync="transComp.page"
                               :page-count="totalData"
                               :page-sizes="[10,20,30, 50]" :page-size="transComp.pageSize"
                               layout="total, sizes, prev, pager, next, jumper"  :total="totalData">
            </el-pagination>
        </el-tabs>
    </div>
</template>
<script>
    module.exports = require('../pageJS/TransferHistory')
</script>
