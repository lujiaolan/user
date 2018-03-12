/**
 * Created by Udea-Manager on 2017/6/28.
 */
export default {
    data:function () {
        return {
            transActiveName: 'transComplete',
            editableDate:false,
            datePickerVisible: true,
            recordSelect: {
                transCompValue: '近1天',
                billNum: '',
                transCompDate0: Date.now(),
                transCompDate1: Date.now(),
            },
            recordSelectRules:{
                billNum: {
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(/^[0-9]*$/.test(val)){
                            callback()
                        }else {

                            callback(new Error('请输入正确的订单编号'))
                        }
                    }
                },
                transCompDate0: {
                    required: false,
                    validator:(rules,val,callback)=>{
                        if(val){
                            if(this.recordSelect.transCompDate1==''){
                                callback(new Error('请选择结束时间'))
                            }else {
                                callback()
                            }
                        }else {
                            callback()
                        }
                    }
                },
                transCompDate1: {
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(this.recordSelect.transCompDate0 == ''){
                                callback(new Error('请选择开始时间'))
                            }else {
                                if(this.recordSelect.transCompDate0>val){
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
            transCompOptions: [{
                key: '1',
                value: '近1天'
            },{
                key: '3',
                value: '近3天'
            },{
                key: '7',
                value: '近7天'
            },{
                key: '10',
                value: '近10天'
            }, {
                key: '0',
                value: '自定义时间'
            }],

            transCompTableData: [],
            transComp: {
                page: 1,
                pageSize: 10,
            },

            days: '1',
            totalData: ''
        }
    },
    methods: {
        // 快捷时间选择，开始时间的计算
        setStartTime(val) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
            this.transCompDate0 = date;
            this.transCompDate1 = new Date();
            this.days = (val + 1).toString();
        },
        // 快捷时间选择
        changeDate() {
            const self = this;
            if (self.recordSelect.transCompValue === '近1天') {
                self.datePickerVisible = true;
                self.setStartTime(0);
            } else if (self.recordSelect.transCompValue === '近3天') {
                self.datePickerVisible = true;
                self.setStartTime(2);
            } else if (self.recordSelect.transCompValue === '近7天') {
                self.datePickerVisible = true;
                self.setStartTime(6);
            } else if (self.recordSelect.transCompValue === '近10天') {
                self.datePickerVisible = true;
                self.setStartTime(9);
            } else {
                self.datePickerVisible = false;
                self.recordSelect.transCompDate0 = Date.now();
                self.recordSelect.transCompDate1 = Date.now();
                self.days = '';
            }
        },

        // 获取数据
        getTransHistoryData() {
            const self = this;
            const postData = {
                userId: self.$store.state.user.userinfo._id,
                page: self.transComp.page.toString(),
                pageSize: self.transComp.pageSize.toString(),
                billNum: self.recordSelect.billNum.trim(),
                days: self.days
            };
            if (self.days !== '') {
                postData.startTime = '';
                postData.endTime = ''
            } else {
                postData.startTime = self.moment(self.recordSelect.transCompDate0).format('YYYY-MM-DD');
                postData.endTime = self.moment(self.recordSelect.transCompDate1).format('YYYY-MM-DD');
            }
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/deposit/bill'
            }).then(function (res) {
                console.log('/deposit/bill res');
                console.log(res.data.data);
                if (res.data.retCode === 0) {
                    self.transCompTableData = res.data.data.data;
                    self.transCompTableData.forEach(function (item,index) {
                       self.transCompTableData[index].billMoney = self.accounting.formatMoney(item.billMoney,'',2,',','.')
                    });
                    self.totalData = res.data.data.records;
                    console.log('self.transCompTableData');
                    console.log(self.transCompTableData)
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

        transCompSizeChange(val) {
            this.transComp.pageSize = val;
            this.getTransHistoryData();
        },
        currentChangeTransComp(val) {
            this.transComp.page = val;
            this.getTransHistoryData();
        },
        searchTransHistory(ref) {
            const self = this;
            this.$refs[ref].validate((valid)=>{
               if(valid){
                   self.transComp.page = 1;
                   this.getTransHistoryData()
               } else {
                   return false
               }
            });
        },
    },
    mounted(){
        // clipInit(10,6);
        this.getTransHistoryData();
    }
}
