/**
 * Created by Udea-Manager on 2017/6/28.
 */
export default {
    data() {
        return {
            balance: this.accounting.formatMoney(this.$store.state.balance.money),
            outCashForm: {
                outMoney: '',
                inAccount: '',
            },
            outCashForm_rules:{
                outMoney:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value===''){
                                callback(new Error('请输入金额'))
                            }else{
                                if(value > this.$store.state.balance.money){
                                    callback(new Error('可用余额不够'))
                                }else{
                                    callback()
                                }
                            }
                        }
                    }
                ],
                inAccount:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value===''){
                                callback(new Error('请输入转入账户'))
                            }else {
                                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)||/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                    callback()
                                }else {
                                    callback(new Error('不是有效的邮箱或电话号码,请重新输入'))
                                }
                            }
                        }
                    }
                ]
            },
        }
    },
    methods: {
        crm2crm(ref) {
            const self = this;
            const postData = {
                apId: self.$store.state.user.userinfo.apId,
                deposit: self.outCashForm.outMoney.trim(),
                fromUserId: self.$store.state.user.userinfo._id,
                toUserEmail: self.outCashForm.inAccount.trim()
            };
            // console.log(postData);
            self.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method: 'post',
                        data: postData,
                        url: '/deposit/crm2crm'
                    }).then(function (res) {
                        console.log('/deposit/crm2crm res.data.retCode');
                        console.log(res);
                        if(res.data.retCode === 0){
                            self.$message({
                                type: 'success',
                                message: res.data.message,
                                showClose: true
                            });
                          self.resetBalance();
                        }else {
                            self.$message({
                                type: 'error',
                                message: res.data.message,
                                showClose: true
                            })
                        }
                    }).catch(function (err) {
                        self.$message({
                            type: 'error',
                            message: err.data.data.errMsg,
                            showClose: true
                        })
                    })
                }else {
                    return false;
                }
            });
            self.outCashForm = {
                outMoney: '',
                inAccount: '',
            }
        },
        // 刷新钱包余额
        resetBalance(){
            let self = this;
            self.$ajax({
                method: 'get',
                url: '/deposit/wallet/' + self.$store.state.user.userinfo._id
            }).then(function (res) {
                const errMsg = {
                    balance: '查询钱包错误',
                    lockFlag: false
                };
                if(res.data.retCode === 0){
                    self.$store.dispatch('update_balance',res.data.data);
                }else {
                    self.$store.dispatch('update_balance',errMsg);
                }
            }).catch(function (err) {
            });
        },
    }
}
