/**
 * Created by Udea on 2017/6/22.
 */
export default {
    data() {
        return {
            registerMt4Loading: false,
            agentRegisterShow:'',
            demoAccountForm: {
                IDName:'',
                apId:this.$store.state.domain.domain.domain.apId,
                accountType:'demoTransferRules',
                UserGroupName: this.$store.state.domain.domain.domain.agentGroupName,
                UserEmail:'',
                UserPhone:''
            },
            demoAccountRules: {
                IDName:[{
                    required:true,
                    message:'请输入姓名',
                    trigger:'blur'
                }],
                UserEmail: [{
                    validator:(rule,value,callback)=>{
                        if(value===''){
                            callback(new Error('请输入邮箱'));
                        }else{
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                callback();
                            }else {
                                callback(new Error('请输入有效邮箱!'));
                            }
                        }
                    },
                    trigger:'blur'
                }],
            }
            ,
            checked: true
        }
    }
    ,
    methods: {
        demoAccountRegister(formName){
            const theh = this;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    theh.registerMt4Loading = true;
                    this.$ajax({
                        method: 'post',
                        url: '/apply/mt4',
                        data: this.demoAccountForm
                    }).then(function (res) {
                        console.log(res);
                        if(res.data.retCode==0){
                            theh.$message({
                                type:'info',
                                message:'注册成功,请查收邮箱',
                                showClose:true
                            });
                            theh.$refs[formName].resetFields();
                            theh.registerMt4Loading = false;
                        }else{
                            theh.$message({
                                type:'warning',
                                message:'注册失败,请重新注册',
                                showClose:true
                            })
                            theh.registerMt4Loading = false;
                        }
                    }).catch(function (err) {
                        theh.$message({
                            type:'error',
                            message:'网络错误',
                            showClose:true
                        })
                        theh.registerMt4Loading = false;
                    })
                }else {
                    return false;
                }
            });
        }
    },
    mounted(){
        const myReg = /(0)/;
        if(myReg.test(this.$store.state.domain.domain.domain.openAccountType)){
            console.log('有零');
            this.agentRegisterShow = '可以显示';
        }else{
            this.agentRegisterShow = '';
        }
        console.log('demoAccountRegister');
        console.log(this.$store.state.domain.domain.domain)
    }
}
