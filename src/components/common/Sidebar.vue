<template>
    <div>
        <div class="headers">
            <div class="header">
                <!--<div class="lever-agent-info">上级代理 : {{ upLeverAgent }}</div>-->
                <!--<div class="lever-agent-info">代理人编号 : {{ LeverAgentId }}</div>-->
                <div class="edit-info">
                    <span @click="infoStatus" class="infoStatusStyle" v-if="this.$store.state.myInfoStatus.verifyStatus == 0">去完善资料</span>
                    <span @click="infoStatus" class="infoStatusStyle" v-if="this.$store.state.myInfoStatus.verifyStatus == -1">认证中</span>
                    <span @click="infoStatus" class="infoStatusStyle" v-if="this.$store.state.myInfoStatus.verifyStatus == 1">认证成功</span>
                    <span @click="infoStatus" class="infoStatusStyle" v-if="this.$store.state.myInfoStatus.verifyStatus == 2">认证失败，去修改</span>
                </div>
                <div class="lang-change">
                    <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">En
                               <i class="fa fa-fw fa-angle-down"></i>
                            </span>
                        <el-dropdown-menu slot="dropdown" class="clearTop text-color-6">
                            <!--<el-dropdown-item command="loginout">退出登录</el-dropdown-item>-->
                            <!--<el-dropdown-item command="email">email</el-dropdown-item>-->
                            <el-dropdown-item command="">中文简体</el-dropdown-item>
                            <el-dropdown-item command="">中文繁体</el-dropdown-item>
                            <el-dropdown-item command="">英文</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span style="color: #4d9ffb">{{this.$store.state.user.userinfo.IDName}}</span>
                </div>

                <div class="header-info">
                    <el-tooltip placement="bottom">
                        <div slot="content">
                            <ul>
                                <li v-for="item in tipInfo">{{ item.info }}</li>
                            </ul>
                        </div>
                        <el-button><i class="fa fa-fw fa-bell-o"></i><el-badge is-dot class="item"></el-badge></el-button>
                    </el-tooltip>
                </div>

                <div class="header-refresh"><i class="fa fa-fw fa-repeat"></i></div>
            </div>
            <div class="header-second">

                <el-row v-for="(route,index) in $router.options.routes"
                        v-if="!route.hidden&&$route.matched.length&&$route.matched[0].path===route.path">
                    <el-col>
                        <el-menu theme="default" mode="horizontal"
                                 :defaultActive="$store.state.curMenu.headerCurMenu"
                                 unique-opened router>
                            <el-menu-item v-for="(child,cindex) in route.children" v-if="!child.hidden"
                                          :index="child.path">
                                {{child.name}}
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <img src="../../../static/img/logo_white.png">
                </div>
                <div class="sidebar-info">
                    <div class="user-balance">
                        <span>US {{ this.accounting.formatMoney($store.state.balance.money)}}</span>
                    </div>
                    <div class="user-balance-title">
                        电子钱包余额
                    </div>
                </div>
            </div>
            <el-menu class="el-menu-vertical-demo" theme="dark" @select="sidebarUpdateCurMenu"
                     :default-active="$store.state.curMenu.leftCurMenu" unique-opened router>
                <el-menu-item v-for="(route,index) in $router.options.routes"
                              v-if="!route.hidden" :index="route.path">
                    <i :class="'icon '+route.icon"></i>
                    <span :class="'text '+route.icon">{{route.name}}</span>
                </el-menu-item>
                <el-menu-item @click="singOut" class="signout"><i class="icon icon-out"></i><span class="text icon-out">退出登录</span></el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Sidebar')
</script>

