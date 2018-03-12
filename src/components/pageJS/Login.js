/**
 * Created by Udea-Manager on 2017/4/25.
 */
import MD5 from 'js-md5';
import DemoAccount from '../page/Demo-account.vue';
export default {
    components:{
        DemoAccount
    },
    data(){
        return {
            activeName: 'first',
            loginLoading: false,
            userIp: '',
            remumber:this.$store.state.user.remumber,
            loginForm: {
                username: '',
                password: '',
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入用户名'))
                            }else{
                                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)||/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('不是有效的邮箱或电话号码,请重新输入'))
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
        }
    },
    methods: {
        Login(formName) {
            const self = this;
            const reg  = /^[0-9]+.?[0-9]*$/;
            let postData ={};
            if(reg.test(this[formName].username)){
                console.log('純数字')
                postData = {
                    userPhone :this[formName].username,
                    password:MD5(this[formName].password),
                    apId:self.$store.state.domain.domain.domain.apId
                }
            }else{
                console.log('不是純数字')
                postData = {
                    userEmail:this[formName].username,
                    password:MD5(this[formName].password),
                    apId:self.$store.state.domain.domain.domain.apId
                }
            }
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    if(self.$store.state.domain.domain.domain.apId){
                        postData.ip = self.userIp;
                        self.CRMLogin(postData);
                    }else{
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'域名匹配错误,请重新配置'
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        CRMLogin(val){
            const self = this;
            self.loginLoading = true;
            this.$ajax({
                method:'post',
                url:'/other/login',
                data:val
            }).then(function (res) {
                console.log('登录');
                console.log(res);
                if(res.data.retCode===0){
                    if(self.remumber.remumber_flag===true){
                        console.log("记住密码");
                        console.log("self.loginForm.username,"+self.loginForm.username);
                        console.log("sself.loginForm.password,"+self.loginForm.password);
                        console.log(" token:res.data.data.token,"+ res.data.data.token);
                        console.log("记住密码");
                        self.$store.dispatch('update_remumber',{
                            remumber_flag:self.remumber.remumber_flag,
                            remumber_login_info:{
                                password:self.loginForm.password,
                                username: self.loginForm.username,
                                token: res.data.data.token
                            }
                        });
                    }
                    self.$store.dispatch('update_token',{token:res.data.data.token});
                    if(res.data.data.role==='agent'){
                        self.$ajax({
                            method:'get',
                            url:'/other/user/'+res.data.data._id,
                        }).then(function (res) {
                            if(res.data.retCode===0){
                                self.$store.dispatch('update_userinfo',{userinfo:res.data.data});
                                self.$router.push('/home')
                            }
                        }).catch(function (err) {

                        })

                    }else{
                        self.$message({
                            message:'你现在是普通用户,请先申请代理',
                            type:"warning",
                            showClose:true
                        });
                        self.loginLoading = false;
                    }
                    self.loginLoading = false;
                }else{
                    self.loginLoading = false;
                    if(res.data.data.status===0){
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'用户未激活,请前往邮箱激活'
                        })
                    }else if(res.data.data.status===-1){
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'您的账户已冻结，具体情况请咨询客服'
                        })
                    }else if(res.data.data.status===2){
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'您的账户已暂停，具体情况请咨询客服'
                        })
                    }else{
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'用户名或密码错误'
                        })
                    }
                }
            }).catch(function (err) {
                console.log("登录");
                console.log(err);
                self.$message({
                    type:'error',
                    showClose:true,
                    message:'网络错误'
                })
                self.loginLoading = false;
            })
        },
        //删除domain
        removedata(){
            this.$store.dispatch('remove_domain')
        },
        //获取domain
        postdata(){
            const self = this;
            let URL =  document.location.origin;
            const postData = {
                domain:URL,
                type:'guest',
            };
            this.$ajax({
                method: 'post',
                data:postData,
                url:'/other/ap/getApId'
            }).then(function (res) {
                console.log(res);
                console.log(res.data.data);
                self.$store.dispatch('update_domain',res.data.data)

            }).catch(function (err) {
                console.log(err)
            })
        },


        getUserIp(){
            const self = this;
            jquery.getScript('http://pv.sohu.com/cityjson',function () {
                console.log('returnCitySN.cip');
                console.log(returnCitySN.cip);
                self.userIp = returnCitySN.cip;
            })
        }
    },
    mounted(){
        console.log("mounted login");
        console.log(this.$store.state.domain.domain.domain)
        console.log(this.$store.state.domain.domain.domain.openAccountType)
        if(this.remumber.remumber_flag===true){
            this.loginForm.username=this.remumber.remumber_login_info.username;
            // this.loginForm.password = this.remumber.remumber_login_info.token.substring();
            this.loginForm.password = this.remumber.remumber_login_info.password;
            this.$set(this.loginForm,'token',this.remumber.remumber_login_info.token)
        }
        this.getUserIp()
    }
}
