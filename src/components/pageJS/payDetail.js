/**
 * Created by Udea-Manager on 2018/1/30.
 */
export default {
    data(){
        return {
            payDetail:{
                memberid:'',
                orderid:'',
                amount:'',
                datetime:'',
                transaction_id:'',
                returncode:''
            },
            successPayVisible:true,
            payDetail_rules:{
            },

        }
    },
    methods:{
        payFail(){
            this.$router.push('/fundAccess/deposit')
        },
        paySuccess(){
            this.$router.push('/fundAccess/withdrawalRecord')
        },
        closePayDialog(){
            this.successPayVisible = false;
        }
    },
    mounted(){

    }
}

