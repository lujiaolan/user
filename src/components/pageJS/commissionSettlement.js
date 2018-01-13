export default {
    data(){
        return {
            activeName: 'countCom',
            activeName2: "4",
            selectAllStatus: false,

            // 结算佣金查询的条件
            commissionHandle:{
                mt4Account: '',
                startTime: '',
                endTime: '',
                orderValue: 'desc',
            },
            options: [{
                value: "desc",
                label: '日期从前往后'
            }, {
                value: "asc",
                label: '日期从后往前'
            }],
            commissionHandleRules:{
                mt4Account: {
                    required: false,
                    validator:(rules,val,callback)=>{
                        if(/^[0-9]{0,10}$/.test(val)){
                            callback()
                        }else {
                            callback(new Error('请输入正确的MT4帐号'))
                        }
                    }
                },
                startTime: {
                    required: false,
                    validator:(rules,val,callback)=>{
                        if(val){
                            if(this.commissionHandle.endTime==''){
                                callback(new Error('请选择结束时间'))
                            }else {
                                callback()
                            }
                        }else {
                            callback()
                        }
                    }
                },
                endTime: {
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(this.commissionHandle.startTime == ''){
                                callback(new Error('请选择开始时间'))
                            }else {
                                if(this.commissionHandle.startTime>val){
                                    callback(new Error('开始时间不能大于结束时间'))
                                }else {
                                    callback()
                                }
                            }
                        }else {
                            callback()
                        }
                    }
                }
            },

            applyTableData: [],
            dealTableData:[],
            dealStatus: '',

            applyPaginationData: {
                page: '1',
                pageSize: '10'
            },
            dealPaginationData: {
                page: '1',
                pageSize: '10'
            },

            // 申请数据
            selectionData:[],
        }
    },
    created() {
        this.getApplyData();
    },
    methods: {
        // 日期格式化yyyy-mm-dd
        dateFormat(val) {
            if(val!=null&&val!=''){
                var date = new Date(val);
                var year = date.getFullYear();
                if(date.getMonth() < 9){
                    var month = "0" + (date.getMonth()+1);
                }else {
                    var month = date.getMonth()+1;
                }
                if(date.getDate() > 9){
                    var day =date.getDate();
                }else {
                    var day = "0" + date.getDate();
                }
                return year+"-"+month+"-"+day;
            }else {
                return val='';
            }
        },

        // 已产生的平仓单数据和已申请审核的平仓单数据
        getApplyData() {
            var self = this;
            var postData = {};
            postData.userId = self.$store.state.user.userinfo._id;
            postData.page = self.applyPaginationData.page.toString();
            postData.pageSize = self.applyPaginationData.pageSize.toString();
            postData.mt4Account = self.commissionHandle.mt4Account.trim();
            postData.startTime= self.dateFormat(self.commissionHandle.startTime);
            postData.endTime= self.dateFormat(self.commissionHandle.endTime);
            postData.sort = self.commissionHandle.orderValue;
            // console.log(postData);
            self.$ajax({
                method:'post',
                data:postData,
                url:'/commission/unhandle'
            }).then(function (res) {
                // console.log(res);
                if (res.data.retCode === 0) {
                    self.applyTableData = res.data.data.data ;
                    self.applyTableData.forEach(function (item,index) {
                        self.applyTableData[index].money = self.accounting.formatMoney(item.money);
                        self.applyTableData[index].commissionMoney = self.accounting.formatMoney(item.commissionMoney);
                    });
                    self.applyTableData.moneyAmount = self.accounting.formatMoney(res.data.data.moneyAmount);
                    self.applyTableData.recordsNum = res.data.data.records;
                    self.applyTableData.totalCountApply = res.data.data.total;
                    // console.log(self.applyTableData);
                }else {
                    self.$message.error(res.data.message);
                }
            }).catch(function (err) {
                self.$message.error("网络错误");
            });
        },

        getDealData() {
            var self = this;
            var postData = {};
            postData.userId = self.$store.state.user.userinfo._id;
            postData.page = self.dealPaginationData.page.toString();
            postData.pageSize = self.dealPaginationData.pageSize.toString();
            postData.status = self.dealStatus;
            console.log(postData);
            self.$ajax({
                method:'post',
                data:postData,
                url:'/commission/currComplete'
            }).then(function (res) {
                // console.log(res);
                if (res.data.retCode == 0) {
                    self.dealTableData = res.data.data.data;
                    self.dealTableData.moneyAmount = res.data.data.moneyAmount;
                    self.dealTableData.recordsNum = res.data.data.records;
                    self.dealTableData.totalCountApply = res.data.data.total;
                    // console.log(self.dealTableData);
                }else {
                    self.$message.error(self.res.data.message);
                }
            }).catch(function (err) {
                self.$message.error("网络错误");
            });
        },

        // // 切换tabs请求不同的数据
        activeChange(val){
            var self = this;
            if(val.name == 'countCom'){
                self.applyPaginationData.page = 1;
                self.applyPaginationData.pageSize = 10;
                self.getApplyData();
            }else {
                self.dealPaginationData.page = 1;
                self.dealPaginationData.pageSize = 10;
                self.getDealData();
            }
        },

        // 已产生的平仓单列表的搜索和刷新
        searchApplyList(ref) {
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.dealPaginationData.page = 1;
                    this.getApplyData();
                }else {
                    return false
                }
            })

        },
        refreshApplyList() {
            this.getApplyData();
        },

        // 已产生的平仓单列表的时间顺序排序
        orderData() {
            this.getApplyData();
        },


        // 是否全选状态判断
        selectAllVisible(val){
            if(val.length == 0){
                console.log('false');
                this.selectAllStatus = false;
            }else {
                console.log('true');
                this.selectAllStatus = true;
            }
        },
        // 全部申请审核
        allApply() {
            var self = this;
            var postData = {};
            postData.userId = self.$store.state.user.userinfo._id;
            console.log(self.selectAllStatus);
            if(self.selectAllStatus){
                self.$ajax({
                    method:'post',
                    data:postData,
                    url:'/commission/allApply'
                }).then(function (res) {
                    // console.log(res);
                    if(res.data.retCode == 0){
                        self.getApplyData();
                        self.selectAllStatus = false;
                    }
                }).catch(function (err) {
                })
            }else {
               self.$message({
                   message: '请把全部选项都选上',
                   type: 'error'
               });
            }
        },

        // 部分申请
        selectVisible(selection){
            // console.log(selection);
            this.selectionData = selection;
        },
        partApply() {
            var self = this;
            var postData = {};
            var comIds = [];
            for(var i = 0;i<self.selectionData.length;i++){
                comIds.push(self.selectionData[i]._id);
            }
            postData.commIds = comIds;
            // console.log(postData);
            self.$ajax({
                method: 'post',
                data:postData,
                url:'/commission/apply'
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode == 0){
                    self.getApplyData();
                }
            })
        },

        // // 已产生的平仓单的数据分页
        applyCurrentChange(val) {
            this.applyPaginationData.page = val;
            this.getApplyData();
        },
        applySizeChange(val){
            this.applyPaginationData.pageSize = val;
            this.getApplyData();
        },

        // // 已经提交申请审核的平仓单的数据的状态分类
        dealStatusChange(val){
            var self = this;
            // console.log(val);
            if(val.name == "1"){
                //等待处理
                self.dealStatus = "2";
                self.dealPaginationData.page = "1";
                self.dealPaginationData.pageSize = "10";
            }else if(val.name == "2"){
                //已完成
                self.dealStatus = "1";
                self.dealPaginationData.page = "1";
                self.dealPaginationData.pageSize = "10";
            }else if(val.name == "3"){
                //失败
                self.dealStatus = "-1";
                self.dealPaginationData.page = "1";
                self.dealPaginationData.pageSize = "10";
            }else {
                self.dealStatus = "";
                self.dealPaginationData.page = "1";
                self.dealPaginationData.pageSize = "10";
            }
            self.getDealData();
        },

        // // 已经提交申请审核的数据分页
        dealCurrentChange(val){
            // console.log(val);
            this.dealPaginationData.page = val;
            this.getDealData();
        },
        dealSizeChange(val){
            this.dealPaginationData.pageSize = val;
            this.getDealData();
        }
    },
    // watch(){
    //     this.applyTableData;
    // }
}
