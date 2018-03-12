/**
 * Created by Udea-Manager on 2017/11/13.
 */
export default {
    data(){
        return{
            depositForm: {
                onlineUrl: this.$store.state.baseUrl ,
                payWay:'1',
                apId:this.$store.state.domain.domain.domain.apId,
                userId:this.$store.state.user.userinfo._id,
                balance: this.accounting.formatMoney(this.$store.state.balance.money),
                IDName:this.$store.state.user.userinfo.IDName,
                userEmail:this.$store.state.user.userinfo.userEmail,
                nameThreePaPay:'',
                order_amount:'',
                amount:'',
                currentRate:0,
                bankCode:'',
                pay_bank_code:'',
                pay_bankname:'',
                // currency:''
            },
            HCInfoShow:'',
            bankCodeList:[
                {
                    label:'ICBC',
                    value:'ICBC'
                },
                {
                    label:'农业银行',
                    value:'ABC'
                },
                {
                    label:'中国银行',
                    value:'BOCSH'
                },
                {
                    label:'建设银行',
                    value:'CCB'
                },
                {
                    label:'招商银行',
                    value:'CMB'
                },
                {
                    label:'浦发银行',
                    value:'SPDB'
                },
                {
                    label:'广发银行',
                    value:'GDB'
                },
                {
                    label:'交通银行',
                    value:'BOCOM'
                },
                {
                    label:'邮政储蓄银行',
                    value:'PSBC'
                },
                {
                    label:'中信银行',
                    value:'CNCB'
                } ,
                {
                    label:'民生银行',
                    value:'CMBC'
                },
                {
                    label:'光大银行',
                    value:'CEB'
                },
                {
                    label:'华夏银行',
                    value:'HXB'
                } ,
                {
                    label:'兴业银行',
                    value:'CIB'
                },
                {
                    label:'上海银行',
                    value:'BOS'
                },
                {
                    label:'上海农商',
                    value:'SRCB'
                },
                {
                    label:'平安银行',
                    value:'PAB'
                },
                {
                    label:'北京银行',
                    value:'BCCB'
                },
                {
                    label:'中行',
                    value:'BOC'
                },
                {
                    label:'中国银联',
                    value:'UNIONPAY'
                }
            ],
            pay_banknameList:[
                {
                    label:'农业银行',
                    value:'ABC'
                },
                {
                    label:'工商银行',
                    value:'ICBC'
                },
                {
                    label:'招商银行',
                    value:'CMB'
                },
                {
                    label:'建设银行',
                    value:'CCB'
                },
                {
                    label:'浦发银行',
                    value:'SPDB'
                },
                {
                    label:'民生银行',
                    value:'CMBC'
                },
                {
                    label:'深圳发展银行斯蒂芬',
                    value:'SDB'
                },
                {
                    label:'兴业银行',
                    value:'CIB'
                },
                {
                    label:'交通银行',
                    value:'BCOM'
                },
                {
                    label:'光大银行',
                    value:'CEBB'
                },
                {
                    label:'中国银行',
                    value:'BOC'
                },
                {
                    label:'平安银行',
                    value:'SPABANK'
                },
                {
                    label:'广发银行',
                    value:'GDB'
                },
                {
                    label:'中信银行',
                    value:'ECITIC'
                },
                {
                    label:'宁波银行',
                    value:'NBB'
                }
            ],
            bankCodeShList:[
                {
                    label:'农业银行',
                    value:'ABC'
                },
                {
                    label:'工商银行',
                    value:'ICBC'
                },
                {
                    label:'建设银行',
                    value:'CCB'
                },
                {
                    label:'交通银行',
                    value:'BCOM'
                },
                {
                    label:'中国银行',
                    value:'BOC'
                },
                {
                    label:'招商银行',
                    value:'CMB'
                },
                {
                    label:'民生银行',
                    value:'CMBC'
                },
                {
                    label:'光大银行',
                    value:'CEBB'
                },
                {
                    label:'北京银行',
                    value:'BOB'
                },
                {
                    label:'上海银行',
                    value:'SHB'
                },
                {
                    label:'宁波银行',
                    value:'NBB'
                },
                {
                    label:'华夏银行',
                    value:'HXB'
                },
                {
                    label:"兴业银行",
                    value:'CIB'
                },
                {
                    label:"中国邮政银行",
                    value:'PSBC'
                },
                {
                    label:'平安银行',
                    value:'SPABANK'
                },
                {
                    label:'浦发银行',
                    value:'SPDB'
                },
                {
                    label:'中信银行',
                    value:'ECITIC'
                },
                {
                    label:'杭州银行',
                    value:'HZB'
                },
                {
                    label:'广发银行',
                    value:'GDB'
                }
            ],
            currencyList:[
                {
                    label:'RMB',
                    value:'RMB'
                },
                {
                    label:'CNY',
                    value:'CNY'
                }
            ],
            payWayList:[
                {
                    label:'网银支付',
                    value:'1'
                },
                {
                    label:'快捷支付',
                    value:'2'
                }
            ],
            threePartyNameList:[],
            depositFormRules: {
                amount:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入金额'))
                            }else{
                                if(typeof value=='number'){
                                    if(this.HCInfoShow == 'WLKJ'){
                                        if(value<2){
                                            callback(new Error('入金的金额不能小于2'))
                                        }else{
                                            this.$ajax({
                                                method:'get',
                                                url:this.$store.state.domain.domain.domain.apId+'/1/financialRule'
                                            }).then(function (res) {
                                                if(res.data.retCode==0){
                                                    if(res.data.data.depositConfig.depositMin<=value){
                                                        if(res.data.data.depositConfig.depositMax>=value){
                                                            callback()
                                                        }else{
                                                            callback(new Error('入金金额不能大于设置的单笔最高'))
                                                        }
                                                    }else{
                                                        callback(new Error('入金金额不能小于设置的单笔最低'));
                                                    }
                                                }else{
                                                    callback(new Error('查询错误'))
                                                }
                                            }).catch(function (err) {
                                                callback(new Error('查询错误'))
                                            })
                                        }
                                    }
                                    else{
                                        this.$ajax({
                                            method:'get',
                                            url:this.$store.state.domain.domain.domain.apId+'/1/financialRule'
                                        }).then(function (res) {
                                            if(res.data.retCode==0){
                                                if(res.data.data.depositConfig.depositMin<=value){
                                                    if(res.data.data.depositConfig.depositMax>=value){
                                                        callback()
                                                    }else{
                                                        callback(new Error('入金金额不能大于设置的单笔最高'))
                                                    }
                                                }else{
                                                    callback(new Error('入金金额不能小于设置的单笔最低'));
                                                }
                                            }else{
                                                callback(new Error('查询错误'))
                                            }
                                        }).catch(function (err) {
                                            callback(new Error('查询错误'))
                                        })
                                    }

                                }else{
                                    callback(new Error('请输入数字'))
                                }
                            }
                        }
                    }
                ],
                currentRate:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==null||value==''||value==undefined){
                                callback(new Error('未设置入金设置,请到后台配置'))
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                nameThreePaPay:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请选择支付三方'))
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                bankCode:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(this.HCInfoShow=='HC'){
                                if(value==''){
                                    callback(new Error('请选择银行'))
                                }else {
                                    callback()
                                }
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                pay_bankname:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(this.HCInfoShow=='payCv'){
                                if(value==''||value==undefined||value==null){
                                    callback(new Error('请选择银行'))
                                }else {
                                    callback()
                                }
                            }else{
                                callback()
                            }
                        }
                    }
                ]
                // currency:[
                //     {
                //         required:true,
                //         trigger:'blur',
                //         validator:(rules,value,callback)=>{
                //             if(this.HCInfoShow==='HC'){
                //                if(value==''){
                //                    callback(new Error('请选择币种'))
                //                }else{
                //                    callback()
                //                }
                //             }else{
                //                 callback()
                //             }
                //         }
                //     }
                // ]
            },

        }
    },
    watch:{
        'depositForm.amount':function (val) {
            console.log(val)
            this.depositForm.order_amount = parseFloat((val*this.depositForm.currentRate).toFixed(2)) ;
        },
        'depositForm.nameThreePaPay':function (value) {
            console.log(value)
            if(value){
                if(value[0].nameThreePaPay=='hc'){
                    this.HCInfoShow = 'HC';
                }else if(value[0].nameThreePaPay=='zbf'){
                    this.HCInfoShow = 'zbf';
                }else if(value[0].nameThreePaPay=='shqq'){
                    this.HCInfoShow = 'shqq';
                }else if(value[0].nameThreePaPay=='wlkj'){
                    this.HCInfoShow = 'WLKJ';
                }else if(value[0].nameThreePaPay=='payCv'){
                    this.HCInfoShow = 'payCv';
                }else if(value[0].nameThreePaPay=='ytm'){
                    this.HCInfoShow = 'ytm';
                }
                else{
                    this.HCInfoShow = '';
                }
            }
        }
    },
    methods:{
        submitForm(formName) {
            const self = this;
            let postData = {};
            let nameThree = '';
            if(this.depositForm.nameThreePaPay){
                nameThree = this.depositForm.nameThreePaPay[0].nameThreePaPay;
            }else{
                this.depositForm.nameThreePaPay = '';
            }
            if(this.HCInfoShow=='HC'){
                postData = {
                    apId:this.depositForm.apId,
                    userId:this.depositForm.userId,
                    IDName:this.depositForm.IDName,
                    userEmail:this.depositForm.userEmail,
                    nameThreePaPay:nameThree,
                    order_amount:this.depositForm.order_amount,
                    amount: this.depositForm.order_amount,
                    dollar: this.depositForm.amount,
                    currentRate: this.depositForm.currentRate,
                    bankCode:this.depositForm.bankCode, //银行
                    currency:'RMB' //币种
                };
            }else if(this.HCInfoShow=='zbf'){
                postData = {
                    apId:this.depositForm.apId,
                    userId:this.depositForm.userId,
                    IDName:this.depositForm.IDName,
                    userEmail:this.depositForm.userEmail,
                    nameThreePaPay:nameThree,
                    order_amount:this.depositForm.order_amount,
                    amount: this.depositForm.amount,
                    currentRate:this.depositForm.currentRate
                };
            }else if(this.HCInfoShow=='shqq'){
                postData = {
                    apId:this.depositForm.apId,
                    userId:this.depositForm.userId,
                    IDName:this.depositForm.IDName,
                    userEmail:this.depositForm.userEmail,
                    nameThreePaPay:nameThree,
                    order_amount:this.depositForm.order_amount,
                    amount: this.depositForm.amount,
                    currentRate:this.depositForm.currentRate,
                    bank_code:''
                };
            }else if(this.HCInfoShow=='WLKJ'){
                let wlpay = null;
                if(this.depositForm.order_amount){
                    wlpay = parseFloat((this.depositForm.order_amount*100).toFixed(2));
                }
                postData = {
                    apId:this.depositForm.apId,
                    userId:this.depositForm.userId,
                    IDName:this.depositForm.IDName,
                    userEmail:this.depositForm.userEmail,
                    nameThreePaPay:nameThree,
                    pay_service_type:'1',
                    pay_amount:wlpay,
                    dollar:this.depositForm.amount,
                    currentRate:this.depositForm.currentRate,
                    pay_bank_code:'ICBC',
                    pay_remark:''
                };
            }else if(this.HCInfoShow=='payCv'){
                postData = {
                    apId:this.depositForm.apId,
                    nameThreePaPay:nameThree,
                    currentRate:this.depositForm.currentRate,
                    dollar:this.depositForm.amount,
                    userId:this.depositForm.userId,
                    userEmail:this.depositForm.userEmail,
                    IDName:this.depositForm.IDName,
                    pay_amount:this.depositForm.order_amount,
                    pay_bankname:this.depositForm. pay_bankname,
                }
            }else if(this.HCInfoShow=='ytm'){
                let ytmpay = null;
                if(this.depositForm.order_amount){
                    ytmpay = parseFloat((this.depositForm.order_amount*100).toFixed(2));
                }
                postData = {
                    apId:this.depositForm.apId,
                    nameThreePaPay:nameThree,
                    currentRate:this.depositForm.currentRate,
                    dollar:this.depositForm.amount,
                    userId:this.depositForm.userId,
                    userEmail:this.depositForm.userEmail,
                    IDName:this.depositForm.IDName,
                    amount:ytmpay,
                }
            }
            console.log(this.depositForm)
            console.log('this.depositForm')
            console.log(postData)

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('this.depositForm.nameThreePaPay[0].payUrl')
                    console.log(this.depositForm.nameThreePaPay[0].payUrl)
                    // const  postUrl = "http://pay3.zuiyao.top:8080"+this.depositForm.nameThreePaPay[0].payUrl;//线上
                    // const  postUrl = 'http://hkdc1.crm79.com'+this.depositForm.nameThreePaPay[0].payUrl;//NUN
                    // const  postUrl = 'http://backupserver1.crm79.com:8080'+this.depositForm.nameThreePaPay[0].payUrl;//NUN
                    // const  postUrl = 'http://hkdc2.crm79.com'+this.depositForm.nameThreePaPay[0].payUrl;//NUN
                    const  postUrl = "http://pay2.zuiyao.top:8080"+this.depositForm.nameThreePaPay[0].payUrl; //测试库
                    // const  postUrl = "http://localhost:8080"+this.depositForm.nameThreePaPay[0].payUrl;
                    self.$ajax({
                        method:'post',
                        url:postUrl,
                        data:postData
                    }).then(function (res) {
                        console.log('三方接口')
                        console.log(res)
                        if(res.data.retCode==0){
                            console.log('三方接口第二步')
                            if(self.HCInfoShow=='ytm'){
                                console.log('三方接口第三步')
                                console.log(res.data.data.context)
                                // self.$ajax({
                                //     method:'post',
                                //     dataType: 'JSONP',
                                //     url:'http://www.yitianmao.com/cgi-bin/gateway_pay.cgi',
                                //     data:res.data.data.context
                                // }).then(function (res) {
                                //     console.log('ytm')
                                //     console.log('hahahha')
                                //     console.log(res)
                                // }).catch(function (err) {
                                //     console.log('ytm错误  ')
                                //     console.log(err)
                                // })
                                $.ajax({
                                    type: "POST",
                                    dataType: 'JSONP',
                                    async: false,
                                    url:"http://www.yitianmao.com/cgi-bin/gateway_pay_pho.cgi",
                                    data: JSON.stringify(res.data.data.context),
                                    error: function(data,type,err) {
                                        console.log('err')
                                        console.log(data)
                                        console.log(type)
                                        console.log(err)
                                    },
                                    success: function(data,textStatus) {
                                        console.log(data);
                                        console.log(textStatus);
                                    },

                                });
                            }else{
                                console.log('没有进入YTM')
                                console.log(res);
                                // /crm/pay/:orderId/url/zbf
                                const payData = res.data.data.url;
                                const num=payData.split("/")
                                console.log(payData.substring(1,5))
                                console.log(num[0],num[1],num[2])
                                // const urlPost = 'http://pay3.zuiyao.top:8080/'+num[1]+'/'+num[2]+'/'+res.data.data.orderId+'/'+num[3]+'/'+num[4];//线上
                                // const urlPost = 'http://hkdc1.crm79.com/'+num[1]+'/'+num[2]+'/'+res.data.data.orderId+'/'+num[3]+'/'+num[4];//NUN
                                // const urlPost = 'http://hkdc1.crm79.com/'+num[1]+'/'+num[2]+'/'+res.data.data.orderId+'/'+num[3]+'/'+num[4];//NUN
                                // const urlPost = 'http://backupserver1.crm79.com:8080/'+num[1]+'/'+num[2]+'/'+res.data.data.orderId+'/'+num[3]+'/'+num[4];//NUN
                                const urlPost = 'http://pay2.zuiyao.top:8080/'+num[1]+'/'+num[2]+'/'+res.data.data.orderId+'/'+num[3]+'/'+num[4];//测试库
                                console.log(urlPost);
                                // const urlPost = 'http://localhost:8080/'+num[1]+'/'+num[2]+'/'+res.data.data.orderId+'/'+num[3]+'/'+num[4];
                                self.$confirm('温馨提示:请在新打开的支付页面进行支付!','入金',{
                                    confirmButtonText:'完成支付',
                                    cancelButtonText:'支付失败',
                                }).then(()=>{
                                    self.$router.push('/fundAccess/withdrawalRecord')
                                }).catch(()=>{

                                });
                                window.open(urlPost)
                            }



                        }
                    }).catch(function (err) {

                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getPayChannelList(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/payChannelList/pay',
                data:{
                    apId:this.$store.state.domain.domain.domain.apId,
                    type:'0'
                }
            }).then(function (res) {
                console.log('nameThreePaPay')
                console.log(res.data.data.data);
                let threeNameList = [];
                res.data.data.data.forEach(function (item) {
                    const threeName = {
                        value:item,
                        label:item.shortName,
                        index:item.shortName
                    };
                    threeNameList.push(threeName)
                });
                self.threePartyNameList =threeNameList;
            }).catch(function (err) {

            })
        },
        getDepositConfig(){
            const self = this;
            this.$ajax({
                method:'get',
                url:'/'+this.$store.state.domain.domain.domain.apId+'/1/financialRule'
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('res.data')
                    console.log(res.data)
                    if(res.data.data.depositConfig.depositRateAdjust==0||res.data.data.depositConfig.depositRateAdjust==null||res.data.data.depositConfig.depositRateAdjust==undefined){
                        self.depositForm.currentRate = res.data.data.depositConfig.depositReplaceRate;
                    }else{
                        if(res.data.data.depositConfig.depositReplaceRate==0||res.data.data.depositConfig.depositReplaceRate==null||res.data.data.depositConfig.depositReplaceRate==undefined){
                            self.depositForm.currentRate  = res.data.data.depositConfig.depositFixedRate;
                        }else{

                            self.depositForm.currentRate  = res.data.data.depositConfig.depositRateAdjust;
                        }
                    }
                }
            }).catch(function (err) {

            })
        }
    },
    mounted(){
        this.getPayChannelList();
        this.getDepositConfig();
        console.log('this.$store.state.domain')
        console.log(this.$store.state.domain.domain.domain)
    }
}
