import myAgentLevelThree from '../page/MyAgentLevelThree.vue'
export default {
    components:{
        myAgentLevelThree
    },
    data(){
        return {
            activeName2: 'teamCount',
            rebackInfo:{
                userId:'',
                role:'',
                userName:''
            },
            defaultRowStyle:{
                styleAgentColse:{
                    display: 'block',
                    content: 'url("../../../static/img/agent-colse.png")!important',
                    height:'100%' ,
                    width: '100%',
                },
                styleAgentOpen:{
                    display: 'block',
                    // transform: 'rotate(0deg)',
                    content: 'url("../../../static/img/agent-open.png")!important',
                    height:'100%' ,
                    width: '100%',
                }
            },
            teamMT4Search:{
                MT4UserId:'',
                startTime:'',
                endTime:'',
                userId: this.$store.state.user.userinfo._id,
                agentLevel: this.$store.state.user.userinfo.agentLevel
            },
            totalTeam:{
                apId: this.$store.state.domain.domain.domain.apId,
                userId: this.$store.state.user.userinfo._id,
                agentLevel: this.$store.state.user.userinfo.agentLevel,
                startTime: '',
                endTime: '',
                agentNameLike: ''
            },
            totalTotalTeam:null,
            teamCountData: [],
            teamMT4Stat:[],
            levelThreeInfo:[],
            totalTeam_rules:{
                startTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value==''&&this.totalTeam.endTime==''){
                                callback()
                            }else{
                                if(value==this.totalTeam.endTime){
                                    callback()
                                }else if(this.totalTeam.endTime==''){
                                    callback(new Error('请输入结束时间'))
                                }else if(value>this.totalTeam.endTime) {
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
                            if(value==''&&this.totalTeam.startTime==''){
                                callback()
                            }else{
                                if(value==this.totalTeam.startTime){
                                    callback()
                                }else if(this.totalTeam.startTime==''){
                                    callback(new Error('请输入开始时间'))
                                }else if(value<this.totalTeam.startTime) {
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
    methods:{
        rowExpand(row){
            console.log('第一次');
            const self = this;
            const postData = {
                apId: this.totalTeam.apId,
                userId: row._id,
                agentLevel: row.agentLevel,
                startTime: '',
                endTime: '',
                agentNameLike: ''
            };
            console.log(postData);
            this.$ajax({
                method:'post',
                url:'/user/noPage/agent',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('levelThreeInfo')
                    self.levelThreeInfo = res.data.data;
                }
            }).catch(function (err) {

            })
        },
        searchTeamInfo(ref){
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.getTeamInfo();
                }else {
                    return false
                }
            })
        },
        rowStyleExand(row){
            // console.log('rowStyle')
            // console.log(row)
            // if(row.role=='agent'){
            //
            // }else{
            //
            // }
    },
        getTeamInfo(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/user/noPage/agent',
                data:self.totalTeam
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    self.teamCountData = res.data.data;
                    self.teamCountData.forEach(function (item,index) {
                       self.teamCountData[index].totalDeposit = self.accounting.formatMoney(item.totalDeposit,'',2,',','.');
                       self.teamCountData[index].totalWithdraw = self.accounting.formatMoney(item.totalWithdraw,'',2,',','.');
                       self.teamCountData[index].totalCommisssion = self.accounting.formatMoney(item.totalCommisssion,'',2,',','.');
                       self.teamCountData[index].totalTradeAmount = self.accounting.formatMoney(item.totalTradeAmount,'',2,',','.');
                       self.teamCountData[index].totalProfitAmount = self.accounting.formatMoney(item.totalProfitAmount,'',2,',','.');
                    });
                    self.totalTotalTeam = res.data.data.totalAmount;
                }
            }).catch(function (err) {

            })
        },
        agentDetails(row){
            console.log("row")
            console.log(row);
            this.rebackInfo = {
                userId:this.totalTeam.userId,
                role:this.totalTeam.role,
                userName:this.totalTeam.userName
            };
            this.totalTeam.userId = row._id;
            this.totalTeam.role = "agent";
            this.totalTeam.userName = row.userName;
            this.getTeamInfo();
        },
        totalTeamSizeChange(val){
            console.log("totalTeamSizeChange")
            console.log(val)
            this.totalTeam.pageSize = val;
            this.getTeamInfo();
        },
        currentChangetotalTeam(val){
            console.log("currentChangetotalTeam")
            console.log(val)
            this.searchTeamInfo.currentPage = val;
            this.getTeamInfo();
        },
        activeNameClick(tab, event){
            if(tab.label=='团队统计'){
                console.log(this.$store.state.user.userinfo)
                let startTime = '';
                let endTime = '';
                if(this.totalTeam.startTime){
                    startTime = this.moment(this.totalTeam.startTime).format('YYYY-MM-DD')
                }
                if(this.totalTeam.endTime){
                    endTime = this.moment(this.totalTeam.endTime).format('YYYY-MM-DD')
                }
                this.totalTeam = {
                    apId:this.totalTeam.apId,
                    userId:this.totalTeam.userId,
                    agentLevel:this.totalTeam.agentLevel,
                    startTime:startTime,
                    endTime:endTime,
                    agentNameLike:'',
                };
                this.getTeamInfo();
            }
            else if(tab.label=='开户记录'){
                this.getTeamMt4Stat();

            }
        },
        getTeamMt4Stat(){
            const postData = {
                userId: this.teamMT4Search.userId,
                agentLevel: this.teamMT4Search.agentLevel
            };
            const self = this;
            this.$ajax({
                method:'post',
                url:'/agent/team/mt4Stat',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    self.teamMT4Stat = res.data.data.content;
                }
            }).catch(function (err) {

            })
        }

    },
    mounted(){
        this.getTeamInfo();
        console.log(this.$store.state.user.userinfo._id)
    }
}
