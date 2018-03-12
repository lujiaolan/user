import IEcharts from 'vue-echarts-v3';
export default {
    components: {
        IEcharts
    },
    data(){
        return {
            commissionDetail: 'first',
            pancake: null,
            tableData: [],
            pancakeData:[],
            editableDate:false,
            commissionSelect: {
                mt4Account: '',
                statusValue: '2',
                timeType: 'apply',
                commHistoryDate0: '',
                commHistoryDate1: '',
            },
            options1: [{
                statusValue: '',
                label: '全部'
            }, {
                statusValue: '1',
                label: '已结算'
            }, {
                statusValue: '-1',
                label: '失败'
            }, {
                statusValue: '2',
                label: '等待处理'
            }],
            options2: [{
                timeType: 'apply',
                label: '申请时间'
            }, {
                timeType: 'handle',
                label: '处理时间'
            }],
            commissionSelectRules:{
                mt4Account: {
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(/^[0-9]*$/.test(val)){
                            callback()
                        }else {

                            callback(new Error('请输入正确的MT4帐号'))
                        }
                    }
                },
                commHistoryDate0: {
                    required: false,
                    validator:(rules,val,callback)=>{
                        if(val){
                            if(this.commissionSelect.commHistoryDate1==''){
                                callback(new Error('请选择结束时间'))
                            }else {
                                callback()
                            }
                        }else {
                            callback()
                        }
                    }
                },
                commHistoryDate1: {
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(this.commissionSelect.commHistoryDate0 == ''){
                                callback(new Error('请选择开始时间'))
                            }else {
                                if(this.commissionSelect.commHistoryDate0>val){
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
            commHistoryData: [],
            historyPaginationData: {
                page: 1,
                pageSize: 10
            },

            pageVisible: false
        }
    },
    created() {
        this.getCommHistoryData();
        this.getMonthCountData();
    },
    methods: {
        drawChartPancake(){
            // console.log(pancakeData);
            this.pancake = {
                title: {
                    text: '返佣分析',
                    textStyle: {
                        fontSize: 14,
                        fontFamily: 'PingFang SC'
                    },
                    y: 0
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}:{c} ({d}%)'
                },
                series: [
                    {
                        name: '返佣份额',
                        type: 'pie',
                        data: this.pancakeData,
                        itemStyle:{
                            emphasis:{
                                shadowBlur:10,
                                shadowOffsetX:0,
                                shadowColor: 'rgba(0,0,0,.5)'
                            }
                        }
                    }
                ]
            }
        },
        // 获取月份统计的数据
        getMonthCountData(){
            var self = this;
            var userId = self.$store.state.user.userinfo._id;
            self.$ajax({
                method: 'get',
                url: '/commission/monthStat/' + userId
            }).then(function (res) {
                if(res.data.retCode == 0){
                    self.tableData = res.data.data;
                    self.sortDateData();
                    for(var i = 0;i < self.tableData.length; i++){
                        const a  = {
                            name: self.tableData[i].monthStat,
                            value: self.tableData[i].commissionAmount,
                        };
                        self.pancakeData.push(a);
                    }
                    // console.log(self.pancakeData)
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        // 按照时间顺序排序数据
        sortDateData(){
            var self = this;
            var temp;
            var dataLength = self.tableData.length;
            for(var i = 0; i < dataLength; i++){
                for (var j = 0; j < dataLength - i - 1; j++){
                    if(parseInt(self.tableData[j].monthStat.substring(5)) > parseInt(self.tableData[j+1].monthStat.substring(5))){
                        temp = self.tableData[j];
                        self.tableData[j] = self.tableData[j+1];
                        self.tableData[j+1] = temp;
                    }
                }
            }
            // console.log(self.tableData);
        },
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
        // 获取数据
        // 默认的请求的申请审核的佣金账单数据，也就是单条的平仓单的数据
        getAllData(){
            const self = this;
            const postData = {};
            postData.userId = self.$store.state.user.userinfo._id;
            postData.page = self.historyPaginationData.page.toString();
            postData.pageSize = self.historyPaginationData.pageSize.toString();
            postData.mt4Account = self.commissionSelect.mt4Account.trim();
            postData.status = self.commissionSelect.statusValue;
            postData.startTime= self.dateFormat(self.commissionSelect.commHistoryDate0);
            if (self.dateFormat(self.commissionSelect.commHistoryDate1) === ''){
                postData.endTime = postData.startTime;
            }else {
                postData.endTime= self.dateFormat(self.commissionSelect.commHistoryDate1);
            }
            postData.timeType = self.commissionSelect.timeType;
            // console.log(postData);
            self.$ajax({
                method:'post',
                data:postData,
                url:'/commission/all'
            }).then(function (res) {
                // console.log(res);
                if (res.data.retCode === 0) {
                    self.commHistoryData = res.data.data.data ;
                    self.commHistoryData.forEach(function (item,index) {
                        self.commHistoryData[index].money = self.accounting.formatMoney(item.money);
                        self.commHistoryData[index].commissionMoney = self.accounting.formatMoney(item.commissionMoney);
                    });
                    self.commHistoryData.totalCountApply = res.data.data.records;
                    // console.log(self.commHistoryData);
                }else {
                    self.$message.error(res.data.message);
                }
            }).catch(function (err) {
                self.$message.error("网络错误");
            });
        },
        // 不是默认的，根据合并申请的订单编号的该交易编号的详细的订单数据
        getDetailData(){
            const self = this;
            const postData = {
                commSumId: self.$store.state.detail.detailId
            };
            this.$ajax({
                method: 'post',
                data: postData,
                url: '/commission/sum/subAll'
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode === 0){
                    self.commHistoryData = res.data.data;
                    self.commHistoryData.forEach(function (item,index) {
                        self.commHistoryData[index].money = self.accounting.formatMoney(item.money);
                        self.commHistoryData[index].commissionMoney = self.accounting.formatMoney(item.commissionMoney);
                    });
                }else {
                    self.$message({
                        type: 'error',
                        message: res.data.data.errMsg
                    })
                }
            }).catch(function () {

            })
        },
        getCommHistoryData(){
            if(this.$store.state.detail.detailVisible){
                this.getDetailData();
                this.pageVisible = false;
            }else {
                this.getAllData();
                this.pageVisible = true;
            }
            this.$store.dispatch('update_detail_id',{
                detailId: '',
                detailVisible: false,
            });
        },
        // 搜索按钮
        searchCommHistory(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.historyPaginationData.page = 1;
                    this.getCommHistoryData();
                }else {
                    return false
                }
            })
        },
        // 页面跳转
        historyCurrentChange(val){
            this.historyPaginationData.page = val;
            this.getCommHistoryData();
        },
        // 没页面显示总条数变化
        historySizeChange(val){
            this.historyPaginationData.pageSize = val;
            this.getCommHistoryData();
        }
    },
    mounted() {
        this.drawChartPancake();
    }
}
