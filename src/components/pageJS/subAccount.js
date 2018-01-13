/**
 * Created by Udea-Manager on 2017/5/5.
 */

export default {
    data: function(){
        return {
            inCashForm: {
                outAccount: '12345',
                balance: '12345',
                available: '23334',
                netWorth: '3445',
                used: '325435',
                draw: '34545',
                outMoney: '690',
                inAccount: '232445',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}

