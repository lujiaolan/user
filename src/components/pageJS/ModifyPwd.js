/**
 * Created by Udea on 2017/7/11.
 */
import MD5 from 'js-md5'
export default {
    data(){
        return {
            resetCRMPwdForm: {
                currentPwd: '',
                setPwd: '',
                password: '',
                userEmail:this.$store.state.user.userinfo.userEmail,
                apId:this.$store.state.domain.domain.domain.apId
            },
            resetCRMPwdForm_rule:{
                currentPwd:[{
                    required:true,
                    trigger:'blur',
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入当前密码'))
                        }else{
                            this.$ajax({
                                method:'post',
                                url:'/user/checkPwd',
                                data:{
                                    userId:this.$store.state.user.userinfo._id,
                                    password:MD5(this.resetCRMPwdForm.currentPwd)
                                }
                            }).then(function (res) {
                                if(res.data.retCode==0){
                                    callback()
                                }else{
                                    callback(new Error('当前密码错误,请重新输入'))
                                }
                            }).catch(function (err) {
                                callback(new Error('当前密码错误,请重新输入'))
                            })
                        }
                    }
                }],
                setPwd:[{
                    required:true,
                    trigger:'blur',
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入密码'))
                        }else{
                            if(/^(\w){6,20}$/.test(value)){
                                callback()
                            }else{
                                callback(new Error('请输入6-20个字母或数字或下划线组成的密码'))
                            }
                        }
                    }
                }],
                password:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入确认密码'))
                            }else{
                                if(this.resetCRMPwdForm.setPwd==value){
                                    callback()
                                }else{
                                    callback(new Error('两次输入密码不一致'))
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    methods:{
        modifyPWD(ref) {
            console.log('submit!');
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.$confirm('你确定要修改密码吗?','修改密码',{
                        cancelButtonText:'取消',
                        confirmButtonText:'确认',
                        type:'warning'
                    }).then(()=>{
                        const postData = {
                            userEmail:this.resetCRMPwdForm.userEmail,
                            apId:this.resetCRMPwdForm.apId,
                            password:MD5(this.resetCRMPwdForm.password),
                        };
                        console.log('submit!');
                        console.log(postData);


                        self.$ajax({
                            method:'post',
                            url:'/user/userEmail/resetUserPwd',
                            data:postData
                        }).then(function (res) {
                            if(res.data.retCode==0){
                                console.log(res);
                                self.$message({
                                    message:'修改成功',
                                    type:'info',
                                    showClose:true
                                });
                                self.$store.dispatch('remove_remumber').then(()=>{
                                    self.$router.push('/');
                                })

                            }else{
                                self.$message({
                                    message:'修改失败',
                                    type:'warning',
                                    showClose:true
                                });
                            }
                        }).catch(function (err) {

                            self.$message({
                                message:'网络错误',
                                type:'error',
                                showClose:true
                            });
                        })
                    })
                }else{
                    return false;
                }
            })

        }
    }
}
