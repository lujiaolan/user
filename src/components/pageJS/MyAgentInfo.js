/**
 * Created by Udea-Manager on 2017/4/25.
 */
// import {resetBalance} from '../../commMethods/resetBalance'
export default {
    data: function () {
        let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //18位数身份证正则表达式
        let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[a-zA-Z])$/;
        return {
            // myInfoUpload: this.$store.state.baseUrl + '/crm/ap/img/upload',
            IDCardHeadPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/IDCardHeadPic'+ this.$store.state.user.userinfo._id + '?dir=ap-logo/&contentType=image/jpeg',
            IDCardTailPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/IDCardTailPic'+ this.$store.state.user.userinfo._id + '?dir=ap-logo/&contentType=image/jpeg',
            bankCardHeadPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/bankCardHeadPic'+ this.$store.state.user.userinfo._id + '?dir=ap-logo/&contentType=image/jpeg',
            bankCardTailPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/bankCardTailPic'+ this.$store.state.user.userinfo._id + '?dir=ap-logo/&contentType=image/jpeg',
            editableDate:false,
            getMt4Err:true,
            activeName: 'baseInfo',
            onchangeInfoShow: true,
            mt4AccountBalance:{
                UserBalance: '',
                UserFreeMargin: '',
                UserEquit: '',
                UserMargin: '',
                money: ''
            },
            userId : this.$store.state.user.userinfo._id,
            visibleResetPwd:false,
            mtDialogVisible:false,
            modifyLevelVisible:false,
            isDisabled: true,
            totalMyInfo:null,
            canApplyMt4:null,
            transAccount: 0,
            bankNum: 0,
            imageUrl:{
                IHimg:'',
                ITimg:'',
                BHimg:'',
                BTimg:''
            },
            baseInfo: {
                userEngName:"",
                spell:"",
                sex:"",
                bankId:'',
                country:"",
                addressOne:"",
                addressSecond:'',//市
                birthDay:"",
                superAgentId:"",
                agentLevel:"",
                refereeId:"",
                apId:this.$store.state.domain.domain.domain.apId,
                userPhone:'',
                userEmail:'',
                userName:"",
                commissionType:"",
                IDNumber:"",
                IDName:"",
                IDCardHeadPic:"",
                IDCardTailPic:"",
                bankName:"",
                bankBranch:"",
                cardHolder:'',
                bankAccountName:'',
                bankCardNumbers:"",
                addressDetail:"",
                bankCardTailPic:"",
                bankCardHeadPic:""
            },
            resetPwdForm:{
                apId:this.$store.state.domain.domain.domain.apId,
                userEmail:this.$store.state.user.userinfo.userEmail,
                UserLoginID:'',
                UserPwd:'',
                UserInvestPwdCheck:1,
            },

            // 修改杠杆
            modifyLevel:{
                UserLoginID:null,
                UserLeverage:'',
            },
            modifyLevelPostData: {
                apId:'',
                mt4UserId: '',
                userId: '',
                email: '',
                oldUserLeverage: '',
                userLeverage: '',
            },
            modifyLevelRules:{
                UserLeverage: {
                    required:true,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(val === this.modifyLevelPostData.oldUserLeverage){
                                callback(new Error('新杠杆和旧杠杆一样，请重新选择'))
                            }else {
                                callback()
                            }
                        }else {
                            callback()
                        }
                    }
                },
            },
            changeLeverVisible: false,

            MT4ApplyLoading: false,
            mt4ApplyInfo:{
                userId:this.$store.state.user.userinfo._id,
                accountType:'',//realTransferRules,demoTransferRules,agentAccountRules
                apId:this.$store.state.domain.domain.domain.apId,
                User: '',
                IDName:'',
                UserGroupName: this.$store.state.domain.domain.domain.realGroupName,
                UserPwd: '',
                UserInvestorpwd: '',
                UserPhonepwd: '',
                UserCountry: '',
                UserCity:'' ,
                UserState:'' ,
                UserZipcode: '',
                UserAddress:'' ,
                UserPhone: this.$store.state.user.userinfo.userPhone,
                UserEmail: this.$store.state.user.userinfo.userEmail,
                UserComment:'' ,
                UserStatus:'' ,
                UserAgentAccount:0 ,
                UserLeverage:'' ,
                UserDeposit:0,
                UserIRD:'',

            },
            mt4ApplyInfo_rules:{
                type:[{
                    required:true,
                    message:'请选择类型',
                    trigger:'blur'
                }],
                UserPwd: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('请输入主密码'))
                            }else {
                                if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserInvestorpwd: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('请输入观摩密码'))
                            }else {
                                if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                // symbol:[{
                //     required:true,
                //     message:'请选择货币',
                //     trigger:'blur'
                // }],
                UserLeverage:[{
                    required:true,
                    message:'请选择杠杆',
                    trigger:'blur'
                }],

            },
            accountList:[],
            levelList:[],
            rules_userInfo:{
                userEngName: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入英文名称'))
                        }  else{
                            if(/^[a-zA-Z]+$/.test(value)){
                                callback();
                            }else{
                                callback(new Error('请输入正确的英文名称'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                spell: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入名字拼音'))
                        }  else{
                            if(/^[a-zA-Z]+$/.test(value)){
                                callback();
                            }else{
                                callback(new Error('请输入正确的名字拼音'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                sex: [{
                    required: true,
                    message: '请输入性别',
                    trigger: 'blur'
                }],

                country: [{
                    required: true,
                    validator: (rules, value, callback) => {
                        if (value == '') {
                            callback(new Error('请输入国籍'))
                        } else {
                            if (/^[0-9]{1,}$/.test(value)) {
                                callback('请输入正确国籍')
                            } else {
                                callback()
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                addressOne: [{
                    required: true,
                    message: '请输入省份',
                    trigger: 'blur'
                }],
                addressSecond: [{
                    required: true,
                    message: '请输入市区',
                    trigger: 'blur'
                }],//市
                birthDay: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请选择出生年月'))
                        }else{
                            callback()
                        }
                    },
                    trigger: 'blur'
                }],
                // cardHolder: [{
                //     required: true,
                //     message: '请输入持卡人',
                //     trigger: 'blur'
                // }],
                userPhone: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入手机号'))
                        }  else{
                            if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                callback();
                            }else{

                                callback(new Error('手机号格式错误,请重新输入'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                // userEmail: [{
                //     required: true,
                //     validator:(rule,value,callback)=>{
                //         if(value==''){
                //             callback(new Error('请输入邮箱'))
                //         } else{
                //             if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                //                 callback();
                //             }else {
                //                 callback(new Error('请输入有效邮箱!'));
                //             }
                //         }
                //     },
                //     trigger: 'blur'
                // }],

                IDNumber: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''||value==undefined){
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
                IDName: [{
                    required: true,
                    message: '请输入身份证件与银行卡登记姓名',
                    trigger: 'blur'
                }],
                IDCardHeadPic: [{
                    required: true,
                    message: '身份证正面图片上传错误,请重新选择',
                    trigger: 'blur'
                }],
                IDCardTailPic: [{
                    required: true,
                    message: '身份证反面图片上传错误,请重新选择',
                    trigger: 'blur'
                }],
                bankName: [{
                    required: true,
                    message: '请输入开户行',
                    trigger: 'blur'
                }],
                bankBranch: [{
                    required: true,
                    message: '请输入开户支行',
                    trigger: 'blur'
                }],
                bankCardNumbers: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入银行卡号'))
                        }  else{
                            if(/^[\s\d]{14,24}$/.test(value)){
                                callback();
                            }else{
                                callback(new Error('请输入正确的银行卡号'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                addressDetail: [{
                    required: true,
                    message: '请输入居住地址',
                    trigger: 'blur'
                }],
                bankCardTailPic: [{
                    required: true,
                    message: '银行卡面图片上传错误,请重新选择',
                    trigger: 'blur'
                }],
                bankCardHeadPic: [{
                    required: true,
                    message: '银行卡反面图片上传错误,请重新选择',
                    trigger: 'blur'
                }]
            },
            resetPWd_rules:{
                UserPwd:[
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (value == '') {
                                callback(new Error('请输入密码'))
                            } else {
                                if (/^(\w){6,20}$/.test(value)) {
                                    callback()
                                } else {
                                    callback('密码必须是六位由字母或数字或_组成的数')
                                }
                            }
                        },
                        trigger: 'blur'
                    }],
            },
            dialogImageUrl: '',
            dialogVisible: false,
            myAllAccount: [],
            newAccountVisible: false,
            // 转入转出
            lockFlag: this.$store.state.balance.lockFlag,
            accountBalance: 0,
            inTurnVisible: false,
            inTurnForm: {
                outAccount: '',
                inAccount: '',
                deposit: '',
            },
            inTurnForm_rules: {
                outAccount: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator:(rules,val,callback)=>{
                            if(this.inTurnForm.outAccount === ''){
                                callback(new Error('请选择转出账户'))
                            }else if(this.inTurnForm.inAccount === val){
                                callback(new Error('转入转出账户不能相同'))
                            }else {
                                if(this.getMt4Err){
                                    callback()
                                }else{
                                    callback(new Error('这个账户不存在'))
                                }
                            }
                        }
                    }
                ],
                inAccount: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator:(rules,val,callback)=>{
                            if(this.inTurnForm.inAccount === ''){
                                callback(new Error('请选择转入账户'))
                            }else if(this.inTurnForm.outAccount === val){
                                callback(new Error('转入转出账户不能相同'))
                            }else {
                                callback()
                            }
                        }
                    }
                ],
                deposit:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.inTurnForm.outAccount==='钱包余额'){
                                    if(this.lockFlag){
                                        callback(new Error('账户已被锁，请选择别的账户'))
                                    }else if(value > this.accountBalance){
                                        callback(new Error('该账户余额不足，请选择别的账户'))
                                    }else {
                                        callback()
                                    }
                                }else {
                                    if(value > this.accountBalance){
                                        callback(new Error('该账户余额不足，请选择别的账户'))
                                    }else {
                                        callback()
                                    }
                                }
                            }else {
                                callback(new Error('请输入金额'))
                            }
                        }
                    }
                ]
            },
            inAccountCheckList: '',
            outAccountCheckList: '',
            inTurnLoading: false
        }
    },
    watch:{
        'baseInfo.IDName':function (val) {
            // console.log(val)
            this.baseInfo.cardHolder = val;
        },
        'inTurnForm.outAccount':function (val) {
            const self = this;
            self.accountBalance = 0;
            if(val === '钱包余额'){
                this.accountBalance = this.$store.state.balance.money
            }else {
                let postData = {
                    apId: self.$store.state.domain.domain.domain.apId,
                    mt4UserId: val
                };
                console.log("获取对应MT4帐号余额" , postData);
                self.$ajax({
                    method: 'post',
                    data: postData,
                    url: '/deposit/mt4'
                }).then(function (res) {
                    console.log('这个账户不存在:')
                    console.log(res)
                    if(res.data.retCode === 0){
                        console.log('转入时获取对应MT4账户的余额');
                        console.log(res.data.data);
                        self.accountBalance = res.data.data.money;
                    }else {
                        self.getMt4Err = false;
                    }
                }).catch(function (err) {

                    self.getMt4Err = false;
                })
            }
        }

    },
    methods: {
        resetPwd(row){
            console.log("sfgddg");
            this.visibleResetPwd = true;
            this.resetPwdForm = {
                UserLoginID: row.UserLoginID,
                apId: this.resetPwdForm.apId,
                UserPwd: '',
                UserInvestPwdCheck: this.resetPwdForm.UserInvestPwdCheck,
                userEmail: this.resetPwdForm.userEmail
            }

        },
        cancelModifyLevel(){
            this.modifyLevelVisible = false;
        },

        checkModifyLevel(ref){
            const self = this;
            self.$refs[ref].validate((valid)=>{
                if(valid){
                    console.log("/apply/leverage/mt4 postData");
                    this.modifyLevelPostData.userLeverage = this.modifyLevel.UserLeverage;
                    const postData = self.modifyLevelPostData;
                    console.log(postData);
                    this.$ajax({
                        method: 'post',
                        url: '/apply/leverage/mt4',
                        data: postData
                    }).then(function (res) {
                        console.log('/apply/leverage/mt4 res');
                        console.log(res);
                        if (res.data.retCode === 0) {
                            self.$message({
                                message: '申请修改杠杆成功，请等待审核',
                                showClose: true,
                                type: 'info'
                            });
                            self.modifyLevelVisible = false;
                            self.getMT4ApplyList();
                        } else {
                            self.$message({
                                message: '您提交的修改杠杆信息正在审核中，请耐心等待',
                                showClose: true,
                                type: 'info'
                            });
                        }
                    }).catch(function (err) {
                        self.$message({
                            message: '您提交的修改杠杆信息正在审核中，请耐心等待',
                            showClose: true,
                            type: 'error'
                        });
                    });
                }else {
                    return false
                }
            });

        },
        changeLever(row){
            this.getMt4LeverList()
            this.modifyLevelVisible = true;
            this.modifyLevel = {
                UserLoginID: row.UserLoginID,
                UserLeverage:row.UserLeverage
            };
            this.modifyLevelPostData = {
                apId: this.$store.state.user.userinfo.apId,
                userId: this.$store.state.user.userinfo._id,
                mt4UserId: row.UserLoginID,
                email: row.UserEmail,
                oldUserLeverage: row.UserLeverage,
            };
            console.log('changeLever row');
            console.log(row);
            if(row.leverageStatus){
                if(row.leverageStatus == 0 ){
                    this.changeLeverVisible = true
                }else {
                    this.changeLeverVisible = false
                }
            }else {
                this.changeLeverVisible = false
            }
        },
        addBank() {
            this.$prompt('请输入银行卡号', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: '邮箱格式不正确'
            }).then(({value}) => {
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        resetUserPwd(ref){
            console.log("this.resetPwdForm");
            console.log(this.resetPwdForm);
            const self = this;
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$ajax({
                        method: 'post',
                        url: '/mt4/mt4Pwd/modify',
                        data: self.resetPwdForm
                    }).then(function (res) {
                        console.log("modify");
                        if (res.data.retCode == 0) {
                            self.$message({
                                type: 'info',
                                message: '修改成功',
                                showClose: true
                            });
                            self.visibleResetPwd = false;
                            self.getMT4ApplyList();
                        } else {
                            self.$message({
                                type: 'warning',
                                message: '修改失败',
                                showClose: true
                            })
                        }
                    }).catch(function (res) {
                        self.$message({
                            type: 'error',
                            message: '网络错误',
                            showClose: true
                        })
                    })
                } else {
                    return false;
                }
            })
        },
        newAccount() {
            const self = this;
            let comfirmStatus = null;
            console.log("newAccount");

            this.$ajax({
                method:'get',
                url:'/user/'+this.userId+'/verifyStatus',
            }).then(function (res) {
                console.log(res)
                console.log( res.data.data.verifyStatus)
                if(res.data.retCode==0){
                    comfirmStatus = res.data.data.verifyStatus;
                    if(comfirmStatus=='1'){
                        self.getCanApplyMt4();
                        self.getMt4LeverList();
                    }else if(comfirmStatus==-1){
                        self.$message({
                            message:'您的资料未审核,请先耐心等待',
                            type:'warning',
                            showClose:true
                        });
                    }else if(comfirmStatus==0){
                        self.$message({
                            message:'您的资料未上传,请先完善资料',
                            type:'warning',
                            showClose:true
                        });
                    }else if(comfirmStatus==2){
                        self.$message({
                            message:'您的资料审核失败,请重新提交资料',
                            type:'warning',
                            showClose:true
                        });
                    }
                }else{
                    self.$message({
                        type: 'warning',
                        message: '网络错误',
                        showClose: true
                    });
                }
            }).catch(function (err) {
                self.$message({
                    message:'网络错误',
                    type:'error',
                    showClose:true
                });
            });
        },
        //获取设置后台设置杠杆
        getMt4LeverList(){
            const self = this;
            this.$ajax({
                method:'get',
                url:'/ap/mt4Config/'+this.$store.state.domain.domain.domain.apId+'/mt4Info'
            }).then(function (res) {
                console.log(res)
                if (res.data.retCode===0){
                    self.levelList = res.data.data.leverConfig;
                }else{
                    self.levelList = ['无数据']
                }
            }).catch(function (err) {
                self.levelList = ['无数据']
            })
        },
        //获取该用户能否开多少个MT4
        getCanApplyMt4(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/mt4User/' + this.userId + '/canApplyMt4',
            }).then(function (res) {
                console.log('canApplyMt4');
                console.log(res);
                console.log(res.data.data.mt4UserNumber);
                self.canApplyMt4 = 5 - res.data.data.mt4UserNumber;
                if (res.data.retCode == 0) {
                    self.mtDialogVisible = true;
                    self.mt4ApplyInfo.IDName = self.baseInfo.IDName;
                    self.mt4ApplyInfo.UserIRD = self.baseInfo.IDCard.IDNumber;
                    self.mt4ApplyInfo.UserPhone = self.baseInfo.userPhone;
                    self.mt4ApplyInfo.UserEmail = self.baseInfo.userEmail;
                } else {
                    self.$message({
                        showClose: true,
                        message: '您申请的账户已到上限',
                        type: 'warning'
                    });
                    this.mtDialogVisible = false;
                }

            }).catch(function (err) {

            })
        },
        onChangeInfo(){
            this.onchangeInfoShow = false;
            this.isDisabled = false;
        },
        onchangeCancel(){
            this.getMyUserInfo();
        },
        onSubmitMyInfo(ref){
            const add = [];
            add.push(this.baseInfo.addressOne);
            add.push(this.baseInfo.addressSecond);
            console.log('add');
            console.log(add);
            const self = this;
            const postData = {
                userEngName: this.baseInfo.userEngName,
                spell: this.baseInfo.spell,
                sex: this.baseInfo.sex,
                apId: this.baseInfo.apId,
                country: this.baseInfo.country,
                address: add,
                addressDetail: this.baseInfo.addressDetail,
                birthDay: this.moment(self.baseInfo.birthDay).format('YYYY-MM-DD'),
                userPhone: this.baseInfo.userPhone,
                userEmail: this.baseInfo.userEmail,
                verifyStatus: -1,
                IDName: this.baseInfo.IDName,
                IDCard: {
                    IDNumber: this.baseInfo.IDNumber,
                    IDName: this.baseInfo.IDName,
                    IDCardHeadPic: this.baseInfo.IDCardHeadPic,
                    IDCardTailPic: this.baseInfo.IDCardTailPic,

                },
                bankCard: [{
                    bankCardStatus: -1,
                    bankSort: 0,
                    id:this.baseInfo.bankId,
                    bankName: this.baseInfo.bankName,
                    bankBranch: this.baseInfo.bankBranch,
                    cardHolder: this.baseInfo.cardHolder,
                    bankCardNumbers: this.baseInfo.bankCardNumbers,
                    bankCardTailPic: this.baseInfo.bankCardTailPic,
                    bankCardHeadPic: this.baseInfo.bankCardHeadPic
                }]

            };
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    if (self.userId) {
                        self.$ajax({
                            method: 'post',
                            url: '/user/' + self.userId + '/update',
                            data: postData
                        }).then(function (res) {
                            if (res.data.retCode == 0) {
                                self.getMyUserInfo();
                                self.$message({
                                    type: 'info',
                                    showClose: true,
                                    message: '修改成功',
                                });

                            } else {
                                self.$message({
                                    type: 'warning',
                                    showClose: true,
                                    message: '修改失败',
                                });
                                self.getMyUserInfo();
                            }
                        }).catch(function (err) {
                            self.$message({
                                type: 'error',
                                showClose: true,
                                message: '网络错误',
                            });
                        })
                    }

                } else {
                    return false;
                }
            })
        },
        testTab(tabVue){
            // console.log(tabVue.label);
            if (tabVue.label === "我的MT4账户") {
                this.newAccountVisible = true;
                this.getMT4ApplyList();
            } else {
                this.newAccountVisible = false;
                this.getMyUserInfo();
                this.getUserVerfy();
            }
        },
        getMyUserInfo(){
            this.imageUrl.IHimg = '';
            this.imageUrl.ITimg = '';
            this.imageUrl.BHimg = '';
            this.imageUrl.BTimg = '';
            console.log('this.$store.state.user.userinfo._id');
            const userId = this.userId;
            const self = this;
            console.log(this.$store.state.user.userinfo._id);
            if (userId) {
                this.$ajax({
                    method: 'get',
                    url: '/other/user/' + userId
                }).then(function (res) {
                    if (res.data.retCode == 0) {
                        console.log('获取')
                        console.log(res)
                        let getInfo = res.data.data;
                        console.log(getInfo.userPhone)

                        self.$store.dispatch('update_info_status', {
                            verifyStatus: getInfo.verifyStatus,
                        });
                        console.log('self.$store.state.myInfoStatus.verifyStatus');
                        console.log(self.$store.state.myInfoStatus.verifyStatus);

                        const userinfo = getInfo;
                        self.$store.dispatch('update_userinfo',{userinfo});

                        if(self.$store.state.myInfoStatus.verifyStatus === 1){
                            self.isDisabled = true;
                            self.onchangeInfoShow = false;
                        }else if(self.$store.state.myInfoStatus.verifyStatus === 0){
                            self.isDisabled = false;
                            self.onchangeInfoShow = false;
                        }else {
                            self.isDisabled = true;
                            self.onchangeInfoShow = true;
                        }

                        self.baseInfo.userPhone = getInfo.userPhone;
                        console.log("self.baseInfo.userPhone")
                        console.log(self.baseInfo.userPhone)
                        self.baseInfo.userEmail = getInfo.userEmail;
                        self.baseInfo.sex = getInfo.sex;
                        self.baseInfo.addressDetail = getInfo.addressDetail;
                        self.baseInfo.spell = getInfo.spell;
                        self.baseInfo.userEngName = getInfo.userEngName;
                        self.baseInfo.birthDay = getInfo.birthDay;
                        self.baseInfo.country = getInfo.country;
                        if (res.data.data.address) {
                            self.baseInfo.addressOne = getInfo.address[0];
                            self.baseInfo.addressSecond = getInfo.address[1];
                        }
                        if (res.data.data.IDCard) {
                            self.baseInfo.IDName = getInfo.IDCard.IDName;
                            self.baseInfo.cardHolder = getInfo.IDCard.IDName;
                            self.baseInfo.IDNumber = getInfo.IDCard.IDNumber;
                            self.mt4ApplyInfo.UserIRD = getInfo.IDCard.IDNumber;
                            if(res.data.data.IDCard.IDCardHeadPic){
                                self.baseInfo.IDCardHeadPic = getInfo.IDCard.IDCardHeadPic;
                                self.baseInfo.IDCardTailPic = getInfo.IDCard.IDCardTailPic;
                                self.imageUrl.IHimg = "http://" + getInfo.IDCard.IDCardHeadPic;
                                self.imageUrl.ITimg = "http://" + getInfo.IDCard.IDCardTailPic;
                            }else{
                                self.baseInfo.IDCardHeadPic = '';
                                self.baseInfo.IDCardTailPic = '';
                                self.imageUrl.IHimg ='';
                                self.imageUrl.ITimg = '';
                            }
                        }else{
                            self.baseInfo.IDName = getInfo.IDCard.IDName;
                            self.baseInfo.cardHolder = getInfo.IDCard.IDName;
                            self.baseInfo.IDNumber = getInfo.IDCard.IDNumber;
                            self.baseInfo.IDCardHeadPic = getInfo.IDCard.IDCardHeadPic;
                            self.baseInfo.IDCardTailPic = getInfo.IDCard.IDCardTailPic;
                        }
                        if (res.data.data.bankCard&&res.data.data.bankCard.length>0) {
                            const bankCard = res.data.data.bankCard;
                            console.log(bankCard)
                            let importCart = null;
                            for(let i = 0;i<bankCard.length;i++){
                                console.log(bankCard[i].importantCard)
                                if(bankCard[i].importantCard){
                                    if(bankCard[i].importantCard==1){
                                        importCart = i;
                                        self.baseInfo.bankName = getInfo.bankCard[importCart].bankName;
                                        self.baseInfo.bankBranch = getInfo.bankCard[importCart].bankBranch;
                                        self.baseInfo.bankCardNumbers = getInfo.bankCard[importCart].bankCardNumbers;
                                        self.baseInfo.bankId = getInfo.bankCard[importCart].id;
                                        self.baseInfo.bankCardTailPic = getInfo.bankCard[importCart].bankCardTailPic;
                                        self.baseInfo.bankCardHeadPic = getInfo.bankCard[importCart].bankCardHeadPic;
                                        self.imageUrl.BTimg = "http://" + getInfo.bankCard[importCart].bankCardTailPic;
                                        self.imageUrl.BHimg = "http://" + getInfo.bankCard[importCart].bankCardHeadPic;
                                    }
                                }
                            }

                        }else{
                            self.baseInfo.bankName = '';
                            self.baseInfo.bankBranch = '';
                            self.baseInfo.bankCardNumbers = '';
                            self.baseInfo.bankId = '';
                            self.baseInfo.bankCardTailPic = '';
                            self.baseInfo.bankCardHeadPic = '';
                            self.imageUrl.BTimg = '';
                            self.imageUrl.BHimg = '';
                        }
                        // console.log(res.data.data)
                    }
                }).catch(function (err) {

                })
            }
        },
        handleInfoUpload(file){
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt500K = file.size / 1024  < 500;
            console.log("file")
            console.log(file)
            if (!(isPNG||isJPG)) {
                this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!isPNG');
            }
            if (!isLt500K) {
                this.$message.error('上传头像图片大小不能超过 500KB!');
            }
            return isJPG||isPNG &&isLt500K;
        },
        handleIHSuccessPic(res, file){
            this.imageUrl.IHimg = file.url;
            this.baseInfo.IDCardHeadPic = res.data;
        },
        handleBTSuccessPic(res, file){
            this.baseInfo.bankCardTailPic = res.data;
            this.imageUrl.BTimg = file.url;
        },
        handleBHSuccessPic(res, file){
            this.imageUrl.BHimg = file.url;
            this.baseInfo.bankCardHeadPic = res.data;
        },
        handleITSuccessPic(res, file){
            this.baseInfo.IDCardTailPic = res.data;
            this.imageUrl.ITimg = file.url;
        },
        cancelMT4Apply(ref){
            this.mtDialogVisible = false;
        },
        confirmMT4Apply(ref){
            console.log('bb')
            let comfirmStatus = null;
            console.log(comfirmStatus)
            let self = this;
            self.MT4ApplyLoading = true;
            let personType = '';//realTransferRules,demoTransferRules,agentAccountRules
            if (this.$store.state.user.userinfo.role === 'agent') {
                personType = 'agentAccountRules';
            } else {
                personType = 'realTransferRules';
            }
            if(this.$store.state.user.userinfo.address){
                this.mt4ApplyInfo.UserCity = this.$store.state.user.userinfo.address[0];
                this.mt4ApplyInfo.UserState = this.$store.state.user.userinfo.address[0];
                this.mt4ApplyInfo.UserAddress = this.$store.state.user.userinfo.address[0];
            }else{
                this.mt4ApplyInfo.UserCity = '';
                this.mt4ApplyInfo.UserState = '';
                this.mt4ApplyInfo.UserAddress = '';
            }
            const postData = {
                apId: this.mt4ApplyInfo.apId,
                userId: this.mt4ApplyInfo.userId,
                accountType: personType,
                IDName: this.$store.state.user.userinfo.IDName,
                UserGroupName: this.mt4ApplyInfo.UserGroupName,
                UserCountry: this.$store.state.user.userinfo.country,
                UserCity:  this.mt4ApplyInfo.UserCity,
                UserState:this.mt4ApplyInfo.UserState,
                UserZipcode: "",
                UserAddress: this.mt4ApplyInfo.UserAddress,
                UserPhone:this.mt4ApplyInfo.UserPhone,
                UserEmail: this.mt4ApplyInfo.UserEmail,
                UserComment: 'crm',
                UserLeverage: parseInt(this.mt4ApplyInfo.UserLeverage),
                UserPwd: this.mt4ApplyInfo.UserPwd,
                UserInvestorpwd: this.mt4ApplyInfo.UserInvestorpwd,
            };
            console.log('postData')
            console.log(postData)
            self.$refs[ref].validate((valid) => {
                if (valid) {
                    self.$ajax({
                        method: 'post',
                        url: '/other/apply/mt4',
                        data: postData
                    }).then(function (res) {
                        console.log(res)
                        if (res.data.retCode == 0) {
                            self.$message({
                                type: 'info',
                                // message: '申请成功',
                                message: '邮件发送成功，请注意查收',
                                showClose: true
                            });
                            self.mtDialogVisible = false;
                            self.MT4ApplyLoading = false;
                            self.getMT4ApplyList();
                        } else if(res.data.retCode == 1){
                            self.$message({
                                type: 'info',
                                // message: '申请成功',
                                message: '操作成功，请稍后查收邮件',
                                showClose: true
                            });
                            self.mtDialogVisible = false;
                            self.MT4ApplyLoading = false;
                            self.getMT4ApplyList();
                        }else {
                            self.$message({
                                type: 'warning',
                                // message: '申请失败,失败原因:'+res.data.data.errMsg,
                                message: '操作失败，请稍后再试',
                                showClose: true
                            });
                            self.mtDialogVisible = false;
                            self.MT4ApplyLoading = false;
                        }
                    }).catch(function (err) {
                        self.$message({
                            type: 'error',
                            message: '网络错误',
                            showClose: true
                        });
                        self.mtDialogVisible = false;
                        self.MT4ApplyLoading = false;
                    });

                } else {
                    self.MT4ApplyLoading = false;
                    return false;
                }
            })
        },
        getMT4ApplyList(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/mt4User/' + this.userId + '/list',
            }).then(function (res) {
                console.log('getMT4ApplyList');
                console.log(res.data.data);
                if (res.data.retCode == 0) {
                    self.transAccount = res.data.data.length;
                    self.myAllAccount = res.data.data;
                    self.totalMyInfo = res.data.data.length;
                }
            }).catch(function (err) {

            })
        },
        // 转入转出
        // 转入时获取对应账户的余额
        initInTurnForm(){
            this.inTurnForm.inAccount = '';
            this.inTurnForm.outAccount = '';
            this.inTurnForm.deposit = '';
        },
        inTurnCount(){
            const self = this;
            self.initInTurnForm();
            this.$ajax({
                method: 'get',
                url: '/mt4User/' + self.userId + '/list',
            }).then(function (res) {
                if (res.data.retCode == 0) {
                    const checkList = res.data.data;
                    const check = [];
                    check.push("钱包余额");
                    // console.log(row.mt4UserId);
                    checkList.forEach(function (item) {
                        check.push(item.UserLoginID.toString())
                    });
                    self.inAccountCheckList = check;
                    self.outAccountCheckList = check;
                }
            }).catch(function (err) {
            });
            self.inTurnVisible = true;
        },
        getBalance(val){
            const self = this;
            self.accountBalance = 0;
            if(val === '钱包余额'){
                this.accountBalance = this.$store.state.balance.money
            }else {
                var postData = {
                    apId: self.$store.state.domain.domain.domain.apId,
                    mt4UserId: val
                };
                console.log("获取对应MT4帐号余额" , postData);
                self.$ajax({
                    method: 'post',
                    data: postData,
                    url: '/deposit/mt4'
                }).then(function (res) {
                    console.log('这个账户不存在:')
                    console.log(res)
                    if(res.data.retCode === 0){
                        console.log('转入时获取对应MT4账户的余额');
                        console.log(res.data.data);
                        self.accountBalance = res.data.data.money;
                    }else {
                        self.$message({
                            type: 'error',
                            message: '这个账户不存在'
                        })
                    }
                }).catch(function (err) {
                })
            }
        },
        inTurnConfirm(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    if(self.inTurnForm.outAccount === '钱包余额'){
                        const postData = {
                            apId: self.$store.state.domain.domain.domain.apId,
                            userId: self.userId,
                            mt4UserId: self.inTurnForm.inAccount.toString(),
                            deposit: self.inTurnForm.deposit.trim()
                        };
                        self.$ajax({
                            method: 'post',
                            url: '/deposit/crm2mt4',
                            data: postData
                        }).then(function (res)  {
                            if (res.data.retCode === 0) {
                                self.$message({
                                    type: 'info',
                                    message: '钱包转入MT4账户成功',
                                    showClose: true
                                });
                                self.resetBalance();
                                self.getMT4ApplyList();
                                self.inTurnVisible = false;
                                self.inTurnLoading = false;
                                self.initInTurnForm();
                            } else {
                                self.$message({
                                    type: 'warning',
                                    message: '钱包转入MT4账户失败',
                                    showClose: true
                                });
                                self.inTurnLoading = false;
                            }
                        }).catch(function (err) {
                            self.$message({
                                type: 'error',
                                message: '网络错误',
                                showClose: true
                            });
                            self.inTurnVisible = false;
                            self.inTurnLoading = false;
                            self.initInTurnForm();
                        });
                    }else if(self.inTurnForm.outAccount !== '钱包余额' && self.inTurnForm.inAccount === '钱包余额'){
                        const postData = {
                            apId: self.$store.state.domain.domain.domain.apId,
                            userId: self.userId,
                            mt4UserId: self.inTurnForm.outAccount.toString(),
                            deposit: self.inTurnForm.deposit.trim()
                        };
                        self.$ajax({
                            method: 'post',
                            url: '/deposit/mt42crm',
                            data: postData
                        }).then(function (res) {
                            if (res.data.retCode === 0) {
                                self.$message({
                                    type: 'info',
                                    message: 'MT4账户转入钱包余额成功',
                                    showClose: true
                                });
                                self.resetBalance();
                                self.getMT4ApplyList();
                                self.inTurnVisible = false;
                                self.inTurnLoading = false;
                                self.initInTurnForm();
                            } else {
                                self.$message({
                                    type: 'warning',
                                    message: 'MT4账户转入钱包余额失败',
                                    showClose: true
                                });
                                self.inTurnLoading = false;
                            }
                        }).catch(function (err) {
                            self.$message({
                                type: 'error',
                                message: '网络错误',
                                showClose: true
                            });
                            self.inTurnLoading = false;
                        })
                    }else {
                        const postData = {
                            apId: self.$store.state.domain.domain.domain.apId,
                            deposit: self.inTurnForm.deposit,
                            userId: self.userId,
                            fromMt4UserId: self.inTurnForm.outAccount.toString(),
                            toMt4UserId: self.inTurnForm.inAccount.toString()
                        };
                        self.mt42mt4(postData);
                        self.inTurnVisible = false;
                        self.inTurnLoading = false;
                        self.initInTurnForm();
                    }
                }
            })
        },
        inTurnCancel(){
            this.inTurnVisible = false;
            this.inTurnLoading = false;
            this.initInTurnForm();
        },
        mt42mt4(val){
            const postData = val;
            console.log('mt42mt4 postData');
            console.log(postData);
            const self = this;
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/deposit/mt42mt4'
            }).then(function (res) {
                if (res.data.retCode == 0) {
                    self.$message({
                        type: 'info',
                        message: 'MT4账户转入MT4账户成功',
                        showClose: true
                    });
                    self.getMT4ApplyList();
                } else {
                    self.$message({
                        type: 'warning',
                        message: 'MT4账户转入MT4账户失败',
                        showClose: true
                    })
                }
            }).catch(function (err) {
                self.$message({
                    type: 'error',
                    message: '网络错误',
                    showClose: true
                })
            })
        },
        // 刷新钱包余额
        resetBalance(){
            let self = this;
            self.$ajax({
                method: 'get',
                url: '/deposit/wallet/' + self.userId
            }).then(function (res) {
                // console.log(res.data.data);
                self.$store.dispatch('update_balance',res.data.data);
            }).catch(function (err) {
            });
        },
        closeDialog(){
            this.mtDialogVisible = false;
            this.visibleResetPwd = false;
            this.modifyLevelVisible = false;
            this.inTurnVisible = false;
        },
        getUserVerfy(){
            const self = this;
            if(this.$store.state.user.userinfo._id){
                this.$ajax({
                    method:'get',
                    url:'/user/'+this.$store.state.user.userinfo._id+'/verifyStatus'
                }).then(function (res) {
                    if(res.data.retCode==0){
                        self.$store.dispatch('update_info_status', {
                            verifyStatus: res.data.data.verifyStatus,
                        });
                        console.log('self.$store.state.myInfoStatus.verifyStatus');
                        console.log(self.$store.state.myInfoStatus.verifyStatus);
                        if(self.$store.state.myInfoStatus.verifyStatus === 1){
                            self.isDisabled = true;
                            self.onchangeInfoShow = false;
                        }else if(self.$store.state.myInfoStatus.verifyStatus === 0){
                            self.isDisabled = false;
                            self.onchangeInfoShow = false;
                        }else {
                            self.isDisabled = true;
                            self.onchangeInfoShow = true;
                        }
                    }
                }).catch(function (err) {

                })
            }
        },
        getbankCardSize(){
            const self = this;
            if(this.userId){
                this.$ajax({
                    url:'/user/'+this.userId+'/bankCard/list',
                    method:'get'
                }).then(function (res) {
                    if(res.data.retCode==0){
                        if( res.data.data.data[0].bankCard){
                            self.bankNum = res.data.data.data[0].bankCard.length;
                        }

                    }
                }).catch(function (err) {

                })
            }
        },

        initNum(val){
            this.baseInfo.bankCardNumbers = val.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        }

    },
    mounted(){
        this.getMyUserInfo();
        this.getUserVerfy();
        this.getMT4ApplyList();
        this.getbankCardSize()
    }
}
