/**
 * Created by Udea on 2017/6/22.
 */
import MD5 from 'js-md5';
export default {
    data(){
        let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //18位数身份证正则表达式
        let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
        return {
            registerRealLoading: false,
            registerDisabled:false,
            disabledCode:false,
            agentAccountForm: {
                IDName: '',
                IDNumber: '',
                userEmail: '',
                userPhone: '',
                password: '',
                confirmPwd: '',
                validCode:'',
                referralCode: '',
                apId:this.$store.state.domain.domain.domain.apId,
                checkDeal:[1,2,3]
            },
            checkDealList:[],
            agentAccountRules: {
                IDName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                validCode:[{
                    required:true,
                   validator:(rules,value,callback)=>{
                        if(value){
                            this.$ajax({
                                method:'post',
                                url:'/check/validCode',
                                data:{
                                    validCode:value,
                                }
                            }).then(function (res) {
                                if(res.data.retCode===0){
                                    callback()
                                }else {
                                    callback(new Error('验证码错误'))
                                }
                            }).catch(function (err) {
                                callback(new Error('验证码错误'))
                            })
                        }else{
                            callback(new Error('请输入验证码'))
                        }
                   }
                }],
                userPhone: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入手机号'))
                        }  else{
                            if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                              this.$ajax({
                                  method:'post',
                                  url:'/user/dumpRepeat',
                                  data:{
                                      apId:this.agentAccountForm.apId,
                                      userPhone:value
                                  }
                              }).then(function (res) {
                                  if(res.data.retCode==0){
                                      callback()
                                  }else {
                                      callback(new Error('手机号被占用,请重新输入手机号'))
                                  }
                              }).catch(function (err) {
                                  callback(new Error('手机号被占用,请重新输入手机号'))
                              })
                            }else{

                                callback(new Error('手机号格式错误,请重新输入'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                password: [{
                    validator:(rule,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入密码'));
                        }else{
                            if(/^(\w){6,20}$/.test(value)){
                                callback()
                            }else{

                                callback(new Error('请输入6-20个字母或数字或下划线组成的密码'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                userEmail: [{
                    validator:(rule,value,callback)=>{
                        if(value===''){
                            callback(new Error('请输入邮箱'));
                        }else{
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                this.$ajax({
                                    method:'post',
                                    url:'/user/dumpRepeat',
                                    data:{
                                        apId:this.agentAccountForm.apId,
                                        userEmail:value
                                    }
                                }).then(function (res) {
                                    if(res.data.retCode==0){
                                        callback()
                                    }else {
                                        callback(new Error('邮箱被占用,请重新输入邮箱'))
                                    }
                                }).catch(function (err) {
                                    callback(new Error('邮箱被占用,请重新输入邮箱'))
                                })
                            }else {
                                callback(new Error('请输入有效邮箱!'));
                            }
                        }
                    },
                    trigger:'blur'
                }],
                IDNumber: [{
                    required: true,

                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入身份证'))
                        }  else{
                            if( value.match(arg1) == null && value.match(arg2) == null){
                                callback(new Error('身份证格式错误,请重新输入'))
                            }else{
                                callback();
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                confirmPwd:[
                    {
                        required:true,
                        trigger: 'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入确认密码'))
                            }else{
                                if(this.agentAccountForm.password!==value){
                                    callback(new Error('两次输入的密码不一致,请重新输入'))
                                }else{
                                    callback()
                                }
                            }
                        }
                    }
                ],
                referralCode:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }else{
                                this.$ajax({
                                    method:'get',
                                    url:'user/'+value+'/superInfo'
                                }).then(function (res) {
                                    if(res.data.retCode==0){
                                        if(res.data.data.agentLevel==5&&res.data.data.agentLevel){
                                            callback(new Error('因为上级是五级代理,所以无法注册代理,请填写别的推荐码或是不填'))
                                        }else{
                                            callback()
                                        }
                                    }else{
                                        callback(new Error('推荐码输入错误'))
                                    }
                                }).catch(function () {
                                    callback(new Error('推荐码输入错误'))
                                })
                            }
                        }
                    }
                ]
            },

            // 发送验证码按钮
            setCode: '发送验证码',
            start: false,
            timer: '',
            getIdCodeLoading: false
        }
    },
    methods: {
        getURLCode(){
            const postHerf = location.href.split('?');
            let postAgent = parseInt(postHerf[1]);
            const self = this;
            console.log('postAgent');
            console.log(postAgent);
            if(postAgent===null||postAgent===undefined||isNaN(parseInt(postAgent))){
                this.disabledCode = false;
            }else {
                self.$ajax({
                    method:'get',
                    url:'/user/'+postAgent+'/superInfo',
                }).then(function (res) {
                    if(res.data.retCode==0){
                        if(res.data.data.agentLevel&&res.data.data.agentLevel==5){
                            // self.$message({
                            //     type:'warning',
                            //     showClose:true,
                            //     message:'因为上级是五级,不能注册代理',
                            // });
                        }else{
                            if(postAgent){
                                self.agentAccountForm.referralCode = postAgent;
                                self.disabledCode = true
                            }
                        }
                    }else {
                        // self.$message({
                        //     type: 'warning',
                        //     showClose: true,
                        //     message: '获取推荐信息失败,请信息确认链接',
                        // });
                    }
                }).catch(function (err) {
                    // self.$message({
                    //     type:'error',
                    //     showClose:true,
                    //     message:'网络错误',
                    // });
                })

            }

        },
        agentAccountDeal(val){
            if(val.length<3){
                this.registerDisabled = true;
            }else{
                this.registerDisabled = false;
            }
        },
        registerValidate(){
            // console.log(this.$store.state.domain.domain.domain);
            const self = this;
            if (self.agentAccountForm.userEmail) {
                if (self.$store.state.domain.domain.domain) {
                    if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(self.agentAccountForm.userEmail)) {
                        self.$ajax({
                            method:'post',
                            url:'/user/dumpRepeat',
                            data:{
                                apId:self.agentAccountForm.apId,
                                userEmail:self.agentAccountForm.userEmail
                            }
                        }).then(function (res) {
                            if(res.data.retCode==0){
                                self.getIdCodeLoading = true;
                                self.$ajax({
                                    method: 'post',
                                    url: '/registered/validCode',
                                    data: {
                                        userEmail: self.agentAccountForm.userEmail,
                                        apId: self.$store.state.domain.domain.domain.apId
                                    }
                                }).then(function (res) {
                                    if (res.data.retCode == 0) {
                                        self.$message({
                                            message: '发送验证码成功',
                                            type: 'info',
                                            showClose: true
                                        });
                                        self.getIdCodeLoading = false;
                                        self.sendCode();
                                    } else {
                                        self.$message({
                                            message: '发送验证码失败,请重新发送',
                                            type: 'warning',
                                            showClose: true
                                        });
                                        self.getIdCodeLoading = false;
                                    }
                                }).catch(function (err) {
                                    self.$message({
                                        message: '网络错误',
                                        type: 'error',
                                        showClose: true
                                    });
                                    self.getIdCodeLoading = false;
                                })
                            }
                        }).catch(function (err) {
                        })
                    }
                }else {
                    self.$message({
                        message: '查询不到机构,请确认是否有意这个机构',
                        type: 'warning',
                        showClose: true
                    });
                    self.getIdCodeLoading = false;
                }
            }
        },
        agentAccountRegister(formName) {
            console.log('register')
            console.log(this.agentAccountForm )
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.registerRealLoading = true;
                    self.registerDisabled = true;
                    let  postData = {};
                    if(self.agentAccountForm.referralCode){
                        postData = {
                            IDName: self.agentAccountForm.IDName,
                            IDNumber: self.agentAccountForm.IDNumber,
                            userEmail: self.agentAccountForm.userEmail,
                            userPhone: self.agentAccountForm.userPhone,
                            password: MD5(self.agentAccountForm.password),
                            referralCode:parseInt(self.agentAccountForm.referralCode),
                            apId:self.agentAccountForm.apId,
                        };
                    }else{
                        postData = {
                            IDName: self.agentAccountForm.IDName,
                            IDNumber: self.agentAccountForm.IDNumber,
                            userEmail: self.agentAccountForm.userEmail,
                            userPhone: self.agentAccountForm.userPhone,
                            password: MD5(self.agentAccountForm.password),
                            referralCode:null,
                            apId:self.agentAccountForm.apId,
                            agentLevel:1,
                            superAgentId:''
                        };
                    }
                    self.$ajax({
                        method:'post',
                        url:'/agent/register',
                        data:postData
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                type:'info',
                                showClose:true,
                                message:'注册成功,请查收邮箱进行激活',
                            });

                            self.$refs[formName].resetFields();
                            self.getURLCode();
                        }else{
                            self.$message({
                                type:'warning',
                                showClose:true,
                                message:'注册失败',
                            });
                        }
                        self.registerRealLoading = false;
                        self.registerDisabled = false;
                    }).catch(function (err) {
                        self.$message({
                            type:'error',
                            showClose:true,
                            message:'网络错误',
                        });
                        self.registerRealLoading = false;
                        self.registerDisabled = false;
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 发送验证码倒计时
        sendCode(){
            const _this = this;
            let countDown = setInterval(function () {
                if(_this.timer == 0){
                    clearInterval(countDown);
                    _this.start = false;
                    _this.timer = '';
                    _this.setCode = '发送验证码';
                }else {
                    _this.timer --;
                }
            },1000);
            if(typeof _this.setCode != "number"){
                _this.start = true;
                _this.timer = 60;
                _this.setCode = ' s';
                countDown;
            }
        }
    },
    mounted(){
        this.getURLCode();
        console.log(this.$store.state.domain.domain.domain)
        if(this.$store.state.domain.domain.domain.openProtocolContent){
            const openProtocol  = {
                label:1,
                value:'同意【开户协议】',
                content:"http://"+this.$store.state.domain.domain.domain.openProtocolContent
            };
            this.checkDealList.push(openProtocol);
        }
        if(this.$store.state.domain.domain.domain.riskDisclosureContent){
            const riskDisclosure = {
                label:2,
                value:'同意【风险披露声明】',
                content:"http://"+this.$store.state.domain.domain.domain.riskDisclosureContent
            };
            this.checkDealList.push(riskDisclosure);
        }
        if(this.$store.state.domain.domain.domain.disclaimerContent){
            const disclaimer = {
                label:3,
                value:'同意【免责声明】',
                content:"http://"+this.$store.state.domain.domain.domain.disclaimerContent
            };
            this.checkDealList.push(disclaimer);
        }
        console.log("checkDealList")
        console.log(this.checkDealList)
    }

}
