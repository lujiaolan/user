
/**
 * Created by Udea-Manager on 2017/8/16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './user/';
import global from './global/';
import domain from './domain/';

const store = new Vuex.Store({
    modules:{
        user,
        global,
        domain
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
    }
});
export default store;

