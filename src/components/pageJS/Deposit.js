/**
 * Created by Udea-Manager on 2017/4/25.
 */

import depositOnline from '../page/DepositOnline.vue'
import depositCreditCart from '../page/DepositCreditCart.vue'
import  depositTele from '../page/DepositTele.vue'

export default {
    components:{
        depositOnline,
        depositCreditCart,
        depositTele
    },
    data() {
        return {
            depositType: '1',
        };
    },
    methods: {

    },
    mounted(){

    }
}
