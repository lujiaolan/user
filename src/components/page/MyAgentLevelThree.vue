<template>
       <div class="">
           <el-table :data="levelThree" :show-header="showHead" @expand="expandFourClick">
               <el-table-column type="expand">
                   <template scope="scope">
                       <myAgent-levelFour :levelFour="levelFourInfo"></myAgent-levelFour>
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
                   prop="allDeposit"
                   label="总入金">
               </el-table-column>
               <el-table-column
                   prop="allDraw"
                   label="总出金">
               </el-table-column>
               <el-table-column
                   prop="allCom"
                   label="总佣金">
               </el-table-column>
               <el-table-column
                   prop="noStopPosition"
                   label="未平仓">
               </el-table-column>
               <el-table-column
                   prop="sreCharge"
                   label="手续费">
               </el-table-column>
               <el-table-column
                   prop="floatPL"
                   label="盈亏">
               </el-table-column>
           </el-table>
       </div>
</template>
<script>

    module.exports = require('../pageJS/MyAgentLevelThree')
</script>
<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

</style>
