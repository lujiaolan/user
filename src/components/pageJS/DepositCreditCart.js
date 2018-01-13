/**
 * Created by Udea-Manager on 2017/11/17.
 */
/**
 * Created by Udea-Manager on 2017/11/13.
 */
export default {
    data(){
        return{
            teleBankName:{
                bankName:'',
                accountName:'',
                bankAccount:'',
                swiftCode:'',
                paymentDocument:''
            }
        }
    },
    methods:{
        creditCartpay(){
            console.log(this.teleBankName)
        }
    }
}
