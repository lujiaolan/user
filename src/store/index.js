
/**
 * Created by Udea-Manager on 2017/8/16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './user/';
import global from './global/';
import domain from './domain/';
import token from './token/';

const store = new Vuex.Store({
    modules:{
        user,
        global,
        domain,
        token
    },
    state: {
        curMenu:{
            leftCurMenu: '',
            headerCurMenu: '',
        },
        myInfoStatus: {
            verifyStatus: '',
        },
        balance:{
            money: '',
            lockFlag: '',
        },
        baseUrl: 'http://backupserver1.crm79.com:8080',
        companyInfo: '',

        // 佣金记录选择请求的接口的判断条件
        detail:{
            detailVisible: false,
            detailId: ''
        }
    },
    mutations: {
        SET_CUR_MENU(state,paths){
            state.curMenu.leftCurMenu = paths.leftMenu;
            state.curMenu.headerCurMenu = paths.headerMenu;
        },
        UPDATE_INFO_STATUS(state,info_status){
            state.myInfoStatus.verifyStatus = info_status.verifyStatus;
        },
        UPDATE_BALANCE(state,balance){
            state.balance.money = balance.money;
            state.balance.lockFlag = balance.lockFlag;
            console.log('UPDATE_BALANCE',state.balance);
        },
        UPDATE_COMPANY_INFO(state,info){
            state.companyInfo = info
        },
        UPDATE_DETAIL_ID(state,id){
            state.detail.detailId = id.detailId;
            state.detail.detailVisible = id.detailVisible;
        }
    },
    actions: {
        set_cur_menu({commit},paths){
            commit('SET_CUR_MENU',paths)
        },
        update_info_status({commit},info_status){
            commit('UPDATE_INFO_STATUS',info_status)
        },
        update_balance({commit},balance){
            commit('UPDATE_BALANCE',balance)
        },
        update_company_info({commit},info){
            commit('UPDATE_COMPANY_INFO',info)
        },
        update_detail_id({commit},id){
            commit('UPDATE_DETAIL_ID',id)
        }
    }
});
export default store;

