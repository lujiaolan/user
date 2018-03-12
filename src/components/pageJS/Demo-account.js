/**
 * Created by Udea on 2017/6/22.
 */
export default {
    data() {
        return {
            registerMt4Loading: false,
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
                        url: '/other/apply/mt4',
                        data: this.demoAccountForm
                    }).then(function (res) {
                        console.log(res);
                        if(res.data.retCode==0){
                            theh.$message({
                                type:'info',
                                // message:'注册成功,请查收邮箱',
                                message:'邮件发送成功，请注意查收',
                                showClose:true
                            });
                            theh.$refs[formName].resetFields();
                            theh.registerMt4Loading = false;
                        }else if(res.data.retCode==1){
                            theh.$message({
                                type:'info',
                                // message:'注册成功,请查收邮箱',
                                message:'操作成功，请稍后查收邮件',
                                showClose:true
                            });
                            theh.$refs[formName].resetFields();
                            theh.registerMt4Loading = false;
                        }else{
                            theh.$message({
                                type:'warning',
                                // message:'注册失败,请重新注册',
                                message:'操作失败，请稍后再试',
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

    }
}
