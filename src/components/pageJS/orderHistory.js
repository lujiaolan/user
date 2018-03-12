/**
 * Created by Udea-Manager on 2017/4/25.
 */
export default {
    data:function () {
        return {
            activeName: 'orderRecord',
            editableDate:false,
            orderSelect: {
                mt4UserId: '',
                orderRecordValue: '近1天',
                orderRecordDate0: Date.now(),
                orderRecordDate1: Date.now(),
                transCurrency: '全部货币',
            },
            orderSelectRules: {
                mt4UserId: {
                    required: false,
                    validator: (rules, val, callback) => {
                        if (/^[0-9]{0,10}$/.test(val)) {
                            callback()
                        } else {
                            callback(new Error('请输入正确的MT4帐号'))
                        }
                    }
                },
                orderRecordDate0: {
                    required: false,
                    validator: (rules, val, callback) => {
                        if (val) {
                            if (this.orderSelect.orderRecordDate1 == '') {
                                callback(new Error('请选择结束时间'))
                            } else {
                                callback()
                            }
                        } else {
                            callback()
                        }
                    }
                },
                orderRecordDate1: {
                    required: false,
                    validator: (rules, val, callback) => {
                        if (val) {
                            if (this.orderSelect.orderRecordDate0 == '') {
                                callback(new Error('请选择开始时间'))
                            } else {
                                if (this.orderSelect.orderRecordDate0 > val) {
                                    callback(new Error('开始时间不能大于结束时间'))
                                } else {
                                    callback()
                                }
                            }
                        } else {
                            callback()
                        }
                    }
                }
            },
            orderRecordOptions: [{
                key: '1',
                value: '近1天'
            }, {
                key: '3',
                value: '近3天'
            }, {
                key: '7',
                value: '近7天'
            }, {
                key: '10',
                value: '近10天'
            }, {
                key: '0',
                value: '自定义时间'
            }],
            datePickerVisible: true,
            transCurrencyOptions: [],
            orderHistoryData: [],
            days: 1,
            pageModel: {
                page: 1,
                pageSize: 10
            },
            totalData: '',

            currencyCountData: [],

            sortByOpenTime: {
                TradeOpenTime: -1
            },
            sortByCloseTime: {
                TradeCloseTime: -1
            },
            sortBy: '',

            countData: ''
        }

    },
    methods: {
        getCountData(){
            const self = this;
            this.$ajax.get('/order/history/count/' + this.$store.state.user.userinfo._id).then(function (res) {
                console.log('/order/history/count/ res');
                console.log(res);
                if(res.data.retCode === 0){
                    // this.countData = res.data.data;
                    if(res.data.data === null){
                        console.log('为空');
                        self.countData = {
                            TradeVolume: 0,
                            TradeCommission: self.accounting.formatMoney(0),
                            TradeStorage: self.accounting.formatMoney(0),
                            TradeProfit: self.accounting.formatMoney(0),
                        }
                    }else {
                        self.countData = res.data.data;
                        console.log('/order/history/count/ res.data.data');
                        console.log(res.data.data);
                        res.data.data.forEach(function (item,index) {
                            self.countData.TradeCommission = self.accounting.formatMoney(item.TradeCommission);
                            self.countData.TradeStorage = self.accounting.formatMoney(item.TradeStorage);
                            self.countData.TradeProfit = self.accounting.formatMoney(item.TradeProfit);
                        })
                    }
                }
            }).catch(function () {

            })
        },

        getSymbolListData(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/order/history/symbols/' + this.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log('history symbols res');
                console.log(res);
                res.data.forEach(function (item) {
                    let TradeSymbolObj = {};
                    TradeSymbolObj.val = item;
                    self.transCurrencyOptions.push(TradeSymbolObj);
                });
                console.log(self.transCurrencyOptions);
            }).catch(function (){
            });
        },
        // 快捷时间选择，开始时间的计算
        setStartTime(val) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
            this.orderSelect.orderRecordDate0 = date;
            this.orderSelect.orderRecordDate1 = new Date();
            this.days = val + 1;
        },
        // 快捷时间选择
        changeDate() {
            const self = this;
            if (self.orderSelect.orderRecordValue === '近1天') {
                self.datePickerVisible = true;
                self.setStartTime(0);
            } else if (self.orderSelect.orderRecordValue === '近3天') {
                self.datePickerVisible = true;
                self.setStartTime(2);
            } else if (self.orderSelect.orderRecordValue === '近7天') {
                self.datePickerVisible = true;
                self.setStartTime(6);
            } else if (self.orderSelect.orderRecordValue === '近10天') {
                self.datePickerVisible = true;
                self.setStartTime(9);
            } else {
                self.datePickerVisible = false;
                self.orderSelect.orderRecordDate0 = Date.now();
                self.orderSelect.orderRecordDate1 = Date.now();
                self.days = '';
            }
        },
        getOrderHistory() {
            const self = this;
            let postData;
            const pageModel = {
                page: self.pageModel.page,
                pageSize: self.pageModel.pageSize,
                sortBy: {
                    TradeCloseTime: -1
                }
            };
            if(self.sortBy !== ''){
                pageModel.sortBy = self.sortBy
            }
            const query = {
                apId: self.$store.state.domain.domain.domain.apId,
                userId: self.$store.state.user.userinfo._id,
                recent: self.days,
            };
            postData = {
                query: query,
                pageModel: pageModel
            };
            // console.log('初始话的postData');
            // console.log(postData);
            if(self.orderSelect.mt4UserId !== ''){
                postData.query.UserLoginID = self.orderSelect.mt4UserId;
            }
            if(self.orderSelect.transCurrency !== '全部货币'){
                postData.query.TradeSymbol = self.orderSelect.transCurrency;
            }
            if(self.orderSelect.orderRecordValue === '自定义时间'){
                postData.query.startTime = this.moment(self.orderSelect.orderRecordDate0).format('YYYY-MM-DD 00:00:00');
                postData.query.endTime = this.moment(self.orderSelect.orderRecordDate1).format('YYYY-MM-DD 23:59:59');
                delete postData.query.recent;
            }
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/order/history'
            }).then(function (res) {
                // console.log('/order/history data', res);
                if (res.data.retCode === 0) {
                    self.orderHistoryData = res.data.data.rows;
                    self.totalData = res.data.data.total;
                    // console.log(self.orderHistoryData);
                    res.data.data.rows.forEach(function (item,index) {
                        self.orderHistoryData[index].TradeOpenTime = self.moment(item.TradeOpenTime*1000).format('YYYY-MM-DD HH:mm:ss');
                        self.orderHistoryData[index].TradeCloseTime = self.moment(item.TradeCloseTime*1000).format('YYYY-MM-DD HH:mm:ss');
                        self.orderHistoryData[index].TradeCommission = self.accounting.formatMoney(item.TradeCommission,'',2,',','.');
                        self.orderHistoryData[index].TradeStorage = self.accounting.formatMoney(item.TradeStorage,'',2,',','.');
                        self.orderHistoryData[index].TradeProfit = self.accounting.formatMoney(item.TradeProfit,'',2,',','.');
                    })
                } else {
                    self.$message({
                        type: 'error',
                        message: '请求错误'
                    })
                }
            }).catch(function (err) {
                self.$message({
                    type: 'error',
                    message: '网络错误'
                })
            })
        },
        searchOrderHistory(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.pageModel.page = 1;
                    this.getOrderHistory()
                }else {
                    return false
                }
            })
        },
        SizeChange(val){
            this.pageModel.pageSize = val;
            this.getOrderHistory();
        },
        currentChange(val){
            this.pageModel.page = val;
            this.getOrderHistory();
        },
        getCurrencyCountData(){
            const self = this;
            self.$ajax({
                method: 'get',
                url: '/order/history/statistics/' + self.$store.state.user.userinfo._id + '?apId=' + self.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log('/order/history/statistics/ res');
                console.log(res);
                self.currencyCountData = res.data.data.rows;
                self.currencyCountData.forEach(function (item,index) {
                    self.currencyCountData[index].TradeCommission = self.accounting.formatMoney(item.TradeCommission,'',2,',','.');
                    self.currencyCountData[index].TradeStorage = self.accounting.formatMoney(item.TradeStorage,'',2,',','.');
                    self.currencyCountData[index].TradeProfit = self.accounting.formatMoney(item.TradeProfit,'',2,',','.');
                })
            }).catch(function () {
            })
        },

        sortColumn(column){
            const self = this;
            console.log('@sort-changecolumn, prop, order');
            console.log(column, column.prop, column.order);
            if(column.order === 'descending'){
                self.sortByOpenTime.TradeOpenTime = -1;
                self.sortByCloseTime.TradeCloseTime = -1;
            }else {
                self.sortByOpenTime.TradeOpenTime = 1;
                self.sortByCloseTime.TradeCloseTime = 1;
            }
            if(column.prop === 'TradeOpenTime'){
                self.sortBy = self.sortByOpenTime
            }else {
                self.sortBy = self.sortByCloseTime
            }
            this.getOrderHistory();
        }
    },
    mounted(){
        this.getSymbolListData();
        this.getCurrencyCountData();
        this.getOrderHistory();
        this.getCountData()
    }
}
