/**
 * Created by Udea-Manager on 2017/5/5.
 */
export default {
    data(){
        return {
            // DrawUpload: this.$store.state.baseUrl + '/crm/ap/img/upload',
            bankCardHeadPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/bankCardHeadPic'+ this.$store.state.user.userinfo._id + new Date().getTime() + '?dir=ap-logo/&contentType=image/jpeg',
            bankCardTailPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/bankCardTailPic'+ this.$store.state.user.userinfo._id + new Date().getTime() + '?dir=ap-logo/&contentType=image/jpeg',
            titleAddbank:'新增银行卡',
            bankAddOrEdit:'',
            BankimageUrl:{
                BHimg:'',
                BTimg:''
            },
            bankCardTotal:null,
            bankConfigData:{
                cardHolder:this.$store.state.user.userinfo.IDName,
                bankName:'',
                bankCardStatus:'',
                bankBranch:'',
                bankCardNumbers:'',
                bankCardTailPic:'',
                bankCardHeadPic:'',
            },
            minusTypeList:[
                {
                    label:'银行转账',
                    value:1
                },
                {
                    label:'电子转账',
                    value:2
                }
            ],
            addbankConfigShow:false,
            drawBank: '1',
            allBank: '1',
            bankInfo: [],
            bankConfigData_rules:{
                cardHolder:[{
                    required:true,
                    message:'请填写你的姓名',
                    trigger:'blur'
                }],
                bankName:[{
                    required:true,
                    message:'请填写银行卡名称',
                    trigger:'blur'
                }],

                bankBranch:[{
                    required:true,
                    message:'请填写开户行支行',
                    trigger:'blur'
                }],
                bankCardNumbers:[{
                    required:true,
                    message:'请填写银行卡号',
                    trigger:'blur'
                }],
                bankCardHeadPic:[{
                    required:true,
                    message:'请上传银行卡正面',
                    trigger:'blur'
                }],
                bankCardTailPic:[{
                    required:true,
                    message:'请上传银行卡反面',
                    trigger:'blur'
                }],
            },
            drawForm: {
                balance: null,
                apId:this.$store.state.user.userinfo.apId,
                amount:'',
                userId:this.$store.state.user.userinfo._id,
                userEmail:this.$store.state.user.userinfo.userEmail,
                minusType:1,
                currentRate:'',
                flowMoney:'',
                IDName:'',
                bankName:'',
                bankBranch:'',
                bankCardNo:'',
                comment:''
            },
            drawFormRules: {
                currentRate:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null||value==undefined){
                                callback(new Error('未设置出金,请到后台出金'))
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                amount:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入金额'))
                            }else{
                                if (value>this.drawForm.balance){
                                    callback(new Error('余额不足'))
                                }else{
                                    this.$ajax({
                                        method:'get',
                                        url:this.$store.state.domain.domain.domain.apId+'/2/financialRule'
                                    }).then(function (res) {
                                        if (res.data.retCode==0){
                                            if(res.data.data.withdrawConfig.withdrawMax>=value){
                                                if(res.data.data.withdrawConfig.withdrawMin<=value){
                                                    callback()
                                                }else{
                                                    callback(new Error('出金金额不能小于单笔设置最低'))
                                                }
                                            }else {
                                                callback(new Error('出金金额不能大于单笔设置最高'))
                                            }
                                        }else{
                                            callback(new Error('查询出错'))
                                        }
                                    }).catch(function (err) {
                                        callback(new Error('查询出错'))
                                    })
                                }
                            }
                        }
                    }
                ],
                IDName:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请选择左边银行卡'))
                            }else{
                                callback()
                            }
                        }
                    }
                ]
            }
        }
    },
    watch:{
        'drawForm.amount':function (val) {
            console.log(val)
            this.drawForm.flowMoney = val*this.drawForm.currentRate;
        }
    },
    methods: {
        addBank() {
            this.$prompt('请输入银行卡号', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
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
        addBankClose(){
            this.addbankConfigShow = false;
            this.titleAddbank = '新增银行卡';
            this.bankConfigData = {
                cardHolder:this.$store.state.user.userinfo.IDName,
                bankName:'',
                bankCardStatus:'',
                bankBranch:'',
                bankCardNumbers:'',
                bankCardTailPic:'',
                bankCardHeadPic:'',
            }
        },
        delBankCard(row){
            console.log('删除')
            console.log(row)
            const self = this;
            this.$confirm('删除银行卡','您确定要删除卡号为'+row.bankCardNumbers+'吗?',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                self.$ajax({
                    method:'post',
                    url:'/user/remove/bankCard',
                    data:{
                        userId:this.$store.state.user.userinfo._id,
                        bankCardNumbers:row.bankCardNumbers
                    }
                }).then(function (res) {
                    if(res.data.retCode==0){
                        self.$message({
                            message:'删除成功',
                            showClose:true,
                            type:'info'
                        });
                        self.getBankList();
                    }else{
                        self.$message({
                            message:'删除失败',
                            showClose:true,
                            type:'warning'
                        })
                    }
                }).catch(function (err) {
                    self.$message({
                        message:'网络错误',
                        showClose:true,
                        type:'error'
                    })
                })
            }).catch(()=>{
                this.$message({
                    message:'已取消',
                    showClose:true,
                    type:'success'
                })
            })
        },
        modifyBanKCard(row){
            this.addbankConfigShow = true;
            this.bankAddOrEdit = '修改';
            this.titleAddbank = '修改银行卡';
            this.bankConfigData = row;
            this.BankimageUrl.BTimg = "http://"+row.bankCardTailPic;
            this.BankimageUrl.BHimg = "http://"+row.bankCardHeadPic;
            console.log('修改')
            console.log(row)
        },
        drawMoneySumbit(ref) {
            console.log(this.drawForm);
            const self = this;
            const postData = {
                balance: this.drawForm.balance,
                apId:this.drawForm.apId,
                amount:this.drawForm.amount,
                userId:this.drawForm.userId,
                userEmail:this.drawForm.userEmail,
                minusType:this.drawForm.minusType,
                currentRate:this.drawForm.currentRate,
                flowMoney:this.drawForm.flowMoney,
                IDName:this.drawForm.IDName,
                bankName:this.drawForm.bankName,
                bankBranch:this.drawForm.bankBranch,
                bankCardNo:this.drawForm.bankCardNo,
                comment:this.drawForm.comment
            }
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method:'post',
                        url:'/deposit/applyMinus',
                        data:postData
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                type:"info",
                                message:'提交出金申请成功，请等待审核',
                                showClose:true
                            });
                            self.$refs[ref].resetFields();
                            self.getUserWallet();
                            self.allBank = '';
                        }else{
                            self.$message({
                                type:'warning',
                                message:'提交失败,请重新提交',
                                showClose:true
                            })
                        }
                    }).catch(function (err) {
                        self.$message({
                            type:'error',
                            message:'网络错误',
                            showClose:true
                        })
                    })
                }else{
                    return false
                }
            })
        },
        addbankConfig(){
            let comfirmStatus = null;
            const self = this;
            this.$ajax({
                method:'get',
                url:'/user/'+this.$store.state.user.userinfo._id+'/verifyStatus',
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log("hahah "+res.data.data.verifyStatus)
                    comfirmStatus = res.data.data.verifyStatus;
                    if(comfirmStatus=='1'){
                        self.addbankConfigShow = true;
                    }else if(comfirmStatus=='0'){
                        self.$message({
                            message:'您的资料未上传,请先完善资料',
                            type:'warning',
                            showClose:true
                        });
                        self.$router.push('/accountManagement/myInfo')
                    }else if(comfirmStatus=='2'){
                        self.$message({
                            message:'您的资料未通过,通过才能增加银行卡',
                            type:'warning',
                            showClose:true
                        })
                    }else if(comfirmStatus=='-1'){
                        self.$message({
                            message:'您的资料未审核,通过才能增加银行卡',
                            type:'warning',
                            showClose:true
                        })
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
                    type: 'warning',
                    message: '网络错误',
                    showClose: true
                });

            })

            // self.$router.push('/myInfo');
            this.getBankList();
            console.log('bankCardTotal')
            console.log(this.bankCardTotal)

        },
        handleBankUpload(file){
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
        addBankHeadSuccess(res,files){
            this.BankimageUrl.BHimg = files.url;
            this.bankConfigData.bankCardHeadPic = res.data;
        },
        addBankTailSuccess(res,files){
            this.bankConfigData.bankCardTailPic = res.data;
            this.BankimageUrl.BTimg = files.url;
        },
        changeSelectBank(res){
            const self = this;
            console.log(res)
            for(let i= 0;i<this.bankInfo.length;i++){
                if(self.bankInfo[i].bankCardNumbers==res){
                    self.drawForm.bankName  = this.bankInfo[i].bankName;
                    self.drawForm.bankCardNo  = this.bankInfo[i].bankCardNumbers;
                    self.drawForm.IDName  = this.bankInfo[i].cardHolder;
                    self.drawForm.bankCardStatus  = this.bankInfo[i].bankCardStatus;
                    self.drawForm.bankCardTailPic  = this.bankInfo[i].bankCardTailPic;
                    self.drawForm.bankCardHeadPic  = this.bankInfo[i].bankCardHeadPic;
                    self.drawForm.bankBranch  = this.bankInfo[i].bankBranch;

                }
            }
        },
        cancelBankadd(){
            this.addbankConfigShow = false;
            this.titleAddbank = '新增银行卡';
            this.bankConfigData = {
                cardHolder:this.$store.state.user.userinfo.IDName,
                bankName:'',
                bankCardStatus:'',
                bankBranch:'',
                bankCardNumbers:'',
                bankCardTailPic:'',
                bankCardHeadPic:'',
            }
        },
        sumitBankAdd(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    if(this.bankAddOrEdit=='修改'){
                        const postDataEdit = {
                            bankName:this.bankConfigData.bankName,
                            bankCardType:this.bankConfigData.bankCardType,
                            bankBranch:this.bankConfigData.bankBranch,
                            cardHolder:this.bankConfigData.cardHolder,
                            bankSort:this.bankConfigData.bankSort,
                            bankCardStatus:-1,
                            bankCardHeadPic:this.bankConfigData.bankCardHeadPic,
                            bankCardTailPic:this.bankConfigData.bankCardTailPic,
                            bankCardNumbers:this.bankConfigData.bankCardNumbers,
                            bankId:this.bankConfigData.id,
                            _id:this.$store.state.user.userinfo._id,
                            bankReason:this.bankConfigData.bankReason,
                            auditTime:this.bankConfigData.auditTime,
                        };
                        console.log('postDataEdit')
                        console.log(postDataEdit)
                        self.$ajax({
                            method:'post',
                            url:'/user/modify/bankCard',
                            data:postDataEdit,
                        }).then(function (res) {
                            if(res.data.retCode==0){
                                self.$message({
                                    type:'info',
                                    message:'修改成功',
                                    showClose:true
                                });
                                self.bankConfigData  = {
                                    bankCardHeadPic:'',
                                    bankCardTailPic:''
                                };
                                self.titleAddbank = '新增银行卡';
                                self.BankimageUrl.BHimg  = '';
                                self.BankimageUrl.BTimg  = '';
                                self.getBankList();
                                self.$refs[ref].resetFields();
                                self.bankConfigData.cardHolder = self.$store.state.user.userinfo.IDName;
                                self.addbankConfigShow = false;
                                self.bankAddOrEdit = '';
                            }else{
                                self.$message({
                                    type:'warning',
                                    message:'修改失败',
                                    showClose:true
                                });
                                self.bankAddOrEdit = '';
                                self.titleAddbank = '新增银行卡';
                            }
                        }).catch(function (err) {
                            self.$message({
                                type:'warning',
                                message:'网络错误',
                                showClose:true
                            });
                            self.bankAddOrEdit = '';
                            self.titleAddbank = '新增银行卡';
                        })

                    }else{
                        const postData = {
                            bankCardArray: [
                                {
                                    bankName:this.bankConfigData.bankName,
                                    bankCardType:this.bankConfigData.bankCardType,
                                    bankAccountName:this.bankConfigData.bankAccountName,
                                    bankBranch:this.bankConfigData.bankBranch,
                                    bankCardNumbers:this.bankConfigData.bankCardNumbers,
                                    bankCardStatus:-1,
                                    bankCardTailPic:this.bankConfigData.bankCardTailPic,
                                    bankCardHeadPic:this.bankConfigData.bankCardHeadPic,
                                    cardHolder:this.bankConfigData.cardHolder,
                                    bankSort:this.bankCardTotal

                                },
                            ],
                            _id:this.$store.state.user.userinfo._id,
                            apId:this.$store.state.domain.domain.domain.apId
                        };

                        console.log( 'postData');
                        console.log( postData);
                        this.$ajax({
                            method:'post',
                            url:'/user/add/bankCard',
                            data:postData
                        }).then(function (res) {
                            if (res.data.retCode==0){
                                self.$message({
                                    type:'info',
                                    message:'增加成功',
                                    showClose:true
                                });
                                self.bankConfigData  = {
                                    bankCardHeadPic:'',
                                    bankCardTailPic:''
                                };
                                self.BankimageUrl.BHimg  = '';
                                self.BankimageUrl.BTimg  = '';
                                self.getBankList();
                                self.$refs[ref].resetFields();
                                self.bankConfigData.cardHolder = self.$store.state.user.userinfo.IDName
                                self.addbankConfigShow = false;

                            }else{
                                self.$message({
                                    type:'warning',
                                    message:'增加失败',
                                    showClose:true
                                });
                            }
                        }).catch(function (err) {
                            // console.log(err)
                            self.$message({
                                type:'error',
                                message:'网络错误',
                                showClose:true
                            });
                        })
                    }

                }else{
                    return false;
                }

            })
        },
        getUserWallet(){
            const self = this;
            this.$ajax({
                method:'get',
                url:'/deposit/wallet/'+this.$store.state.user.userinfo._id
            }).then(function (res) {
                console.log(res)
                if(res.data.retCode==0){
                    self.drawForm.balance = res.data.data.money;
                    self.$store.dispatch('update_balance',{balance:res.data.data});
                }
            }).catch(function (err) {

            })
        },
        getBankList(){
            const self = this;
            this.$ajax({
                method:'get',
                url:'/user/'+this.$store.state.user.userinfo._id+'/bankCard/list',
            }).then(function (res) {
                console.log(res.data.data.data[0].bankCard);
                console.log(res.data.data.data[0].bankCard.length);
                if(res.data.retCode==0){
                    self.bankInfo = res.data.data.data[0].bankCard;
                    if(res.data.data.data[0].bankCard.length>0){
                        self.bankCardTotal = res.data.data.data[0].bankCard.length;
                    }
                    self.bankInfo.forEach(function (item,index) {
                        if(item.bankCardStatus === 1){
                            self.bankInfo[index].bgBule = true
                        }else {
                            self.bankInfo[index].bgBule = false
                        }
                    })
                }
                console.log('self.bankInfo');
                console.log(self.bankInfo);
            }).catch(function (err) {

            })
        },
        getWithdrawRealTimeRate(){
            const self = this;
            this.$ajax({
                method:'get',
                url:this.$store.state.user.userinfo.apId+'/2/financialRule'
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('dollarMoney')
                    console.log(res)
                    if(res.data.data.withdrawConfig){
                        if(res.data.data.withdrawConfig.withdrawRateAdjust==null||res.data.data.withdrawConfig.withdrawRateAdjust==undefined){
                            self.drawForm.currentRate = res.data.data.withdrawConfig.withdrawReplaceRate;
                        }else if( res.data.data.withdrawConfig.withdrawReplaceRate==null||res.data.data.withdrawConfig.withdrawRateAdjust==undefined){
                            self.drawForm.currentRate = res.data.data.withdrawConfig.withdrawRateAdjust;
                        }else{
                            self.drawForm.currentRate = res.data.data.withdrawConfig.withdrawFixedRate;
                        }
                    }else{
                        self.drawForm.currentRate = null;
                    }

                }

            }).catch(function (err) {

            })
        }
    },
    mounted(){
        this.getBankList();
        this.getUserWallet();
        this.getWithdrawRealTimeRate();
    },
}
