import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题

import moment from 'moment';
Vue.prototype.moment = moment;
import accounting from 'accounting';
Vue.prototype.accounting = accounting;

import store from 'store/'

import 'jquery';

import axios from 'axios';
Vue.prototype.$ajax = axios;

Vue.config.productionTip = true;
Vue.config.devtools = true;

Vue.use(ElementUI);
new Vue({
    moment,
    router,
    store,
    render: h => h(App)
}).$mount('#app');


router.beforeEach((to,from,next)=>{
    if(to.matched.some(r=>r.meta.requireAuth)){
        const apToken = store.state.token.token.token;
        console.log('apToken')
        console.log(apToken)
        if(to.meta.requireAuth){
            if(apToken==undefined||apToken==''){
                if(to.path=='/loginExpires'){
                    next()
                }else{
                    next({
                        name:'loginExpires',
                        query:{
                            redirect:to
                        }
                    })
                }
            }else{
                next()
            }
        }else{
            next()
        }
    }else{
        next()
    }
});
