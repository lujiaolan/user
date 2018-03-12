import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // history:true,
    // hashbang:false,
    routes: [
        {
            path: '/',
            redirect:to=>{
                return '/login';
            } ,
            hidden:true,
            meta:{
                requireAuth:false
            }
        }
        ,
        {
            path:'/activation',
            hidden:true,
            name:'激活页面',
            meta:{
                requireAuth:false
            },
            component:require('../components/page/Activation.vue')
        },
        {
            path: '/home',
            name:'首页',
            icon:'icon-home',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path:'/home',
                    name:'子菜单',
                    hidden:true,
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/Home.vue')
                }
            ]
        },
        {
            path:'/accountManagement',
            redirect: '/accountManagement/myInfo',
            name:'账户管理',
            icon:'icon-mine',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path: '/accountManagement/myInfo',
                    name:'我的资料',
                    hidden: true,
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/MyAgentInfo.vue')
                },
            ]
        },
        {
            path:'/fundAccess',
            redirect:'/fundAccess/deposit',
            name:'资金存取',
            icon:'icon-zjcq',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path: '/fundAccess/deposit',
                    name:'入金',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/Deposit.vue')  // vue-echarts-v3组件
                },
                {
                    path:'/fundAccess/drawMoney',
                    name:'出金',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/DrawMoney.vue')
                },
                {
                    path:'/fundAccess/withdrawalRecord',
                    name:'出入金记录',
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/WithdrawaRecord.vue')
                }
            ]
        },
        {
            path:'/inTurnFund',
            redirect: '/inTurnFund/outAccount',
            name:'资金内转',
            icon:'icon-zjnc',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path:'/inTurnFund/outAccount',
                    name:'转出账户',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/OutAccount.vue')
                },
                {
                    path:'/inTurnFund/transferHistory',
                    name:'转账记录',
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/TransferHistory.vue')
                },
            ]
        },
        {
            path:'/userCommission',
            redirect: '/userCommission/myTeamInfo',
            name:'代理专区',
            icon:'icon-agent',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path: '/userCommission/myTeamInfo',
                    name:'我的团队',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/MyTeamInfo.vue')
                },
                {
                    path:'/userCommission/commissionSettlement',
                    name:'佣金结算',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CommissionSettlement.vue')
                },
                {
                    path:'/userCommission/commissionHistory',
                    name:'佣金记录',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CommissionHistory.vue')
                },
            ]
        },
        {
            path:'/orderCenter',
            redirect: '/orderCenter/position',
            name:'订单中心',
            icon:'icon-order',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path: '/orderCenter/position',
                    name:'当前持仓',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/Position.vue')     // vue-datasource组件
                },
                {
                    path: '/orderCenter/pendingOrder',
                    name:'当前挂单',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/PendingOrder.vue')
                },
                {
                    path: '/orderCenter/orderHistory',
                    name:'历史记录',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/OrderHistory.vue')   // vue-echarts-v3组件
                },
            ]
        },
        {
            path:'/applyChange',
            redirect: '/applyChange/ModifyPwd',
            name:'申请修改',
            icon:'icon-sqxg',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path: '/applyChange/modifyPwd',
                    name:'修改密码',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/ModifyPwd.vue')
                }
            ]
        },
        {
            path:'/moreInfo',
            redirect: '/moreInfo/center',
            name:'关于更多',
            // hidden:true,
            icon:'icon-more',
            meta:{
                requireAuth:true
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path:'/moreInfo/center',
                    name:'客服中心',
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/Center.vue')
                },
                {
                    path:'/moreInfo/suggest',
                    name:'投诉建议',
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/Suggest.vue')
                },
                {
                    path:'/moreInfo/download',
                    name:'MT4下载',
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/Download.vue')
                },
            ]
        },
        {
            path:'/loginExpires',
            name:'loginExpires',
            hidden:true,
            meta:{
                requireAuth:false
            },
            component:require('../components/common/Home.vue'),
            children:[
                {
                path:'/loginExpires',
                hidden:true,
                component:require('../components/page/loginExpires.vue')
                }
            ]
        },
        {
            path: '/login',
            meta:{
                requireAuth:false
            },
            component: require('../components/page/Login.vue'),
            hidden:true
        },
        //支付成功页面
        {
            path:'/payDetail',
            meta:{
                requireAuth:false
            },
            component:require('../components/page/payDetail.vue'),
            hidden:true
        },
        {
            path:'/404',
            meta:{
                requireAuth:false
            },
            component:require('../components/page/NotFound.vue'),
            hidden:true
        },
        {
            path:'/forget',
            meta:{
                requireAuth:false
            },
            component:require('../components/page/ForgetNumber.vue'),
            hidden:true
        },
        {
            path:'/DemoAccount',
            meta:{
                requireAuth:false
            },
            component:require('../components/page/Demo-account.vue'),
            hidden:true
        },
        {
            path:'/AgentAccount',
            meta:{
                requireAuth:false
            },
            component:require('../components/page/Agent-account.vue'),
            hidden:true,
            children:[
                {
                    path:'/AgentAccount/*/',
                    name:'客服中心',
                    redirect:to=>{
                        return '/*/AgentAccount';
                    } ,
                    meta:{
                        requireAuth:false
                    },
                    component:require('../components/page/Center.vue')
                }
                ]
        },
    ]
})
