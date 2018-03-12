/**
 * Created by Udea-Manager on 2017/6/28.
 */
export default {
    data() {
        return {
            editableDate:false,
            widthdrawSearchTotal:null,
            detailTitle:'',
            detailDrawRecordShow:false,
            detailDrawRecordData:[],
            dawActiveName: 'alldraw',
            widthdrawSearch:{
                userId:this.$store.state.user.userinfo._id,
                page:1,
                pageSize:10,
                type:'',
                orderNum:'',
                startTime:'',
                endTime:'',
                status:''
            },
            completeOptions: [
                {
                    value:"",
                    label:"全部"
                },
                {
                    value:'1',
                    label:'入金'
                },
                {
                    value:'2',
                    label:'出金'
                },
                {
                    value:'21',
                    label:'系统入金'
                },
                {
                    value:'22',
                    label:'系统出金'
                }
            ],
            pendingTableData: [],
            dawPendingR_rules:{
                startTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.endTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.endTime){
                                    callback()
                                }else if(this.widthdrawSearch.endTime==''){
                                    callback(new Error('请输入结束时间'))
                                }else if(value>this.widthdrawSearch.endTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.startTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.startTime){
                                    callback()
                                }else if(this.widthdrawSearch.startTime==''){
                                    callback(new Error('请输入开始时间'))
                                }else if(value<this.widthdrawSearch.startTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ]
            },
            widthdraw_rules:{
                startTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.endTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.endTime){
                                    callback()
                                }else if(this.widthdrawSearch.endTime==''){
                                    callback(new Error('请输入结束时间'))
                                }else if(value>this.widthdrawSearch.endTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.startTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.startTime){
                                    callback()
                                }else if(this.widthdrawSearch.startTime==''){
                                    callback(new Error('请输入开始时间'))
                                }else if(value<this.widthdrawSearch.startTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ]
            },
            dawCompleteR_rules:{
                startTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.endTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.endTime){
                                    callback()
                                }else if(this.widthdrawSearch.endTime==''){
                                    callback(new Error('请输入结束时间'))
                                }else if(value>this.widthdrawSearch.endTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.startTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.startTime){
                                    callback()
                                }else if(this.widthdrawSearch.startTime==''){
                                    callback(new Error('请输入开始时间'))
                                }else if(value<this.widthdrawSearch.startTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ]
            },
            dawLossR_rules:{
                startTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.endTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.endTime){
                                    callback()
                                }else if(this.widthdrawSearch.endTime==''){
                                    callback(new Error('请输入结束时间'))
                                }else if(value>this.widthdrawSearch.endTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:true,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.widthdrawSearch.startTime==''){
                                callback()
                            }else{
                                if(value==this.widthdrawSearch.startTime){
                                    callback()
                                }else if(this.widthdrawSearch.startTime==''){
                                    callback(new Error('请输入开始时间'))
                                }else if(value<this.widthdrawSearch.startTime) {
                                    callback(new Error('结束时间不能大于开始时间'))
                                } else{
                                    callback();
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    methods: {
        drawHandleClick(tab) {
            console.log(tab.name);
            if(tab.name==='alldraw'){
                this.widthdrawSearch.status = '';
                this.widthdrawSearch.endTime = '';
                this.widthdrawSearch.startTime = '';
                this.completeTableData = [];
                this.getWidthdrawList()
            }else if(tab.name==='Complete'){
                this.widthdrawSearch.status = '1';
                this.widthdrawSearch.endTime = '';
                this.widthdrawSearch.startTime = '';
                this.completeTableData = [];
                this.getWidthdrawList()
            }else if(tab.name==='dawLossR'){
                this.widthdrawSearch.status = '-1';
                this.widthdrawSearch.endTime = '';
                this.widthdrawSearch.startTime = '';
                this.completeTableData = [];
                this.getWidthdrawList()
            }else if(tab.name==='dawPendingR'){
                this.widthdrawSearch.status = '0';
                this.widthdrawSearch.endTime = '';
                this.widthdrawSearch.startTime = '';
                this.completeTableData = [];
                this.getWidthdrawList()
            }else{
                this.widthdrawSearch.status = '';
                this.widthdrawSearch.endTime = '';
                this.widthdrawSearch.startTime = '';
                this.completeTableData = [];
                this.getWidthdrawList()
            }
        },
        withdrawAllSizeChange(val){
            this.widthdrawSearch.pageSize = val;
            this.getWidthdrawList();
        },
        withdrawAllCurrentChange(val){
            this.widthdrawSearch.page = val;
            this.getWidthdrawList();
        },
        detailRecord(row){

            console.log(row.type)
            if(row.type===1){
                this.detailTitle = '入金详情';
                this.detailDrawRecordShow = true;
                this.getDWRecord(row._id);
            }else{
                this.detailTitle = '出金详情';
                this.detailDrawRecordShow = true;
                this.getDWRecord(row._id);
            }
        },
        getDWRecord(val){
            console.log('详情')
            const self = this;
            self.detailDrawRecordData = [];
            this.$ajax({
                method:'get',
                url:'/financial/'+val
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('/financial/',res)
                    self.detailDrawRecordData = res.data.data;
                }
            }).catch(function (err) {

            })
        },
        closeDrawRecord(){
            this.detailDrawRecordShow = false;
        },
        widthdrawRecord(ref){
            console.log('ref')
            console.log(ref)
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.getWidthdrawList()
                }  else{
                    return false
                }
            })

        },
        getWidthdrawList(){
            let startTime = '';
            let endTime = '';
            if(this.widthdrawSearch.startTime){
                startTime = this.moment(this.widthdrawSearch.startTime).format('YYYY-MM-DD')
            }
            if(this.widthdrawSearch.endTime){
                endTime = this.moment(this.widthdrawSearch.endTime).format('YYYY-MM-DD')
            }
            const postData = {
                userId:this.widthdrawSearch.userId,
                page:this.widthdrawSearch.page.toString(),
                pageSize:this.widthdrawSearch.pageSize.toString(),
                type:this.widthdrawSearch.type,
                orderNum:this.widthdrawSearch.orderNum,
                startTime:startTime,
                endTime:endTime,
                status:this.widthdrawSearch.status
            };

            const self = this;
            this.$ajax({
                method:'post',
                url:'/financial/list',
                data:postData
            }).then(function (res) {
                console.log('financial')
                console.log(res)
                if(res.data.retCode==0){
                    self.completeTableData = res.data.data.data;
                    self.widthdrawSearchTotal = res.data.data.records;
                    self.completeTableData.forEach(function (item,index) {
                        self.completeTableData[index].amount = self.accounting.formatMoney(item.amount,'',2);
                        self.completeTableData[index].flowMoney = self.accounting.formatMoney(item.flowMoney,'',2);
                    })
                }
            }).catch(function (err) {

            })
        }
    },
    mounted(){
        this.getWidthdrawList()
    }
}
