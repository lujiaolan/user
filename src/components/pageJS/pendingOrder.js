/**
 * Created by Udea-Manager on 2017/4/25.
 */
export default {
    data: function(){
        return {
            activeName: 'pendingOrder',
            userId: this.$store.state.user.userinfo._id,
            countData: '',
            pendingOrderData: [],
            mt4UserId: ''
        }
    },
    methods: {
        // 表格合计
        getSummaries(param) {
            // console.log('dfdf');
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }else if(index === 1 || index === 3 || index === 6){
                    sums[index] = '';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    if(index === 4){
                        sums[index] = sums[index].toFixed(2);
                        sums[index] += ' 手';
                    }else {
                        sums[index] = sums[index].toFixed(2);
                        sums[index] += ' 元';
                    }
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        getData(){
            const self = this;
            let getUrl = '';
            if(this.mt4UserId === ''){
                getUrl = '/order/open/' + self.userId + '?apId=' + this.$store.state.domain.domain.domain.apId + '&tradeCmd=2345';
            }else {
                getUrl = '/order/open/' + self.userId + '?apId=' + this.$store.state.domain.domain.domain.apId + '&tradeCmd=2345' + '&mt4UserId=' + this.mt4UserId;
            }
            console.log(getUrl);
            self.$ajax({
                method: 'get',
                url: getUrl
            }).then(function (res) {
                console.log('get data', getUrl, res);
                if(res.data.retCode === 0){
                    if(res.data.data === null){
                        self.pendingOrderData = res.data.data;
                    }else {
                        self.pendingOrderData = res.data.data.rows;
                        res.data.data.rows.forEach(function (item,index) {
                            self.pendingOrderData[index].TradeOpenTime = self.moment(item.TradeOpenTime*1000).format('YYYY-MM-DD HH:mm:ss');
                            self.pendingOrderData[index].TradeVolume = item.TradeVolume/100;
                            self.pendingOrderData[index].TradeSL = self.accounting.formatMoney(item.TradeSL,'',2,',','.');
                            self.pendingOrderData[index].TradeTP = self.accounting.formatMoney(item.TradeTP,'',2,',','.');
                            self.pendingOrderData[index].TradeCommission = self.accounting.formatMoney(item.TradeCommission,'',2,',','.');
                            self.pendingOrderData[index].TradeStorage = self.accounting.formatMoney(item.TradeStorage,'',2,',','.');
                        });
                        // console.log('pendingOrderData');
                        // console.log(pendingOrderData)
                    }
                }
            }).catch(function () {
            })
        },
        searchPendingOrder(){
            this.getData()
        },

        getCountData(){
            const self = this;
            this.$ajax.get('/order/mt4Account/info/count/' + this.$store.state.user.userinfo._id + '?apId=' + this.$store.state.domain.domain.domain.apId).then(function (res) {
                console.log('/order/mt4Account/info/count/',res);
                if(res.data.retCode === 0){
                    if(res.data.data === null){
                        self.countData = {
                            UserBalance: self.accounting.formatMoney(0),
                            UserEquit: self.accounting.formatMoney(0),
                            UserMargin: self.accounting.formatMoney(0),
                            UserFreeMargin: self.accounting.formatMoney(0),
                            MarginScale: self.accounting.formatMoney(0,2),
                        }
                    }else {
                        self.countData = res.data.data;
                        self.countData.UserBalance = self.accounting.formatMoney(self.countData.UserBalance);
                        self.countData.UserEquit = self.accounting.formatMoney(self.countData.UserEquit);
                        self.countData.UserMargin = self.accounting.formatMoney(self.countData.UserMargin);
                        self.countData.UserFreeMargin = self.accounting.formatMoney(self.countData.UserFreeMargin);
                        self.countData.MarginScale = self.accounting.formatMoney(self.countData.MarginScale,2);
                    }
                }
            }).catch(function (err) {
            })
        }
    },
    mounted(){
        this.getData();
        this.getCountData();
    }
}
