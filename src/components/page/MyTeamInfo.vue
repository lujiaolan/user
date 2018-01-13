<template>
    <div class="myInfo">
        <div class="baseListContent">
            <el-tabs v-model="activeName2" class="agentTabs1"  @tab-click="activeNameClick">
                <el-tab-pane label="团队统计" name="teamCount">
                    <div class="recordSelect">
                       <el-form ref="totalTeam" :model="totalTeam" :rules="totalTeam_rules">
                           <el-row>
                               <el-col :span="24">
                                   <el-col :span="4">
                                       <el-form-item>
                                           <span>查询条件</span>
                                           <el-input placeholder="用户名/邮箱/电话" style="display: inline-block;width: 196px"
                                                     v-model="totalTeam.agentNameLike"></el-input>
                                       </el-form-item>
                                   </el-col>
                                   <el-col :span="3">
                                       <el-form-item prop="startTime">
                                           <el-date-picker
                                               v-model="totalTeam.startTime" @key.enter.enter="searchTeamInfo('totalTeam')">
                                           </el-date-picker>
                                       </el-form-item>
                                   </el-col>
                                   <el-col :span="6">
                                       <el-form-item prop="endTime">
                                           <el-date-picker
                                               v-model="totalTeam.endTime" @key.enter.enter="searchTeamInfo('totalTeam')">
                                           </el-date-picker>
                                           <el-button @click="searchTeamInfo('totalTeam')">搜索</el-button>
                                       </el-form-item>
                                   </el-col>
                               </el-col>
                           </el-row>
                       </el-form>
                    </div>
                    <el-table :data="teamCountData" style="width: 100%" @expand="rowExpand" :row-style="rowStyleExand">
                        <el-table-column type="expand" style="color: red">
                            <template scope="scope" >
                                <div class="demo-table-expand">
                                    <myAgent-levelThree
                                        v-if="scope.row.agentCount>=1" :levelThree="levelThreeInfo" ></myAgent-levelThree>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="帐户名"
                            prop="IDName">
                        </el-table-column>
                        <el-table-column
                            prop="role"
                            label="账户类型"
                            width="180" >
                            <template scope="scope">
                                <span v-if="scope.row.role=='agent'">代理</span>
                                <span v-if="scope.row.role=='commonUser'">直客</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="邮箱"
                            prop="userEmail"
                            width="250"
                        ></el-table-column>
                        <el-table-column
                            label="客户情况"
                            width="180">
                            <template scope="scope">
                                <div v-if="scope.row.role=='agent'">
                                    <span > 代理：<a style="color: #20a0ff">{{scope.row.agentCount}}</a></span>
                                    <span>客户：<a  style="color: aqua">{{scope.row.commonUserCount}}</a></span>
                                </div>
                                <div v-else="">
                                    /
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="transNum"
                            label="交易量">
                        </el-table-column>
                        <el-table-column
                            prop="totalDeposit"
                            label="总入金">
                        </el-table-column>
                        <el-table-column
                            prop="totalWithdraw"
                            label="总出金">
                        </el-table-column>
                        <el-table-column
                            prop="totalCommisssion"
                            label="总佣金">
                        </el-table-column>
                        <el-table-column
                            prop="totalVolumeAmount"
                            label="未平仓">
                        </el-table-column>
                        <el-table-column
                            prop="totalTradeAmount"
                            label="手续费">
                        </el-table-column>
                        <el-table-column
                            prop="totalProfitAmount"
                            label="盈亏">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="开户记录" name="totalStoreCostAmount">
                    <div class="recordSelect">
                        <span>查询条件</span>
                        <el-input placeholder="MT4帐户名" style="display: inline-block;width: 196px"
                        v-model="teamMT4Search.MT4UserId"
                        ></el-input>
                        <el-date-picker
                            v-model="teamMT4Search.startTime">
                        </el-date-picker>
                        <el-date-picker
                            v-model="teamMT4Search.endTime">
                        </el-date-picker>
                        <el-button>搜索</el-button>
                    </div>
                    <el-table :data="teamMT4Stat" style="width: 100%">
                        <el-table-column
                            prop="mt4UserId"
                            label="帐户名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="userType"
                            label="所属类型"
                            width="250">
                            <template scope="scope">
                                {{scope.row.IDName}}-{{scope.row.userEmail}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="账户类型"
                            width="180">
                           <template scope="scope">
                               <span v-if="scope.row.type==1">标准账户</span>
                               <span v-if="scope.row.type==0">主账户</span>
                           </template>
                        </el-table-column>
                        <el-table-column
                            prop="UserLeverage"
                            label="杠杆">
                            <template scope="scope">
                                <span>1:{{scope.row.UserLeverage}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="UserGroupName"
                            label="分组">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="提交时间">
                        </el-table-column>
                        <el-table-column
                            prop="UserComment"
                            label="备注">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="仓位总结" name="totalProcedureAmount">
                    <div class="recordSelect">
                        <span>查询条件</span>
                        <el-input placeholder="MT4帐户名" style="display: inline-block;width: 196px"></el-input>
                        <el-date-picker
                            v-model="orderRecordDate0">
                        </el-date-picker>
                        <el-date-picker
                            v-model="orderRecordDate1">
                        </el-date-picker>
                        <el-button>搜索</el-button>
                    </div>
                    <el-table :data="orderRecordData" style="width: 100%">
                        <el-table-column
                            prop="orderNum"
                            label="帐户名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="openTime"
                            label="所属账户"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="transType"
                            label="交易"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="transNum"
                            label="佣金">
                        </el-table-column>
                        <el-table-column
                            prop="transVariety"
                            label="利息">
                        </el-table-column>
                        <el-table-column
                            prop="openPrice"
                            label="成交量">
                        </el-table-column>
                        <el-table-column
                            prop="stopLoss"
                            label="入金">
                        </el-table-column>
                        <el-table-column
                            prop="stopWin"
                            label="出金">
                        </el-table-column>
                        <el-table-column
                            prop="currPrice"
                            label="信用">
                        </el-table-column>
                        <el-table-column
                            prop="sreCharge"
                            label="净入金">
                        </el-table-column>
                        <el-table-column
                            prop="floatPL"
                            label="盈亏">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/MyTeamInfo')
</script>

<style >

    .demo-table-expand:hover{
        background-color: rgb(149,149,149);
    }


    .el-table__expanded-cell{
        padding: 1px!important;
    }

    @import "../../../static/css/myinfo.css";
</style>
