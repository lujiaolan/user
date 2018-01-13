<template>
    <div class="infoList-title baseListContent">
        <span>记录查询</span>
        <el-tabs v-model="dawActiveName" @tab-click="drawHandleClick">
            <el-tab-pane label="全部" name="alldraw">
                <div class="recordSelect">
                    <el-form :model="widthdrawSearch" label-width="100px" :rules="widthdraw_rules" ref="alldraw">
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="类型" prop="type">
                                    <el-select v-model="widthdrawSearch.type">
                                        <el-option
                                            v-for="item in completeOptions"
                                            :key="item.key"
                                            :value="item.value"
                                            :label="item.label"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" >
                                <el-form-item prop="orderNum" label="订单编号">
                                    <el-input v-model="widthdrawSearch.orderNum"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3" >
                                <el-form-item prop="startTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.startTime" @key.native.enter="widthdrawRecord('alldraw')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item prop="endTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.endTime" @key.native.enter="widthdrawRecord('alldraw')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span='4'>
                                <el-form-item>
                                    <el-button @click="widthdrawRecord('alldraw')">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-table :data="completeTableData" style="width: 100%">
                    <el-table-column
                        prop="_id"
                        label="订单编号"
                        width="210"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="80">
                        <template scope="scope">
                            <span v-if="scope.row.type==1">入金</span>
                            <span v-if="scope.row.type==2">出金</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额($)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="flowMoney"
                        label="实付金额(￥)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="申请时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="handleTime"
                        label="完成时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tradeStatus"
                        label="状态"
                        width="100">
                        <template scope="scope">
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==1">充值成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==1">未支付</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==1">充值失败</span>
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==2">出金成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==2">未审核</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==2">出金失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="comment"
                        label="备注">
                    </el-table-column>
                    <el-table-column>
                        <template scope="scope">
                            <el-button @click="detailRecord(scope.row)" type="success">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="withdrawAllSizeChange"
                    @current-change="withdrawAllCurrentChange"
                    :current-page.sync="widthdrawSearch.page"
                    :page-sizes='[10,20,30,50]'
                    :page-size="widthdrawSearch.pageSize"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="widthdrawSearchTotal"></el-pagination>
            </el-tab-pane>
            <el-dialog :title="detailTitle" :visible.sync="detailDrawRecordShow" size="tiny" :before-close="closeDrawRecord">
                <el-form :model="detailDrawRecordData" label-width="120px">
                    <el-form-item label="订单编号">
                        <span>{{detailDrawRecordData._id}}</span>
                    </el-form-item>
                    <el-form-item label="类型">
                        <span v-if="detailDrawRecordData.type==1">入金</span>
                        <span v-if="detailDrawRecordData.type==2">出金</span>
                    </el-form-item>
                    <el-form-item label="出金方式" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.detailTitle}}</span>
                    </el-form-item>
                    <el-form-item label="收款人" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.type}}</span>
                    </el-form-item>
                    <el-form-item label="开户行" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.type}}</span>
                    </el-form-item>
                    <el-form-item label="银行卡号" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.type}}</span>
                    </el-form-item>
                    <el-form-item label="付款方式" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.type}}</span>
                    </el-form-item>
                    <el-form-item label="金额($)">
                        <span>{{detailDrawRecordData.amount}}</span>
                    </el-form-item>
                    <el-form-item label="实付金额(￥)">
                        <span>{{detailDrawRecordData.flowMoney}}</span>
                    </el-form-item>
                    <el-form-item label="交易凭证" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.amount}}</span>
                    </el-form-item>
                    <el-form-item label="申请时间">
                        <span>{{detailDrawRecordData.createTime}}</span>
                    </el-form-item>
                    <el-form-item label="入账时间" v-if="detailTitle=='入金详情'">
                        <span>{{detailDrawRecordData.handleTime}}</span>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <span>{{detailDrawRecordData.handleTime}}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span v-if="detailDrawRecordData.tradeStatus==-1&&detailDrawRecordData.type==2">出金失败</span>
                        <span v-if="detailDrawRecordData.tradeStatus==-100&&detailDrawRecordData.type==2">待审核</span>
                        <span v-if="detailDrawRecordData.tradeStatus==1&&detailDrawRecordData.type==2">出金成功</span>
                        <span v-if="detailDrawRecordData.tradeStatus==-1&&detailDrawRecordData.type==1">入金失败</span>
                        <span v-if="detailDrawRecordData.tradeStatus==-100&&detailDrawRecordData.type==1">未支付</span>
                        <span v-if="detailDrawRecordData.tradeStatus==1&&detailDrawRecordData.type==1">入金成功</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{detailDrawRecordData.comment}}</span>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-tab-pane label="已完成" name="Complete">
                <div class="recordSelect">
                    <el-form :model="widthdrawSearch" label-width="100px" :rules="Complete_rules" ref="Complete">
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="类型">
                                    <el-select v-model="widthdrawSearch.type" >
                                        <el-option
                                            v-for="item in completeOptions"
                                            :key="item.key"
                                            :value="item.value"
                                            :label="item.label"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" >
                                <el-form-item prop="orderNum" label="订单编号">
                                    <el-input v-model="widthdrawSearch.orderNum"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3" >
                                <el-form-item prop="startTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.startTime" @key.enter.native="widthdrawRecord('Complete')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item prop="endTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.endTime" @key.enter.native="widthdrawRecord('Complete')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span='4'>
                                <el-form-item>
                                    <el-button @click="widthdrawRecord('Complete')">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-table :data="completeTableData" style="width: 100%">
                    <el-table-column
                        prop="_id"
                        label="订单编号"
                        width="210"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="80">
                        <template scope="scope">
                            <span v-if="scope.row.type==1">入金</span>
                            <span v-if="scope.row.type==2">出金</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额($)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="flowMoney"
                        label="实付金额(￥)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="申请时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="handleTime"
                        label="完成时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tradeStatus"
                        label="状态"
                        width="100">
                        <template scope="scope">
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==1">充值成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==1">未支付</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==1">充值失败</span>
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==2">出金成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==2">未审核</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==2">出金失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="comment"
                        label="备注">
                    </el-table-column>
                    <el-table-column>
                        <template scope="scope">
                            <el-button @click="detailRecord(scope.row)" type="success">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="withdrawAllSizeChange"
                    @current-change="withdrawAllCurrentChange"
                    :current-page.sync="widthdrawSearch.page"
                    :page-sizes='[10,20,30,50]'
                    :page-size="widthdrawSearch.pageSize"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="widthdrawSearchTotal"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="失败" name="dawLossR">
                <div class="recordSelect">
                    <el-form :model="widthdrawSearch" label-width="100px" :rules="dawLossR_rules" ref="dawLossR">
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="类型">
                                    <el-select v-model="widthdrawSearch.type" >
                                        <el-option
                                            v-for="item in completeOptions"
                                            :key="item.key"
                                            :value="item.value"
                                            :label="item.label"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" >
                                <el-form-item prop="orderNum" label="订单编号">
                                    <el-input v-model="widthdrawSearch.orderNum"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3" >
                                <el-form-item prop="startTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.startTime" @key.enter.native="widthdrawRecord('dawLossR')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item prop="endTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.endTime" @key.enter.native="widthdrawRecord('dawLossR')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span='4'>
                                <el-form-item>
                                    <el-button @click="widthdrawRecord('dawLossR')">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-table :data="completeTableData" style="width: 100%">
                    <el-table-column
                        prop="_id"
                        label="订单编号"
                        width="210"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="80">
                        <template scope="scope">
                            <span v-if="scope.row.type==1">入金</span>
                            <span v-if="scope.row.type==2">出金</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额($)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="flowMoney"
                        label="实付金额(￥)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="申请时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="handleTime"
                        label="完成时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tradeStatus"
                        label="状态"
                        width="100">
                        <template scope="scope">
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==1">充值成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==1">未支付</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==1">充值失败</span>
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==2">出金成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==2">未审核</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==2">出金失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="comment"
                        label="备注">
                    </el-table-column>
                    <el-table-column>
                        <template scope="scope">
                            <el-button @click="detailRecord(scope.row)" type="success">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="withdrawAllSizeChange"
                    @current-change="withdrawAllCurrentChange"
                    :current-page.sync="widthdrawSearch.page"
                    :page-sizes='[10,20,30,50]'
                    :page-size="widthdrawSearch.pageSize"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="widthdrawSearchTotal"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="待处理" name="dawPendingR">
                <div class="recordSelect">
                    <el-form :model="widthdrawSearch" label-width="100px" :rules="dawPendingR_rules" ref="dawPendingR">
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="类型">
                                    <el-select v-model="widthdrawSearch.type" >
                                        <el-option
                                            v-for="item in completeOptions"
                                            :key="item.key"
                                            :value="item.value"
                                            :label="item.label"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" >
                                <el-form-item prop="orderNum" label="订单编号">
                                    <el-input v-model="widthdrawSearch.orderNum"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3" >
                                <el-form-item prop="startTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.startTime" @key.enter.native="widthdrawRecord('dawPendingR')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item prop="endTime">
                                    <el-date-picker
                                        v-model="widthdrawSearch.endTime" @key.enter.native="widthdrawRecord('dawPendingR')">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span='4'>
                                <el-form-item>
                                    <el-button @click="widthdrawRecord('dawPendingR')">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-table :data="completeTableData" style="width: 100%">
                    <el-table-column
                        prop="_id"
                        label="订单编号"
                        width="210"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="80">
                        <template scope="scope">
                            <span v-if="scope.row.type==1">入金</span>
                            <span v-if="scope.row.type==2">出金</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额($)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="flowMoney"
                        label="实付金额(￥)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="申请时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="handleTime"
                        label="完成时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tradeStatus"
                        label="状态"
                        width="100">
                        <template scope="scope">
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==1">充值成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==1">未支付</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==1">充值失败</span>
                            <span v-if="scope.row.tradeStatus==1&&scope.row.type==2">出金成功</span>
                            <span v-if="scope.row.tradeStatus==-100&&scope.row.type==2">未审核</span>
                            <span v-if="scope.row.tradeStatus==-1&&scope.row.type==2">出金失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="comment"
                        label="备注">
                    </el-table-column>
                    <el-table-column>
                        <template scope="scope">
                            <el-button @click="detailRecord(scope.row)" type="success">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="withdrawAllSizeChange"
                    @current-change="withdrawAllCurrentChange"
                    :current-page.sync="widthdrawSearch.page"
                    :page-sizes='[10,20,30,50]'
                    :page-size="widthdrawSearch.pageSize"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="widthdrawSearchTotal"></el-pagination>
            </el-tab-pane>
            <div id="pagination"></div>
        </el-tabs>
    </div>
</template>
<script>
    module.exports = require('../pageJS/WithdrawalRecord')
</script>

